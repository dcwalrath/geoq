var  rings = new L.FeatureGroup();
 var buildingStandoffDist, outdoorStandoffDist;

function removeFeaturesFromGroup(group){
        
        group.clearLayers();
        
}
function SetStandOffDist(bombType) {
    if(bombType=='0') {
            alert('Please select a bomb type.');
            return;
        }
     switch(bombType) {
    case '1':
        buildingStandoffDist = 21 //meters
        outdoorStandoffDist = 259 //meters
        break;
    case '2':
        buildingStandoffDist = 46 //meters
        outdoorStandoffDist = 564 //meters
        break;
    case '3':
        buildingStandoffDist = 98 //meters
        outdoorStandoffDist = 457 //meters
        break;
    case '4':
        buildingStandoffDist = 122 //meters
        outdoorStandoffDist = 533 //meters
        break;
    case '5':
        buildingStandoffDist = 183 //meters
        outdoorStandoffDist = 838 //meters
        break;
    }
}

function CreateRingsFromMapClick (bombType) {
    
   SetStandOffDist(bombType);    
   
    
    aoi_feature_edit.map.on('click', function myCallback(e){
        
        removeFeaturesFromGroup(rings); //remove any existing rings from the feature group
       
        var lat = e.latlng.lat; //get lat
        var lon = e.latlng.lng; //get lon
        
        //create the building off-set ring
        var bldgEvacRing = L.circle([lat,lon], buildingStandoffDist, {
            color: '#C600A0',
            fillColor: '#C600A0',
            fillOpacity: 0.5,
            opacity: 0.5              
        }).addTo(rings);
       
        //create the outdoor off-set ring
        var outdrEvacRing = L.circle([lat,lon], outdoorStandoffDist, {
            color: '#008ABF',
            fillColor: '#008ABF',
            fillOpacity: 0.5,
            opacity: 0.5              
        }).addTo(rings);
        
        aoi_feature_edit.map.addLayer(rings);
        aoi_feature_edit.map.off('click', myCallback); //this prevents user from adding more multiple stand-off rings
       
   });
    
}

function CreateRingsFromCoords (bombType, lat, lon) {
    //alert(bombType + "," + lat + ", " + lon);
   SetStandOffDist(bombType);    
   
    
    
        
        removeFeaturesFromGroup(rings); //remove any existing rings from the feature group
       
        
        
        //create the building off-set ring
        var bldgEvacRing = L.circle([lat,lon], buildingStandoffDist, {
            color: '#C600A0',
            fillColor: '#C600A0',
            fillOpacity: 0.5,
            opacity: 0.5              
        }).addTo(rings);
       
        //create the outdoor off-set ring
        var outdrEvacRing = L.circle([lat,lon], outdoorStandoffDist, {
            color: '#008ABF',
            fillColor: '#008ABF',
            fillOpacity: 0.5,
            opacity: 0.5              
        }).addTo(rings);
        
        aoi_feature_edit.map.addLayer(rings);
        //mymap.off('click', myCallback); //this prevents user from adding more multiple stand-off rings
       
  
    
}
