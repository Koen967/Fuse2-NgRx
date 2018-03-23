import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Contract } from './contracts.model';
import { FuseUtils } from '../../../../core/fuseUtils';
import { reject } from 'q';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ContractsService implements Resolve<any> {
  onContractsChanged: BehaviorSubject<any> = new BehaviorSubject([]);
  onSelectedContractsChanged: BehaviorSubject<any> = new BehaviorSubject([]);
  onUserDataChanged: BehaviorSubject<any> = new BehaviorSubject([]);
  onSearchTextChanged: Subject<any> = new Subject();
  onFilterChanged: Subject<any> = new Subject();

  contracts: Contract[];
  user: any;
  selectedContracts: string[] = [];

  searchText: string;
  filterBy: string;
  
  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {

      Promise.all([this.getContracts(), this.getUserData()]).then(
        ([files]) => {
          this.onSearchTextChanged.subscribe(searchText => {
            this.searchText = searchText;
            this.getContracts();
          });

          this.onFilterChanged.subscribe(filter => {
            this.filterBy = filter;
            this.getContracts();
          });

          resolve();
        },
        reject
      );
    });
  }

  getContracts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('http://accountmanagement.tf2.inforit.local/api/contracts/ng2')
        .subscribe((response: any) => {

          this.contracts = response;

          if (this.searchText && this.searchText !== '') {
            this.contracts = FuseUtils.filterArrayByString(this.contracts, this.searchText)
          }

          this.onContractsChanged.next(this.contracts);
          resolve(this.contracts);
        }, reject);
    });
  }

  getUserData(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this.http.get('api/contacts-user/5725a6802d10e277a0f35724')
                    .subscribe((response: any) => {
                        this.user = response;
                        this.onUserDataChanged.next(this.user);
                        resolve(this.user);
                    }, reject);
            }
        );
    }

    toggleSelectedContract(contractNumber)
    {
        console.log(this.selectedContracts);
        if ( this.selectedContracts.length > 0 )
        {
            const index = this.selectedContracts.indexOf(contractNumber);

            if ( index !== -1 )
            {
                console.log('Splice it up');
                this.selectedContracts.splice(index, 1);

                this.onSelectedContractsChanged.next(this.selectedContracts);
                return;
            }
        }

        console.log('Push it to the limits');
        this.selectedContracts.push(contractNumber);

        this.onSelectedContractsChanged.next(this.selectedContracts);
    }

    toggleSelectAll()
    {
        if ( this.selectedContracts.length > 0 )
        {
            this.deselectContracts();
        }
        else
        {
            this.selectContracts();
        }
    }

    selectContracts(filterParameter?, filterValue?)
    {
        this.selectedContracts = [];

        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedContracts = [];
            this.contracts.map(contract => {
                this.selectedContracts.push(contract.contractNumber);
            });
        }
        else
        {
            /* this.selectedContracts.push(...
                 this.contracts.filter(todo => {
                     return todo[filterParameter] === filterValue;
                 })
             );*/
        }

        this.onSelectedContractsChanged.next(this.selectedContracts);
    }

    updateContract(contract)
    {
        return new Promise((resolve, reject) => {

            this.http.post('api/contracts-contracts/' + contract.contractNumber, {...contract})
                .subscribe(response => {
                    this.getContracts();
                    resolve(response);
                });
        });
    }

    updateUserData(userData)
    {
        return new Promise((resolve, reject) => {
            this.http.post('api/contacts-user/' + this.user.id, {...userData})
                .subscribe(response => {
                    this.getUserData();
                    this.getContracts();
                    resolve(response);
                });
        });
    }

    deselectContracts()
    {
        this.selectedContracts = [];

        this.onSelectedContractsChanged.next(this.selectedContracts);
    }

    deleteContract(contract)
    {
        const contractIndex = this.contracts.indexOf(contract);
        this.contracts.splice(contractIndex, 1);
        this.onContractsChanged.next(this.contracts);
    }

    deleteSelectedContracts()
    {
        for ( const contractId of this.selectedContracts )
        {
            const contract = this.contracts.find(_contract => {
                return _contract.contractNumber === contractId;
            });
            const contractIndex = this.contracts.indexOf(contract);
            this.contracts.splice(contractIndex, 1);
        }
        this.onContractsChanged.next(this.contracts);
        this.deselectContracts();
    }
}
