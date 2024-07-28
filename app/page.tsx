'use client'
import { useEffect } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

export default function Home() {
  useEffect(() => {
    const initializeFirebaseMessaging = async () => {
      try {
        const firebaseConfig = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        };

        const app = initializeApp(firebaseConfig)
        const messaging = getMessaging(app)
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          });
          console.log('FCM Token:', token);
        } else {
          console.error('Notification permission denied.');
        }
      } catch (error) {
        console.error('Error getting FCM token:', error);
      }
    };

    initializeFirebaseMessaging();
  }, []);

  return <div>Welcome to the Next.js app with FCM!</div>;
}
