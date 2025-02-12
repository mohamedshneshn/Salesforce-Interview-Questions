import { LightningElement ,wire} from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import ProductChannel from '@salesforce/messageChannel/ProductMessageChannel__c';
import getProductDetails from '@salesforce/apex/PublicContoller.getProductDetails';
export default class UnrelatedCompsProductDetails extends LightningElement {

    product;
    productId;
    
    @wire(MessageContext)
    messageContext

    connectedCallback() {
        this.subscription = subscribe(
            this.messageContext,
            ProductChannel,
            (message) => this.handleMessage(message)

            
        );
    }

    handleMessage(message) {
        this.productId = message.productId;
        this.fetchProductDetails();
    }

    fetchProductDetails() {
        getProductDetails({ productId: this.productId })
            .then((data) => {
                this.product = data
                console.log("product data fetched");
            }).catch(() => {
                console.log("error exisit");
        })
    }


}