//import {location} from './models/locations'

{//Loading the Maps JavaScript API
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=YOURAPIKEY&callback=start&v=weekly';
    script.async = true;
    document.head.appendChild(script);
  }
  
    function start(){
    initMap();
    //addMarkersToMap();
    addMarkersFromArr();
    getClickedPointDetails(); 
    buttonEvents();
    }
   { //Constants  
    var markers = {};
    var currentId = 0;
    var map;
    var image ="location.png";
    var secretMessages ;
    var hiding=false;
    var myStyles =[
      {
          featureType: "poi",
          elementType: "labels",
          stylers: [
                { visibility: "off" }
          ]
      }
    ];
    var startingCoords = { lat: 38.438711712746084, lng: 27.14788735567119 };
    var locations = [
      ['Ilhan\'s Coffee', 38.438711712746084, 27.14788735567119],
      ['Childhood Coffee', 38.39036168156852, 27.007098914543676],
      ['Delikli Coffee', 38.23060754057185, 26.342536219236578],
      ['Student Coffee', 39.75515330255422, 30.49551185207372],
      ['Barbaros Coffee', 41.04427873075395, 29.006837041645312],
      ['Dostlar Coffee', 38.44087608752979, 27.144165256312625],
      ['Foça Coffee', 38.66243609495152, 26.749247510721958],
    ];
   }
    
   
   function uniqueId() {
      return ++currentId;
  }
   
    
    function initMap() {
      
      map = new google.maps.Map(document.getElementById("map"), {
        center: startingCoords,
        zoom: 6.5,
        styles:myStyles,
      });   
    
    }
  
  function addMarkersFromArr(){
    var i;  
    
    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        id: uniqueId(),
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        icon: image,
        title:locations[i][0]
      });  
      console.log(marker.id)
      markers[marker.id] = marker;
      markerEventsHandler(marker, marker.title); 
    }
    
  }
  
    // Attaches an info window to a marker with the provided message. When the
    // marker is clicked, the info window will open with the secret message.
    function markerEventsHandler(marker, secretMessage) {
            
      const infowindow = new google.maps.InfoWindow({
        content: "Store ID: "+marker.id+" | "+secretMessage,
      });
      console.log("lat "+marker.getPosition().lat());
      console.log("lng "+marker.getPosition().lng());
      
      marker.addListener("click", () => {
        infowindow.open(marker.get("map"), marker);
        $('#inputLocationX').val(marker.position.toJSON().lat) //lat lng degerlerini txtboxa
        $('#inputLocationY').val(marker.position.toJSON().lng)
         $('#inputLocationID').val(marker.id);
         $('#inputLocationName').val(marker.title);
        
      });
      
  
      map.addListener("click", () => {
      // Close the current InfoWindow.
      infowindow.close();});
    }
  
    function getDataFromUser(){
        let locationName = document.getElementById('inputLocationName');
        let locX = document.getElementById('inputLocationX');
        let locY = document.getElementById('inputLocationY');
        //let newLocation=(`${locationName},${locX},${locY},coffee.png`)
        newLoc = [];
        newLoc.push(locationName.value,Number(locX.value),Number(locY.value),image);
        
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(Number(locX.value), Number(locY.value)),
          map: map,
          icon: image,
          id: uniqueId(),
          title:locationName.value
        });
        markers[marker.id] = marker;
        markerEventsHandler(marker, locationName.value); 
        console.log(newLoc);
        console.log(locations[0])
    }  

  
   function getClickedPointDetails(){
   google.maps.event.addListener(map, 'click', function(event) {
    // placeMarker(event.latLng);
    // console.log(event.latLng.toJSON().lat)
    // $('#inputLocationName').val(marker.id).toJSON()   
    
    $('#inputLocationX').val(event.latLng.toJSON().lat) //lat lng degerlerini txtboxa
    $('#inputLocationY').val(event.latLng.toJSON().lng)
  });
  }
  
  
  function buttonEvents(){
    var addMarkerButton = document.getElementById("addMarkerButton");
    var deleteMarkerButton = document.getElementById("deleteMarkerButton");
    var hideButton = document.getElementById("hideUnhideButton");
    
    
    //
    addMarkerButton.addEventListener("click", ()=>{
        getDataFromUser();
    });
    deleteMarkerButton.addEventListener("click", ()=>{
        var deletedMarkerID = document.getElementById("inputLocationID");        
        deletedMarkerID=Number(deletedMarkerID.value);
        deleteMarker(deletedMarkerID);
    });  
    
    hideButton.addEventListener("click", ()=>{
        
        if(hiding){
            setMapOnAll(map);
            hiding=false;
            
    }
        else{
            setMapOnAll(null);
            hiding=true;            
        }
    });
    
  }
  


  
  var deleteMarker = function(id) {
    var marker = markers[id]; // find the marker by given id
    marker.setMap(null);  
  }
  
  
  var writeconsole = function(){
    console.log("çalıştı.")
  }
  

  function setMapOnAll(map) {
    for (let i = 1; i <= currentId; i++) {
      markers[i].setMap(map);
    }
  }