import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ContractsNgrxComponent } from './contracts-ngrx.component';
import { ContractsService } from './contracts.service';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractFormDialogComponent } from './contract-form-dialog/contract-form-dialog.component';
import { SelectedBarComponent } from './selected-bar/selected-bar.component';
import { ContractsAppStoreModule } from './store/store.module';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import * as fromGuards from './store/guards/index';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { DialogsModule } from '../../components/dialogs/dialogs.module';
import { DxDataGridModule } from '../../../../../../node_modules/devextreme-angular/ui/data-grid';

const routes: Routes = [
  {
    path: '**',
    component: ContractsNgrxComponent,
    canActivate: [fromGuards.ContractsGuard]
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    ContractsAppStoreModule,
    DxDataGridModule
  ],
  declarations: [
    ContractsNgrxComponent,
    ContractListComponent,
    ContractFormDialogComponent,
    SelectedBarComponent,
    ErrorDialogComponent
  ],
  providers: [ContractsService, fromGuards.ContractsGuard],
  entryComponents: [ContractFormDialogComponent, ErrorDialogComponent]
})
export class ContractsNgrxModule {}
