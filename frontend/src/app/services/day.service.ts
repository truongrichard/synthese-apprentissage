import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Day } from '../models/day.model';

const baseUrl = 'http://localhost:8080/days';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Day[]> {
    return this.http.get<Day[]>(baseUrl + "/getAll");
  }

  get(id: any): Observable<Day> {
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

  findByTitle(date: any): Observable<Day[]> {
    return this.http.get<Day[]>(baseUrl + "/getAll?date=" + date);
  }
}
