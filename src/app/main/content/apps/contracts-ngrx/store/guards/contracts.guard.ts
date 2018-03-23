import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router/src/router_state';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import { tap, filter, take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromStore from '../index';
import { ContractsAppState } from '../reducers/';
import { getContractsLoaded } from '../selectors';

import { getRouterState } from '../../../../../../store/reducers';

@Injectable()
export class ContractsGuard implements CanActivate {
  routerState: any;

  constructor(private store: Store<ContractsAppState>) {
    this.store.select(getRouterState).subscribe(routerState => {
      if (routerState) {
        this.routerState = routerState.state;
      }
    });
  }

  getContracts() {
    return this.store.select(getContractsLoaded).pipe(
      tap((loaded: any) => {
        if (!loaded) {
          this.store.dispatch(new fromStore.GetContracts());
        }
      }),
      filter((loaded: any) => {
        return loaded;
      }),
      take(1)
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.getContracts()
      .switchMap(() => of(true))
      .catch(() => of(false));
  }
}
