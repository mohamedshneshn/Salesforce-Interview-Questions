import { LightningElement ,api} from 'lwc';

export default class UnrelatedCompsProductCard extends LightningElement {

    @api productName;
    @api productId;

    handleClick() {
        const event = new CustomEvent('productselected', {
            detail: this.productId
        }
        );
        this.dispatchEvent(event);
    }

}