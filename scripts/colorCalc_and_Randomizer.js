// input: any dropoff selected
// output: an assign color to the dropoff for easy reading of the weight of dp when added to the route
// green:  between 0-29 minutes added
// yellow: between 30-59 minutes added
// red:    more or equal than 60 minutes added 
function colorCalculator(dropoff){
    if(dropoff.weight >= 60){
        return '#ff0000';
    }
    else if(dropoff.weight >= 30){
        return '#ffff00';
    }
    else if(dropoff.weight >= 0){
        return '#00ff00';
    }
};

// Returns an integer between min(included) & max(excluded)
// input: minimum number of a range of numbers & a maximum number of a range of numbers
// output: a random integer that falls in the range of the input numbers
function getRndInteger(min, max) {return Math.floor(Math.random() * (max - min) ) + min;};

// Returns a float between min(included) & max(excluded)
// input: minimum number of a range of numbers & a maximum number of a range of numbers
// output: a random float that falls in the range of the input numbers
function getRndFloat(min, max) {return Math.random() * (max - min)  + min;};


// Test function used for creating random dropoff locations
// input: list of dropoffs available
// output: same list with an extra dropoff created randomly
function createRndDropoff(dropoffLocations){
    for (var i=0; i<50; i++){
        x= getRndFloat(-67.13664550786771, -65.70716270963167)
        y= getRndFloat(17.986497494385915, 18.45869548139244)
        l= getRndInteger(1, 10);
        dropoffLocations.features.push(turf.point([x, y],{name: i, load: l, weight: -1, ppop:false}));
    }
}