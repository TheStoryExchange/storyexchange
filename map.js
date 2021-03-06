var sexchange = (function(L){
  var se = {
    global: function(){
      this.initMap();
      se.stops = omnivore.geojson('stops.geojson').on('ready', this.addStops).addTo(se.map);
      // se.mail = omnivore.geojson('mail.geojson').on('ready', this.addMail).addTo(se.map);
      // se.stops.on('click',se.centerOnClick);
    },
    initMap: function(){
      L.mapbox.accessToken = 'pk.eyJ1IjoiamFtZXMtbGFuZS1jb25rbGluZyIsImEiOiJ3RHBOc1BZIn0.edCFqVis7qgHPRgdq0WYsA';
      se.map = L.mapbox.map('map', 'james-lane-conkling.5630f970', {
        center: [41, -95.0],
        zoom: 5,
        minZoom: 5,
        maxBounds: [[20.00,-140.00],[62.00,-54.00]]
      });
    },
    addStops: function(){
      var routePoints = [],
          routePointsIndex = [],
          futureRoutePoints = [],
          futureRoutePointsIndex = [];

      this.eachLayer(function(marker){
        var p = marker.toGeoJSON().properties;
        se.colorMarker(marker);
        se.addPopup(marker);
        marker.on('click', se.centerOnClick);

        // collect latlon pairs sorted by marker id:
          // routePointIndex stores a sorted list of all marker ids
          // findInsertPosition adds a marker id to routePointIndex and returns the index of the added element
        if(p.status === 'visited'){
          newRoutePointIndex = findInsertPosition(p.id, routePointsIndex);
          routePoints.splice(newRoutePointIndex, 0, marker.getLatLng());
        }else{
          newRoutePointIndex = findInsertPosition(p.id, futureRoutePointsIndex);
          futureRoutePoints.splice(newRoutePointIndex, 0, marker.getLatLng());
        }

        function findInsertPosition(newElement, array){
          for(var i=0;i<array.length;i++){
            if(newElement < array[i]){
              array.splice(i,0,newElement);
              return i;
            }
          }
          // if array is empty or newElement is larger than array[-1]
          array.push(newElement);
          return array.length - 1;
        }
      });

      var route = L.polyline(routePoints,{
        color: '#323232',
        weight: 1.4
      }).addTo(se.map);

      // add last of routePoints to beginning of futureRoute
      futureRoutePoints.splice(0,0,routePoints[routePoints.length -1]);
      var futureRoute = L.polyline(futureRoutePoints,{
        color: '#323232',
        weight: 1.4,
        dashArray: '2,4'
      }).addTo(se.map);
    },
    addMail: function(){
      this.eachLayer(function(marker){
        var p = marker.toGeoJSON().properties;

        marker.setIcon(L.mapbox.marker.icon({
                    'marker-color': '#ab161a',
                    'marker-size': 'small'
                }));
        // set popup
        var content = "<div class='message'>" + p.message + "</div>";
        marker.bindPopup(content);

      });
    },
    colorMarker: function(marker){
      var p = marker.toGeoJSON().properties;

      if(p.status === 'visited'){
        marker.setIcon(L.mapbox.marker.icon({
            'marker-color': '#ff33cc'
        }));
      }else{
        marker.setIcon(L.mapbox.marker.icon({
            'marker-color': '#99ff00'
        }));
      }
    },
    addPopup: function(marker){
      var p = marker.toGeoJSON().properties;
      content = ["<h3 class='title'>", [p.title], "</h3>",
          "<div class='desc'>", p.text, "</div>"];
      if(p.photo){
        var i = 1;
        i++;
        content = content.concat([
          "<div>",
          // "<div class='photo'><span class='arrow'></span>click</div>" +
            "<a href=", p.photo, " target='_blank'>",
              "<img src=", p.photo, " />",
            "</a>",
          "</div>"]);
      }
      marker.bindPopup(content.join(''));
    },
    centerOnClick: function(){
      var latLng = this.getLatLng();
      se.map.setView(latLng);
    }
  }
  return se;
})(L);

sexchange.global();
