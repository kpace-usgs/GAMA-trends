<template>
<div id="map_legend" class="leaflet-bar container">
    <ToggleBar :show='showLegend' @click='toggleLegend'></ToggleBar>
    <!-- Portion of legend that toggles -->
    <div id='legend' v-if='showLegend'>
        <table width="100%" style="font-size:12px;">
            <tr>
                <td></td>
                <td><div style='text-align: center;'>+ </div></td><td><div style='text-align: center;'>-</div></td>
            </tr>
           
            <tr style="height:22px;">
                <td style="width:70%">Long Term, Significant</td><td style="width:22px;height:22px;"><div class="LT20" style="position:relative;padding:0;margin:0;"></div></td><td style="width:22px;height:22px;"><div class="LT21" style="position:relative;padding:0;margin:0;"></div></td>
            </tr>
            <tr style="height:22px;">
                <td>Recent, Significant</td><td style="width:22px;height:22px;"><div class="Rec20" style="position:relative;margin:auto;"></div></td><td style="width:22px;height:22px;"><div class="Rec21" style="position:relative;margin:auto;"></div></td>
            </tr>
            <tr style="height:22px;">
                <td>Reversal, Significant</td><td style="width:22px;height:22px;"><div class="Rev20" style="position:relative;margin:auto;"></div></td><td style="width:22px;height:22px;"><div class="Rev21" style="position:relative;margin:auto;"></div></td>
            </tr>
            <tr style="height:22px;">
                <td>Seasonal, Significant</td><td style="width:22px;height:22px;"><div class="Sea20" style="position:relative;margin:auto;"></div></td><td style="width:22px;height:22px;"><div class="Sea21" style="position:relative;margin:auto;"></div></td>
            </tr>
            <tr style="height:22px;">
                <td>Not Significant</td><td colspan="2"><div class="Rev10" style="position:relative;margin:auto;"></div></td>
            </tr>
            <tr style="height:22px;">
                <td>Not Tested</td><td colspan="2"><div class="Rev00" style="position:relative;margin:auto;"></div></td>
            </tr>
            <tr style="height:22px;">
                <td>Indicates<br/>GAMA site</td><td colspan="2"><div class="g" style="position:relative;margin:auto;"></div></td>
            </tr>
        </table>
        <!-- logo Images -->
        <div style="float:left;">
        	<a style="width:auto;display:inline-block;" href="http://www.swrcb.ca.gov/gama" target="_blank">
        		<img class="logos" src="../assets/SWRCB.png" alt="State Water Resources Control Board"/>
        	</a>
        </div>
        <div style="float:right;">
        	<a style="width:auto;display:inline-block;" href="http://usgs.gov/" target="_blank">
        		<img class="logos" src="../assets/USGS_logo_green.png" alt="US Geological Survey"/>
        	</a>
        </div>
    </div>
</div>
</template>

<script>
import ToggleBar from './ToggleBar.vue'

export default {
	name: 'MyLegend',
	props: [ 'showLegend' ],
	methods: {
		toggleLegend() {
			this.showLegend = !this.showLegend;
		}
	},
    components: {
        ToggleBar
    }
}

</script>

<style scoped>
td{
    font-size: 16px;
}
/* CSS for logos in legend */
.logos{
    height:40px;
}

</style>