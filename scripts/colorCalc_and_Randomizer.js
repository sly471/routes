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
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
};

// Returns a float between min(included) & max(excluded)
function getRndFloat(min, max) {
    return Math.random() * (max - min)  + min;
};