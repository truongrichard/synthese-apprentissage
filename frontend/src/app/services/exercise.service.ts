import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise.model';

const baseUrl = 'http://localhost:8080/exercises';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(baseUrl + "/getAll");
  }

  get(id: any): Observable<Exercise> {
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

  findByTitle(title: any): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(baseUrl + "/getAll?title=" + title);
  }
}
