import { LightningElement } from 'lwc';
const API_KEY = 'd7c661196ebfc6aa2fd4baf42b9cc33b'
export default class WeatherApp extends LightningElement {
    cityName = '';
    loadingText = '';
    isError =false

    get loadingClasses(){
        return this.isError ? 'error-msg' : 'success-msg'
    }

    searchHandler(event) {
        this.cityName = event.target.value; 
    }

    submitHandler(event) {
        event.preventDefault();
        this.fetchData();
    }

    fetchData() {
        this.isError = false
        this.loadingText = 'Fetching weather details ...'
        console.log("cityName:", this.cityName);
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metrics&appid=${API_KEY}`
        fetch(URL).then(res=>res.json()).then(result=>{
            console.log(JSON.stringify(result))
            this.weatherDetails(result)
        }).catch(error=>{
            console.error(error)
            this.loadingText = 'Something went wrong'
              this.isError = true
        })
    }

    handleChange(event) {
        this.cityName = event.target.value;
    }

    log(result) {
        console.log(result)
        result.then(res=>{
            log(res.data.name)
        })
    }

    weatherDetails(info){
    if(info.cod === '404'){
        this.isError = true
        this.loadingText = `${this.cityName} ins't a valid city`
     
    }else{
       this.loadingText = ''
        }
    }
}
