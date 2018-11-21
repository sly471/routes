$(function() {

  // init base map
  mapboxgl.accessToken = 'pk.eyJ1IjoidG9ybGFuY28iLCJhIjoiY2prYmR3dmszMHVtcDNwbWl3cHdwOTl5NSJ9.NxympEZmljc0jq4DJmK5JQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-66.057914,18.409241],
    zoom: 9
  });

  // Create a Global popup
  var popup = new mapboxgl.Popup({ closeButton: false, offset:20 });

  // wait for map to load
  map.on('load', function(feature) {

    // load data and parse it
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vR3oZDnYhyhjcaL50fSW8aS7Db90WBoIfMjudpbZgm7Qn3xdpj010kdQdSdpgOIL16Vpo2zS5wy2L_G/pub?gid=0&single=true&output=csv", {
      download: true,
      complete: function(results) {

        // create customers array
        var customers = [];

        // filter customers by the ones we will deliver to this week
        customers = _.filter(results.data, function(customer){ return (customer[21] == "will deliver"); });

        // format each customer as a feature
        customers = _.map(customers, function(customer, key){
          return {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [customer[8],customer[7]]
                },
                properties: {
                  fullName: customer[2],
                  objectId: customer[0],
                  subscriptionPlan: customer[3],
                  phone: customer[4],
                  address: customer[5],
                  navLink: customer[6],
                  route: (Math.random()> 0.5)?"route1":null
                }
              };
        });

        map.addSource('allCustomers', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: customers }
        });

        map.addLayer({
          "id": "points",
          "type": "circle",
          "source": "allCustomers",
          "layout": {},
          "paint": {
            "circle-radius": 5,
            "circle-color": "white",
            "circle-stroke-width": 10,
            "circle-stroke-opacity":0.25,
            "circle-stroke-color": {
              "property": "cluster",
              "stops": [ [0, 'Fuchsia'], [1, 'Purple'], [2, 'Navy'], [3, 'Blue'], [4, 'Red'], [5, 'Maroon'], [6, 'Yellow'], [7, 'Olive'], [8, 'Lime'], [9, 'Green'], [10, 'Aqua'], [11, 'Teal'], [12, 'Black'], [13, 'Gray'], [14, 'White'], [15, 'Silver'] ]
            }
          }
        });

        // map.addLayer({
        //      "id": "filtered",
        //      "type": "symbol",
        //      "source": "allCustomers",
        //      "layout": {
        //          "icon-image": "music-15",
        //          "icon-allow-overlap": true
        //      },
        //      "filter": ["==", "route", "route1"]
        //  });

        // cluster through dbscan algorithm
        var clustered = turf.clustersDbscan(map.getSource('allCustomers')._data, 1.9, {minPoints: 3});

        // cluster through kmean algorithm
        // var clustered = turf.clustersKmeans(map.getSource('allCustomers')._data);

        // redo source, now with clustered data
        map.getSource('allCustomers').setData(clustered);


        // Global Map Listeners
        map.on('click', 'points', function (e) {
          var features = map.queryRenderedFeatures(e.point, { layers: ['points'] });
          if (!features.length) {
            return;
          }

          var feature = features[0];

          // if point has no route property, add it to the current route
          if(feature.properties.route === null){
            feature.properties.route = "route1";
          // if point has route property, remove it
          }else{
            feature.properties.route = null;
          }
          console.log(feature.properties.route);
          console.log(feature);


          // TO-DO update feature and then update source

        });

        // When a click event occurs on a feature in the points layer, open a popup at the location of the feature, with description HTML from its properties.
        map.on('mousemove', function(e) {
          var features = map.queryRenderedFeatures(e.point, { layers: ['points'] });
          if (!features.length) {
            popup.remove();
            return;
          }

          var feature = features[0];

          popup.setLngLat(feature.geometry.coordinates)
            .setHTML(feature.properties.fullName + " - " + feature.properties.cluster)
            .addTo(map);

          map.getCanvas().style.cursor = features.length ? 'pointer' : '';
        });

      }
    });


  });


});
