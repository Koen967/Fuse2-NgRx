import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

import * as DialogActions from '../actions';

@Injectable()
export class DialogsEffects {
  constructor(private actions$: Actions) {}
}
