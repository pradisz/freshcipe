export interface Roles {
  admin?: boolean;
  moderator?: boolean;
  subscriber?: boolean;
}

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName: string;
  username: string;
  roles: Roles;
  location?: string;
  bio?: string;
}
