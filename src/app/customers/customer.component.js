"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var customer_1 = require("./customer");
var CustomerComponent = (function () {
    function CustomerComponent() {
        this.customer = new customer_1.Customer();
    }
    CustomerComponent.prototype.ngOnInit = function () {
        this.customerForm = new forms_1.FormGroup({
            lastName: new forms_1.FormControl(),
            firstName: new forms_1.FormControl(),
            email: new forms_1.FormControl(),
            sendCatalog: new forms_1.FormControl(true),
            addressType: new forms_1.FormControl(),
            street1: new forms_1.FormControl(),
            street2: new forms_1.FormControl(),
            city: new forms_1.FormControl(),
            state: new forms_1.FormControl(),
            zip: new forms_1.FormControl(),
        });
    };
    CustomerComponent.prototype.save = function () {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    };
    return CustomerComponent;
}());
CustomerComponent = __decorate([
    core_1.Component({
        selector: 'my-signup',
        templateUrl: './app/customers/customer.component.html'
    })
], CustomerComponent);
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map