import {Injectable} from '@angular/core';
import {ApiConnectorService} from "./api-connector.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  constructor(private apiConnector: ApiConnectorService) {
  }

  fetchReferralsData(): Observable<any> {
    return this.apiConnector.fetchReferralsData().pipe(
      map((candidates) => {

        const referralSources = candidates.map(candidate => candidate.referred_from)
          .filter((value, index, self) => self.indexOf(value) === index);
        const referralsMap = new Map();

        referralSources.forEach( referralSource => referralsMap.set(referralSource, 0));


        candidates.forEach(
          (c) => {
            referralsMap.set(c.referred_from, referralsMap.get(c.referred_from) + 1);
          });

        return referralsMap;
      })
    );
  }


}
