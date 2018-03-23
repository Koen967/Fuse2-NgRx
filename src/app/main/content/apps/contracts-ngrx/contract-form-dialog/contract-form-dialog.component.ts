import {
  Component,
  OnInit,
  ViewEncapsulation,
  Inject,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Contract } from '../contracts.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {
  futureDateValidator,
  afterDateValidator,
  biggerThan
} from '../../../../../core/custom-validator/contract-form.directive';

@Component({
  selector: 'contract-form-dialog',
  templateUrl: './contract-form-dialog.component.html',
  styleUrls: ['./contract-form-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractFormDialogComponent implements OnInit {
  @Output() save = new EventEmitter<FormGroup>();
  @Output() delete = new EventEmitter<Contract>();

  event: CalendarEvent;
  dialogTitle: string;
  contractForm: FormGroup;
  action: string;
  contract: Contract;

  matcher: any;

  constructor(
    public dialogRef: MatDialogRef<ContractFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder
  ) {
    this.action = data.action;

    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Contract';
      this.contract = data.contract;
    } else {
      this.dialogTitle = 'New Contract';
      this.contract = new Contract({});
    }

    this.contractForm = this.createContractForm();
  }

  ngOnInit() {}

  saveForm(form: FormGroup) {
    this.save.emit(form);
  }

  deleteContract() {
    this.delete.emit(this.contract);
    console.log(this.contractForm.controls['name']);
  }

  createContractForm() {
    return this.formBuilder.group({
      contractNumber: [this.contract.contractNumber],
      name: new FormControl(this.contract.name, [
        Validators.required,
        Validators.minLength(4)
      ]),
      customer: new FormControl(this.contract.customer, [
        Validators.required,
        Validators.minLength(4)
      ]),
      commercialContacts: [this.contract.commercialContacts],
      currencyDefault: [this.contract.currencyDefault],
      additionalCurrencies: [this.contract.additionalCurrencies],
      customerAccountManagers: [this.contract.customerAccountManagers],
      customerCommercialManagers: [this.contract.customerCommercialManagers],
      remark: [this.contract.remark],
      date: this.formBuilder.group(
        {
          validFrom: new FormControl(new Date(this.contract.validFrom), [
            Validators.required,
            futureDateValidator
          ]),
          dateExpired: new FormControl(new Date(this.contract.dateExpired), [
            Validators.required
          ])
        },
        { validator: biggerThan('dateExpired', 'validFrom') }
      ),
      status: [this.contract.status]
    });
  }
}
