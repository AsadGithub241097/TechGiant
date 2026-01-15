import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  where, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Recording {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnail?: string;
  duration?: string;
  category?: string;
  section?: string; // Section name (e.g., "Section 1", "Section 2", etc.)
  createdAt: any;
  createdBy: string;
  isActive: boolean;
}

export interface RecordingAccess {
  userId: string;
  recordingId: string;
  status: 'pending' | 'approved' | 'denied';
  requestedAt: any;
  approvedAt?: any;
  approvedBy?: string;
}

export interface SectionAccess {
  userId: string;
  section: string;
  status: 'pending' | 'approved' | 'denied';
  requestedAt: any;
  approvedAt?: any;
  approvedBy?: string;
}

export interface Section {
  id: string;
  name: string;
  description?: string;
  order: number;
  createdAt: any;
  createdBy: string;
  isActive: boolean;
}

export interface UserRecordingProgress {
  userId: string;
  recordingId: string;
  progress: number; // 0-100
  lastWatchedAt: any;
  completed: boolean;
  watchedDuration: number; // in seconds
  totalDuration: number; // in seconds
}

class RecordingsService {
  private recordingsCollection = 'recordings';
  private accessRequestsCollection = 'recordingAccessRequests';
  private sectionAccessCollection = 'sectionAccessRequests';
  private userProgressCollection = 'userRecordingProgress';
  private sectionsCollection = 'sections';

  // Check if Firebase is available
  private isFirebaseAvailable(): boolean {
    return db !== null;
  }

  // Get all recordings
  async getAllRecordings(): Promise<Recording[]> {
    if (!this.isFirebaseAvailable()) {
      return [];
    }

    try {
      const q = query(
        collection(db, this.recordingsCollection),
        where('isActive', '==', true)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Recording));
    } catch (error) {
      console.error('Error fetching recordings:', error);
      return [];
    }
  }

  // Get recording by ID
  async getRecordingById(recordingId: string): Promise<Recording | null> {
    if (!this.isFirebaseAvailable()) {
      return null;
    }

    try {
      const docRef = doc(db, this.recordingsCollection, recordingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Recording;
      }
      return null;
    } catch (error) {
      console.error('Error fetching recording:', error);
      return null;
    }
  }

  // Create a new recording (admin only)
  async createRecording(recording: Omit<Recording, 'id' | 'createdAt'>): Promise<string | null> {
    if (!this.isFirebaseAvailable()) {
      return null;
    }

    try {
      const docRef = doc(collection(db, this.recordingsCollection));
      await setDoc(docRef, {
        ...recording,
        createdAt: serverTimestamp(),
        isActive: true
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating recording:', error);
      return null;
    }
  }

  // Delete a recording (admin only)
  async deleteRecording(recordingId: string): Promise<boolean> {
    if (!this.isFirebaseAvailable()) {
      return false;
    }

    try {
      const docRef = doc(db, this.recordingsCollection, recordingId);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error('Error deleting recording:', error);
      return false;
    }
  }

  // Get recordings by section
  async getRecordingsBySection(section: string): Promise<Recording[]> {
    if (!this.isFirebaseAvailable()) {
      return [];
    }

    try {
      const q = query(
        collection(db, this.recordingsCollection),
        where('section', '==', section),
        where('isActive', '==', true)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Recording));
    } catch (error) {
      console.error('Error fetching recordings by section:', error);
      return [];
    }
  }

  // Get all unique sections (from sections collection or recordings for backward compatibility)
  async getAllSections(): Promise<string[]> {
    if (!this.isFirebaseAvailable()) {
      return [];
    }

    try {
      // First try to get from sections collection
      const sectionsDocs = await getDocs(collection(db, this.sectionsCollection));
      if (!sectionsDocs.empty) {
        const sections = sectionsDocs.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as Section))
          .filter(s => s.isActive)
          .sort((a, b) => a.order - b.order)
          .map(s => s.name);
        return sections;
      }

      // Fallback: get from recordings (for backward compatibility)
      const q = query(
        collection(db, this.recordingsCollection),
        where('isActive', '==', true)
      );
      const querySnapshot = await getDocs(q);
      const sections = new Set<string>();
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.section) {
          sections.add(data.section);
        }
      });
      return Array.from(sections).sort();
    } catch (error) {
      console.error('Error fetching sections:', error);
      return [];
    }
  }

  // Request access to a recording
  async requestRecordingAccess(userId: string, recordingId: string): Promise<boolean> {
    if (!this.isFirebaseAvailable()) {
      return false;
    }

    try {
      const accessId = `${userId}_${recordingId}`;
      const docRef = doc(db, this.accessRequestsCollection, accessId);
      
      // Check if request already exists
      const existingDoc = await getDoc(docRef);
      if (existingDoc.exists()) {
        return false; // Request already exists
      }

      await setDoc(docRef, {
        userId,
        recordingId,
        status: 'pending',
        requestedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error requesting access:', error);
      return false;
    }
  }

  // Get all access requests
  async getAllAccessRequests(status?: 'pending' | 'approved' | 'denied'): Promise<RecordingAccess[]> {
    if (!this.isFirebaseAvailable()) {
      return [];
    }

    try {
      let q;
      if (status) {
        q = query(collection(db, this.accessRequestsCollection), where('status', '==', status));
      } else {
        q = query(collection(db, this.accessRequestsCollection));
      }
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        ...doc.data()
      } as RecordingAccess));
    } catch (error) {
      console.error('Error fetching access requests:', error);
      return [];
    }
  }

  // Get user's access requests
  async getUserAccessRequests(userId: string): Promise<RecordingAccess[]> {
    if (!this.isFirebaseAvailable()) {
      return [];
    }

    try {
      const q = query(
        collection(db, this.accessRequestsCollection),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        ...doc.data()
      } as RecordingAccess));
    } catch (error) {
      console.error('Error fetching user access requests:', error);
      return [];
    }
  }

  // Approve/Deny access request
  async updateAccessRequest(
    userId: string, 
    recordingId: string, 
    status: 'approved' | 'denied',
    approvedBy: string
  ): Promise<boolean> {
    if (!this.isFirebaseAvailable()) {
      return false;
    }

    try {
      const accessId = `${userId}_${recordingId}`;
      const docRef = doc(db, this.accessRequestsCollection, accessId);
      
      const updateData: any = {
        status,
        approvedBy,
        approvedAt: serverTimestamp()
      };

      await updateDoc(docRef, updateData);
      return true;
    } catch (error) {
      console.error('Error updating access request:', error);
      return false;
    }
  }

  // Get user's approved recordings
  async getUserApprovedRecordings(userId: string): Promise<Recording[]> {
    if (!this.isFirebaseAvailable()) {
      return [];
    }

    try {
      const q = query(
        collection(db, this.accessRequestsCollection),
        where('userId', '==', userId),
        where('status', '==', 'approved')
      );
      const querySnapshot = await getDocs(q);
      const approvedRecordingIds = querySnapshot.docs.map(doc => doc.data().recordingId);
      
      if (approvedRecordingIds.length === 0) {
        return [];
      }

      // Fetch recording details
      const recordings: Recording[] = [];
      for (const recordingId of approvedRecordingIds) {
        const recording = await this.getRecordingById(recordingId);
        if (recording) {
          recordings.push(recording);
        }
      }
      
      return recordings;
    } catch (error) {
      console.error('Error fetching user approved recordings:', error);
      return [];
    }
  }

  // Update user progress
  async updateUserProgress(
    userId: string,
    recordingId: string,
    progress: number,
    watchedDuration: number,
    totalDuration: number
  ): Promise<boolean> {
    if (!this.isFirebaseAvailable()) {
      return false;
    }

    try {
      const progressId = `${userId}_${recordingId}`;
      const docRef = doc(db, this.userProgressCollection, progressId);
      
      const progressData: UserRecordingProgress = {
        userId,
        recordingId,
        progress: Math.min(100, Math.max(0, progress)),
        lastWatchedAt: serverTimestamp(),
        completed: progress >= 90, // Consider 90% as completed
        watchedDuration,
        totalDuration
      };

      await setDoc(docRef, progressData, { merge: true });
      return true;
    } catch (error) {
      console.error('Error updating progress:', error);
      return false;
    }
  }

  // Get user progress for a recording
  async getUserProgress(userId: string, recordingId: string): Promise<UserRecordingProgress | null> {
    if (!this.isFirebaseAvailable()) {
      return null;
    }

    try {
      const progressId = `${userId}_${recordingId}`;
      const docRef = doc(db, this.userProgressCollection, progressId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as UserRecordingProgress;
      }
      return null;
    } catch (error) {
      console.error('Error fetching progress:', error);
      return null;
    }
  }

  // Get all user progress
  async getAllUserProgress(userId: string): Promise<UserRecordingProgress[]> {
    if (!this.isFirebaseAvailable()) {
      return [];
    }

    try {
      const q = query(
        collection(db, this.userProgressCollection),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as UserRecordingProgress);
    } catch (error) {
      console.error('Error fetching all progress:', error);
      return [];
    }
  }

  // ========== SECTION ACCESS METHODS ==========

  // Request access to a section
  async requestSectionAccess(userId: string, section: string): Promise<boolean> {
    if (!this.isFirebaseAvailable()) {
      return false;
    }

    try {
      const accessId = `${userId}_${section}`;
      const docRef = doc(db, this.sectionAccessCollection, accessId);
      
      // Check if request already exists
      const existingDoc = await getDoc(docRef);
      if (existingDoc.exists()) {
        return false; // Request already exists
      }

      await setDoc(docRef, {
        userId,
        section,
        status: 'pending',
        requestedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error requesting section access:', error);
      return false;
    }
  }

  // Get all section access requests
  async getAllSectionAccessRequests(status?: 'pending' | 'approved' | 'denied'): Promise<SectionAccess[]> {
    if (!this.isFirebaseAvailable()) {
      return [];
    }

    try {
      let q;
      if (status) {
        q = query(collection(db, this.sectionAccessCollection), where('status', '==', status));
      } else {
        q = query(collection(db, this.sectionAccessCollection));
      }
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        ...doc.data()
      } as SectionAccess));
    } catch (error) {
      console.error('Error fetching section access requests:', error);
      return [];
    }
  }

  // Get user's section access requests
  async getUserSectionAccessRequests(userId: string): Promise<SectionAccess[]> {
    if (!this.isFirebaseAvailable()) {
      return [];
    }

    try {
      const q = query(
        collection(db, this.sectionAccessCollection),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        ...doc.data()
      } as SectionAccess));
    } catch (error) {
      console.error('Error fetching user section access requests:', error);
      return [];
    }
  }

  // Approve/Deny section access request
  async updateSectionAccessRequest(
    userId: string, 
    section: string, 
    status: 'approved' | 'denied',
    approvedBy: string
  ): Promise<boolean> {
    if (!this.isFirebaseAvailable()) {
      return false;
    }

    try {
      const accessId = `${userId}_${section}`;
      const docRef = doc(db, this.sectionAccessCollection, accessId);
      
      const updateData: any = {
        status,
        approvedBy,
        approvedAt: serverTimestamp()
      };

      await updateDoc(docRef, updateData);
      return true;
    } catch (error) {
      console.error('Error updating section access request:', error);
      return false;
    }
  }

  // Check if user has access to a section
  async hasSectionAccess(userId: string, section: string): Promise<boolean> {
    if (!this.isFirebaseAvailable()) {
      return false;
    }

    try {
      const accessId = `${userId}_${section}`;
      const docRef = doc(db, this.sectionAccessCollection, accessId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as SectionAccess;
        return data.status === 'approved';
      }
      return false;
    } catch (error) {
      console.error('Error checking section access:', error);
      return false;
    }
  }

  // Get user's approved sections
  async getUserApprovedSections(userId: string): Promise<string[]> {
    if (!this.isFirebaseAvailable()) {
      return [];
    }

    try {
      const q = query(
        collection(db, this.sectionAccessCollection),
        where('userId', '==', userId),
        where('status', '==', 'approved')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data().section as string);
    } catch (error) {
      console.error('Error fetching user approved sections:', error);
      return [];
    }
  }

  // Check if user has access to a recording (via section access)
  async hasRecordingAccess(userId: string, recording: Recording): Promise<boolean> {
    if (!recording.section) {
      return false; // Recording must have a section
    }
    return this.hasSectionAccess(userId, recording.section);
  }

  // ========== SECTION MANAGEMENT METHODS ==========

  // Get all sections (with metadata)
  async getAllSectionsWithMetadata(): Promise<Section[]> {
    if (!this.isFirebaseAvailable()) {
      return [];
    }

    try {
      const q = query(
        collection(db, this.sectionsCollection),
        where('isActive', '==', true)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as Section))
        .sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error('Error fetching sections with metadata:', error);
      return [];
    }
  }

  // Get section by ID
  async getSectionById(sectionId: string): Promise<Section | null> {
    if (!this.isFirebaseAvailable()) {
      return null;
    }

    try {
      const docRef = doc(db, this.sectionsCollection, sectionId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Section;
      }
      return null;
    } catch (error) {
      console.error('Error fetching section:', error);
      return null;
    }
  }

  // Create a new section
  async createSection(section: Omit<Section, 'id' | 'createdAt'>): Promise<string | null> {
    if (!this.isFirebaseAvailable()) {
      return null;
    }

    try {
      const docRef = doc(collection(db, this.sectionsCollection));
      await setDoc(docRef, {
        ...section,
        createdAt: serverTimestamp(),
        isActive: true
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating section:', error);
      return null;
    }
  }

  // Update a section
  async updateSection(sectionId: string, updates: Partial<Omit<Section, 'id' | 'createdAt'>>): Promise<boolean> {
    if (!this.isFirebaseAvailable()) {
      return false;
    }

    try {
      const docRef = doc(db, this.sectionsCollection, sectionId);
      await updateDoc(docRef, updates);
      return true;
    } catch (error) {
      console.error('Error updating section:', error);
      return false;
    }
  }

  // Delete a section (soft delete)
  async deleteSection(sectionId: string): Promise<boolean> {
    if (!this.isFirebaseAvailable()) {
      return false;
    }

    try {
      const docRef = doc(db, this.sectionsCollection, sectionId);
      await updateDoc(docRef, { isActive: false });
      return true;
    } catch (error) {
      console.error('Error deleting section:', error);
      return false;
    }
  }
}

export const recordingsService = new RecordingsService();
