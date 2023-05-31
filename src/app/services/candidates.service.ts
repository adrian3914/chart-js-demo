import {Injectable} from '@angular/core';
import {ApiConnectorService} from "./api-connector.service";
import {map, Observable} from "rxjs";
import {Candidate} from "../shared/models/candidate.model";
import {FILTER_BY} from "../constants/filter-criteria";


@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  constructor(private apiConnector: ApiConnectorService) {
  }

  fetchReferralsData(filterBy: string, value?: number): Observable<any> {
    return this.apiConnector.fetchReferralsData().pipe(
      map((candidates) => {
        let candidatesFiltered = [];

        candidatesFiltered = this.filterByDate(candidates, filterBy, value);

        const referralSources = candidatesFiltered.map(candidate => candidate.referred_from)
          .filter((value, index, self) => self.indexOf(value) === index);

        const referralsMap = new Map();
        referralSources.forEach(referralSource => referralsMap.set(referralSource, 0));

        candidatesFiltered.forEach(
          (c) => {
            referralsMap.set(c.referred_from, referralsMap.get(c.referred_from) + 1);
          });

        return referralsMap;
      })
    );
  }

  private filterByDate(candidates: Candidate[], filterBy: string, value: number | undefined) {
    let filteredCandidates = [];
    switch (filterBy) {
      case FILTER_BY.month: {
        filteredCandidates = candidates.filter((c, i, candidates) => {
          let dateSegments = c.start_date.toString().split('.');
          let month = +dateSegments[0];
          return month == value;
        });
        break;
      }
      case FILTER_BY.year: {
        filteredCandidates = candidates.filter((c, i, candidates) => {
          let dateSegments = c.start_date.toString().split('.');
          let year = +dateSegments[2];
          console.log("Year: " + year + " Value: " + value)
          return year == value;
        });
        break;
      }

      default:
        return candidates
    }

    return filteredCandidates;
  }

  fetchCandidateStartDates(): Observable<Date[]> {
    return this.apiConnector.fetchCandidateStartDates().pipe(
      map(
        candidates => {
           return candidates.map( (c) => c.start_date)
        }
      )
    );
  }
}

