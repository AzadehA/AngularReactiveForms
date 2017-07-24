import { Component , OnInit } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';

import { Customer } from './customer';

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent  implements OnInit {
    customerForm: FormGroup;
    customer: Customer = new Customer();

    ngOnInit(): void {
        this.customerForm = new FormGroup({

            lastName : new FormControl(),
            firstName: new FormControl(),
            email: new FormControl(),
            sendCatalog : new FormControl(true),
            addressType : new FormControl(),
            street1 : new FormControl(),
            street2 : new FormControl(),
            city : new FormControl(),
            state: new FormControl(),
            zip : new FormControl(),
        });
    }

    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }

    populateTestData(): void {
        this.customerForm.setValue({
            lastName : 'John',
            firstName : 'Smith',
            email: 'test@test.com',
            sendCatalog : true,
            addressType : 'home',
            street1 : '123 10 str',
            street2 : '',
            city : 'Austin',
            state: 'tx',
            zip : '78765'
        });
    }

    partialyPopulateTestData(): void {
        this.customerForm.patchValue({
            lastName: 'John',
            firstName: 'Smith',
                     
        });
    }
}

