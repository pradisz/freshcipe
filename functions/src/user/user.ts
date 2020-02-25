import * as functions from 'firebase-functions';
import * as _ from 'lodash';
import { firebase, db } from '../config';

export const userOnCreate = functions.auth
  .user()
  .onCreate(async (user, context) => {
    // add date joined
    const ref = db.collection('users').doc(user.uid);

    // cleaned user email
    const userEmail = user.email;
    const emailName = userEmail!.replace(/@[^@]+$/, '');
    const cleanedName = emailName.replace(/\./g, '');

    // set default username
    const uniqueNumber = Math.floor(1000 + Math.random() * 9000);
    const setUsername = cleanedName + uniqueNumber;

    // set default display name
    const setDisplayName = cleanedName;

    // set default photo
    const setPhotoURL =
      'https://firebasestorage.googleapis.com/v0/b/freshcipe-dev.appspot.com/o/users%2Fdefault-avatar-min.jpeg?alt=media&token=7ca663b7-cb87-43de-9fab-d36f2f1dd348';

    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    await ref.set(
      {
        uid: user.uid,
        email: user.email,
        username: setUsername,
        displayName: user.displayName ? user.displayName : setDisplayName,
        photoURL: user.photoURL ? user.photoURL : setPhotoURL,
        roles: {
          admin: false,
          moderator: false,
          subscriber: true
        },
        location: null,
        bio: null,
        joined: timestamp
      },
      { merge: true }
    );

    // user stats
    const statsRef = db.collection('stats').doc('users');
    const increment = firebase.firestore.FieldValue.increment(1);

    const batch = db.batch();
    batch.set(statsRef, { memberCount: increment }, { merge: true });
    return batch.commit();
  });
