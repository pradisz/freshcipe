import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable()
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    // get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          JSON.parse(localStorage.getItem('user'));
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async facebookSignin() {
    // try {
    //   const provider = new firebase.auth.FacebookAuthProvider();
    //   // const credential = await this.afAuth.auth.signInWithPopup(provider);
    //   await this.afAuth.auth.signInWithPopup(provider);

    //   // return this.setUserData(credential.user);
    // } catch (e) {
    //   throw e.message;
    // }
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  async googleSignin() {
    // try {
    //   const provider = new firebase.auth.GoogleAuthProvider();
    //   // const credential = await this.afAuth.auth.signInWithPopup(provider);
    //   await this.afAuth.auth.signInWithPopup(provider);

    //   // return this.setUserData(credential.user);
    // } catch (e) {
    //   throw e.message;
    // }
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  private async socialSignIn(provider) {
    try {
      await this.afAuth.auth.signInWithPopup(provider);
    } catch (e) {
      throw e.message;
    }
  }

  //// Email/Password Auth ////

  async emailSignUp(email: string, password: string) {
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    } catch (e) {
      throw e.message;
    }
  }

  async emailLogin(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      throw e.message;
    }
  }

  // private setUserData(user) {
  //   // sets user data to firestore on login
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `users/${user.uid}`,
  //   );

  //   // set default username by user email
  //   const emailName = user.email.replace(/@[^@]+$/, '');
  //   const setUsername = emailName.replace(/\./g, '');

  //   // set user data for new user
  //   this.afs.firestore
  //     .doc(`/users/${user.uid}`)
  //     .get()
  //     .then(userSnapshot => {
  //       if (!userSnapshot.exists) {
  //         const data: User = {
  //           uid: user.uid,
  //           email: user.email,
  //           photoURL: user.photoURL,
  //           displayName: user.displayName,
  //           username: setUsername,
  //           roles: {
  //             admin: true,
  //             moderator: true,
  //             subscriber: true,
  //           },
  //           location: null,
  //           bio: null,
  //         };

  //         return userRef.set(data, { merge: true });
  //       }
  //     });
  // }

  getProfile(username: string) {
    return this.afs
      .collection('users', ref => ref.where('username', '==', username))
      .valueChanges();
  }

  async updateProfile(user: User, data: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    try {
      await userRef.set(data, { merge: true });
    } catch (err) {
      throw err;
    }
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/auth/login']);
  }

  ///// Role-based Authorization //////

  roleIsAdmin(user: User): boolean {
    if (user.roles.admin && user.roles.moderator && user.roles.subscriber) {
      return true;
    }
  }

  canRead(user: User): boolean {
    const allowed = ['moderator', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['moderator'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['moderator'];
    return this.checkAuthorization(user, allowed);
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }
}
