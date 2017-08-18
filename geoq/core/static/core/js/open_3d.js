function open3DView() {

	var xMin = aoi_feature_edit.map.getBounds().getWest();
	var yMin = aoi_feature_edit.map.getBounds().getSouth();
	var xMax = aoi_feature_edit.map.getBounds().getEast();
	var yMax = aoi_feature_edit.map.getBounds().getNorth();
	
/*	var windowParams = "location=yes,height=500,width=700,status=yes";
	var url = "http://geospatial-desktop.sil.arl.psu.edu:8080/apps/mage?west=" + xMin + "&south=" + yMin + "&east=" + xMax + "&north=" + yMax;
	var win = window.open(url, "_blank", windowParams);*/

//	openCesiumViewer(xMin, yMin, xMax, yMax);

	//create popup window
	var domain = 'http://geospatial-desktop.sil.arl.psu.edu:8080';
	var myPopup = window.open(domain + '/apps/mage/index.html?west='+ xMin + '&south=' + yMin + '&east=' + xMax + '&north=' + yMax, '_blank', 'width=1200,height=900');
	var cameraChangedByCesium = false;
    
    aoi_feature_edit.map.on('moveend', function(e) {
        var mapBounds = aoi_feature_edit.map.getBounds();
        console.log(mapBounds);
	    if(!cameraChangedByCesium) { //if GeoQ panTo was called by cesium don't post a message back to cesium
            myPopup.postMessage(mapBounds,domain); //send the map center coords and target URI
        }
        else {
            cameraChangedByCesium = false;
            return;
        }
	//cameraChangedByCesium = true;
    });
	//periodical message sender
	/*setInterval(function(){
		var message = 'Hello!  The time is: ' + (new Date().getTime());
		console.log('blog.local:  sending message:  ' + message);
		myPopup.postMessage(message,domain); //send the message and target URI
	},1000);*/	

	//listen for response back from Cesium window.
	if (cameraChangedByCesium) return;
	window.addEventListener('message',function(event) {
	if(event.origin !== 'http://geospatial-desktop.sil.arl.psu.edu:8080') return;
		//console.log('received response:  ',event.data);
		var latlngalt;
		var eventData  = event.data;
		var latlngalt = eventData.split(',');
		console.log(latlngalt[0] + ', ' + latlngalt[1]);
        cameraChangedByCesium = true;
        
		aoi_feature_edit.map.setView([latlngalt[0], latlngalt[1]], latlngalt[2]);
        
	},false);

}
