import UrlBuilder from "./UrlBuilder.js";
import GetMeteo from "./GetMeteo.js";

class App{
    constructor(){
        this.selectCity = document.querySelector('.selectCity');
        this.showCity = document.querySelector('#selectedCity');
        this.nowTemp = document.querySelector('#nowTemp');
        this.minTemp = document.querySelector('#minTemp');
        this.maxTemp = document.querySelector('#maxTemp');
        this.rainProb = document.querySelector('#rainProb');
        this.meteoIcon = document.querySelector('#meteoIcon');

        this.header = document.querySelector('#header');

        this.showDate = document.querySelector('#showDate');
        this.showMinTemp = document.querySelector('#showMinTemp');
        this.showMaxTemp = document.querySelector('#showMaxTemp');
        this.showRainProb = document.querySelector('#showRainProb');

        this.toggleDate = document.querySelector('.toggleDate');
        this.toggleMinTemp = document.querySelector('.toggleMinTemp');
        this.toggleMaxTemp = document.querySelector('.toggleMaxTemp');
        this.toggleRainProb = document.querySelector('.toggleRainProb');

        this.dateCookie = Cookies.get("date");
        this.minTempCookie = Cookies.get("minTemp");
        this.maxTempCookie = Cookies.get("maxTemp");
        this.rainProbCookie = Cookies.get("rainProb");

        this.date = new Date();
        this.month = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Decembre"];
        this.day = this.date.getDate();
        this.getMonth = this.month[this.date.getMonth()];
        this.year = this.date.getFullYear();
        this.showDate.textContent = this.day + ' ' + this.getMonth + ' ' + this.year;

        this.urlQuebec = UrlBuilder.getUrl(
            'https://api.open-meteo.com/v1/forecast',{
                latitude: 46.81,
                longitude: -71.21,
                current_weather: 'true',
                daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max',
                timezone: 'America/New_York'
            }
        );

        this.urlMontreal = UrlBuilder.getUrl(
            'https://api.open-meteo.com/v1/forecast',{
                latitude: 45.51,
                longitude: -73.59,
                current_weather: 'true',
                daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max',
                timezone: 'America/New_York'
            }
        );

        this.urlTroisRivieres = UrlBuilder.getUrl(
            'https://api.open-meteo.com/v1/forecast',{
                latitude: 46.35,
                longitude: -72.55,
                current_weather: 'true',
                daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max',
                timezone: 'America/New_York'
            }
        );

        this.urlSherbrooke = UrlBuilder.getUrl(
            'https://api.open-meteo.com/v1/forecast',{
                latitude: 45.40,
                longitude: -71.90,
                current_weather: 'true',
                daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max',
                timezone: 'America/New_York'
            }
        );

        this.meteoDefault();

        this.selectCity.addEventListener('change', e => {
            this.getCityMeteo();
        });

        this.toggleDate.addEventListener('click', e => {
            this.toggles(e);
            if(e.target.checked){
                Cookies.set("date", "true", {expires: 365});
                this.showDate.style.display = 'block';
            } else {
                Cookies.set("date", "false", {expires: 365});
                this.showDate.style.display = 'none';
            }
        })

        if(this.dateCookie == "false"){
            this.showDate.style.display = 'none';
            this.toggleDate.removeAttribute('checked');
        }

        this.toggleMinTemp.addEventListener('click', e => {
            this.toggles(e);
            if(e.target.checked && this.dateCookie){
                Cookies.set("minTemp", "true", {expires: 365});
                this.showMinTemp.style.display = 'block';
            } else {
                Cookies.set("minTemp", "false", {expires: 365});
                this.showMinTemp.style.display = 'none';
            }
        })

        if(this.minTempCookie == "false"){
            this.showMinTemp.style.display = 'none';
            this.toggleMinTemp.removeAttribute('checked');
        }

        this.toggleMaxTemp.addEventListener('click', e => {
            this.toggles(e);
            if(e.target.checked){
                Cookies.set("maxTemp", "true", {expires: 365});
                this.showMaxTemp.style.display = 'block';
            } else {
                Cookies.set("maxTemp", "false", {expires: 365});
                this.showMaxTemp.style.display = 'none';
            }
        })

        if(this.maxTempCookie == "false"){
            this.showMaxTemp.style.display = 'none';
            this.toggleMaxTemp.removeAttribute('checked');
        }

        this.toggleRainProb.addEventListener('click', e => {
            this.toggles(e);
            if(e.target.checked){
                Cookies.set("rainProb", "true", {expires: 365});
                this.showRainProb.style.display = 'block';
            } else {
                Cookies.set("rainProb", "false", {expires: 365});
                this.showRainProb.style.display = 'none';
            }
        })

        if(this.rainProbCookie == "false"){
            this.showRainProb.style.display = 'none';
            this.toggleRainProb.removeAttribute('checked');
        }
    }
    meteoDefault(){
        GetMeteo.fetchInfos(this.urlQuebec, this.nowTemp, this.minTemp, this.maxTemp, this.rainProb, this.meteoIcon);
        this.showCity.textContent = 'Québec';
    }
    getCityMeteo(){
        let city = this.selectCity.value;
        let myCities = city.split(" ");

        if(myCities.includes('quebec')){
            GetMeteo.fetchInfos(this.urlQuebec, this.nowTemp, this.minTemp, this.maxTemp, this.rainProb, this.meteoIcon);
            this.showCity.textContent = 'Québec';
            this.header.style.backgroundImage = "url('./assets/img/quebec.jpg')";
        } else if(myCities.includes('montreal')){
            GetMeteo.fetchInfos(this.urlMontreal, this.nowTemp, this.minTemp, this.maxTemp, this.rainProb, this.meteoIcon);
            this.showCity.textContent = 'Montréal';
            this.header.style.backgroundImage = "url('./assets/img/montreal.jpg')";
        } else if(myCities.includes('troisRiviere')){
            GetMeteo.fetchInfos(this.urlTroisRivieres, this.nowTemp, this.minTemp, this.maxTemp, this.rainProb, this.meteoIcon);
            this.showCity.textContent = 'Trois-Rivières';
            this.header.style.backgroundImage = "url('./assets/img/trois_rivieres.jpg')";
        } else {
            GetMeteo.fetchInfos(this.urlSherbrooke, this.nowTemp, this.minTemp, this.maxTemp, this.rainProb, this.meteoIcon);
            this.showCity.textContent = 'Sherbrooke';
            this.header.style.backgroundImage = "url('./assets/img/sherbrooke.jpg')";
        }
    }
    toggles(e){
        e.target.checked != e.target.checked;
    }
}

new App();