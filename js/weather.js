let weather = {
  apiKey: "bc6340660c601debbabce712acabba9b",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found");
          throw new Error("No weather found");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    console.log(data);
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".icon").alt = name;
     document.querySelector(".description").innerText = description
      document.querySelector(".temp").innerText = Math.round(temp) + ' C'
       document.querySelector(".humidity").innerText = 'Humidity: ' + humidity + '%'
        document.querySelector(".wind").innerText = 'Wind: ' + Math.round(speed) + ' m/s'

        this.fetchImage(name)
  },
  fetchImage: function(query){
const pexelsApiKey = 'CcfO7alShRaso51hs2hg8tKj7lNFrU8eXQ9GCNpO5YI1sEbDext7LJmu'
const url = `https://api.pexels.com/v1/search?query=${query}&per_page=1`

fetch(url, {
    headers: {Authorization: pexelsApiKey}
}).then(response => response.json())
.then(data => {
    if(data.photos.length > 0){
        document.body.style.backgroundImage = `url(${data.photos[0].src.large})`
    }else {
        console.log('no image found' + query)
    }
})
.catch(error => console.error('Error fetching image:', error))
  },
  search: function(){
    this.fetchWeather(document.querySelector('.search-bar').value)

  }
}

document.querySelector('.search button').addEventListener('click', function(){
    weather.search()
})

document.querySelector('.search-bar').addEventListener('keyup', function(event){
    if(event.key === 'Enter'){
        weather.search()
    }
})

weather.fetchWeather('Klaipeda')