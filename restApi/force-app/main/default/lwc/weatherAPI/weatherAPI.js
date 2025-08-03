import { LightningElement } from 'lwc';
import getWeather from '@salesforce/apex/WeatherService.getWeather';



export default class WeatherAPI extends LightningElement{
    city = "";
    condition = "";
    imageURL = "";

    handleOnChange(event){
        this.city = event.target.value;
    }
    handleOnClick() {
        getWeather({ city: this.city })
            .then((response) => {
                let parseData = JSON.parse(response);
                this.imageURL = parseData.current.condition.icon;
                this.condition = parseData.current.condition.text;
           
             })
        .catch(error => console.log(error))
    }
}
