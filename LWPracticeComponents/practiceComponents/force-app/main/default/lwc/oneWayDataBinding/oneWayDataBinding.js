import { LightningElement } from 'lwc';

export default class OneWayDataBinding extends LightningElement {
    name = "Mohamed";

    handleClick() {
        this.name = "Ammar";
    }
}