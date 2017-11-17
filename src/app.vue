<template>
	<div id='app'>
		<MyMap 	
                :parameter = 'parameter'
                :types = 'checked.trendTypes'
                :posneg = 'checked.trendResults'
                :provinces = 'checked.provinces'
                :gama = 'checked.gama'
                :depth='checked.depth'
                @toggleLoading = 'toggleLoading'
		></MyMap>

        <GridLoader :loading='isLoading' ></GridLoader>

		<MyLegend :showLegend='showControls'></MyLegend>

		<MyMenu :showControls = 'showControls'
                :trendTypes = 'checked.trendTypes'
                :trendResults = 'checked.trendResults'
                :provincesArr = 'checked.provinces'
                :depthArr = 'checked.depth'
				@provinces='updateProvinces' 
				@param = 'updateParam'
				@results = 'updateResults'
				@types = 'updateTypes'
                @gama = 'updateGAMA'
                @depth = 'updateDepth'
		></MyMenu>
	</div>
</template>

<script>
// import components
import MyMap from './components/MyMap';
import MyLegend from './components/Legend';
import MyMenu from './components/Menu';
import Loader from './components/Loader';
import GridLoader from 'vue-spinner/src/GridLoader.vue';


export default {
	name: 'App',
	data () {
	    return {
            checked: {
                trendTypes: ['Long Term'],
                trendResults: ['Significant Positive', 'Significant Negative'],
                provinces: [
                    'Klamath Mountains',
                    'Northern Coast Ranges',
                    'Sacramento Valley',
                    'San Joaquin Valley',
                    'Sierra Nevada',
                    'Southern Coast Ranges',
                    'Desert',
                    'Transverse and Selected Peninsular Range',
                    'San Diego'
                ],
                gama: false,
                depth: ['Above median well depth', 'Below median well depth', 'Unknown']
            },
	      	parameter: {
                value: ''
            },
            data: {}, //store geojson files previously loaded
	      	width: '', //will be set in onResize() that gets called on mount
	      	showControls: '',
	      	mobileBound: 600, //point at which css should break for smallest view
	    }
	},
	components: {
	 	MyMap, 
	 	MyLegend,
	 	MyMenu,
        GridLoader
	},
    mixins: [ Loader ],

	methods: {
	 	onResize() {
	 		this.width = window.innerWidth;
	 		if(this.width < this.mobileBound) {
	 			this.showControls = false;
	 		} else {
	 			this.showControls = true;
	 		}
	 	},
	 	updateProvinces(arr) {
	 		this.checked.provinces = arr;
	 	},
	 	updateParam(param) {
            this.parameter = param;
	 	},
	 	updateResults(arr) {
            console.log(arr.length);
            this.checked.trendResults = arr;
	 	},
	 	updateTypes(arr) {
            this.checked.trendTypes = arr;
	 	},
        updateGAMA() {
            this.checked.gama = !this.checked.gama;
        },
        updateDepth(arr){
            this.checked.depth = arr; //will update checkedObj computed in MyMap.vue
        }

	 },
	 mounted() {
	 	window.addEventListener('resize', this.onResize);
	 	this.onResize();
	 }
}
</script>

<style>

body {
    font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif;
    margin:0;
    padding:0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}

h1{
    font-size:12pt;
}

/* Container CSS */
#container {
    position: absolute;
    top: 50px;
    right: 10px;
    bottom: 50px;
    z-index: 1000;
    max-width:300px;
    background: white;
    padding: .5em;
    font-size:10pt;
}
#query{
    display:show;
}

.Shut{
  width:110px !important;
}

/* Legend CSS */
#legend{
    display:show;
}
#map_legend {
    padding:.5em;
	color: #404040;
	position: absolute;
	bottom: 10px;
	left: 10px;
	z-index: 1000;
    padding-bottom:20px;
}

.ShutL{
  width:110px !important;
  margin-bottom:-20px !important;
}

.leaflet-bar{
    background-color:white;
    font-family: 'Calibri','Helvetica Neue', Arial, Helvetica, sans-serif;
    font-size: 16px;
}
.leaflet-control-container{
    font-family: 'Calibri', 'Hevetica Neue', sans-serif;
    font-size: 16px;
}
.v-spinner{
    position: absolute;
    top: 50px;
    left: 50%;
    right: 50%;
    z-index: 1010;
}

/* CSS fix for links */
#blank{
    border:none;
    border-radius:0px;
    height:auto;
    width:20px;
    line-height:8pt;
    color:#1988d6;
    text-decoration:underline;
    display:inline-block;
   }


/* CSS for trends icons. LT=Long Term, Rec=Recent, Rev=Reversal, Sea=Seasonal */
/* NON-GAMA WELLS ICONS */
.LT20 {
    position: absolute;
    background: #499661;
    width: 24px;
    height: 24px;
    margin-left:-12px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 400;
}
.LT21 {
    position: absolute;
    background: #91f389;
    width: 24px;
    height: 24px;
    margin-left:-12px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 400;
}
.LT22 {
    position: absolute;
    background: #499661;
    width: 24px;
    height: 24px;
    margin-left:-12px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 400;
}

.Rec20 {
    position: absolute;
    background: #16bdf4;
    width: 20px;
    height: 20px;
    margin-left:-10px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 401;
}
.Rec21 {
    position: absolute;
    background: #9bdef4;
    width: 20px;
    height: 20px;
    margin-left:-10px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 401;
}
.Rec22 {
    position: absolute;
    background: #16bdf4;
    width: 20px;
    height: 20px;
    margin-left:-10px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 401;
}
.Rev20 {
    position: absolute;
    background: #ef7634;
    width: 16px;
    height: 16px;
    margin-left:-8px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 402;
}
.Rev21 {
    position: absolute;
    background: #f8c2a4;
    width: 16px;
    height: 16px;
    margin-left:-8px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 402;
}
.Rev22 {
    position: absolute;
    background: #ef7634;
    width: 16px;
    height: 16px;
    margin-left:-8px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 402;
}

.Sea20 {
    position: absolute;
    background: #E71D7E;
    width: 12px;
    height: 12px;
    margin-left:-6px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 403;
}
.Sea21 {
    position: absolute;
    background: #E585B3;
    width: 12px;
    height: 12px;
    margin-left:-6px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 403;
}
.Sea22 {
    position: absolute;
    background: #E71D7E;
    width: 12px;
    height: 12px;
    margin-left:-6px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 403;
}

.LT10{
    position: absolute;
    background: #666;
    width: 8px;
    height: 8px;
    margin-left:-4px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 404;
}
.Rec10{
    position: absolute;
    background: #666;
    width: 8px;
    height: 8px;
    margin-left:-4px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 404;
}
.Rev10{
    position: absolute;
    background: #666;
    width: 8px;
    height: 8px;
    margin-left:-4px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 404;
}

.Sea10{
    position: absolute;
    background: #666;
    width: 8px;
    height: 8px;
    margin-left:-4px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 404;
}

.LT00{
    position: absolute;
    background: #000;
    width: 4px;
    height: 4px;
    margin-left:-2px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 405;
  }
.Rec00{
    position: absolute;
    background: #000;
    width: 4px;
    height: 4px;
    margin-left:-2px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 405;
  }
.Rev00 {
    position: absolute;
    background: #000;
    width: 4px;
    height: 4px;
    margin-left:-2px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 405;
  }
.Sea00 {
    position: absolute;
    background: #000;
    width: 4px;
    height: 4px;
    margin-left:-2px;
    border: 1px solid black;
    border-radius: 50%;
    z-index: 405;
  }

/* GAMA WELLS ICONS */
.gLT20 {
    position: absolute;
    background: #499661;
    width: 24px;
    height: 24px;
    margin-left:-12px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 400;
}
.gLT21 {
    position: absolute;
    background: #91f389;
    width: 24px;
    height: 24px;
    margin-left:-12px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 400;
}
.gLT22 {
    position: absolute;
    background: #499661;
    width: 24px;
    height: 24px;
    margin-left:-12px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 400;
}

.gRec20 {
    position: absolute;
    background: #16bdf4;
    width: 20px;
    height: 20px;
    margin-left:-10px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 401;
}
.gRec21 {
    position: absolute;
    background: #9bdef4;
    width: 20px;
    height: 20px;
    margin-left:-10px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 401;
}
.gRec22 {
    position: absolute;
    background: #16bdf4;
    width: 20px;
    height: 20px;
    margin-left:-10px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 401;
}
.gRev20 {
    position: absolute;
    background: #ef7634;
    width: 16px;
    height: 16px;
    margin-left:-8px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 402;
}
.gRev21 {
    position: absolute;
    background: #f8c2a4;
    width: 16px;
    height: 16px;
    margin-left:-8px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 402;
}
.gRev22 {
    position: absolute;
    background: #ef7634;
    width: 16px;
    height: 16px;
    margin-left:-8px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 402;
}

.gSea20 {
    position: absolute;
    background: #E585B3;
    width: 12px;
    height: 12px;
    margin-left:-6px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 403;
}
.gSea21 {
    position: absolute;
    background: #E585B3;
    width: 12px;
    height: 12px;
    margin-left:-6px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 403;
}
.gSea22 {
    position: absolute;
    background: #E71D7E;
    width: 12px;
    height: 12px;
    margin-left:-6px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 403;
}

.gLT10{
    position: absolute;
    background: #666;
    width: 8px;
    height: 8px;
    margin-left:-4px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 404;
}
.gRec10{
    position: absolute;
    background: #666;
    width: 8px;
    height: 8px;
    margin-left:-4px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 404;
}
.gRev10{
    position: absolute;
    background: #666;
    width: 8px;
    height: 8px;
    margin-left:-4px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 404;
}
.gSea10{
    position: absolute;
    background: #666;
    width: 8px;
    height: 8px;
    margin-left:-4px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 404;
}
.gLT00{
    position: absolute;
    background: #000;
    width: 4px;
    height: 4px;
    margin-left:-2px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 405;
  }
.gRec00{
    position: absolute;
    background: #000;
    width: 4px;
    height: 4px;
    margin-left:-2px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 405;
  }
.gRev00{
    position: absolute;
    background: #000;
    width: 4px;
    height: 4px;
    margin-left:-2px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 405;
  }
  .gSea00{
    position: absolute;
    background: #000;
    width: 4px;
    height: 4px;
    margin-left:-2px;
    border-top: 4px solid purple;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-radius: 50%;
    z-index: 405;
  }
.g{
    background: #fff;
    width: 24px;
    height: 24px;
    border-top: 4px solid purple;
    border-radius: 50%;
}

.empty{
    position:absolute;
    width:0px;
    height:0px;
    opacity:0.0;
    z-index: -1 !important;
}

</style>

