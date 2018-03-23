import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { fuseAnimations } from '../../../../../core/animations';
import { ContractsService } from '../contracts.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import {
  MatDialogRef,
  MatDialog,
  MatPaginator,
  MatTableDataSource
} from '@angular/material';
import { FuseConfirmDialogComponent } from '../../../../../core/components/confirm-dialog/confirm-dialog.component';
import { FormGroup } from '@angular/forms';
import { Contract } from '../contracts.model';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractListComponent {
  @Input() dataSource: any;

  @Output() onEditContract = new EventEmitter<Contract>();
  @Output() onDeleteContract = new EventEmitter<Contract>();

  user: any;

  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  editContract(event: any) {
    this.onEditContract.emit(event.data);
  }

  deleteContract(contract: Contract) {
    this.onDeleteContract.emit(contract);
  }
}
