export default function(checked, feature) {

	/// this is what the checked object looks like:
	/* checked: {
		trend_on: ['Long Term', 'Recent', 'Reversal', 'Seasonal'],
		posneg_on: [0, 1, 2, 3],
		gama: true/false,
		provinces: []
	} */
	

	// look for info in the feature.properties object
	var props = feature.properties;

	// add a 'g' prefix if props.Gtext === 'g'
	var gama = props.Gtxt ? 'g' : '';

	// if the given string ('Long Term', 'Recent', etc) is in the checked.trend_on array, return a string that looks like 'LT21'
	var checkType = function(name, type, string, sig) {
		return checked.trend_on.indexOf(name) != -1 ? gama + string + props[sig] + props[type] : 'empty';
	};

	// for each trend type, see if that type has been checked in the menu and then build a string 
	var LTBuild = checkType('Long Term', 'LTTrendType', 'LT', 'LTSignificance');

	var RecBuild = checkType('Recent', 'RecTrendType', 'Rec', 'RecSignificance');

	var RevBuild = checkType('Reversal', 'RevTrendType', 'Rev', 'RevSignificance');

	var SeaBuild = checkType('Seasonal', 'SeaTrendType', 'Sea', 'SeaSignificance');

	return '<div class="' + LTBuild + '"></div><div class="' + RecBuild + '"></div><div class="' + RevBuild + '"></div><div class="' + SeaBuild + '"></div>'
};