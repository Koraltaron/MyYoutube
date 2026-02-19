import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.develop';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly APIUrl = environment.APIUrl;
  private readonly APIKey = environment.youtubeAPIKey

  getVideos(categoryId?: string, maxResults: number = 10, regionCode: string = 'FR'): Observable<any> {
    let params = new HttpParams()
      .set('part', 'snippet,statistics')
      .set('chart', 'mostPopular')
      .set('maxResults', maxResults.toString())
      .set('regionCode', regionCode)
      .set('key', this.APIKey);
    if(categoryId){
      params = params.set('videoCategoryId', categoryId);
    }
    return this.http.get(`${this.APIUrl}/videos`, { params })
  }

}
