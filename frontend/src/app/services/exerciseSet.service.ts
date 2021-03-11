import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExerciseSet } from '../models/exerciseSet.model';

const baseUrl = 'http://localhost:8080/exercise_sets';

@Injectable({
  providedIn: 'root'
})
export class ExerciseSetService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ExerciseSet[]> {
    return this.http.get<ExerciseSet[]>(baseUrl + "/getAll");
  }

  get(id: any): Observable<ExerciseSet> {
    return this.http.get(baseUrl + "/get/" + id);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl + "/create", data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(baseUrl + "/delete/" + id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl + "/deleteAll");
  }
}
