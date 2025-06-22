import { environment } from '../../environments/environment';

export const API = {
  LOGIN: `${environment.apiUrl}/auth/login`,
  GADGETS: `${environment.apiUrl}/gadgets`,
};
