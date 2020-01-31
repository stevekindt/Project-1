
//LANDING PAGE
//1. BUTTON WITH ONCLICK EVENT; TAKES USER TO SECOND PAGE; 









//2. SEARCH AREA; CAPTURE USER INPUT; ADD INPUT TO LOCAL STORAGE









//OPERATIONAL PAGE
//1. WEATHER API
var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=49b107df79df951ca90870bc8b2042c1";
var city = $("#searchArea").val();

$("#enterCity").on('click',function(event){
    event.preventDefault();

    $.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
})
});










//2. AMADEUS: POINTS OF INTEREST









//3. AMADEUS: HOTELS









