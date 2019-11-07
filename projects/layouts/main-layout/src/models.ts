export interface IForgerockMainLayoutNavigationItem {
  id: string;
  type: 'item' | 'group' | 'collapsable';
  translate: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  externalUrl?: boolean;
  openInNewTab?: boolean;
  function?: any;
  badge?: {
    title?: string;
    translate?: string;
    bg?: string;
    fg?: string;
  };
  children?: IForgerockMainLayoutNavigationItem[];
}

export interface IForgerockMainLayoutNavigation extends IForgerockMainLayoutNavigationItem {
  children?: IForgerockMainLayoutNavigationItem[];
}

export interface IForgerockMainLayoutNavigations {
  main: IForgerockMainLayoutNavigation[];
  [key: string]: IForgerockMainLayoutNavigation[];
}

export interface IForgerockMainVerticalConfig {
  style: 'vertical-layout-1';
  width?: number;
  navbar: {
    hidden: boolean;
    folded: boolean;
    position: 'left' | 'right';
    variant?: string;
  };
  toolbar: {
    hidden: boolean;
  };
  footer: {
    hidden: boolean;
    position: 'above' | 'below-static' | 'below-fixed';
  };
}

export interface IForgerockMainHorizontalLayoutConfig {
  style: 'horizontal-layout-1';
  width?: number;
  navbar: {
    hidden: boolean;
    folded: boolean;
    position: 'left' | 'right';
    variant?: string;
  };
  toolbar: {
    hidden: boolean;
  };
  footer: {
    hidden: boolean;
    position: 'above-static' | 'above-fixed';
  };
}

export type IForgerockMainLayoutConfig = IForgerockMainVerticalConfig | IForgerockMainHorizontalLayoutConfig;

export interface IForgerockMainLayoutComponents {
  toolbar: any; // no idea how to represent a component instance
}
