import { FormGroup } from '@angular/forms';

export interface IOutput {
  name: string;
  value: any;
}

export interface IInput {
  name: string;
  value: string;
}

export interface ICallback {
  type: string;
  output: IOutput[];
  input: IInput[];
}

export interface ICallbackHandlers {
  authId?: string;
  template?: string;
  stage?: string;
  header?: string;
  callbacks?: ICallback[];
}

export interface Field {
  authId: string;
  config: ICallback;
  group: FormGroup;
}
