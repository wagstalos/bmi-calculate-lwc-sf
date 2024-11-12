public with sharing class weatherAppController {

    @AuraEnabled
    public static string getWeatherDetails(String input){
        String url = 'https://api.openweathermap.org/data/2.5/weather?q='+ input + +'&units=metrics' + getKey();
        String response = getResponse(url);
        return response;
    }
    public static String getResponse(string strUrl){
        http h = new Http();
        HttpRequest req = new HttpRequest();
        HttpResponse res = new HttpResponse();
        req.setMethod('GET');
        req.setEndPoint(strUrl);
        req.setTimeout(120000);
        res = h.send(req);
        String responseBody = res.getBody();
        return res.getBody();
    }

    public static string getKey(){
        String key = 'd7c661196ebfc6aa2fd4baf42b9cc33b';
        String output ='&appid=' + key;
        return output;
    }
}