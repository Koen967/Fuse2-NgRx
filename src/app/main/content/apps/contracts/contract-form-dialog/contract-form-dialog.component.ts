import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Contract } from '../contracts.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'contract-form-dialog',
  templateUrl: './contract-form-dialog.component.html',
  styleUrls: ['./contract-form-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContractFormDialogComponent implements OnInit {
  event: CalendarEvent;
  dialogTitle: string;
  contractForm: FormGroup;
  action: string;
  contract: Contract;

  constructor(
      public dialogRef: MatDialogRef<ContractFormDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private data: any,
      private formBuilder: FormBuilder
  )
  {
      this.action = data.action;

      if ( this.action === 'edit' )
      {
          this.dialogTitle = 'Edit Contract';
          this.contract = data.contract;
      }
      else
      {
          this.dialogTitle = 'New Contract';
          this.contract = new Contract({});
      }

      this.contractForm = this.createContractForm();
  }

  ngOnInit()
  {
  }

  createContractForm()
  {
      return this.formBuilder.group({
        contractNumber            : [this.contract.contractNumber],
        name                      : [this.contract.name],
        customer                  : [this.contract.customer],
        commercialContacts        : [this.contract.commercialContacts],
        currencyDefault           : [this.contract.currencyDefault],
        additionalCurrencies      : [this.contract.additionalCurrencies],
        customerAccountManagers   : [this.contract.customerAccountManagers],
        customerCommercialManagers: [this.contract.customerCommercialManagers],
        remark                    : [this.contract.remark],
        validFrom                 : [new Date(this.contract.validFrom)],
        dateExpired               : [new Date(this.contract.dateExpired)],
        status                    : [this.contract.status]
      });
  }
}
