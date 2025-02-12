import { LightningElement } from 'lwc';

export default class ParentToChildProductList extends LightningElement {

    products = [
        { id: 1, name: "Laptop", price: "$1200" },
        { id: 2, name: "Smartphone", price: "$900" },
        { id: 3, name: "Tablet", price: "$800" }
        
    ]
}