import { LightningElement,api } from 'lwc';

export default class ParentToChildProductCard extends LightningElement {
  
    @api productName;
    @api productPrice;
    @api productId;
    title = "";

    connectedCallback() {
        this.title = "Product" + this.productId;
    }
    
}