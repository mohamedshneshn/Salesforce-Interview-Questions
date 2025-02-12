import { LightningElement,wire} from 'lwc';
import getProducts from '@salesforce/apex/PublicContoller.getProducts';
import { publish, MessageContext } from 'lightning/messageService';
import ProductChannel from '@salesforce/messageChannel/ProductMessageChannel__c';


export default class UnrelatedCompsProductList extends LightningElement {
    products = [];
    selectedProductId;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.fetchData();
    }
        
    


fetchData(){
    getProducts()
        .then((data) =>{
            console.log("Data ok");
            this.products = data
        })
        .catch(() => {
            console.log("erro no data");
        
    })
    }

    handleProductSelected(event) {
    
        this.selectedProductId = event.detail;
        const message = { productId: this.selectedProductId};
        publish(this.messageContext , ProductChannel, message);
        
        
    }


}