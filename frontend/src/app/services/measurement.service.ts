import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Measurement } from '../models/measurement.model';

const baseUrl = 'http://localhost:8080/measurements';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Measurement[]> {
    return this.http.get<Measurement[]>(baseUrl + "/getAll");
  }

  get(id: any): Observable<Measurement> {
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

  findByDate(date: any): Observable<Measurement[]> {
    return this.http.get<Measurement[]>(baseUrl + "/getAll?date=" + date);
  }

  findByCategory(category: any): Observable<Measurement[]> {
    return this.http.get<Measurement[]>(baseUrl + "/get/" + category);
  }
}
