import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageExercise } from '../models/imageExercise.model';

const baseUrl = 'http://localhost:8080/image_exercise';

@Injectable({
  providedIn: 'root'
})
export class ImageExerciseService {

  constructor(private http: HttpClient) { }

  get(id: any): Observable<ImageExercise> {
    return this.http.get(baseUrl + "/get/" + id);
  }

  create(id: any, data: any): Observable<any> {
    return this.http.post(baseUrl + "/upload/" + id, data);
  }

  delete(id: any): Observable<ImageExercise> {
    return this.http.delete(baseUrl + "/delete/" + id);
  }
}
