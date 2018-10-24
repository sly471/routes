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
function getRndInteger(min, max) {return Math.floor(Math.random() * (max - min) ) + min;};

// Returns a float between min(included) & max(excluded)
function getRndFloat(min, max) {return Math.random() * (max - min)  + min;};

function createRndDropoff(dropoffLocations){
    for (var i=0; i<50; i++){
        x= getRndFloat(-67.13664550786771, -65.70716270963167)
        y= getRndFloat(17.986497494385915, 18.45869548139244)
        l= getRndInteger(1, 10);
        dropoffLocations.features.push(turf.point([x, y],{name: i, load: l, weight: -1, ppop:false}));
    }
}