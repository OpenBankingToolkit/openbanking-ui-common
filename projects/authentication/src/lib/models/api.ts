interface AuthFormCallback {
  type: string;
  output: { name: string; value: string }[];
  input: { name: string; value: string }[];
}

export module ApiReponses {
  export interface AuthLoginResponse {
    authId?: string;
    template?: string;
    code?: string;
    state?: string;
    stage?:
      | 'DataStore1'
      | 'AuthenticatorPush3'
      | 'AuthenticatorPush4'
      | 'AuthenticatorPush5'
      | 'AuthenticatorPushRegistration2'
      | 'AuthenticatorPushRegistration3'
      | 'AuthenticatorPushRegistration4'
      | 'AuthenticatorPushRegistration5';
    header?: string;
    callbacks?: AuthFormCallback[];
  }
}

export module ApiRequest {
  export interface IUserUpdateBody {
    givenName: string;
    mail: string;
    sn: string;
    telephoneNumber: string;
  }
  export interface IUserPasswordUpdateBody {
    currentpassword: string;
    username: string;
    userpassword: string;
  }
}

export interface IOauth2AuthorizeRestReponse {
  stage: 'CONSENT' | 'AUTHENTICATION';
  uri: string;
}

export interface IApiError {
  ErrorCode: string;
  Message: string;
  Url: string;
}

export interface IAspspError {
  Code: string;
  Id: string;
  Message: string;
  Errors: IApiError[];
}
