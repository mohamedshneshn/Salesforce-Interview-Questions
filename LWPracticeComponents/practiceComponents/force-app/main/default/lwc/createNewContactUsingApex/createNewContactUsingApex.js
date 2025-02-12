import { LightningElement } from 'lwc';
import createContact from '@salesforce/apex/PublicContoller.createContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateNewContactUsingApex extends LightningElement {

    firstName = "";
    lastName = "";
    email = "";

    handleFirstName(event) {
        this.firstName = event.target.value;
    }
     handleLastName(event) {
        this.lastName = event.target.value;
     }
     handleEmail(event) {
        this.email = event.target.value;
     }
    
    handleClick() {
        createContact({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email
        })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact created successfully',
                        variant: 'success'
                    })
                );
                this.firstName = "";
                this.lastName = "";
                this.email = "";
                
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );

        })
    }
}