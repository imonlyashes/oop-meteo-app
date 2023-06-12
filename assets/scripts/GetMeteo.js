export default class GetMeteo{
    static fetchInfos(url, now, min, max, rain, icon){
        fetch(url)
        .then(response => response.json())
        .then(temp => {
            let meteo = {
                nowTemp: temp.current_weather.temperature,
                weather: temp.current_weather.weathercode,
                minTemp: temp.daily.temperature_2m_min[0],
                maxTemp: temp.daily.temperature_2m_max[0],
                rainProb: temp.daily.precipitation_probability_max[0]
            };
            now.textContent = Math.round(meteo.nowTemp) + '°C';
            min.textContent = Math.round(meteo.minTemp) + '°C';
            max.textContent = Math.round(meteo.maxTemp) + '°C';
            rain.textContent = meteo.rainProb + '%';

            if(meteo.nowTemp = 0){
                icon.src = './assets/img/sunny.svg';
                icon.alt = 'Ensolleilé';
            } else if (meteo.nowTemp = 1 || 2 || 3){
                icon.src = './assets/img/partly_cloudy.svg';
                icon.alt = 'Partiellement nuageux';
            } else if (meteo.nowTemp = 61 || 63 || 65){
                icon.src = './assets/img/rainy.svg';
                icon.alt = 'Pluvieux';
            } else if (meteo.nowTemp = 45 || 48){
                icon.src = './assets/img/fog.svg';
                icon.alt = 'Brouillard';
            } else if (meteo.nowTemp = 95){
                icon.src = './assets/img/thunderstorm.svg';
                icon.alt = 'Orageux';
            }
        });
    }
}