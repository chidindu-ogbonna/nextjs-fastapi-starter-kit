import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

export const getFirebaseAdminAuth = () => {
  const app = getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
        })
      });
  return getAuth(app);
};
