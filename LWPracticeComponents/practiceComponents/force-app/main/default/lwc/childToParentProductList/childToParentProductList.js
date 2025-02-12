import { LightningElement } from 'lwc';
import getProducts from '@salesforce/apex/PublicContoller.getProducts'

export default class ChildToParentProductList extends LightningElement {

    products = [];

    connectedCallback() {
        this.fetchData();
    }

    fetchData() {
        getProducts()
            .then((data) => {
                this.products = data;
                console.log("Product Fetched",data);
            })
            .catch(() => {
                console.log("Error Happend");
        })
    }

    handleAddToCart(e) {
        console.log("product id is ",e.detail);
    }

}