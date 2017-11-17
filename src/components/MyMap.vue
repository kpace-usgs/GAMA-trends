<template>
	<div id='mapDiv'></div>
		
</template>

<script>

/* import everything needed in this script*/
import L from 'leaflet'
import esri from 'esri-leaflet';
import buildMarker from '../functions/buildMarker.js'
import buildPopup from '../functions/buildPopup.js'
import makeFilter from '../functions/makeFilter.js'
import Loader from './Loader.vue';
import mapLogic from '../functions/mapLogic.vue';


export default {
	name: 'MyMap',
	props: [ 'parameter', 'types', 'posneg', 'provinces', 'gama', 'depth'],
	data() {
		return {
			map: '',
			markerGroup: L.featureGroup(),
			trendsLayer: ''
		}
	},

	mixins: [ mapLogic ],
	mounted() {
		this.map = L.map('mapDiv').setView([37.7, -120.57], 6).addLayer(this.markerGroup);

		this.loadOverlays();
	},

	computed: {
	
		checkedObj() {
			return {
				provinces: this.provinces,
				trend_on: this.types,
				posneg_on: this.posnegNum,
				gama_on: this.gama,
				depth: this.depth
			}
		}
	},
	watch: {
		checkedObj() {
			
			console.log('changed objec');
			this.markerGroup.clearLayers();

			if(this.isMenuClear || this.parameter.value == ''){
				console.log('clear map')
				// not enough menu options selected, clear map but don't query server
			} 
			else if(this.parameter.value !== ""){
				this.$emit('toggleLoading', true);
				return this.getFromServer();
			}
		},

		parameter(){
			this.change();
		}
	},
	methods: {
		change() {
		    this.markerGroup.clearLayers(); //clear the markers from the feature group on the map
	        this.$emit('toggleLoading', true);
	        // get data from arcserver
	        this.getFromServer();
		},

		getFromServer(){
			var that = this;

			var defs = this.getFilterDefs(); //returns a long SQL query string
			console.log(defs);

			var parameter = this.parameter.value;

			/* use esri-leaflet.query() to return a featureCollection from the layer mapped to the selected parameter */
			esri.query({
				url: 'https://igswcawwwb1301.wr.usgs.gov:6443/arcgis/rest/services/GAMA_PSWT_WebMap/MapServer/'+this.parameter.layer
			})
			.where(defs)
			.run( (err, fc, res) => {
				if(err){
					return alert('An error has occurred.')
				}
				console.log(fc);

				if(fc.features.length < 1){
					alert('no wells returned. Please expand your selection.')
				}

				/* save as layer */
				var layer = L.geoJSON(fc, {
					pointToLayer: (feature, latlng) => {
						var html = buildMarker(that.checkedObj, feature);
						
						return L.marker(latlng, {
							icon: L.divIcon({
								iconSize: null,
								html: html
							})
						});
					}
				}).bindPopup(function(layer) {
					console.log(layer.feature.properties);
					return buildPopup(layer.feature, parameter);
				});

				that.addLayer(layer);
			});
		},

		addLayer(layer){
			
			this.trendsLayer = layer;
			if(this.markerGroup.hasLayer(this.trendsLayer)){
				this.trendsLayer.redraw();
			}
			else {
				this.markerGroup.addLayer(this.trendsLayer);
			}
			
			this.$emit('toggleLoading', false);
		},

		loadOverlays(){
	
			var baseLayers = {
				"Grayscale": L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', 
						{ attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ' }
				),
				"Topography": L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', 
					{ attribution:  'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
					}
				),
				"Terrain" :  L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.{ext}', 
					{attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
						subdomain: 'abcd', 
						ext: 'png'
					}
				)
			};

			// get province polygon layer from gama basin map arc server
			var overlays = {
				"Show Provinces": esri.dynamicMapLayer({
					url: 'https://arcgis.wr.usgs.gov:6443/arcgis/rest/services/base/MapServer',
					layers: [4]
				})
			};

			baseLayers.Topography.addTo(this.map);

			L.control.layers(baseLayers, overlays, {collapsed: true}).setPosition('topleft').addTo(this.map);
		}
	}
}
</script>

<style> 

#mapDiv{
	height: 100%;
	min-height: 100vh;
	width: 100%;
}


</style>