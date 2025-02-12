import { LightningElement } from 'lwc';
import getContacts from '@salesforce/apex/PublicContoller.getContacts'

export default class GetContacsDetailsUsingApex extends LightningElement {
    contacts = [];
    columns = [
        { label: "FirstName", fieldName: "FirstName", type: "text" },
        { label: "Email", fieldName: "Email", type: "text" },
        {label:"Phone",fieldName:"Phone",type:"text"},
    ]

    connectedCallback() {
        this.fetchData();
    }


    fetchData() {
        getContacts()
            .then((data) => {
                this.contacts = data;
                console.log("Data Fetched");
            })
            .catch(() => {
                console.log("Error Happened");
            
        })
    }
}