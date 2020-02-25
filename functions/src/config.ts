import * as admin from 'firebase-admin';
admin.initializeApp();

export const firebase = admin;
export const db = admin.firestore();
