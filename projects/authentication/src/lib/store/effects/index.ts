import { SessionEffects } from './session';
import { UserEffects } from './user';
import { LogoutEffects } from './logout';

export const ForgerockAuthenticationRootEffects = [SessionEffects, UserEffects, LogoutEffects];
