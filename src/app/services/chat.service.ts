import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http :HttpClient) { }

  postMessage(message: string):Observable<any> {
    let body = {
      message: message
    }
    return this.http.post(environment.apiUrl+'/chat', body);
  }
}
