import * as functions from 'firebase-functions';
import { firebase, db } from '../config';

export const postOnCreate = functions.firestore
  .document('recipes/{recipeId}')
  .onCreate(async (snap, context) => {
    const docRef = db.collection('recipes').doc(snap.id);
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    await docRef.set(
      {
        ...snap.data,
        recipeId: snap.id,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      { merge: true }
    );

    // recipe stats
    const statsRef = db.collection('stats').doc('posts');
    const increment = firebase.firestore.FieldValue.increment(1);

    const batch = db.batch();
    batch.set(statsRef, { postCount: increment }, { merge: true });
    return batch.commit();
  });
