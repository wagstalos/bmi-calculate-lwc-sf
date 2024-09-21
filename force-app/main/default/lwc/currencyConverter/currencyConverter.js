import { LightningElement } from 'lwc';
import { countryCodeList } from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets'

export default class CurrencyConverter extends LightningElement {
    currencyImage = currencyConverterAssets +'/currencyConverterAssets/currency.svg'
    countryList = countryCodeList
    countryFrom = "USD"
    countryTo = "AUD"
    amount = ""
    result
    error

    handleChange(event){
        const {name, value } = event.target
        console.log("name", name)
        console.log("value", value)
        this[name] = value
        this.result = ''
        this.error = ''
    }

    submitHandler(event){
        event.preventDefault();
        this.convert()
    }

    async convert(){
        const API_KEY = '81ad10d5417a5fd58c9c3aa6d5c0028d'
        const API_URL = `https://api.exchangerate.host/convert?from=${this.countryFrom}&to=${this.countryTo}&amount=${this.amount}&access_key=${API_KEY}`
        try{
            const data = await fetch(API_URL)
            const jsonData = await data.json()
            this.result = (Number(this.amount) * jsonData.result).toFixed(2)

            // console.log(jsonData)
            console.log( this.result)
        }catch(error){
            console.log(error)
            this.error="An erro occurred. Please try again"
        }
    }
}