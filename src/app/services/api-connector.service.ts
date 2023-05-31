import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Candidate} from "../shared/models/candidate.model";


@Injectable({
  providedIn: 'root'
})
export class ApiConnectorService {

  constructor(private http: HttpClient) { }

  fetchReferralsData(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>('assets/mock-data/candidates.json');
  }

  fetchCandidateStartDates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>('assets/mock-data/candidates.json');
  }
}
