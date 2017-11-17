<script>
export default{
	name: 'MapLogic',
	computed: {

		// check to see if nothing is checked in the menu. In this case, we don't have to bother with querying, because nothing should be shown.
		isMenuClear(){
			if(this.posnegLen == 0 || this.trendLen == 0 || this.depthLen == 0 || this.provLen == 0){
				return true;
			}
			return false;
		},

		/**********
		** find the lengths of the arrays taken from the menu */
		posnegLen(){
			return this.posneg.length;
		},

		trendLen(){
			return this.types.length;
		},

		depthLen(){
			return this.depth.length;
		},

		provLen(){
			return this.provinces.length;
		},

		/************************
		** convert the trend result string to a numerical value */
		posnegNum(){

			// values of 1 or 2 indicate significant
			return this.posneg.map(item => {
				switch(item) {
					case('Significant Positive'):
						return 2;
						break;
					case('Significant Negative') :
						return 1;
						break;
					case('Not Significant') :
						return 0;
						break;
					case('Not Tested') :
						return 3;
						break;
				}
			});
		},


		/**********************
		*** convert the type string to an abbreviation used in the database 
		*/
		trendArr(){
			return this.types.map(item => {
				switch(item){
					case 'Long Term':
						return 'LT'
						break;
					case 'Recent':
						return 'Rec'
						break;
					case 'Reversal':
						return 'Rev'
						break;
					case 'Seasonal':
						return 'Sea'
						break;
				}
			});
		},

		/* check trend type (long term, etc) against significance */
		sigMatch(){
			// save state values as local variables
			var sigLen = this.posnegLen;
			var sig = this.posnegNum;
			var trendLen = this.trendLen;
			var trend = this.trendArr;
			
			function returnString(){
				var sigString = ''; //start with an empty string
				
				// loop through the trend type and the significance type arrays
				for(var i = 0; i < sigLen; i++){
					var final = i < sigLen - 1 ? ' or ' : '';
					var trendString = ''
					
					for(var j = 0; j < trendLen; j++){
						var newFinal = j < trendLen - 1 ? ' or ' : '';

						// if 'Significant Positive' is checked, both significance and trend type should be 2
						if(sig[i] == 2){
							trendString += `(${trend[j]}Significance = 2 and ${trend[j]}TrendType = 2)${newFinal}`
						}

						// if 'Significant Negative' is checked, significance should be 2 but trend type should be 1
						else if(sig[i] == 1){
							trendString += `(${trend[j]}Significance = 2 and ${trend[j]}TrendType = 1)${newFinal}`
						}

						// if 'Not Tested' is checked, significance should be 0
						else if(sig[i] == 3){
							trendString += `(${trend[j]}Significance = 0)${newFinal}`
						}

						// if 'Not Significant' is checked, significance should be 0
						else {
							trendString += `${trend[j]}Significance = 0${newFinal}`
						}
						
					}

					sigString += `(${trendString})${final}`;
				}

				return  `(${sigString})${final}`
			}
		
			return sigLen === 4 ? '' : sigLen === 0 ? 'Province is NULL' : returnString();

		},

		gamaMatch(){
			return this.gama ? 'GAMA_ID is not NULL' : '';
		},

		depthMatch(){
			var depthLen = this.depthLen;
			var depth = this.depth;
			var depthString = '';

			function returnString() {
				for(var i = 0; i<depthLen; i++){
					var final = i < depthLen - 1 ? ' or ' : '';

					// CHECKME WellDepthCategory on the server must match the string passed from the menu (line 138 of src/components/Menu.vue);
					 depthString += `WellDepthCategory = '${depth[i]}'${final}`
				}
				return `(${depthString})`;
			};

			return depthLen === 3 ? '' : depthLen === 0 ? 'WellDepthCategory is NULL' : returnString();
		},

		provMatch() {
			var provLen = this.provLen;
			var provinces = this.provinces;
			var provString = '';

			function returnString() {
				for(var i = 0; i < provLen; i++) {
					var final = i < provLen - 1 ? ' or ' : '';
					provString += `Province = '${provinces[i]}'${final}`
				}
				return `(${provString})`
			}

			return provLen === 9 ? '' : provLen === 0 ? 'Province is NULL' :returnString();
		}
	},

	methods: {

		getFilterDefs(checkedObj){
			//return a string so that each well's properties are compared to the values of this.checkedObj
			var gamaMatch = this.gamaMatch;
			var sigMatch = this.sigMatch;
			var depthMatch = this.depthMatch;
			var provMatch = this.provMatch;

			/* function to insert 'and' into sql statement if there is more to the statement */
			function getAnd(arr){
				var toReturn = []; //create array

				/* go through the results passed as an argument and determine if that result should be joined to the query string by an 'and' or, if there's nothing coming after it, an invisible '' */
				for(var i = 0; i < arr.length - 1 ; i++) {
					if(arr[i].length > 0){
			
						var string = ''; // will change this value to ' and ' if any of the results later in the query string have any content
						for(var j = i + 1; j < arr.length - 1; j++){
							if(arr[j].length > 0){
								string = ' and '; //keep spaces surrounding and
							}
						}

						toReturn.push(string); // push either '' or ' and ' to the array that gets returned
					}
					else { //otherwise there's nothing to join to the string, so we don't need 'and'
						toReturn.push('');
					}
				}
				return toReturn;
			};


			// get array of conjunction strings
			var andArr = getAnd([gamaMatch, depthMatch, sigMatch, provMatch]);

			// create the sql query string from the results of each function, joined together by ' and ' if both results of either side of the andArr string have length > 0
			var defString = `${gamaMatch}${andArr[0]}${depthMatch}${andArr[1]}${sigMatch}${andArr[2]}${provMatch}`;
			console.log(defString);
			return defString;
		}
	}
}
</script>