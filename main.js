

window.addEventListener('load', ()=> {

    let long ;
    let lat;
    const temperatureDescription = document.querySelector('.temperature-discription');
    const temperatureDegree = document.querySelector(".temperature-degree");
    const locationTimezone  = document.querySelector(".location-timezone");
    const iconClass =document.querySelector(".icon");
    const temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api =   `${proxy}https://api.darksky.net/forecast/dc45dff0bd5f64627e8aaac81f9e77c2/${lat},${long}`; 

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                 
                    const {temperature, summary, icon} = data.currently;
                    // set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    // Forumula for celsius
                    let celsius =  ( temperature - 30) * (5 / 9);
                    // set Icon 
                    setIcons(icon, iconClass);

                    // change temperature to Celsius/Farenheit
                    temperatureSection.addEventListener('click', () =>{
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.floor(celsius);

                        }else{
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = temperature;
                        }
                    });

                })
        });
    }
    
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});