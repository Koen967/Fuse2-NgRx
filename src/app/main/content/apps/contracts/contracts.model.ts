import { FuseUtils } from '../../../../core/fuseUtils';

export class Contract
{
    contractNumber: string;
    name: string;
    customer: string;
    commercialContacts: string[];
    currencyDefault: string;
    additionalCurrencies: string[];
    customerAccountManagers: string[];
    customerCommercialManagers: string[];
    remark: string;
    validFrom?: Date;
    dateExpired?: Date;
    status: string;

    constructor(contract)
    {
        {
            this.contractNumber = contract.contractNumber || FuseUtils.generateGUID();
            this.name = contract.name || '';
            this.customer = contract.customer || '';
            this.commercialContacts = contract.commercialContacts || [''];
            this.currencyDefault = contract.currencyDefault || '';
            this.additionalCurrencies = contract.additionalCurrencies || [''];
            this.customerAccountManagers = contract.customerAccountManagers || [''];
            this.customerCommercialManagers = contract.customerCommercialManagers || [''];
            this.remark = contract.remark || '';
            this.validFrom = contract.validFrom || null;
            this.dateExpired = contract.dateExpired || null;
            this.status = contract.status || '';
        }
    }
}
