import { LightningElement ,track } from 'lwc';

export default class TwoWayBindingWithTrack extends LightningElement {

   @track person = { name: "AAA", age: "AAA" };

    handleInputName(event) {
        this.person.name = event.target.value;
    }

    handleInputAge(event) {
        this.person.age = event.target.value
    }
    
}