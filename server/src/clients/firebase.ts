import admin from 'firebase-admin';
admin.initializeApp();

export const firebaseDb = admin.firestore();