import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers, effects } from './';

@NgModule({
  imports: [
    StoreModule.forFeature('contracts-app', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: []
})
export class ContractsAppStoreModule {}
