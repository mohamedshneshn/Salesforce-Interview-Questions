import { LightningElement ,api } from 'lwc';

export default class ChildToParentProductCard extends LightningElement {

    @api productName;
    @api productPrice;
    @api productId;

    
    handleAddToCart() {
        const event = new CustomEvent('addtocart', {
            detail: this.productId
        });
        this.dispatchEvent(event);

    }
}