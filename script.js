//LANDING PAGE
//1. BUTTON WITH ONCLICK EVENT; TAKES USER TO SECOND PAGE; 









//2. SEARCH AREA; CAPTURE USER INPUT; ADD INPUT TO LOCAL STORAGE









//OPERATIONAL PAGE
//1. WEATHER API









//2. AMADEUS: POINTS OF INTEREST
$(".activities").on("click", function(event){
    event.preventDefault();

    var queryURL = "https://test.api.amadeus.com/v1/reference-data/locations/pois/by-square" + APIKey +
    var APIKey = "JHCHXz0rYyUFTsDABAI8p8yu190uGMre"
    $.ajax({
        url: queryURL
        method: "GET",
    })
})








//3. AMADEUS: HOTELS









