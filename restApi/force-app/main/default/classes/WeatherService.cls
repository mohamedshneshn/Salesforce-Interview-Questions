public with sharing class WeatherService {

     @AuraEnabled(cacheable=true)
     public static string getWeather(String city){
        Http http = new Http();
        HttpRequest req = new HttpRequest();

        // Make sure city is URL-encoded
        String encodedCity = EncodingUtil.urlEncode(city, 'UTF-8');
        req.setEndpoint('callout:weatherAPI/current.json?q='+encodedCity);
        req.setMethod('GET');

        try {
            HttpResponse res = http.send(req);
            if(res.getStatusCode() == 200){
                return res.getBody();
            }else{
              return  'Error: ' + res.getStatus() + ' - ' + res.getStatusCode() + ' - ' + res.getBody();
            }
        } catch (Exception e)  {
          return  'Exception: ' + e.getMessage();
        }
     }


}