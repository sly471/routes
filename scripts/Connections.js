// This function will get the markedDropoff variable and feed it to the optimization API which will return
// the optimized route for the truck.   
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
function getRouteWeight(route, truck, accessToken){

    var destinations = [];
    route.forEach(function(Geometry){
        destinations.push(Geometry.geometry.coordinates);
     });
    return 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/' + truck.location[0] + ',' + truck.location[1] + ';'
            + destinations.join(';') + '?overview=full&steps=true&geometries=geojson&source=first&access_token='
            + accessToken;
};

// This functions calls the optimization api to calculate the time that will add to each dropoff 
function updateTruckWeight(drop, truck, accessToken, dropoffLocations){
    var copyMarked = truck.markedDropoff.features.slice(0);
    copyMarked.push(drop)
    fetch(getRouteWeight(copyMarked, truck, accessToken))
    .then(res =>{
        return res.json();
    })
    .then(data =>{
        var newWeight = Math.round(data.trips[0].duration/60) - truck.routeWeight;
        drop.properties.weight = newWeight;
        drop.properties.color = colorCalculator(drop.properties)
        return drop
    })
    .then(feature =>{

        createPopup(feature);
        dropoffLocations.features.forEach(function(dropoff){
            if(dropoff.properties.name == feature.properties.name){
                dropoff.properties.weight = feature.properties.weight
            }
        map.getSource('dropoffs-symbol').setData(dropoffLocations)
        })
    })
};
// This function will get the information returned from the getRoute and use it to draw the optimized
// truck route on the map.
function drawRoute(truck, accessToken, map, trucks){
    fetch(getRouteMarked(truck.markedDropoff, truck, mapboxgl.accessToken))
    .then(res => {
        return res.json()
    })
    .then(data => {
        var route = (data.trips[0].geometry);
        truck.route= route;
        truck.routeMile= data.trips[0].distance/1609.344;
        truck.updateRouteWeight(data.trips[0].duration);
        map.getSource('route'+truck.id).setData(truck.route);
        
    })
    .then(nothing => {
       
        var id;
        for(var i =0; i< trucks.length;i++){
            if(trucks[i]==truck){
                var id = i
            }
        }
        HTMLDirections(truck, id, trucks, map)  
    })
};