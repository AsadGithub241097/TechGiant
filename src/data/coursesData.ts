export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  students: number;
  price: number;
  thumbnail: string;
  videoId: string; // YouTube video ID
  category: 'qa' | 'development' | 'marketing';
  tags: string[];
  objectives: string[];
  requirements: string[];
  certificateIncluded: boolean;
}

export const coursesData: Course[] = [
  // QA Testing Courses
  {
    id: 'qa-1',
    title: 'Manual Testing Fundamentals',
    description: 'Learn the basics of manual testing, test case writing, and quality assurance principles.',
    instructor: 'Sarah Johnson',
    duration: '8 hours',
    level: 'Beginner',
    rating: 4.7,
    students: 1250,
    price: 99,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoId: 'dQw4w9WgXcQ', // Sample YouTube video ID
    category: 'qa',
    tags: ['Manual Testing', 'Test Cases', 'QA Fundamentals'],
    objectives: [
      'Understand software testing principles',
      'Write effective test cases',
      'Perform manual testing procedures',
      'Identify and report bugs effectively'
    ],
    requirements: ['Basic computer skills', 'No prior testing experience needed'],
    certificateIncluded: true
  },
  {
    id: 'qa-2',
    title: 'Selenium Automation Testing',
    description: 'Master Selenium WebDriver for automated web application testing with hands-on projects.',
    instructor: 'Mike Chen',
    duration: '12 hours',
    level: 'Intermediate',
    rating: 4.8,
    students: 890,
    price: 149,
    thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
    videoId: '9bZkp7q19f0',
    category: 'qa',
    tags: ['Selenium', 'Automation', 'WebDriver'],
    objectives: [
      'Set up Selenium WebDriver',
      'Create automated test scripts',
      'Implement Page Object Model',
      'Generate test reports'
    ],
    requirements: ['Basic Java knowledge', 'Manual testing experience'],
    certificateIncluded: true
  },
  {
    id: 'qa-3',
    title: 'API Testing with Postman',
    description: 'Comprehensive guide to API testing using Postman and REST Assured.',
    instructor: 'Emily Rodriguez',
    duration: '6 hours',
    level: 'Intermediate',
    rating: 4.6,
    students: 720,
    price: 79,
    thumbnail: 'https://img.youtube.com/vi/VywxIQ2ZXw4/maxresdefault.jpg',
    videoId: 'VywxIQ2ZXw4',
    category: 'qa',
    tags: ['API Testing', 'Postman', 'REST API'],
    objectives: [
      'Understand API testing concepts',
      'Use Postman for API testing',
      'Validate API responses',
      'Automate API test collections'
    ],
    requirements: ['Basic understanding of web services', 'HTTP protocol knowledge'],
    certificateIncluded: true
  },
  {
    id: 'qa-4',
    title: 'Performance Testing with JMeter',
    description: 'Learn performance testing techniques using Apache JMeter for web applications.',
    instructor: 'David Wilson',
    duration: '10 hours',
    level: 'Advanced',
    rating: 4.9,
    students: 560,
    price: 199,
    thumbnail: 'https://img.youtube.com/vi/M-iAXz8vs48/maxresdefault.jpg',
    videoId: 'M-iAXz8vs48',
    category: 'qa',
    tags: ['Performance Testing', 'JMeter', 'Load Testing'],
    objectives: [
      'Design performance test plans',
      'Execute load and stress tests',
      'Analyze performance metrics',
      'Optimize application performance'
    ],
    requirements: ['Testing experience', 'Basic understanding of system architecture'],
    certificateIncluded: true
  },

  // Development Courses
  {
    id: 'dev-1',
    title: 'React.js Complete Course',
    description: 'Build modern web applications with React.js, hooks, and state management.',
    instructor: 'Alex Thompson',
    duration: '15 hours',
    level: 'Intermediate',
    rating: 4.9,
    students: 2100,
    price: 159,
    thumbnail: 'https://img.youtube.com/vi/Ke90Tje7VS0/maxresdefault.jpg',
    videoId: 'Ke90Tje7VS0',
    category: 'development',
    tags: ['React', 'JavaScript', 'Frontend'],
    objectives: [
      'Build React components',
      'Manage application state',
      'Handle routing and navigation',
      'Deploy React applications'
    ],
    requirements: ['JavaScript fundamentals', 'HTML/CSS knowledge'],
    certificateIncluded: true
  },
  {
    id: 'dev-2',
    title: 'Node.js Backend Development',
    description: 'Create scalable backend APIs with Node.js, Express, and MongoDB.',
    instructor: 'Maria Garcia',
    duration: '18 hours',
    level: 'Intermediate',
    rating: 4.8,
    students: 1650,
    price: 179,
    thumbnail: 'https://img.youtube.com/vi/fBNz5xF-Kx4/maxresdefault.jpg',
    videoId: 'fBNz5xF-Kx4',
    category: 'development',
    tags: ['Node.js', 'Express', 'Backend', 'MongoDB'],
    objectives: [
      'Build REST APIs with Express',
      'Connect to MongoDB database',
      'Implement authentication',
      'Deploy to cloud platforms'
    ],
    requirements: ['JavaScript basics', 'Understanding of web fundamentals'],
    certificateIncluded: true
  },
  {
    id: 'dev-3',
    title: 'Python for Beginners',
    description: 'Start your programming journey with Python fundamentals and practical projects.',
    instructor: 'James Lee',
    duration: '12 hours',
    level: 'Beginner',
    rating: 4.7,
    students: 3200,
    price: 89,
    thumbnail: 'https://img.youtube.com/vi/_uQrJ0TkZlc/maxresdefault.jpg',
    videoId: '_uQrJ0TkZlc',
    category: 'development',
    tags: ['Python', 'Programming', 'Beginner'],
    objectives: [
      'Learn Python syntax and basics',
      'Work with data structures',
      'Build practical projects',
      'Understand object-oriented programming'
    ],
    requirements: ['No programming experience needed', 'Computer with internet access'],
    certificateIncluded: true
  },
  {
    id: 'dev-4',
    title: 'Full Stack Web Development',
    description: 'Complete full-stack development course covering frontend, backend, and deployment.',
    instructor: 'Robert Kim',
    duration: '25 hours',
    level: 'Advanced',
    rating: 4.9,
    students: 980,
    price: 299,
    thumbnail: 'https://img.youtube.com/vi/nu_pCVPKzTk/maxresdefault.jpg',
    videoId: 'nu_pCVPKzTk',
    category: 'development',
    tags: ['Full Stack', 'React', 'Node.js', 'Database'],
    objectives: [
      'Build complete web applications',
      'Integrate frontend and backend',
      'Implement user authentication',
      'Deploy to production'
    ],
    requirements: ['HTML/CSS/JavaScript knowledge', 'Basic programming experience'],
    certificateIncluded: true
  },

  // Marketing Courses
  {
    id: 'marketing-1',
    title: 'Digital Marketing Fundamentals',
    description: 'Master the basics of digital marketing, SEO, and online advertising strategies.',
    instructor: 'Lisa Brown',
    duration: '10 hours',
    level: 'Beginner',
    rating: 4.6,
    students: 1800,
    price: 119,
    thumbnail: 'https://img.youtube.com/vi/bixR-KIJKYM/maxresdefault.jpg',
    videoId: 'bixR-KIJKYM',
    category: 'marketing',
    tags: ['Digital Marketing', 'SEO', 'Online Advertising'],
    objectives: [
      'Understand digital marketing landscape',
      'Create effective marketing campaigns',
      'Optimize for search engines',
      'Measure marketing ROI'
    ],
    requirements: ['No prior marketing experience needed', 'Basic computer skills'],
    certificateIncluded: true
  },
  {
    id: 'marketing-2',
    title: 'Social Media Marketing Mastery',
    description: 'Build brand presence and engage audiences across all social media platforms.',
    instructor: 'Jennifer Taylor',
    duration: '8 hours',
    level: 'Intermediate',
    rating: 4.7,
    students: 1400,
    price: 99,
    thumbnail: 'https://img.youtube.com/vi/3tmd-ClpJxA/maxresdefault.jpg',
    videoId: '3tmd-ClpJxA',
    category: 'marketing',
    tags: ['Social Media', 'Content Marketing', 'Brand Building'],
    objectives: [
      'Develop social media strategies',
      'Create engaging content',
      'Build community and engagement',
      'Analyze social media metrics'
    ],
    requirements: ['Basic understanding of social media platforms', 'Marketing fundamentals'],
    certificateIncluded: true
  },
  {
    id: 'marketing-3',
    title: 'Google Ads & PPC Campaigns',
    description: 'Create and optimize profitable Google Ads campaigns for maximum ROI.',
    instructor: 'Mark Anderson',
    duration: '12 hours',
    level: 'Intermediate',
    rating: 4.8,
    students: 950,
    price: 149,
    thumbnail: 'https://img.youtube.com/vi/1aBSPn2P9bg/maxresdefault.jpg',
    videoId: '1aBSPn2P9bg',
    category: 'marketing',
    tags: ['Google Ads', 'PPC', 'Paid Advertising'],
    objectives: [
      'Set up Google Ads campaigns',
      'Optimize ad performance',
      'Track conversions and ROI',
      'Scale successful campaigns'
    ],
    requirements: ['Digital marketing basics', 'Google account'],
    certificateIncluded: true
  },
  {
    id: 'marketing-4',
    title: 'Content Marketing Strategy',
    description: 'Develop compelling content strategies that drive engagement and conversions.',
    instructor: 'Amanda White',
    duration: '9 hours',
    level: 'Intermediate',
    rating: 4.7,
    students: 1200,
    price: 129,
    thumbnail: 'https://img.youtube.com/vi/8LOweeqUrKI/maxresdefault.jpg',
    videoId: '8LOweeqUrKI',
    category: 'marketing',
    tags: ['Content Marketing', 'Strategy', 'Storytelling'],
    objectives: [
      'Create content marketing strategies',
      'Develop brand storytelling',
      'Optimize content for conversion',
      'Measure content performance'
    ],
    requirements: ['Basic marketing knowledge', 'Writing skills helpful but not required'],
    certificateIncluded: true
  }
];

export const getCoursesByCategory = (category: 'qa' | 'development' | 'marketing'): Course[] => {
  return coursesData.filter(course => course.category === category);
};

export const getCourseById = (id: string): Course | undefined => {
  return coursesData.find(course => course.id === id);
};

