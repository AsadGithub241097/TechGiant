# TechGiant

Marketing and LMS web app for TechGiant.

## Setup

```bash
npm install
cp .env.example .env   # add Firebase and other VITE_* values
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run test` | Run Vitest tests |
| `npm run firebase:deploy-rules` | Deploy Firestore security rules |
| `npm run firebase:deploy-storage` | Deploy Storage security rules |

## Firebase

- Copy `.env.example` → `.env` and fill in `VITE_FIREBASE_*` values.
- Deploy rules: `npm run firebase:deploy-rules` and `npm run firebase:deploy-storage` (after `firebase login`).

## Media (Firebase Storage — replaces AWS S3)

Images and videos are served from **Firebase Storage**, not the repo. URLs are built in `src/utils/mediaUrl.ts` from `VITE_FIREBASE_STORAGE_BUCKET`.

### One-time migration from S3

1. **Enable Storage** in [Firebase Console](https://console.firebase.google.com/) → **Storage** → Get started.
2. **Deploy storage rules** (public read for `assets/`):
   ```bash
   npx firebase-tools login
   npm run firebase:deploy-storage
   ```
3. **Upload files** from your S3 bucket into Storage folder `assets/` (keep the same filenames as in `src/constants/mediaUrls.ts`).
4. **Verify** in the browser — open any image URL, e.g.:
   `https://firebasestorage.googleapis.com/v0/b/YOUR_BUCKET/o/assets%2FTGpng.png?alt=media`
5. **Cancel AWS S3** once the site loads all media correctly.

### Firebase free tier (Spark)

- ~5 GB storage, ~1 GB/day downloads — enough for images; monitor traffic if you serve large videos to many users.
- Upgrade to Blaze (pay-as-you-go) only if you exceed free limits.

### File list to upload under `assets/`

Videos: `Prayas.mp4`, `falahzar.mp4`, `forestHearbs.mp4`, `influx1.mp4`  
Images: `TGpng.png`, `logo.svg`, `website.png`, `liquid.jpg`, `ecommerce1.png`, `patchmanagement.jpg`, `adaptive.png`, `vaptBG.png`, `opratiobcenter.jpg`, `securitytesting.jpg`, `ResponseAndForensics.jpg`, `detectionandresponse.jpg`, `wave.jpg`, `laptopScreen.png`, `Developer activity.png`, partner logos, and SVG icons (see `mediaUrls.ts`).
