import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class MemberService {
  constructor(private afs: AngularFirestore) {}

  getMembersList() {
    return this.afs
      .collection('users', ref => ref.orderBy('joined', 'asc'))
      .valueChanges();
  }

  // getTotalMembers() {
  //   return this.afs.collection('users', ref => ref.orderBy("memberCount", "asc")).valueChanges();
  // }
}
