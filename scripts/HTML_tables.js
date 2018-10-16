function HTMLDirections(truck, id, trucks, map){
    var HTML_Directions = '';
    HTML_Directions += '<button style="display:inline-block;'
    HTML_Directions +=' vertical-align: middle;'
    HTML_Directions +=' margin:0px;'
    HTML_Directions +=' padding: 0;'
    HTML_Directions +=' border: none;'
    HTML_Directions +=' background: none;'
    HTML_Directions +=' font-size : 50px"'
    HTML_Directions +=' type="button" onclick="HTMLTable(trucks, map)" class="previous">&#8249; </button>'
    HTML_Directions +=' <h3 style="display:inline-block; vertical-align: middle; margin:0px 130px">  Route '+(id+1) +'</h3>' 
    HTML_Directions += '<div> Current Load: ' + truck.currentLoad + '</div>'      
    HTML_Directions += '<div> '+ 'ETA: '+Math.floor(truck.routeWeight/60)+':'          
    HTML_Directions +=                  (Math.floor(truck.routeWeight%60)<10?'0':'')
    HTML_Directions +=                   Math.floor(truck.routeWeight%60)+' hrs</div> '
    HTML_Directions +=  '<div> Stops: ' + truck.markedDropoff.features.length + '</div>'
    waypoints = 'https://www.google.com/maps/dir/'
    truck.waypoints.forEach(location=> {waypoints += location[1] +','+ location[0] +'/'})
    if (truck.waypoints.length){waypoints += truck.waypoints[0][1] +','+ truck.waypoints[0][0] +'/'}
    HTML_Directions += '<div><a class="button" href='+waypoints+' target="_blank">Navigate</Navigate></a></div>'
    HTML_Directions += '<button class="button" type="button" style="background-color:#FF0000" onClick="HTMLRemoveAuth()">Remove Route</button>'

    document.getElementById('pd').innerHTML = HTML_Directions
}

// https://www.google.com/maps/dir/
// On the main menu of the ui, this HTML will be displayed
function HTMLTable(trucks, map){
    // HTMLegend(map);
    truckSelected=undefined;
    HTML_Table = '<table>'
    var parameter = trucks +','+ map;
     for(var i = 0; i < trucks.length ; i++){
        HTML_Table+='<tr>'
        HTML_Table+=    '<th rowspan="3" bgcolor='+trucks[i].color+' onclick="SelectTruck('+i+')">Route '+ (i+1) +'</th>'
        HTML_Table+=    '<td>Current Load: '+trucks[i].currentLoad+'</td>'
        HTML_Table+='</tr>'
        HTML_Table+='<tr>'
        HTML_Table+=    '<td>'
        HTML_Table+=        'ETA: '+Math.floor(trucks[i].routeWeight/60)+':'
        HTML_Table+=        (Math.floor(trucks[i].routeWeight%60)<10?'0':'')
        HTML_Table+=        Math.floor(trucks[i].routeWeight%60)+' hrs'
        HTML_Table+=    '</td>'
        HTML_Table+='</tr>'
        HTML_Table+='<tr>'
        HTML_Table+=    '<td>Stops: '+ trucks[i].markedDropoff.features.length +'</td>'
        HTML_Table+= '</tr>';
    }
    HTML_Table += '</table>'
    HTML_Table += '<button class="button" type="button" style="background-color:#4CAF50" onClick="CreateRoute(trucks, map)">Add Route</button>'
    document.getElementById('pd').innerHTML = HTML_Table
    trucks.forEach(truck => {

        truck.truckMarker.addTo(map)
    })
    if(trucks.length!=0){allRoute()};
}

function HTMLRemoveAuth(){
    var HTML_RemoveAuth = '';
    HTML_RemoveAuth += '<div><h3>Are you sure you want to remove the route?</h3></div>';
    HTML_RemoveAuth += '<div><button style="text-align: center;background-color: #FF0000;color: white;border: none;margin-left: 60px;padding: 15px 32px;display: inline-block;cursor: pointer;" onClick="removeRoute()"> Yes </button>';
    HTML_RemoveAuth += '<button style="text-align: center;background-color: #f0f0f0;color: black;margin-left: 75px;padding: 15px 32px;display: inline-block;cursor: pointer;"onClick="HTMLDirections(truckSelected, truckSelected.id)"> No </button></div>'
    
    document.getElementById('pd').innerHTML = HTML_RemoveAuth;
}

function CreateRoute(trucks, map){
    var HTML_Route_Info = '';
    HTML_Route_Info += '<h2> Creating New Route <button style="display: inline-block;background-color:#FFFFFF;color:#000000; border: none;margin-left: 130px;cursor:pointer; "onClick="HTMLTable(trucks, map)">&#10799;</button> </h2>'; 
    HTML_Route_Info += '<div> select starting point for the truck';
    HTML_Route_Info += '<select id="location" type="number">'
    HTML_Route_Info += '<option value="-66.06988906860352,18.44834670293207">San Juan</option>';
    HTML_Route_Info += '<option value="-66.61336898803711,18.011222694738315">Ponce</option>';
    HTML_Route_Info += '<option value="-65.65635681152344,18.316070168322522">Fajardo</option>';
    HTML_Route_Info += '<option value="-67.14088439941406,18.200326726582748">Mayaguez</option>';
    HTML_Route_Info += '<option value="-65.95727920532227,18.381732413643864">Carolina</option>';
    HTML_Route_Info += '<option value="-66.03469848632812,18.231307879658043">Caguas</option>';
    HTML_Route_Info += '</select></div>';
    HTML_Route_Info += '<div>Pick the Route Color: <input type="color" id="RouteColor" value="#'+Math.floor(Math.random()*16777215).toString(16)+'"></div>';           
    HTML_Route_Info += '<div>Max load of the truck: <input type="number" id="MaxLoad" min="1" value=50></div>'
    
    HTML_Route_Info += '<button class="button" type="button" style="background-color:#4CAF50" onClick="AddRoute()">Add Truck to Map</button>'
    document.getElementById('pd').innerHTML = HTML_Route_Info
    document.getElementById("RouteColor").innerHTML ='#'+Math.floor(Math.random()*16777215).toString(16);
}