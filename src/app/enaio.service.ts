import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class EnaioService {
  constructor(private http: HttpClient) {}

  public searchUsers(searchString) {
    console.log('search users..');
    return this.http
      .get(`https://run.mocky.io/v3/0c87c85c-516a-44e5-ba3d-22d75cc0c7fe?mocky-delay=1100ms&q=${searchString}`)
      .pipe(map((result) => result)
      );
      
  }
}
