
function CreateBlastRing (lat, lon, bombType) {
    
    var buildingEvacDist, outdoorEvacDist;
    
    switch(bombType) {
    case '1':
        buildingEvacDist = 21 //meters
        outdoorEvacDist = 259 //meters
        break;
    case '2':
        buildingEvacDist = 46 //meters
        outdoorEvacDist = 564 //meters
        break;
    case '3':
        buildingEvacDist = 98 //meters
        outdoorEvacDist = 457 //meters
        break;
    case '4':
        buildingEvacDist = 122 //meters
        outdoorEvacDist = 533 //meters
        break;
    case '5':
        buildingEvacDist = 183 //meters
        outdoorEvacDist = 838 //meters
        break;
   
}
    //alert(lat + ',' + lon);
    
    //need to figure out how to render the two circles different colors.
    var evacCircle;
    
    if (evacCircle != undefined) {
        
        map.removeLayer(evacCircle);
        alert('removed evacCircle');
        
    }
    
       evacCircle = L.circle([lat,lon], outdoorEvacDist, {
            color: '#f07300',
            fillOpacity: 0,
            opacity: 0.5
                            
        }).addTo(aoi_feature_edit.map);
}

function addIED2Map(bombType) {
        
        if(bombType=='0') {
            alert('Please select a bomb type.');
            return;
        }
        
        aoi_feature_edit.map.on('click', function(e) {
            
             var geojsonFeature = {

        "type": "Feature",
        "properties": {},
        "geometry": {
                "type": "Point",
                "coordinates": [e.latlng.lat, e.latlng.lng]
        }
    }
            
            
    var marker;

    L.geoJson(geojsonFeature, {

        pointToLayer: function(feature, latlng){

            marker = L.marker(e.latlng, {

                title: "Resource Location",
                alt: "Resource Location",
                riseOnHover: true,
                draggable: true,

            }).bindPopup("<input type='button' value='Delete this marker' class='marker-delete-button'/>");

            marker.on("popupopen", onPopupOpen);

            return marker;
        }
    }).addTo(aoi_feature_edit.map);
            
            CreateBlastRing(e.latlng.lat, e.latlng.lng, bombType);
            
             });
    
    
    
}

function onPopupOpen() {

    var tempMarker = this;

    // To remove marker on click of delete button in the popup of marker
    $(".marker-delete-button:visible").click(function () {
        aoi_feature_edit.map.removeLayer(tempMarker);
    });
}

