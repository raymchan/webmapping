var API_quakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
console.log (API_quakes)
var API_plates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
console.log (API_plates)

function markerSize(magnitude) {
    return magnitude * 4;
};
var EPI = new L.LayerGroup();
d3.json(API_quakes, function (geoJson) {
L.geoJSON(geoJson.features, {
pointToLayer: function (geoJsonPoint, latlng) {
return L.circleMarker(latlng, { radius: markerSize(geoJsonPoint.properties.mag) });
        },
        style: function (geoJsonFeature) {
            return {
            fillColor: Color(geoJsonFeature.properties.mag),
            fillOpacity: 0.3,
            weight: 0.4,
            color: 'blue'
            }
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "<h4 style='text-align:center;'>" + new Date(feature.properties.time) +
                "</h4> <hr> <h5 style='text-align:center;'>" + feature.properties.title + "</h5>");
        }
    }).addTo(EPI);
    createMap(EPI);
});