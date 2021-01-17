import admin from 'firebase-admin';

admin.initializeApp();

export const firebaseDb: FirebaseFirestore.Firestore =
    admin.firestore();
