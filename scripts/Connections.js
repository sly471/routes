// This function will get the markedDropoff variable and feed it to the optimization API which will return
// the optimized route for the truck.
// Input:
// Output:
function getRouteMarked(route, truck, accessToken){

    var destinations = [];
    route.features.forEach(Geometry => {
        destinations.push(Geometry.geometry.coordinates);
     });
    return 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/' + truck.location[0] + ',' + truck.location[1] + ';'
            + destinations.join(';') + '?overview=full&steps=true&geometries=geojson&source=first&access_token='
            + accessToken;
};

// This functions creates the URL to updates the dropoff locations with the time that will take to be added to the route.
// Input:
// Output:
function getRouteWeight(route, truck, accessToken){

    var destinations = [];
    route.forEach(function(Geometry){
        destinations.push(Geometry.geometry.coordinates);
     });
    return 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/' + truck.location[0] + ',' + truck.location[1] + ';'
            + destinations.join(';') + '?overview=full&steps=true&geometries=geojson&source=first&access_token='
            + accessToken;
};
//
// Input:
// Output:
function drawRoute(truck, trucks, map, accessToken){
    fetch(getRouteMarked(truck.markedDropoff, truck, accessToken))
    .then(res => {
        return res.json()
    })
    .then(data => {
        var route = (data.trips[0].geometry);
        truck.route= route;

        data.waypoints[0].location.push("Start")
        for(i=1;i<=truck.markedDropoff.features.length;i++){
            data.waypoints[i].location.push(truck.markedDropoff.features[i-1].properties.name);  
            data.waypoints[i].location.push(truck.markedDropoff.features[i-1].properties.telephone);  
        }
        
        truck.waypoints = [];
        data.waypoints.forEach(waypoint=>{
            truck.waypoints[waypoint.waypoint_index]=(waypoint.location);
        })
        truck.routeMile= data.trips[0].distance/1609.344;
        truck.updateRouteWeight(data.trips[0].duration);
        map.getSource('route'+truck.id).setData(truck.route);
        
    })
    .then(nothing => {
       
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
// Input:
// Output:
function AutoDrawRoute(truck, trucks, map, accessToken){
    fetch(getRouteMarked(truck.markedDropoff, truck, accessToken))
    .then(res => {
        return res.json()
    })
    .then(data => {
        var route = (data.trips[0].geometry);
        truck.route= route;

        data.waypoints[0].location.push("Start")
        for(i=1;i<=truck.markedDropoff.features.length;i++){
            data.waypoints[i].location.push(truck.markedDropoff.features[i-1].properties.name);  
            data.waypoints[i].location.push(truck.markedDropoff.features[i-1].properties.phone);  
        }
        
        truck.waypoints = [];
        data.waypoints.forEach(waypoint=>{
            truck.waypoints[waypoint.waypoint_index]=(waypoint.location);
        })
        truck.routeMile= data.trips[0].distance/1609.344;
        truck.updateRouteWeight(data.trips[0].duration);
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