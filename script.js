
//the process of getting the access token
$(document).ready(function() {
  //   var token;
  //   var authorURL = "https://test.api.amadeus.com/v1/security/oauth2/token";
  //   $.ajax({
  //     url: authorURL,
  //     method: "POST",
  //     data:
  //       "grant_type=client_credentials&client_id=JHCHXz0rYyUFTsDABAI8p8yu190uGMre&client_secret=ERMAsZLwC7rIvhw2"
  //   }).then(function(response) {
  //     token = response.access_token;
  //     alert(token);
  //   });


$(document).ready(function() {

  //LANDING PAGE
  //1. BUTTON WITH ONCLICK EVENT; TAKES USER TO SECOND PAGE;
  $("#searchButton").on("click", function() {
    var city;
    city = $("#searchArea").val();
    localStorage.chosencity = city;
    location.href = "second-page.html";


    

  });

  //2. SEARCH AREA; CAPTURE USER INPUT; ADD INPUT TO LOCAL STORAGE

  //OPERATIONAL PAGE
  //1. WEATHER API

  $("#enterCity").on("click", function(event) {
    event.preventDefault();


    var city = $("#searchArea").val();
    var weatherAPIKey = "&APPID=49b107df79df951ca90870bc8b2042c1";
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial" +
      weatherAPIKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      var tempF = Math.round(response.main.temp);
      var feelsLike = Math.round(response.main.feels_like);
      var windSpeed = Math.round(response.wind.speed);
      console.log(tempF);
      console.log(feelsLike);
      console.log(windSpeed);

      $("#weather").empty();

      // // get and set the content
      // var card = $("<div>").addClass("card");
      // var cardBody = $("<div>").addClass("card-body");
      // var city = $("<h4>").addClass("card-title").text(response.name);
      // var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
      // var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
      // var tempFeel = $("<p>").addClass("card-text").text("Feels Like: " + feelsLike + " °F");
      // var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
      // var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + windSpeed + " MPH");
      // var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

      // // add to page
      // city.append(cityDate, image)
      // cardBody.append(city, temperature, tempFeel, humidity, wind, uvIndex);
      // card.append(cardBody);
      // $("#weather").append(card)

      $.ajax({
        url:
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&units=imperial" +
          weatherAPIKey,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        $("#forecast").empty();

        var results = response.list;
        console.log(results);

        $.ajax({
          url:
            "https://api.openweathermap.org/data/2.5/uvi?lat=" +
            response.city.coord.lat +
            "&lon=" +
            response.city.coord.lon +
            weatherAPIKey,
          method: "GET"
        }).then(function(data) {
          console.log(data);
          console.log("This is the UV Index: ", data.value);
        });
      });
    });
    //     var uvSpan = $("<span>").addClass('uv-span').html(Math.round(data.value));
    //     $(uvIndex).html("UV Index: ");
    //     $(uvIndex).append(uvSpan);

    //     if (data.value <= 5) {
    //         $(".uv-span").css("background-color", "green");
    //     }

    //     if (data.value > 5 && data.value <= 8) {
    //         $(".uv-span").css("background-color", "orange")
    //     }
    //     if (data.value > 8) {
    //         $(".uv-span").css("background-color", "red");
    //     }

    //     var dayIndex = 0;

    //     for (var i = 0; i < results.length; i++) {

    //         if (results[i].dt_txt.indexOf("12:00:00") !== -1) {

    //             const today = new Date()
    //             const tomorrow = new Date(today)
    //             tomorrow.setDate(tomorrow.getDate() + dayIndex)
    //             // get the temperature round to next whole number
    //             var temp = (results[i].main.temp);
    //             var tempF = Math.round(temp);

    //             var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
    //             var cardBody = $("<div>").addClass("card-body p-3 forecastBody")
    //             var cityDate = $("<h4>").addClass("card-title").text(tomorrow.toLocaleDateString("en-US"));
    //             var temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + "° F");
    //             var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

    //             var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

    //             cardBody.append(cityDate, image, temperature, humidity);
    //             card.append(cardBody);
    //             $("#forecast").append(card);
    //             dayIndex++;

    //         }
    //     }
    // })
  });

  //2. AMADEUS: POINTS OF INTEREST

  //2. AMADEUS: POINTS OF INTEREST
  $(".activities").on("click", function(event) {
    event.preventDefault();

    var queryURL =
      "https://test.api.amadeus.com/v1/reference-data/locations/pois/by-square" +
      APIKey;
    var APIKey = "JHCHXz0rYyUFTsDABAI8p8yu190uGMre";
    $.ajax({
      url: queryURL,
      method: "GET"
    });
  });

  // $("#Places").on("click", function(event) {
  //   event.preventDefault();
  //   var queryURL =
  //     "https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=PAR&adults=1&radius=5&radiusUnit=KM&paymentPolicy=NONE&includeClosed=false&bestRateOnly=true&view=FULL&sort=PRICE";
  //   $.ajax({
  //     url: queryERL,
  //     method: "GET",
  //     headers: { Autorization: "Bearer" + token }
  //   }).then(function(response) {
  //     alert(response);
  //   });
  // });

  //3. AMADEUS: HOTELS
  $("#Places").on("click", function(event) {
    $("#places-to-stay").toggleClass("hide");

    $("#places-to-stay").toggleClass("show");
    // $.ajax({
    //   url: "https://hotels4.p.rapidapi.com/locations/search?q=Shanghai",
    //   method: "GET",
    //   headers: {
    //     "X-RapidAPI-Key": "bb982215cbmsh1d85670a00a5305p1be6a2jsn1da04cdc9be3"
    //   }
    // }).then(function(response) {
    //   alert(response);
    // });
  });
});

function initMap() {
  var option = {
    zoom: 5,
    center: { lat: 31.224361, lng: 121.46917 }
  };
  var map = new google.maps.Map(
    document.getElementById("places-to-stay"),
    option
  );
}

    var city = $("#searchArea").val();
    weatherFunction(city);
    countryInfo(city);

});

    function weatherFunction(city){
    var uvIndex = $("<p>").html("UV Index: ");
    var city = $("#searchArea").val();
    var weatherAPIKey = "&APPID=49b107df79df951ca90870bc8b2042c1";
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial" +
      weatherAPIKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      var tempF = Math.round(response.main.temp);
      var feelsLike = Math.round(response.main.feels_like);
      var windSpeed = Math.round(response.wind.speed);
      console.log(tempF);
      console.log(feelsLike);
      console.log(windSpeed);

      $("#weather").empty();

      // get and set the content
      var card = $("<div>").addClass("card");
      var cardBody = $("<div>").addClass("card-body");
      var cityName = $("<h1>")
        .addClass("card-title")
        .text(response.name);
        console.log(response.name)
      // var cityDate = $("<h4>").addClass("card-title").text(response.date_iso.toString('en-US'));
      var temperature = $("<h3>")
        .addClass("card-text current-temp")
        .text( + tempF + " °F");
      var tempFeel = $("<p>")
        .addClass("card-text")
        .text("Feels Like: " + feelsLike + " °F");
      var humidity = $("<p>")
        .addClass("card-text current-humidity")
        .text("Humidity: " + response.main.humidity + "%");
      var wind = $("<p>")
        .addClass("card-text current-wind")
        .text("Wind Speed: " + windSpeed + " MPH");
      var image = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );

      // // add to page
      cityName.append(image);
      cardBody.append(cityName, temperature,tempFeel, humidity, wind, uvIndex);
      card.append(cardBody);
      $("#weather").append(card);

      $.ajax({
        url:
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&units=imperial" +
          weatherAPIKey,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        $("#forecast").empty();

        var results = response.list;
        console.log(results);

        $.ajax({
          url:
            "https://api.openweathermap.org/data/2.5/uvi?lat=" +
            response.city.coord.lat +
            "&lon=" +
            response.city.coord.lon +
            weatherAPIKey,
          method: "GET"
        }).then(function(data) {
          console.log(data);
          console.log("This is the UV Index: ", data.value);

          var uvSpan = $("<span>")
            .addClass("uv-span")
            .html(Math.round(data.value));
          $(uvIndex).html("UV Index: ");
          $(uvIndex).append(uvSpan);

          if (data.value <= 5) {
            $(".uv-span").css("background-color", "green");
          }

          if (data.value > 5 && data.value <= 8) {
            $(".uv-span").css("background-color", "orange");
          }
          if (data.value > 8) {
            $(".uv-span").css("background-color", "red");
          }

          var dayIndex = 0;

          for (var i = 0; i < results.length; i++) {
            if (results[i].dt_txt.indexOf("12:00:00") !== -1) {
              const today = new Date();
              const tomorrow = new Date(today);
              tomorrow.setDate(tomorrow.getDate() + dayIndex);
              // get the temperature round to next whole number
              var temp = results[i].main.temp;
              var tempF = Math.round(temp);

              var card = $("<div>").addClass(
                "card-section float-left"
              );
              var cardBody = $("<div>").addClass("card-body p-3 forecastBody");
            //   $(cardBody).css("width: 50px")
              var cityDate = $("<h4>")
                .addClass("card-title")
                .text(tomorrow.toLocaleDateString("en-US"));
              var temperature = $("<p>")
                .addClass("card-text forecastTemp")
                .text("Temperature: " + tempF + "° F");
              var humidity = $("<p>")
                .addClass("card-text forecastHumidity")
                .text("Humidity: " + results[i].main.humidity + "%");

              var image = $("<img>").attr(
                "src",
                "https://openweathermap.org/img/w/" +
                  results[i].weather[0].icon +
                  ".png"
              );

              cardBody.append(cityDate, image, temperature, humidity);
              card.append(cardBody);
              $("#weather").append(card);
              dayIndex++;
            }
          }
        });
      });
    });
    }
    

    //3. PLACES: INFO
  
});

function countryInfo(country){
var queryURL = "https://restcountries-v1.p.rapidapi.com/name/" + country;
var APIKey = "f0d4f8d702msh69fb856e668227cp1367a9jsn3c48cea2fbc2";
var country = $("#searchArea").val();
$.ajax({
    url: queryURL,
    method: "GET",
    headers: {
        "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
        "x-rapidapi-key": "f0d4f8d702msh69fb856e668227cp1367a9jsn3c48cea2fbc2"
    }
}).then(function(response){
    console.log(response);

    var countryName = $("<div>").text(response[0].name);
    console.log(response[0].name);
    
    $("#weather").append(countryName);
    

    
});
}

$("#funFacts").on("click", function() {
    $("#weather").text("");
    var country = $("#searchArea").val();
    countryInfo(country);    
  });


