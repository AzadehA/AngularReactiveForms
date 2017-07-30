import { Component , OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators , AbstractControl } from '@angular/forms';

import { Customer } from './customer';

function ratingRange(c: AbstractControl): { [key: string]: boolean } | null { 
    if (c.value != undefined && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
        return { 'range': true };
    }
     return null;
}

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
            phone:'',
            sendCatalog: 'true',
            addressType : '',
            street1 : '',
            street2 : '',
            city : '',
            state: '',
            zip: '',
            notification: 'email',
            rating: ['', ratingRange]
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
            zip: '78765',
            phone: '5123458769',
            notification: 'email',
            rating: 2
        });
    }

    partialyPopulateTestData(): void {
        this.customerForm.patchValue({
            lastName: 'John',
            firstName: 'Smith',
                     
        });
    }

    setNotification(notifyBy: string): void {
        const phoneControl = this.customerForm.get('phone');
        if (notifyBy === 'text')
        {
            phoneControl.setValidators(Validators.required); 
        }
        else
        { phoneControl.clearValidators(); }
        phoneControl.updateValueAndValidity();
    }
}

