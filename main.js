
// Set up initial map center and zoom level
// var map = L.map('map', {
//   center: [41.57, -72.69], // EDIT latitude, longitude to re-center map
//   zoom: 3,  // EDIT from 1 to 18 -- decrease to zoom out, increase to zoom in
//   scrollWheelZoom: false,
//   tap: false
// });

// initialize map object with view
window.map = L.map('map').setView([54, -106], 4);

/* Control panel to display map layers */
var controlLayers = L.control.layers(null, null, {
  position: "bottomleft",
  collapsed: false
}).addTo(map);

// display Carto basemap tiles with light features and labels
var light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map); // EDIT - insert or remove ".addTo(map)" before last semicolon to display by default
controlLayers.addBaseLayer(light, 'Light Mode');

var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
  maxZoom: 20,
  attribution: '© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});
controlLayers.addBaseLayer(Stadia_AlidadeSmoothDark, 'Dark Mode');

// see more basemap options at https://leaflet-extras.github.io/leaflet-providers/preview/


//leaflet icon

// var leafletIcon = L.icon ({
//   radius: 8,
//             fillColor: 'green',
//             color: 'black',
//             weight: 1,
//             opacity: 1,
//             fillOpacity: 0.8
// })

// // Read markers data from earthquake.csv

let words = 'earthquake.csv';
let empty = ' empty.csv'

var count = 1;
function setColor(btn, color) {
  var property = document.getElementById(btn);
  if (count == 0) {
    property.style.backgroundColor = "#FFFFFF"
    count = 1;
    let words = 'earthquake.csv';
  }
  else {
    property.style.backgroundColor = "#0000FF"
    count = 0;

  }

}


var NA = {
  lat: 54,
  lng: -105,
  zoom: 4
}; 
var EU = {
  lat: 54,
  lng: -15,
  zoom: 4
}; 
var AF = {
  lat: 8.7,
  lng: 34.5,
  zoom: 4
}; 

var AS = {
  lat: 34,
  lng: 100.6,
  zoom: 4
}; 


L.easyButton('fa-home',function(btn,map){
  map.setView([NA.lat, NA.lng], NA.zoom);
},'Zoom To North America').addTo(map);

L.easyButton('fa-home',function(btn,map){
  map.setView([EU.lat, EU.lng], EU.zoom);
},'Zoom To Europe').addTo(map);

L.easyButton('fa-home',function(btn,map){
  map.setView([AF.lat, AF.lng], AF.zoom);
},'Zoom To Africa').addTo(map);

L.easyButton('fa-home',function(btn,map){
  map.setView([AS.lat, AS.lng], AS.zoom);
},'Zoom To Asia').addTo(map);

var colors = ["Between 2000 and 2012, natural disasters caused $1.7 trillion in damage and affected 2.9 billion people","Worldwide in 2011, there were 154 floods, 16 droughts, and 15 cases of extreme temperature.","2012 marked the third consecutive year of worldwide natural disaster damage exceeding $100 billion. 2011 reached a record high of $371 billion","“Earthquakes” are disasters that cause associated destruction of man-made structures and instigate other natural disasters such as tsunamis, avalanches, and landslides"];
// Fun Facts from: https://www.dosomething.org/us/facts/11-facts-about-disasters

var randColor = colors[Math.floor(Math.random() * colors.length)];

    // function timestrt() { 
    //   setInterval(() => (document.getElementById("cans").innerHTML=randColor),5000);
    // }
    
    //   function display() {
    //  document.getElementById("cans").innerHTML=randColor;
    //  }

    // function timestrt() {
    //   document.getElementById("cans").innerHTML=randColor;
    // }

    // window.setInterval(timestrt, 1000);

    

    // $(document).ready(function () {
    //   $(".btn1").click(function () {
    //     document.getElementById("cans").value = rando(["item1", "item2", "item3"]).value;
    //    });
    //   $(".btn2").click(function () {
    //     document.getElementById("cans").value = rando(["item1", "item2", "item3"]).value;
    //   });
    // });
    
// $(document).ready(function () {
//   $(".btn1").click(function () {
//     $("map").hide();
//   });
//   $(".btn2").click(function () {
//     $("map").show();
//   });
// });

$.get(words, function (csvString) {

  // Use PapaParse to convert string to array of objects
  var data = Papa.parse(csvString, { header: true, dynamicTyping: true }).data;

  // For each row in data, create a marker and add it to the map
  // For each row, columns `Latitude`, `Longitude`, and `Title` are required
  for (var i in data) {
    var row = data[i];

    // create popup contents
    var customPopup = "<h1>" + row.year + " " + row.location + "<b> Earthquake<b></h1><h2><br>Disaster Level: " + row.level + "<br>Country: " + row.country + ".</h2>"

    // specify popup options 
    var customOptions =
    {
      'maxWidth': '500',
      'className': 'custom'
    }
    var marker = L.circleMarker([row.latitude, row.longitude], {
      opacity: 50
    }).bindPopup(customPopup, customOptions);

    marker.on('mouseover', function (e) {
      this.openPopup();
    });
    marker.on('mouseout', function (e) {
      this.closePopup();
    });


    // $(".btn1").click(function () {
    //   marker.setStyle({ fillColor: 'transparent', color: 'transparent' }).addTo(map);
    // });
    // $(".btn2").click(function () {
    //   marker.setStyle({ fillColor: 'orange', color: 'orange' }).addTo(map);
    // });

    marker.setStyle({ fillColor: 'transparent', color: 'orange' }).addTo(map);

  }


});

// Read markers data from extreme_temp.csv
$.get('./extreme_temp.csv', function (csvString) {

  // Use PapaParse to convert string to array of objects
  var data = Papa.parse(csvString, { header: true, dynamicTyping: true }).data;

  // For each row in data, create a marker and add it to the map
  // For each row, columns `Latitude`, `Longitude`, and `Title` are required
  for (var i in data) {
    var row = data[i];

        // create popup contents
        var customPopup = "<h1>" + row.year + " " + row.location + "<b> Extreme Temperature Event<b></h1><h2><br>Disaster Level: " + row.level + "<br>Country: " + row.country + ".</h2>"

        // specify popup options 
        var customOptions =
        {
          'maxWidth': '500',
          'className': 'custom'
        }

    var marker = L.circleMarker([row.latitude, row.longitude], {
      opacity: 50
    }).bindPopup(customPopup, customOptions);

    marker.on('mouseover', function (e) {
      this.openPopup();
    });
    marker.on('mouseout', function (e) {
      this.closePopup();
    });

    marker.setStyle({ fillColor: 'transparent', color: 'red' }).addTo(map);
  }

});

// Read markers data from droughtcsv
$.get('./drought.csv', function (csvString) {

  // Use PapaParse to convert string to array of objects
  var data = Papa.parse(csvString, { header: true, dynamicTyping: true }).data;

  // For each row in data, create a marker and add it to the map
  // For each row, columns `Latitude`, `Longitude`, and `Title` are required
  for (var i in data) {
    var row = data[i];

        // create popup contents
        var customPopup = "<h1>" + row.year + " " + row.location + "<b> Drought<b></h1><h2><br>Disaster Level: " + row.level + "<br>Country: " + row.country + ".</h2>"

        // specify popup options 
        var customOptions =
        {
          'maxWidth': '500',
          'className': 'custom'
        }

    var marker = L.circleMarker([row.latitude, row.longitude], {
      opacity: 50
    }).bindPopup(customPopup, customOptions);

    marker.on('mouseover', function (e) {
      this.openPopup();
    });
    marker.on('mouseout', function (e) {
      this.closePopup();
    });

    marker.setStyle({ fillColor: 'transparent', color: 'green' }).addTo(map);
  }

});

// Read markers data from landslide.csv
$.get('./landslide.csv', function (csvString) {

  // Use PapaParse to convert string to array of objects
  var data = Papa.parse(csvString, { header: true, dynamicTyping: true }).data;

  // For each row in data, create a marker and add it to the map
  // For each row, columns `Latitude`, `Longitude`, and `Title` are required
  for (var i in data) {
    var row = data[i];

        // create popup contents
        var customPopup = "<h1>" + row.year + " " + row.location + "<b> Landslide<b></h1><h2><br>Disaster Level: " + row.level + "<br>Country: " + row.country + ".</h2>"

        // specify popup options 
        var customOptions =
        {
          'maxWidth': '500',
          'className': 'custom'
        }

    var marker = L.circleMarker([row.latitude, row.longitude], {
      opacity: 50
    }).bindPopup(customPopup, customOptions);

    marker.on('mouseover', function (e) {
      this.openPopup();
    });
    marker.on('mouseout', function (e) {
      this.closePopup();
    });

    marker.setStyle({ fillColor: 'transparent', color: 'pink' }).addTo(map);
  }

});

// Read markers data from volcanic activity.csv
$.get('./volcanic_activity.csv', function (csvString) {

  // Use PapaParse to convert string to array of objects
  var data = Papa.parse(csvString, { header: true, dynamicTyping: true }).data;

  // For each row in data, create a marker and add it to the map
  // For each row, columns `Latitude`, `Longitude`, and `Title` are required
  for (var i in data) {
    var row = data[i];

        // create popup contents
        var customPopup = "<h1>" + row.year + " " + row.location + "<b> Volcanic Activity<b></h1><h2><br>Disaster Level: " + row.level + "<br>Country: " + row.country + ".</h2>"

        // specify popup options 
        var customOptions =
        {
          'maxWidth': '500',
          'className': 'custom'
        }

    var marker = L.circleMarker([row.latitude, row.longitude], {
      opacity: 50
    }).bindPopup(customPopup, customOptions);

    marker.on('mouseover', function (e) {
      this.openPopup();
      this.color = "white";
    });
    marker.on('mouseout', function (e) {
      this.closePopup();
    });


    marker.setStyle({ fillColor: 'transparent', color: 'purple' }).addTo(map);
  }

});

// Read markers data from storm.csv
$.get('./storm.csv', function (csvString) {

  // Use PapaParse to convert string to array of objects
  var data = Papa.parse(csvString, { header: true, dynamicTyping: true }).data;

  // For each row in data, create a marker and add it to the map
  // For each row, columns `Latitude`, `Longitude`, and `Title` are required
  for (var i in data) {
    var row = data[i];

        // create popup contents
        var customPopup = "<h1>" + row.year + " " + row.location + "<b> Storm<b></h1><h2><br>Disaster Level: " + row.level + "<br>Country: " + row.country + ".</h2>"

        // specify popup options 
        var customOptions =
        {
          'maxWidth': '500',
          'className': 'custom'
        }

    var marker = L.circleMarker([row.latitude, row.longitude], {
      opacity: 50
    }).bindPopup(customPopup, customOptions);

    marker.on('mouseover', function (e) {
      this.openPopup();
    });
    marker.on('mouseout', function (e) {
      this.closePopup();
    });

    marker.setStyle({ fillColor: 'transparent', color: 'blue' }).addTo(map);
  }

});

$(document).ready(function () {
  $(".btn1").click(function () {
    $("p").hide();
  });
  $(".btn2").click(function () {
    $("p").show();
  });
});

JSC.Chart('chartDiv', {
  title_label_text: 'Distribution of Natural Disasters ',
  annotations: [{
    label_text: 'Source: NASA',
    position: 'bottom left'
  }],
  type: 'pie',
  series: [
     {
        points: [
           {x: 'Storm', y: 12323},
           {x: 'Earthquake', y: 405},
           {x: 'Landslide', y: 982},
           {x: 'Flood', y:17347},
           {x: 'Drought', y: 2938},
           {x: 'Extreme Temp', y: 3506},
           {x: 'Volcanic Activity', y: 405}
        ]
     }
  ]
});



/*Legend specific*/


var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += '<h4 >Disaster Types</h4>';
  div.innerHTML += '<i id="logo" style="background: blue"></i><span>Storm</span><br>';
  div.innerHTML += '<i id="logo" style="background: orange"></i><span>Earthquake</span><br>';
  div.innerHTML += '<i id="logo" style="background: pink"></i><span>Landslide</span><br>';
  div.innerHTML += '<i id="logo" style="background: green"></i></i><span>Drought</span><br>';
  div.innerHTML += '<i id="logo" style="background: red"></i><span>Extreme Temp<br>';
  div.innerHTML += '<i id="logo" style="background: purple"></i><span>Volcanic Activity<br>';
  
  return div;
};

legend.addTo(map);

