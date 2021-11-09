// intial map settings
var mymap = L.map('map',
	{
		zoomControl:false,//custom zoom control
		minZoom: 11,
    	maxZoom: 18,
		maxBounds: [[41.15, 13.90], [42.5, 14.24]],
		fullscreenControl:true
}).setView([41.55518701, 14.087], 11);

L.control.zoom({
    position:'topright'// default is topleft
}).addTo(mymap);

L.control.scale().addTo(mymap); // add scale bar

// custom attribution
mymap.attributionControl.addAttribution('powered by<a href="http://www.naturagis.it" target="_blank"> <img src ="https://www.naturagis.it/wp-content/uploads/2021/10/NG-minimini.png" width = "2%"> naturagis</a>');

// loading some basemaps
var mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		  maxZoom: 21,attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		  id: 'mapbox/streets-v11',
		  tileSize: 512,
		  zoomOffset: -1}).addTo(mymap);
var google = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
	attribution: '&copy;Immagini ©2020 CNES / Airbus,Landsat / Copernicus,Maxar Technologies,Dati cartografici ©2020 '
	});

var IGM = L.tileLayer('https://ludovico85.github.io/custom_XYZ_tiles/IGM_cisav/{z}/{x}/{-y}.png', {
    tms: true,
	opacity: 1,
	attribution: '<a href = "https://github.com/ludovico85/custom_XYZ_tiles">IGM</a>'
	});

var baseMaps = {
    "Mapbox": mapbox,
    "Google Satellite": google,
	"IGM": IGM
};

// function for custom selection of baseMaps
//function myFun () {
//	x = document.getElementById("basemaps").value
//	console.log(x)
//	if (x === 'mapbox') {
//		mymap.addLayer(mapbox)
//		mymap.removeLayer(google)
//		mymap.removeLayer(IGM)
//	}
//	if (x === 'google') {
//		mymap.addLayer(google)
//		mymap.removeLayer(mapbox)
//		mymap.removeLayer(IGM)
//	}
//	if (x === 'IGM') {
//		mymap.addLayer(IGM)
//		mymap.removeLayer(mapbox)
//		mymap.removeLayer(google)
//	}
//};

// function for opening sidebar on click
//var results = [];
//open sidebar and more content when clicking button in popup
//var thisResult;
//function openSidebar(ID) {
//	if ($('#sidebar-text').text().length > 0) {
//		$("#sidebar-text").removeText();
//	}
//for (var i = 0, len = results.length; i < len; i++) {
//	if (results[i].fid === parseInt(ID)) {
//		thisResult = (results[i]);
//	}}
//sidebar.open('info');
//var divToAddContent = document.getElementById('geotext');
//divToAddContent.innerHTML = '<h6>Comune: '+thisResult.properties.Comune+'';}
//console.log(results);

// loading geoJson
// custom icon
var custom_icon = new L.AwesomeMarkers.icon ({
	icon: 'tint',
	prefix: 'fa',
	markerColor: 'red'
	//iconSize: [30,30]
});

// function for categorized symbols
function presidio_style(feature, latlng) {
	switch(feature.properties["presidio"]){
		case "Fontana":
			var fontanaIcon = new L.AwesomeMarkers.icon ({
				icon: 'faucet',
				prefix: 'fa',
    			markerColor: 'blue',
				//iconSize: [30,30]
			});
			return L.marker(latlng, {icon: fontanaIcon});
		case "Sorgente":
			var sorgenteIcon = new L.AwesomeMarkers.icon ({
				icon: 'tint',
				prefix: 'fa',
    			markerColor: 'cadetblue',
				//iconSize: [30,30]
			});
			return L.marker(latlng, {icon: sorgenteIcon});
		case "Opere idrauliche":
			var opereIcon = new L.AwesomeMarkers.icon ({
				icon: 'tint-slash',
				prefix: 'fa',
    			markerColor: 'blue'
			});
			return L.marker(latlng, {icon: opereIcon});
		case "Rudere":
			var rudereIcon = new L.AwesomeMarkers.icon ({
				icon: 'dungeon',
				prefix: 'fa',
    			markerColor: 'darkpurple'
				//new L.icon ({
				//iconUrl: 'ico/noun_Water_4271711.png',
				//iconSize: [30,30]
			});
			return L.marker(latlng, {icon: rudereIcon});
		case "Corso d'acqua":
			var corsoIcon = new L.AwesomeMarkers.icon ({
				icon: 'stream',
				prefix: 'fa',
    			markerColor: 'cadetblue',
				//iconSize: [30,30]
			});
			return L.marker(latlng, {icon: corsoIcon});
		};
	};

// loading poi_acquedotto geoJson
var poi_acquedotto = new L.geoJson(poi_acquedotto, {
	pointToLayer: function (feature, layer) {
    return L.marker(layer, {icon: custom_icon});},
	onEachFeature: function (feature, layer) {
	//results.push(feature.properties);
	layer.bindPopup('<table class="table"><tbody><tr><td>Comune</td><td>'+feature.properties.Comune+'</td></tr><tr><td>Località</td><td>'+feature.properties.Localita+'</td></tr><tr><td colspan="2"><img src=' + feature.properties.Foto_low +' " width=100%/></td></tr><tr><td colspan = "2"> <p>'+feature.properties.Credits+'</p></td></tr><tr><td>Descrizione</td><td>'+feature.properties.Descrizione+'</td></tr><tr><tr class="text-center"><td colspan="2"><a href="'+feature.properties.COLLEGAMENTI+'" class="btn btn-primary btn-sm" role="button" target="_blank">Apri il link</a></td></tr></tbody></table>')}
}).addTo(mymap);

// loading all cisav point
//var cisav_acque_all = new L.geoJson(cisav_acque, {
//	pointToLayer: presidio_style,
//	style: presidio_style,
//	onEachFeature: function (feature, layer) {
//	layer.bindPopup('<table class="table"><tbody><tr><td>Comune</td><td>'+feature.properties.Comune+'</td></tr><tr><td>Denominazione/<br>toponimo</td><td>'+feature.properties.denominazione+'</td></tr><tr><td colspan="2"><img src=' + feature.properties.Foto_low +' " width=100%/></td></tr><tr><td>Tipo di presidio</td><td> '+feature.properties.presidio+'</p></td></tr><tr><td>Corso d&#39acqua</td><td>'+feature.properties.corso+'</td></tr><tr><td>Quota m s.l.m.</td><td>'+feature.properties.quota+'<//td></tr><tr><td>Descrizione</td><td>'+feature.properties.Descrizione+'</td></tr><tr><td>Fonte dati</td><td>'+feature.properties.Fonte+'</td></tr><tr><tr class="text-center"><td colspan="2"><a href="'+feature.properties.COLLEGAMENTI+'" class="btn btn-primary btn-sm" role="button" target="_blank">Apri il link</a></td></tr></tbody></table>')}
//})//.addTo(mymap);

// filter cisav point based on presidio attribute
var cisav_sorgenti = new L.geoJson(cisav_acque, {
	filter: function (feature, layer) {
	return (feature.properties.presidio === "Sorgente")},
	pointToLayer: presidio_style,
	style: presidio_style,
	onEachFeature: function (feature, layer) {
	layer.bindPopup('<table class="table"><tbody><tr><td>Comune</td><td>'+feature.properties.Comune+'</td></tr><tr><td>Denominazione/<br>toponimo</td><td>'+feature.properties.denominazione+'</td></tr><tr><td colspan="2"><img src=' + feature.properties.Foto_low +' " width=100%/></td></tr><tr><td>Tipo di presidio</td><td> '+feature.properties.presidio+'</p></td></tr><tr><td>Corso d&#39acqua</td><td>'+feature.properties.corso+'</td></tr><tr><td>Quota m s.l.m.</td><td>'+feature.properties.quota+'</td></tr><tr><td>Descrizione</td><td>'+feature.properties.Descrizione+'</td></tr><tr><td>Fonte dati</td><td>'+feature.properties.Fonte+'</td></tr><tr><tr class="text-center"><td colspan="2"><a href="'+feature.properties.COLLEGAMENTI+'" class="btn btn-primary btn-sm" role="button" target="_blank">Apri il link</a></td></tr></tbody></table>')}
}).addTo(mymap);

var cisav_fontane = new L.geoJson(cisav_acque, {
	filter: function (feature, layer) {
	return (feature.properties.presidio === "Fontane")},
	pointToLayer: presidio_style,
	style: presidio_style,
	onEachFeature: function (feature, layer) {
	layer.bindPopup('<table class="table"><tbody><tr><td>Comune</td><td>'+feature.properties.Comune+'</td></tr><tr><td>Denominazione/<br>toponimo</td><td>'+feature.properties.denominazione+'</td></tr><tr><td colspan="2"><img src=' + feature.properties.Foto_low +' " width=100%/></td></tr><tr><td>Tipo di presidio</td><td> '+feature.properties.presidio+'</p></td></tr><tr><td>Corso d&#39acqua</td><td>'+feature.properties.corso+'</td></tr><tr><td>Quota m s.l.m.</td><td>'+feature.properties.quota+'</td></tr><tr><td>Descrizione</td><td>'+feature.properties.Descrizione+'</td></tr><tr><td>Fonte dati</td><td>'+feature.properties.Fonte+'</td></tr><tr><tr class="text-center"><td colspan="2"><a href="'+feature.properties.COLLEGAMENTI+'" class="btn btn-primary btn-sm" role="button" target="_blank">Apri il link</a></td></tr></tbody></table>')}
}).addTo(mymap);

var cisav_opere_idrauliche = new L.geoJson(cisav_acque, {
	filter: function (feature, layer) {
	return (feature.properties.presidio === "Opere idrauliche")},
	pointToLayer: presidio_style,
	style: presidio_style,
	onEachFeature: function (feature, layer) {
	layer.bindPopup('<table class="table"><tbody><tr><td>Comune</td><td>'+feature.properties.Comune+'</td></tr><tr><td>Denominazione/<br>toponimo</td><td>'+feature.properties.denominazione+'</td></tr><tr><td colspan="2"><img src=' + feature.properties.Foto_low +' " width=100%/></td></tr><tr><td>Tipo di presidio</td><td> '+feature.properties.presidio+'</p></td></tr><tr><td>Corso d&#39acqua</td><td>'+feature.properties.corso+'</td></tr><tr><td>Quota m s.l.m.</td><td>'+feature.properties.quota+'</td></tr><tr><td>Descrizione</td><td>'+feature.properties.Descrizione+'</td></tr><tr><td>Fonte dati</td><td>'+feature.properties.Fonte+'</td></tr><tr><tr class="text-center"><td colspan="2"><a href="'+feature.properties.COLLEGAMENTI+'" class="btn btn-primary btn-sm" role="button" target="_blank">Apri il link</a></td></tr></tbody></table>')}
}).addTo(mymap);

var cisav_rudere = new L.geoJson(cisav_acque, {
	filter: function (feature, layer) {
	return (feature.properties.presidio === "Rudere")},
	pointToLayer: presidio_style,
	style: presidio_style,
	onEachFeature: function (feature, layer) {
	layer.bindPopup('<table class="table"><tbody><tr><td>Comune</td><td>'+feature.properties.Comune+'</td></tr><tr><td>Denominazione/<br>toponimo</td><td>'+feature.properties.denominazione+'</td></tr><tr><td colspan="2"><img src=' + feature.properties.Foto_low +' " width=100%/></td></tr><tr><td>Tipo di presidio</td><td> '+feature.properties.presidio+'</p></td></tr><tr><td>Corso d&#39acqua</td><td>'+feature.properties.corso+'</td></tr><tr><td>Quota m s.l.m.</td><td>'+feature.properties.quota+'</td></tr><tr><td>Descrizione</td><td>'+feature.properties.Descrizione+'</td></tr><tr><td>Fonte dati</td><td>'+feature.properties.Fonte+'</td></tr><tr><tr class="text-center"><td colspan="2"><a href="'+feature.properties.COLLEGAMENTI+'" class="btn btn-primary btn-sm" role="button" target="_blank">Apri il link</a></td></tr></tbody></table>')}
}).addTo(mymap);

var cisav_corso_acqua = new L.geoJson(cisav_acque, {
	filter: function (feature, layer) {
	return (feature.properties.presidio === "Corso d'acqua")},
	pointToLayer: presidio_style,
	style: presidio_style,
	onEachFeature: function (feature, layer) {
	layer.bindPopup('<table class="table"><tbody><tr><td>Comune</td><td>'+feature.properties.Comune+'</td></tr><tr><td>Denominazione/<br>toponimo</td><td>'+feature.properties.denominazione+'</td></tr><tr><td colspan="2"><img src=' + feature.properties.Foto_low +' " width=100%/></td></tr><tr><td>Tipo di presidio</td><td> '+feature.properties.presidio+'</p></td></tr><tr><td>Corso d&#39acqua</td><td>'+feature.properties.corso+'</td></tr><tr><td>Quota m s.l.m.</td><td>'+feature.properties.quota+'</td></tr><tr><td>Descrizione</td><td>'+feature.properties.Descrizione+'</td></tr><tr><td>Fonte dati</td><td>'+feature.properties.Fonte+'</td></tr><tr><tr class="text-center"><td colspan="2"><a href="'+feature.properties.COLLEGAMENTI+'" class="btn btn-primary btn-sm" role="button" target="_blank">Apri il link</a></td></tr></tbody></table>')}
}).addTo(mymap);

// create overlaymaps for L.control.layers
var overlayMaps = {
    "Fontane": cisav_fontane,
    "Sorgenti": cisav_sorgenti,
	"Corsi d'acqua":cisav_corso_acqua,
	"Opere idrauliche":cisav_opere_idrauliche,
	"Rudere": cisav_rudere,
	"POI Acquedotto romano di Venafro":poi_acquedotto,
};

// L.control.layers
L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(mymap);

// create the sidebar instance and add it to the map
var sidebar = L.control.sidebar({container:'sidebar'}).addTo(mymap).open('home');
// add panels dynamically to the sidebar
sidebar.addPanel({
id:'basemaps_header',
tab:'<i class="fas fa-globe-europe"></i>',
title:'Basemaps',
//pane:'<select id="basemaps" class="form-control m-1" style="width:100%" onchange="myFun()"><option value="mapbox">MapBox</option><option value="google">Google Satellite</option><option value="IGM">IGM</option></select>',
//button: function() { alert('opened via JS callback') },
//disabled: true,
})
sidebar.addPanel({
id:   'info',
tab:  '<i class="fas fa-globe-europe"></i>',
title: 'Informazioni',
pane: '<p id="geotext"></p>'
//button: function() { alert('opened via JS callback') },
//disabled: true,
})

// be notified when a panel is opened
sidebar.on('content', function (ev) {
switch (ev.id) {
case 'autopan':
sidebar.options.autopan = true;
break;
default:
sidebar.options.autopan = false;
}
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//document.getElementById("bringToBack").addEventListener
// funzione necessaria all'apertura della sidebar
//function myFunction(){
//	var ID = $(this).attr("data");
//	openSidebar(ID);
//};


$("div").on("click", '.sidebar-open-button', function () {
var ID = $(this).attr('data');
openSidebar(ID);
x=ID
});

console.log(x)
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
