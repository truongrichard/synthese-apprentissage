import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from '../models/workout.model';

const baseUrl = 'http://localhost:8080/workouts';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Workout[]> {
    return this.http.get<Workout[]>(baseUrl + "/getAll");
  }

  get(id: any): Observable<Workout> {
    return this.http.get(baseUrl + "/get/" + id);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl + "/create", data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(baseUrl + "/delete/" + id);
  }

  findByDate(date: any): Observable<Workout[]> {
    return this.http.get<Workout[]>(baseUrl + "/getAll?date=" + date);
  }
}
