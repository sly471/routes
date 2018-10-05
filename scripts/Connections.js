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
        function drawRoute(truck, trucks, map, accessToken){
            fetch(getRouteMarked(truck.markedDropoff, truck, accessToken))
            .then(res => {
                return res.json()
            })
            .then(data => {
                // data.trips[0].legs[0].steps.forEach(step => {
                //     console.log(step.maneuver.instruction);
                // });
                console.log("Here")
                var route = (data.trips[0].geometry);
                truck.route= route;

                truck.waypoints = [];
                data.waypoints.forEach(waypoint=>{console.log(waypoint.waypoint_index);truck.waypoints[waypoint.waypoint_index]=(waypoint.location)})
                console.log("maybe")
                console.log(truck.waypoints)
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
