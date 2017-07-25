import { Component , OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';

import { Customer } from './customer';

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent  implements OnInit {
    customerForm: FormGroup;
    customer: Customer = new Customer();
    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.customerForm = this.fb.group({

            lastName: ['',[ Validators.required , Validators.minLength(3), Validators.maxLength(20)]],
            firstName: ['',[ Validators.required , Validators.minLength(3) ]],
            email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')]],
            sendCatalog : 'true',
            addressType : '',
            street1 : '',
            street2 : '',
            city : '',
            state: '',
            zip : '',
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

