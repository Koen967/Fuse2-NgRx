import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { dialogReducers, dialogEffects } from './';

@NgModule({
  imports: [
    StoreModule.forFeature('dialogs-app', dialogReducers),
    EffectsModule.forFeature(dialogEffects)
  ],
  providers: []
})
export class DialogsAppStoreModule {}
