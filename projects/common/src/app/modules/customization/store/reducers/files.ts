import { Action } from '@ngrx/store';
import _get from 'lodash-es/get';
import { FileUploadChangeObject } from '../../components/file-upload/file-upload.component';

export const reducerKey = 'customFiles';

export interface ICustomizationFilesState {
  logo: FileUploadChangeObject;
  icon: FileUploadChangeObject;
  favicon: FileUploadChangeObject;
}

export enum types {
  ADD_LOGO = 'ADD_LOGO',
  ADD_ICON = 'ADD_ICON',
  ADD_FAVICON = 'ADD_FAVICON'
}

export class AddLogoAction implements Action {
  readonly type = types.ADD_LOGO;
  constructor(public payload: FileUploadChangeObject) {}
}

export class AddIconAction implements Action {
  readonly type = types.ADD_ICON;
  constructor(public payload: FileUploadChangeObject) {}
}

export class AddFaviconAction implements Action {
  readonly type = types.ADD_FAVICON;
  constructor(public payload: FileUploadChangeObject) {}
}

export const initialState: ICustomizationFilesState = {
  logo: null,
  icon: null,
  favicon: null
};

export type ActionsUnion = AddLogoAction | AddIconAction | AddFaviconAction;

export default function customizationFilesReducer(
  state: ICustomizationFilesState = initialState,
  action: ActionsUnion
): ICustomizationFilesState {
  switch (action.type) {
    case types.ADD_LOGO: {
      return { ...state, logo: action.payload };
    }
    case types.ADD_ICON: {
      return { ...state, icon: action.payload };
    }
    case types.ADD_FAVICON: {
      return { ...state, favicon: action.payload };
    }

    default:
      return state;
  }
}

const selectAll = (state: any): string => _get(state, `customization[${reducerKey}]`);
const selectLogo = (state: any): string => _get(state, `customization[${reducerKey}].logo.file`);
const selectIcon = (state: any): string => _get(state, `customization[${reducerKey}].icon.file`);
const selectFavicon = (state: any): string => _get(state, `customization[${reducerKey}].favicon.file`);

export const selectors = {
  selectAll,
  selectLogo,
  selectIcon,
  selectFavicon
};
