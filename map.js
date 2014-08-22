
L.mapbox.accessToken = 'pk.eyJ1IjoiamFtZXMtbGFuZS1jb25rbGluZyIsImEiOiJ3RHBOc1BZIn0.edCFqVis7qgHPRgdq0WYsA';
var map = L.mapbox.map('map', 'james-lane-conkling.5630f970')
    .setView([41, -95.0], 5);

var stops = L.mapbox.featureLayer()
    .loadURL('stops.geojson')
    .addTo(map)
    .on('ready',function(){
        this.eachLayer(function(stop){
            stop.on('click', function(){
                var latlon = stop.getLatLng();
                console.log(latlon);
                map.setView(latlon, 10);
            });
        });
    });

