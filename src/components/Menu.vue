<template>
	<div id='container' class='leaflet-bar container'>
		<ToggleBar @click='toggleControls' :show='showControls'>
			<h1 slot='title'>GAMA - Priority Basin Project*<br/>Water Quality Trends in Public Supply Wells, 1974 - 2014</h1>
			<h2 slot='elseTitle'>Show Menu +</h2>
		</ToggleBar>


		<div id='query' v-if='showControls'>
			<!-- PROVINCES -->
			<div>
				<h2>Select Province: </h2>
				<span>Select one or more provinces to show data in that area (click triangle to expand list of provinces) </span><br/>
				
				<div style='display: flex;'>
					<input type='checkbox' id='all' value='all' v-model='selectAllProvinces' >
					<label>Select All</label>
					<div @click='() => toggleProvinces = !toggleProvinces' style='height: 20px;' id='provinceToggle'>
						<icon name='sort-down' v-if='toggleProvinces' scale='1.4' :color='provinces.length === 0 ? "#896FC3" : "black"'></icon>
						<icon name='sort-up' v-else scale='1.4' :color='provinces.length === 0 ? "#896FC3" : "black"'></icon>
					</div>
				</div>
				<div v-if='toggleProvinces'>
					<div v-for="(province, index) in listOfProvinces">
						<input type='checkbox' :id='province' :value='province' v-model='provinces'  :key='index'>
						<label for='province'>{{province}}</label>
					</div>
				</div>
			</div>


			<!-- PARAMETER that will load a csv -->
			<div>
				<h2>Select Parameter: </h2>
				<select v-model='parameter' :class='{highlighted: parameter=="", shaded: parameter != ""}'>
					<option disabled value=''></option>
					<option v-for='param in listOfParameters' :value='param' >{{param.name}}</option>
				</select>
			</div>
	
			<!-- GAMA ONLY -->
			<div>
				<input type='checkbox' value='GAMA' @click='handleGAMA' v-model='GAMA'>
				<label>Show GAMA Sites Only</label>
			</div>

			
			<!-- TREND TYPE: SEASONAL, RECENT, LONG TERM, REVERSAL -->
			<div>
				<h2 >Pick Trend Type: </h2>
				<div v-for="(type, index) in listOfTypes">
					<input type='checkbox' :id='type' :value='type' v-model='types' :key='index'>
					<label for='type'>{{type}}</label>
				</div>
			</div>


			<!-- TREND RESULT: POS, NEG, NOT SIG, NOT TESTED -->
			<div>
				<h2>Pick Trend Result: </h2>
		
				<input type='checkbox' value='all' v-model='selectAllResults' style='margin: 9px 5px;'>
				<label>Select All</label>

				<div v-for="(result, index) in listOfResults">
					<input type='checkbox' :id='result' :value='result' v-model='results' :key='index'>
					<label for='result'>{{result}}</label>
				</div>
			</div>

			<!-- FILTER BY WELL DEPTH -->
			<div>
				<h2>Filter By Well Depth</h2>
				<div v-for='(depth, index) in listOfDepths'>
					<input type='checkbox' :id='depth' :value='depth' v-model='depths' :key='index'>
					<label for='depth'>{{depth}}</label>
				</div>
			</div>


			<p style="font-size:small; line-height: 1em;" class='small'> *The GAMA - PBP is a cooperative program between the <a href='http://www.swrcb.ca.gov/gama/' target='_blank' style='width: 100%; margin: 0;display: inline; line-height: 10px;'>California State Water Resources Control Board</a> and the <a href='/index.html' target='_blank' style='width: 100%; margin: 0; display: inline; border-bottom: 1px solid silver;'>U.S. Geological Survey</a>.</p>
			<p style="font-size:small; line-height:1em;">
			Data for all sites can be found at<br /><a id="blank" href="http://geotracker.waterboards.ca.gov/gama/" target="_blank" style='width: 100%; margin: 0;display: inline;'>http://geotracker.waterboards.ca.gov/gama/</a>.</p>

			<!-- <a style="width: 100%; text-align: left;  text-decoration: underline; margin: 0;" href='./dist.zip'>Download site</a> -->
		</div>

	</div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import listOfParameters from '../assets/parameters.json';
import ToggleBar from './ToggleBar.vue'
import 'vue-awesome/icons/sort-down'
import 'vue-awesome/icons/sort-up'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
	name: 'MyMenu',
	props: [ 'showControls', 'trendTypes', 'trendResults', 'provincesArr', 'depthArr' ],
	components: { ToggleBar, Multiselect},
	data() {
		return {
			GAMA: false,
			provinces: this.provincesArr,
			types: this.trendTypes,
			results: this.trendResults,
			depths: this.depthArr,
			parameter: {
				value: "",
				name: ""
			},
			listOfProvinces: [
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
			listOfTypes: [
				'Long Term',
				'Recent',
				'Reversal',
				'Seasonal'
			],
			listOfResults: [
				'Significant Positive',
				'Significant Negative',
				'Not Significant',
				'Not Tested'
			],
			listOfDepths: ['Above median well depth', 'Below median well depth', 'Unknown'],
			listOfParameters: listOfParameters,
			toggleProvinces: false
		}
	},
	computed: {
		selectAllProvinces: {
			get: function() {
				return this.listOfProvinces ? this.provinces.length == this.listOfProvinces.length : false;
			},
			set: function(val) {
				var selected = [];

				if(val) {
					this.listOfProvinces.forEach(function(result) {
						selected.push(result);
					});
				}
				this.provinces = selected;
			}
		},
		selectAllResults: {
			get: function() {
				return this.listOfResults ? this.results.length == this.listOfResults.length : false;
			},
			set: function(val) {
				var selected = [];

				if(val) {
					this.listOfResults.forEach(function(result) {
						selected.push(result);
					});
				}
				this.results = selected;
			}
		}
	},
	watch: {
		types(){
			this.$emit('types', this.types);
		},
		results(){
			this.$emit('results', this.results);
		},
		provinces(){
			this.$emit('provinces', this.provinces);
		},
		parameter(){
			this.$emit('param', this.parameter);
		},
		depths(){
			this.$emit('depth', this.depths);
		}
	},

	methods: {

		handleGAMA() {
			this.$emit('gama');
		},
		toggleControls() {
			this.showControls = !this.showControls;
		}
	}
}
</script>

<style scoped>
#container{
	max-height: 99vh;
	overflow-y: auto;
	overflow-x: hidden;
	bottom: 100px;
	max-width: 320px;
}
h2{
	font-weight: bold;
	margin: 0;
	font-size: 16px;
}
#query{
	font-size: 16px;
}
#query>div{
	margin: 10px 0;
}
#provinceToggle{
	height: 20px;
	cursor: pointer;
	margin-left: auto;
}
select{
	margin-top: 5px;
	width: 100%;
	font-family: 'Calibri', sans-serif;
	font-size: 16px;
	box-shadow: 1px 1px 5px grey;
}
select:hover, input:hover{
	box-shadow: 1px 1px 10px grey;
	cursor: pointer;
}
select.highlighted, .highlighted.multiselect{
	border: 2px solid #896FC3;
}

.filterToggle{
	display: flex;
}
.filterToggle>button{
	background: none;
	cursor: pointer;
	box-shadow: 1px 1px 5px grey;
	border: 2px solid silver;
	padding: 5px 10px;
	margin: 10px 20px 0 0;
	font-family: 'Calibri', sans-serif;
	font-size: 16px;
}
.filterToggle>button:hover{
	box-shadow: 1px 1px 10px grey;
}
.filterToggle>button.active{
	box-shadow: inset 0 0 5px grey;
	background-color: silver;
}
</style>