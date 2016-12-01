import { Oauth2Service } from './oauth2.service';


export * from './oauth2.service';
export * from './oauth2.access-token';
export * from './oauth2.id-token';
export * from './oauth2.oidc-config';
export * from './oauth2.auth-http';

export const OAUTH2_PROVIDERS: any[] = [
    Oauth2Service
] ;
