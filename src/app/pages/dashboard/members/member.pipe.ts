import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../../@core/models/user';

@Pipe({ name: 'memberAccess' })
export class MemberPipe implements PipeTransform {
  transform(member: User): string {
    if (
      member.roles.admin &&
      member.roles.moderator &&
      member.roles.subscriber
    ) {
      return 'Admin';
    }
    if (
      !member.roles.admin &&
      member.roles.moderator &&
      member.roles.subscriber
    ) {
      return 'Moderator';
    }
    if (
      !member.roles.admin &&
      !member.roles.moderator &&
      member.roles.subscriber
    ) {
      return 'Subscriber';
    }
  }
}
