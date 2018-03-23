import { NgModule, ModuleWithProviders } from '@angular/core';
import { FuseErrorDialogComponent } from './dialog/fuse-error-dialog/fuse-error-dialog.component';
import { DialogsAppStoreModule } from './store/store.module';
import { SharedModule } from '../../../../core/modules/shared.module';
import { Routes } from '@angular/router';
import { DialogService } from './dialog.service';
import { FuseConfirmDialogComponent } from './dialog/fuse-confirm-dialog/fuse-confirm-dialog.component';

@NgModule({
  imports: [SharedModule, DialogsAppStoreModule],
  declarations: [FuseErrorDialogComponent, FuseConfirmDialogComponent],
  entryComponents: [FuseErrorDialogComponent, FuseConfirmDialogComponent],
  providers: [DialogService]
})
export class DialogsModule {}
