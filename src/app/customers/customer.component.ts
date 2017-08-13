import { Component , OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators , AbstractControl, ValidatorFn } from '@angular/forms';

import { Customer } from './customer';

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null 
{
    let emailControl = c.get('email');
    let confirmEmailControl = c.get('confirmEmail');
    if (emailControl.pristine || confirmEmailControl.pristine)
    {
        return null;
    }
    if (emailControl.value === confirmEmailControl.value) {
        return null;
    }

    return {match: true}
} 

function ratingRange(min: number, max: number): ValidatorFn {
    return (c: AbstractControl) : { [key: string]: boolean } | null => { 
        if (c.value != undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        }
        return null;
    }
}

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent  implements OnInit {
    customerForm: FormGroup;
    customer: Customer = new Customer();
    emailMessage: string;

    private validationMEssages = {
        required: 'Please enter email address',
        pattern: 'Please enter a valid email address'
    }

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.customerForm = this.fb.group({

            lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            emailGroup: this.fb.group({
                email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')]],
                confirmEmail: ['', Validators.required]
            }, { validator: emailMatcher}),
            phone: '',
            sendCatalog: 'true',
            addressType : '',
            street1 : '',
            street2 : '',
            city : '',
            state: '',
            zip: '',
            notification: 'email',
            rating: ['', ratingRange(1,5)]
        });

        this.customerForm.get('notification').valueChanges.subscribe(value => this.setNotification(value));

        //validation message part 
        const emailControle = this.customerForm.get('emailGroup.email');
        emailControle.valueChanges.subscribe(value => this.setMessage(emailControle));
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

    setMessage(c : AbstractControl): void {
        this.emailMessage = '';
        if ((c.touched || c.dirty) && c.errors) {
            this.emailMessage = Object.keys(c.errors).map(key => this.validationMEssages[key]).join('  ');
        }

    }
}

