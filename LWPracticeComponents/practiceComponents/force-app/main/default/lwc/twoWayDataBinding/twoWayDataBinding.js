import { LightningElement } from 'lwc';

export default class TwoWayDataBinding extends LightningElement {

    name = "";
    handleInput(event) {
        this.name = event.target.value;
    }
}