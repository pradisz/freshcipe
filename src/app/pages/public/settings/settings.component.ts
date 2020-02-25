import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../../@core/services/auth.service';
import { UploadService } from '../../../@core/services/upload.service';
import { debounceTime, take, map } from 'rxjs/operators';
import { User } from '../../../@core/models/user';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';

export class CustomValidator {
  static username(afs: AngularFirestore, auth: AuthService) {
    return (control: AbstractControl) => {
      const username = control.value.toLowerCase();

      let authUser;
      auth.user$.pipe(take(1)).subscribe(user => (authUser = user));

      return afs
        .collection('users', ref => ref.where('username', '==', username))
        .valueChanges()
        .pipe(
          debounceTime(500),
          take(1),
          map(arr =>
            arr.length && username !== authUser.username
              ? { usernameAvailable: false }
              : true
          )
        );
    };
  }
}

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: User;
  profileForm: FormGroup;
  photoURL: string | ArrayBuffer;
  fileToUpload: FileList;
  loading = false;
  constructor(
    private titleService: Title,
    private router: Router,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    public auth: AuthService,
    private uploadService: UploadService,
    private cd: ChangeDetectorRef,
    private toastrService: NbToastrService
  ) {
    this.titleService.setTitle('Settings | Freshcipe');
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      username: [
        '',
        [Validators.required],
        CustomValidator.username(this.afs, this.auth)
      ],
      displayName: ['', [Validators.required]],
      location: [''],
      bio: ['']
    });

    this.auth.user$.pipe(take(1)).subscribe(authUser => {
      this.user = authUser;
      this.profileForm.patchValue({
        username: authUser.username.toLowerCase(),
        displayName: authUser.displayName,
        location: authUser.location,
        bio: authUser.bio
      });
      this.profileForm.valueChanges.subscribe(_ =>
        this.profileForm.markAsTouched()
      );
    });
  }

  get username() {
    return this.profileForm.get('username');
  }

  get displayName() {
    return this.profileForm.get('displayName');
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      const file = event.target.files[0];

      this.fileToUpload = file;

      reader.onload = _ => {
        this.photoURL = reader.result;

        this.profileForm.markAsTouched();

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  async onSubmit() {
    this.loading = true;

    // upload file
    if (this.fileToUpload) {
      try {
        await this.uploadService.savePhotoProfile(this.fileToUpload);
      } catch (err) {
        this.toastrService.success('', err, {
          hasIcon: false,
          position: NbGlobalPhysicalPosition.BOTTOM_LEFT
        });
      }
    }

    // format username
    const trimmedUsername = this.username.value.replace(/\s+/g, '');
    const cleanedUsername = trimmedUsername.toLowerCase();
    this.username.setValue(cleanedUsername);

    // update profile
    try {
      await this.auth.updateProfile(this.user, this.profileForm.value);
      this.loading = false;
      this.router.navigate(['/user', this.username.value]);
      this.toastrService.success('', 'Profile has been successfully updated', {
        hasIcon: false,
        position: NbGlobalPhysicalPosition.BOTTOM_LEFT
      });
    } catch (err) {
      this.toastrService.success('', err, {
        hasIcon: false,
        position: NbGlobalPhysicalPosition.BOTTOM_LEFT
      });
    }
  }
}
