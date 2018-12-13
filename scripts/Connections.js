// This function will get the markedDropoff variable and feed it to the optimization API which will return
// the optimized route for the truck.
// Output: Route using mapbox Optimization API
function getRouteMarked(route, truck, accessToken){
    // Get all dropoff and puts them in an array for inputing the dropoff into the URL for the API
    var destinations = [];
    route.features.forEach(Geometry => {
        destinations.push(Geometry.geometry.coordinates);
     });
    // Return the result to the page for route creation
    return 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/' + truck.location[0] + ',' + truck.location[1] + ';'
            + destinations.join(';') + '?overview=full&steps=true&geometries=geojson&source=first&access_token='
            + accessToken;
};

// This functions creates the URL to updates the dropoff locations with the time that will take to be added to the route.
// Input: dropoff that will make up route, truckSelected, & the access token
// Output: the weight(time added to the selected route) of each unmarked dropoff located in the map 
function getRouteWeight(route, truck, accessToken){

    // Get all dropoff and puts them in an array for inputing the dropoff into the URL for the API. route contains one unmarked dropoff
    var destinations = [];
    route.forEach(function(Geometry){
        destinations.push(Geometry.geometry.coordinates);
     });

        // Return the result to the page for dropoff update.
        return 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/' + truck.location[0] + ',' + truck.location[1] + ';'
            + destinations.join(';') + '?overview=full&steps=true&geometries=geojson&source=first&access_token='
            + accessToken;
};
// Function that will connect to the API via fetch and returns the information for the route. With this information draw the route on map
// the order that the API arrange. 
// Input: truckSelected, collection of trucks, map, and accessToken
// Output: NONE 
function drawRoute(truck, trucks, map, accessToken){
    fetch(getRouteMarked(truck.markedDropoff, truck, accessToken))
    .then(res => {
        // receive json from API
        return res.json()
    })
    .then(data => {
        // get JSON and extract the dropoff order
        var route = (data.trips[0].geometry);
        // save route
        truck.route= route;
        // indicate the start point
        data.waypoints[0].location.push("Start")
        // concatenate the information of the client with the location
        for(i=1;i<=truck.markedDropoff.features.length;i++){
            data.waypoints[i].location.push(truck.markedDropoff.features[i-1].properties.name);  
            data.waypoints[i].location.push(truck.markedDropoff.features[i-1].properties.telephone);  
        }
        // organize dropoff in order for HTMLDirections overlay
        truck.waypoints = [];
        data.waypoints.forEach(waypoint=>{
            truck.waypoints[waypoint.waypoint_index]=(waypoint.location);
        })
        //convert Kilometers to Miles
        truck.routeMile= data.trips[0].distance/1609.344;
        truck.updateRouteWeight(data.trips[0].duration);
        // update map with new information
        map.getSource('route'+truck.id).setData(truck.route);
        
    })
    .then(nothing => {
       //nothing = NULL
       //this part calls the HTMLDirections for updating the overlay 
        var id;
        for(var i =0; i< trucks.length;i++){
            if(trucks[i]==truckSelected){
                var id = i
            }
        }
        HTMLDirections(truck, id, trucks, map)  
    })
};
//
// Input: selected truck, list of trucks, the map, & the access token
// Output: draw the route of the selected truck on the map
function AutoDrawRoute(truck, trucks, map, accessToken){
    // coonect to the api and recieve the route info
    fetch(getRouteMarked(truck.markedDropoff, truck, accessToken))
    .then(res => {
        return res.json()
    })
    .then(data => {
        // store the route coordinates on route variable
        var route = (data.trips[0].geometry);
        truck.route= route;

        data.waypoints[0].location.push("Start")
        // for each of the route dropoffs, locate its client's name and number and store them 
        // in list for displaying on a table.
        for(i=1;i<=truck.markedDropoff.features.length;i++){
            data.waypoints[i].location.push(truck.markedDropoff.features[i-1].properties.name);  
            data.waypoints[i].location.push(truck.markedDropoff.features[i-1].properties.phone);  
        }
        
        truck.waypoints = [];
        // organize the order of the dropoff for HTML_Direction overlay
        data.waypoints.forEach(waypoint=>{
            truck.waypoints[waypoint.waypoint_index]=(waypoint.location);
        })

        // convert route distance from meters to miles and store it
        truck.routeMile= data.trips[0].distance/1609.344;4

        // update the weight of the route
        truck.updateRouteWeight(data.trips[0].duration); 

        // update the source of the layer of the truck selected
        map.getSource('route'+truck.id).setData(truck.route);
        
    })
    // .then(nothing => {
       
    //     var id;
    //     for(var i =0; i< trucks.length;i++){
    //         if(trucks[i]==truckSelected){
    //             var id = i
    //         }
    //     }
    //     HTMLDirections(truck, id, trucks, map)  
    // })
};