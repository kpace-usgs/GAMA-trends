import moment from 'moment';

export default function(feature, pcodes) {
	var props = feature.properties;
	console.log('build popup');

	var LTsig = props.LTSignificance == '2' ? ("<a href='./images/"+pcodes+"/long_term/" + props.PSCODE + ".png' target='_blank'>Significant</a>") : props.LTSignificance == '1' ? 'Not Significant' : 'Not Tested';

	var LTttype = props.LTTrendType == '2' ? ', Positive' : props.LTTrendType == '1' ? ', Negative' : '';

	var Recsig = props.RecSignificance == '2' ? ("<a href='./images/"+pcodes+"/recent/" + props.PSCODE + ".png' target='_blank'>Significant</a>") : props.RecSignificance == '1' ? 'Not Significant' : 'Not Tested';

	var Recttype = props.RecTrendType == "2" ? ', Positive' : props.RecTrendType == "1" ? ', Negative' : '';

	var Revsig = props.RevSignificance == "2" ? ("<a href='./images/"+pcodes+"/reversal/" + props.PSCODE + ".png' target='_blank'>Significant</a>") : props.RevSignificance == "1" ? 'Not Significant' : 'Not Tested';

	var Revttype = props.RevTrendType == "2" ? ', Positive' : props.RevTrendType == "1" ? ', Negative' : '';

	var Seasig = props.SeaSignificance == "2" ? ("<a href='./images/"+pcodes+"/seasonal/" + props.PSCODE + ".png' target='_blank'>Significant</a>") : props.SeaSignificance == "1" ? 'Not Significant' : 'Not Tested';

	var Seattype = props.SeaTrendType == "2" ? ', Positive' : props.SeaTrendType == "1" ? ', Negative' : '';

	// Split time off of data fields in csv file //
	var mindate = moment(props.MinDate).format('MM/DD/YYYY');
	var maxdate = moment(props.MaxDate).format('MM/DD/YYYY');
	console.log(mindate);

    // Build Popup Content //
    var popupContent =  '<div>Storet Num: ' + props.STORE_NUM +
						'<br/>Name: ' + props.ReportName +
					        '<br/>Province: ' + props.Province +
						'<br/>SU: ' + props.StudyUnitLongName +
					        '<br/>SA: ' + props.SA +
					    '<br/>Cell: ' + props.CELL +
	  				   	'<br/>PS_CODE: ' + props.PSCODE +
                        '<br/>GAMA ID: ' + props.GAMA_ID +
						'<br/>Number of Analyses: ' + props.NumOfRecords +
	  			        '<br/>Min Date: ' + mindate +
						'<br/>Max Date: ' + maxdate +
						'<br/>Depth to top of screen (ft): ' + props.TopPerf_FT_WM +
		  		        '<br/>Depth to bottom of screen (ft): ' + props.BotWell_FT_WM +
		  		        '<br/>Well Depth Category: ' + props.WellDepthCategory +
		  		        '<br/><b>Long Term:</b> ' + LTsig + LTttype +
		  		        '<br/><b>Recent:</b> ' + Recsig +  Recttype +
		  		        '<br/><b>Reversal:</b> ' + Revsig +  Revttype +
		  		        '<br/><b>Seasonal:</b> ' + Seasig +  Seattype +
						'</div>';

	return popupContent;
};