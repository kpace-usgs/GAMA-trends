export default function(f, checkedObj) {
	
    //gamaMatch will be true if checkedObj.gama_on is true and f.properties.Gtxt === 'g'
    var gamaMatch = checkedObj.gama_on == true && f.properties.Gtxt === 'g' ? true : checkedObj.gama_on == false ? true : false;

    // check feature against depth filter
    var depthMatch = checkedObj.depth.length === 0 ? false : checkedObj.depth.length === 3 ? true : checkedObj.depth.includes(f.properties.WellDepthCategory) ? true : false;

    // Check which Trends are selected, Compare values in 'on' array for each Trend against marker data //
    // Multiple cases needed for exclusive value returns based on what is selected //
    if(gamaMatch && depthMatch){

        // go through geojson features and return only those that match the search
        var province_on = checkedObj.provinces;
        var trend_on = checkedObj.trend_on; //eg long term, recent
        var posneg_on = checkedObj.posneg_on; //eg significant positive, sig negative

        // val 2 is 'Significant Positive', val 1 is 'Significant Negative', val 0 is 'Not Significant', val 3 is 'Not Tested'
        // console.log('length of trend result array: ' +posneg_on.length);
        // save what's populating the checked arrays

        var LT = trend_on.indexOf('Long Term') != -1 ? true : false;
        var Recent = trend_on.indexOf('Recent') != -1 ? true : false;
        var Reversal = trend_on.indexOf('Reversal') != -1 ? true : false;
        var Seasonal = trend_on.indexOf('Seasonal') != -1 ? true : false;

        // if the feature.properties.significance == 2 and posneg has value of 1 or 2 and feature.properties.trendtype matches posneg 1 or 2 value, return true;  otherwise, if 'not significant' is checked (0) and Significance == 1, then return true; otherwise, if 'not tested' is checked (3) and Significance == 0, return true.
        var checkSig = function(sigValue, trendValue){
            return posneg_on.indexOf(2) != -1 && sigValue == 2 && trendValue == 2 ? true : posneg_on.indexOf(1) != -1 && sigValue == 2 && trendValue == 1 ? true : posneg_on.indexOf(0) != -1 && sigValue == 1 ? true : posneg_on.indexOf(3) != -1 && sigValue == 0 ? true : false;
        }

        if(posneg_on.length > 0) {
            var LTposnegMatch = checkSig(f.properties.LTSignificance, f.properties.LTTrendType);
            var RECposnegMatch = checkSig(f.properties.RecSignificance, f.properties.RecTrendType);
            var REVposnegMatch = checkSig(f.properties.RevSignificance, f.properties.RevTrendType);
            var SEAposnegMatch = checkSig(f.properties.SeaSignificance, f.properties.SeaTrendType);

        } else {
            var LTposnegMatch = false;
            var RECposnegMatch = false;
            var REVposnegMatch = false;
            var SEAposnegMatch = false;
        }

        // f.properties.Significance = 0 means not tested because all columns are 0
        // f.properties.Significance = 1 means not significant because trend types are all 0
        // f.properties.Significance = 2 means significant

        switch(true){
            // check each feature against checked values, then return it if it is in the checked provinces
            case((LT) && (Recent) && (Reversal) && (Seasonal)):
                if ( (LTposnegMatch ||  RECposnegMatch ||  REVposnegMatch || SEAposnegMatch)){
                    return province_on.indexOf(f.properties['PROVINCE']) !== -1 ? true : false;
                } else {
                   return false;
                };
            break;

            case((LT) && (Recent) && (Reversal)):
                if ( (LTposnegMatch ||  RECposnegMatch ||  REVposnegMatch)){
                    return province_on.indexOf(f.properties['PROVINCE']) !== -1 ? true : false;
                } else {
                   return false;
                };
            break;

            case((LT) && (Recent) && (Seasonal)):
                if ((LTposnegMatch || RECposnegMatch || SEAposnegMatch)){
                
                    return province_on.indexOf(f.properties['PROVINCE']) !== -1 ? true : false;
                } else {
                   return false;
                };
            break;

            case((LT) && (Reversal) && (Seasonal)):
                if ((LTposnegMatch || REVposnegMatch || SEAposnegMatch)){
                    return province_on.indexOf(f.properties['PROVINCE']) !== -1 ? true : false;
                } else {
                   return false;
                };
            break;

            case((Recent) && (Reversal) && (Seasonal)):
                if ((RECposnegMatch ||  REVposnegMatch || SEAposnegMatch)){
                   return province_on.indexOf(f.properties['PROVINCE']) !== -1 ? true : false;
                } else {
                   return false;
                };
            break;

            case((Recent) && (Reversal)):
                if ( (RECposnegMatch || REVposnegMatch)){
                return province_on.indexOf(f.properties['PROVINCE']) !== -1 ? true : false;
                } else {
                   return false;
                };
            break;

            case((LT) && (Reversal)):
                if ( (LTposnegMatch ||  REVposnegMatch)){
                    return province_on.indexOf(f.properties['PROVINCE']) !== -1 ? true : false;
                } else {
                   return false;
                };
            break;

            case((LT) && (Recent)):
                if ((LTposnegMatch || RECposnegMatch)){
                    return province_on.indexOf(f.properties['PROVINCE']) !== -1 ? true : false;
                } else {
                   return false;
                };
            break;

            case((Recent) && (Reversal)):
                if ( (RECposnegMatch || REVposnegMatch)){
                    return province_on.indexOf(f.properties['PROVINCE']) !== -1 ? true : false;
                } else {
                   return false;
                };
            break;

            case((Recent) && (Seasonal)):
                if ( (RECposnegMatch || SEAposnegMatch)){
                    return province_on.indexOf(f.properties['PROVINCE']) !== -1 ? true : false;
                } else {
                   return false;
                };
            break;

            case((LT) && (Seasonal)):
                if ((LTposnegMatch ||  SEAposnegMatch)){
               
                    return province_on.indexOf(f.properties['PROVINCE']) != -1 ? true : false;
                } else {
                   return false;
                };
            break;

            case((Reversal) && (Seasonal)):
                 if ( (REVposnegMatch || SEAposnegMatch)){

                    return province_on.indexOf(f.properties['PROVINCE']) != -1 ? true : false;
                } else {
                   return false;
                };
            break;

            case(LT):
                //console.log('long term');
                if(LTposnegMatch ) {
                    return province_on.indexOf(f.properties['PROVINCE']) != -1 ? true : false;

                } else {
                   return false;
                };
            break;

            case(Recent):
                if (RECposnegMatch){
                    return province_on.indexOf(f.properties['PROVINCE']) != -1 ? true : false;
                } else {
                   return false;
                };
            break;

            case(Reversal):
                if (REVposnegMatch){
                    return province_on.indexOf(f.properties['PROVINCE']) != -1 ? true : false;
                } else {
                   return false;
                };
            break;

            case(Seasonal):
                if (SEAposnegMatch){
                    return province_on.indexOf(f.properties['PROVINCE']) != -1 ? true : false;
                } else {
                   return false;
                };
            break;
            default: false;
        } //end switch
    }
    else {
        return false;
    }
};