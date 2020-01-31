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

//2. AMADEUS: POINTS OF INTEREST

//3. AMADEUS: HOTELS
