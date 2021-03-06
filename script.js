var latitude;
var longitude;
$(document).ready(function() {
  //LANDING PAGE
  //1. BUTTON WITH ONCLICK EVENT; TAKES USER TO SECOND PAGE;
  var city;

  $("#searchButton").on("click", function() {
    city;
    city = $("#searchArea").val();
    localStorage.chosencity = city;
    location.href = "second-page.html";
  });

  //2. SEARCH AREA; CAPTURE USER INPUT; ADD INPUT TO LOCAL STORAGE

  //OPERATIONAL PAGE
  // 0. transfer the input city value from the first page to the second page search area
  $("#searchArea").val(localStorage.chosencity);
  city = $("#searchArea").val();
  weatherFunction(localStorage.chosencity);
  // countryInfo(city);

  //1. WEATHER API

  $("#enterCity").on("click", function(event) {
    event.preventDefault();
    city = $("#searchArea").val();
    weatherFunction(city);
    $("#facts").addClass("hide");
    $("#map").addClass("hide");
    // countryInfo(city);
    localStorage.setItem("chosenCity") = $(".secondSearch").val();
  });

  function weatherFunction(city) {
    var uvIndex = $("<p>").html("UV Index: ");
    // var city = $("#searchArea").val();
    console.log(city);
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
      latitude = parseInt(response.coord.lat);
      longitude = parseInt(response.coord.lon);
      console.log(tempF);
      console.log(feelsLike);
      console.log(windSpeed);

      $("#weather").empty();

      // get and set the content
      var card = $("<div>").addClass("card");
      var cardBody = $("<div>").addClass("card-body");
      var cityName = $("<h1>")
        .addClass("card-title translating")
        .text(response.name);
      console.log(response.name);
      // var cityDate = $("<h4>").addClass("card-title").text(response.date_iso.toString('en-US'));
      var temperature = $("<h3>")
        .addClass("card-text current-temp translating")
        .text(+tempF + " °F");
      var tempFeel = $("<p>")
        .addClass("card-text translating")
        .text("Feels Like: " + feelsLike + " °F");
      var humidity = $("<p>")
        .addClass("card-text current-humidity translating")
        .text("Humidity: " + response.main.humidity + "%");
      var wind = $("<p>")
        .addClass("card-text current-wind translating")
        .text("Wind Speed: " + windSpeed + " MPH");
      var image = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );

      // // add to page
      cityName.append(image);
      cardBody.append(cityName, temperature, tempFeel, humidity, wind, uvIndex);
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

              var card = $("<div>").addClass("card-section float-left");
              var cardBody = $("<div>").addClass("card-body p-3 forecastBody");
              //   $(cardBody).css("width: 50px")
              var cityDate = $("<h4>")
                .addClass("card-title")
                .text(tomorrow.toLocaleDateString("en-US"));
              var temperature = $("<p>")
                .addClass("card-text forecastTemp translating")
                .text("Temperature: " + tempF + "° F");
              var humidity = $("<p>")
                .addClass("card-text forecastHumidity translating")
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
          //google map API running function
          function initMap() {
            var option = {
              zoom: 5,

              center: { lat: latitude, lng: longitude }
            };
            var map = new google.maps.Map(
              document.getElementById("map"),
              option
            );
            var marker = new google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map: map
            });
          }
          initMap();
        });
        ///////////////////////////////the boundry end of the "then function" right after the weaather API calls.
      });
    });
  }

  function countryInfo(country) {
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
    }).then(function(response) {
      console.log(response);

      var countryName = $("<h5>")
        .addClass("translating")
        .text(response[0].name);
      console.log(response[0].name);
      var region = $("<div>")
        .addClass("translating")
        .text("World region: " + response[0].region);
      var demonym = $("<div>")
        .addClass("translating")
        .text("Locals are known as: " + response[0].demonym);
      var giniIndex = $("<div>")
        .addClass("translating")
        .text("Gini ratio for wealth distribution: " + response[0].gini);
      var capitalCity = $("<div>")
        .addClass("translating")
        .text("Capital city is: " + response[0].capital);
      var population = $("<div>")
        .addClass("translating")
        .text("Population: " + response[0].population); //add commas to numerical response

      $("#facts").append(countryName);
      $("#facts").append(capitalCity);
      $("#facts").append(population);
      $("#facts").append(region);
      $("#facts").append(demonym);
      $("#facts").append(giniIndex);
    });
  }

  addTranslateButton();
  addTranslateFr();

  function addTranslateButton() {
    var transBtn = $("#translateBtn");

    transBtn.click(function() {
      // MAKE TRANSLATE CALL
      console.log("translating");

      //find the weather text on the page using Jquery
      var transText = $(".translating");
      //var myText;

      for (var i = 0; i < transText.length; i++) {
        var myText = transText[i];
        replaceTranslation(myText);
        function replaceTranslation(txt) {
          var url =
            "https://translate.yandex.net/api/v1.5/tr.json/translate?" +
            "key=" +
            "trnsl.1.1.20200205T011214Z.874b3a09797c61b6.fa9febc0550b040bc870b0a7ecf16b636e7c26d9" +
            "&text=" +
            txt.innerText +
            "&lang=es";

          $.ajax({
            url: url,
            method: "POST"
          }).done(function(response) {
            console.log(response);

            //Get text out of response
            var translateText = response.text[0];
            console.log(translateText);
            //Put text #weather

            $(txt).text(translateText);
          });
        }
      }
    });
  }

  function addTranslateFr() {
    var transBtn = $("#translateFr");

    transBtn.click(function() {
      // MAKE TRANSLATE CALL
      console.log("translating");

      //find the weather text on the page using Jquery
      var transText = $(".translating");
      //var myText;

      for (var i = 0; i < transText.length; i++) {
        var myText = transText[i];
        replaceTranslation(myText);
        function replaceTranslation(txt) {
          var url =
            "https://translate.yandex.net/api/v1.5/tr.json/translate?" +
            "key=" +
            "trnsl.1.1.20200205T011214Z.874b3a09797c61b6.fa9febc0550b040bc870b0a7ecf16b636e7c26d9" +
            "&text=" +
            txt.innerText +
            "&lang=fr";

          $.ajax({
            url: url,
            method: "POST"
          }).done(function(response) {
            console.log(response);

            //Get text out of response
            var translateText = response.text[0];
            console.log(translateText);
            //Put text #weather

            $(txt).text(translateText);
          });
        }
      }
    });
  }

  //3. PLACES: (the coding for map displaying)//

  $("#funFacts").on("click", function(event) {
    event.preventDefault();
    $("#weather").html("");
    $("#facts")
      .removeClass("hide")
      .addClass("callout primary");
    var country = $("#searchArea").val();
    $("#facts").html("");

    $("#map").addClass("hide");

    countryInfo(country);
  });
  $("#Weatherbtn").on("click", function(event) {
    event.preventDefault();
    $("#map").html("");
    $("#facts").addClass("hide");
    var country = $("#searchArea").val();
    $("#map").addClass("hide");

    weatherFunction(country);
  });
  $("#Places").on("click", function(event) {
    event.preventDefault();
    $("#weather").html("");
    $("#facts").html("");
    $("#facts").addClass("hide");
    $("#map").toggleClass("hide");
  });
  //the function that is called by the the Google API, and run function with extra parameter

  initMap(country);
});
