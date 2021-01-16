import admin from 'firebase-admin';

// type FirestoreFactory = {
//     get(): FirebaseFirestore.Firestore
//     set(db: FirebaseFirestore.Firestore): void
// }

admin.initializeApp();
export const firebaseDb = admin.firestore();

// let db: FirebaseFirestore.Firestore;

// if (process.env.NODE_ENV !== "test") {
//     db = admin.firestore();
// }
// https://claritydev.net/blog/testing-firestore-locally-with-firebase-emulators/

// export const factory: FirestoreFactory = {
//     get: () => { return db },
//     set: (db: FirebaseFirestore.Firestore) => {
//         db = db;
//     }
// }