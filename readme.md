#GAMA Water Quality Trends Map made with Vue.js framework



## Data 
Data is from ArcServer: https://igswcawwwb1301.wr.usgs.gov:6443/arcgis/rest/services/GAMA_PSWT_WebMap/MapServer

Each parameter is mapped to the ArcServer layer in src/assets/parameters.json. If the map layers get changed, then the parameters.json file needs to be updated too and the entire project re-built using npm run build.


### Appearance

Markers are built with HTML and CSS (in src/functions/buildMarker.js and app.vue, respectively).

The server queries data using the SQL statement build with mapLogic.vue. (makeFilter.js is outdated version of the filter, which returns a leaflet filter. I'm keeping in this project in case it's useful in the future).

The popup is built from buildPopup.js.

### Filtering

mapLogic.vue checks what has been checked in the menu component and returns a SQL query string by looping through the type and the result (posneg) arrays that are passed to MyMap.vue. this.type and this.posneg get converted to values that match the server headers and become this.posnegNum and this.trendArr.  

The conjunction 'or' is added if the loop has not finished looping through the array. 

- sigMatch(): The core function in mapLogic.vue loops through this.posnegNum and this.trendArr. A string is written for each trend in this.trendArr, for every value in this.posnegNum. For example, if 'Significant Positive' is checked in this.posneg, this.posnegNum will be equal to 2. If 'Recent' and 'Long Term' are checked in this.trendArr, then the string on line 99 will be returned for both 'Rec' and 'LT'. The final string for sigMatch() will look like '(recSignificance = 2 and recTrendType =2) or (LTSignificance = 2 and LTTrendType = 2)'.


- gamaMatch(): returns a string that is added to the SQL query string only if the "return GAMA sites only" box is checked in the menu. The GAMA_ID of the feature doesn't have to be equal to any specific value, it just has to not be null.


- depthMatch(): loops through the array of checked results on the menu's "Filter By Well Depth" section. The feature's value for the 'WellDepthCategory' column has to match the value of the string passed from the menu. This is why it is important for the values set in the menu (line 138 of src/components/Menu.vue) to be equal to the values saved on the server.


### The Menu

The menu is divided into sections that change 4 arrays and 1 object: this.provinces, this.types, this.results, this.depths, and this.parameter.


The options for these arrays are pulled from this.listOfProvinces, this.listOfTypes, this.listOfResults, this.listOfDepths, and this.listOfParameters. Changing these lists will require changing logic in app.vue, map.vue, and mapLogic.vue, so be careful editing them. listOfParameters is long so it's saved in a separate file: src/assets/parameters.json. Here each constituent is an object in an array, with a value for its name, value (pcode), and the layer number of its arcServer layer.




## Running locally

Install folder, unzip, cd to folder, and run ```npm install```

To run dev mode, run ```npm run dev```, for build, ```npm run build```




### Downloading Map and Data to Use Offline/Off-network

This site should have a button that lets the user download a zipped version of the site, including a firefox.exe that points to the index.html file.

To build the zipped file, comment out the download button in the menu and then from the command line run `npm run build`

Create a firefox shortcut by right-clicking on the index.html file, selecting "create shortcut", and putting the following line in the shortcut property's target:
`"C:\Program Files (x86)\Mozilla Firefox\firefox.exe" /c start "" "%CD%/index.html"`

Zip the csv, images, and static folders together along with index.html file and the firefox shortcut.

Move the zipped file to the web server. Uncomment the download button in the menu, and run `npm run build` again. Move that index.html file and static folder to the web server.



### File Structure

The web server should look like:

- index.html
- static
	-- css
	-- js
	-- img
- csv
- images 
- dist.zip