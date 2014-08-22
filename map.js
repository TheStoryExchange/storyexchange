
L.mapbox.accessToken = 'pk.eyJ1IjoiamFtZXMtbGFuZS1jb25rbGluZyIsImEiOiJ3RHBOc1BZIn0.edCFqVis7qgHPRgdq0WYsA';
var map = L.mapbox.map('map', 'james-lane-conkling.5630f970')
    .setView([41, -95.0], 5);

var stops = L.mapbox.featureLayer()
    .loadURL('stops.geojson')
    .addTo(map)
    .on('ready',function(){
        this.eachLayer(function(convo){
            var p = convo.feature.properties;
            var img = 'http://media.tumblr.com/dd0f48cfff498f22e356a4af6b332315/tumblr_inline_n3qo2jJPsN1ro2f0s.jpg'
            var content = "<h3 class='title'>" + p.title + "</h3>" +
                "<div class='desc'>" + p.text + "</div>" +
                "<div>" +
                    "<div class='photo'><span class='arrow'></span>click</div>" +
                    "<img src=" + img + " />" +
                "</div>";
            convo.bindPopup(content);

            // convo.on('click', function(){
            //     var latlon = convo.getLatLng();
            //     map.setView(latlon, 10);
            // });
        });
    });

