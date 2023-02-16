declare namespace Express {
    import { IAuthToken } from './services/authentication/jwt';
    export interface Request {
        authToken: IAuthToken;
    }
}
