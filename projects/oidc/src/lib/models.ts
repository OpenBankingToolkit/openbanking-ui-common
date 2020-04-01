export interface IOIDCUser {
  id: string;
  organisationId: string;
  authorities: string[];
  directoryID?: string;
}

export interface IOIDCUserState {
  isFetching: boolean;
  user: null | IOIDCUser;
}

export interface IOIDCState {
  user: IOIDCUserState;
}

export interface IOIDCModuleState {
  oidc: IOIDCState;
}
