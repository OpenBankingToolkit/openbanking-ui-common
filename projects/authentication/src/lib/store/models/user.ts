export interface IUser {
  username: string;
  realm: string;
  mail: string[];
  givenName: string[];
  objectClass: string[];
  dn: string[];
  cn: string[];
  createTimestamp: string[];
  modifyTimestamp: string[];
  uid: string[];
  universalid: string[];
  pushDeviceProfiles: string[];
  inetUserStatus: string[];
  sn: string[];
  roles: string[];
  directoryID: string;
}

export interface IUserState {
  isFetching: boolean;
  isUpdateSubmitting: boolean;
  isPasswordSubmitting: boolean;
  user: null | IUser;
}
