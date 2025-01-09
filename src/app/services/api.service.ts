import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CricketResponse } from '../models/cricket.response';
import { application } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  http = inject(HttpClient);
  apiUrl = 'https://ai-bot-r0h5.onrender.com/api/v1/chat';

  getRandomResponse(prompt: string): Observable<string> {
    return this.http.get(`${this.apiUrl}?inputText=${prompt}`,
      { responseType: 'text' }
    );
  }

  getCricketResponse(prompt:string):Observable<CricketResponse> {
    return this.http.get<CricketResponse>(`${this.apiUrl}/cricket-bot?inputText=${prompt}`);
  }

  getImagesResponse(imageDesc: string):Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/images?description=${imageDesc}`);
  }

}
