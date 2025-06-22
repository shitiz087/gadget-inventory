import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  private get headers() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: token ? `Bearer ${token}` : '',
      }),
    };
  }

  get<T>(url: string) {
    return this.http.get<T>(url, this.headers);
  }

  post<T>(url: string, body: any) {
    return this.http.post<T>(url, body, this.headers);
  }

  put<T>(url: string, body: any) {
    return this.http.put<T>(url, body, this.headers);
  }

  delete<T>(url: string) {
    return this.http.delete<T>(url, this.headers);
  }
}
