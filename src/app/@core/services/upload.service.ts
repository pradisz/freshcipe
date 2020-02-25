import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class UploadService {
  user: User;
  downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage, private auth: AuthService) {
    this.auth.user$.pipe(take(1)).subscribe(authUser => {
      this.user = authUser;
    });
  }

  async savePhotoProfile(payload) {
    // get the File
    const file = payload;

    // the storage path
    const path = `users/${new Date().getTime()}_${file.name}`;

    // save the file to storage
    return this.storage
      .ref(path)
      .put(file)
      .then(response => {
        // get the files download url
        response.ref.getDownloadURL().then(async newPhotoURL => {
          // update the user photo profile
          return await this.auth.updateProfile(this.user, {
            photoURL: newPhotoURL
          });
        });
      });
  }

  async saveCoverPost(payload) {
    // get the File
    const file = payload;

    // the storage path
    const path = `posts/${new Date().getTime()}_${file.name}`;

    try {
      // save the file to storage
      return await this.storage.ref(path).put(file);
    } catch (err) {
      throw err;
    }
  }
}
