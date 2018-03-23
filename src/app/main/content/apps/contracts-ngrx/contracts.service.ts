import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Contract } from './contracts.model';
import { ContractsState } from './store/reducers/contracts.reducer';

import { Observable } from 'rxjs/Observable';
import { error } from 'util';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ContractsService {
  url = 'http://accountmanagement.tf2.inforit.local/api/contracts/ng2';

  constructor(private http: HttpClient) {}

  getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(this.url);
  }

  editContract(contract: Contract): Observable<Contract> {
    return this.http.put<Contract>(this.url + '/update/', {
      contractNumber: contract.contractNumber,
      name: contract.name
    });
  }

  validateName(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(this.url + '/validate/', {
      contractNumber: contract.contractNumber,
      name: contract.name
    });
  }
}
