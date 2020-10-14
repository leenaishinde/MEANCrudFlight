import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';

import { map } from 'rxjs/operators';

import { Flight } from './flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  selectedFlight: Flight;
  flights: Flight[];

   readonly baseURL = 'http://localhost:3000/flights';

  constructor(private http: HttpClient) { }

  postFlight(flt: Flight) {
    return this.http.post(this.baseURL, flt);
  }

  getFlightList() {
    return this.http.get(this.baseURL);
  }

  putFlight(flt: Flight) {
    return this.http.put(this.baseURL + `/${flt._id}`, flt);
  }

  deleteFlight(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
