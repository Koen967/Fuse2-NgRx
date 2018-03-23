import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ContractsComponent } from './contracts.component';
import { ContractsService } from './contracts.service';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractFormDialogComponent } from './contract-form-dialog/contract-form-dialog.component';
import { SelectedBarComponent } from './selected-bar/selected-bar.component';
import { MatTableModule, MatPaginatorModule } from '@angular/material';


const routes: Routes = [
  {
      path     : '**',
      component: ContractsComponent,
      resolve  : {
          contracts: ContractsService
      }
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [
    ContractsComponent,
    ContractListComponent,
    ContractFormDialogComponent,
    SelectedBarComponent
  ],
  providers: [
    ContractsService
  ],
  entryComponents: [ContractFormDialogComponent]
})
export class ContractsModule { }
