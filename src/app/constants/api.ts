import { environment } from '../../environments/environment';

export const API = {
  LOGIN: `${environment.apiUrl}/auth/login`,
  GADGETS: `${environment.apiUrl}/gadgets`,
  GADGET_BY_ID: (id: string) => `${environment.apiUrl}/gadgets/${id}`,
};
