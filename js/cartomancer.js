$(document).ready(function() {
    var cartograph = new Map({
        "basemaps": {
            "OpenStreetMap": {
                "tileLayer": L.tileLayer('http://104.131.69.181/osm/{z}/{x}/{y}.png', {})
            },
            "Satellite Imagery": {
                "tileLayer": new L.Google()
            }
        }
    });
    $("#map").find("a.leaflet-control-zoom-out").text("–");
    var map = cartograph.getMap();

    map.on("baselayerchange", function(layer) {
        //$(map.getPanes().tilePane).toggleClass("grayscale", layer.name === "OpenStreetMap Grayscale");
    });

    var popup = new Popup();
    mapGlobals = {
        map: map
    };



    var mapData = new Data();


    mapGlobals.mapData = mapData;

    /*TODO: var layerGroupExtendedOptions = function() {
     var layerGroup = L.layerGroup();
     layerGroup["min-zoom"] = LayerStyles["map-features"]["min-zoom"];
     layerGroup["max-zoom"] = LayerStyles["map-features"]["max-zoom"];
     return layerGroup;
     };*/

    var tabs = {
        "survey-approved": {
            "layerGroups": {
                "small": L.layerGroup(),
                "medium": L.layerGroup(),
                "large": L.layerGroup(),
                "mega": L.layerGroup()
            }
        },
        "survey-applied": {
            "layerGroups": {
                "small": L.layerGroup(),
                "medium": L.layerGroup(),
                "large": L.layerGroup(),
                "mega": L.layerGroup()
            }
        },
        "construction-approved": {
            "layerGroups": {
                "small": L.layerGroup(),
                "medium": L.layerGroup(),
                "large": L.layerGroup(),
                "mega": L.layerGroup()
            }
        },
        "construction-applied": {
            "layerGroups": {
                "small": L.layerGroup(),
                "medium": L.layerGroup(),
                "large": L.layerGroup(),
                "mega": L.layerGroup()
            }
        },
        "operational": {
            "layerGroups": {
                "small": L.layerGroup(),
                "medium": L.layerGroup(),
                "large": L.layerGroup(),
                "mega": L.layerGroup()
            }
        }
    };

    /*function drawPoints(options) {
     var modelQueryPoints = mapData.fetchData({
     query: {
     geometries: {
     type: "points",
     group: options.group
     },
     url: config["map-features"][options["map-feature"]]["src"]
     }
     });
     
     modelQueryPoints.done(function(data, params) {
     L.geoJson(data, {
     pointToLayer: function(feature, latlng) {
     return L.marker(latlng, {
     icon: L.divIcon({
     className: config["icons"][options.group]["class"],
     html: "<img src='" + config["icons"][options.group]["src"] + "'/>"
     })
     });
     },
     onEachFeature: function(feature, layer) {
     
     }
     });
     });
     }*/

    (new UI_VerticalTabbedColumn({
        tabs: $.map(config["map-features"], function(item, index) {
            var tabDef = {
                title: item["title"],
                label: index.replace(/-/g, " "),
                eventHandlers: {
                    click: function(e) {
                        var deferred = $.Deferred();
                        var modelQueryPoints = mapData.fetchData({
                            query: {
                                geometries: {
                                    type: "points",
                                    group: index
                                },
                                url: config["map-features"][index]["src"]
                            },
                            returnDataMeta: {}
                        });

                        modelQueryPoints.done(function(data, params) {
                            var pointAttributeList = mapData.getAttributes({
                                "order-by": "Project",
                                "geometry-type": "points",
                                "feature-group": index
                            });
                            var overviewCollection = $("<div></div>");
                            var featuresOverview = $.map(pointAttributeList, function(l1_item, l1_index) {
                                new UI_FeatureInfoOverview({
                                    "title": l1_item.Project + ", " + l1_item.Capacity__ + "MW",
                                    "infoKeys": ["River", "Promoter"],
                                    "data": l1_item
                                }).appendTo(overviewCollection);
                            });
                            deferred.resolve(overviewCollection);
                        });

                        return deferred.promise();

                    }
                },
                eventCallbacks: {
                    click: function(e, callbackOptions) {
                        var data = callbackOptions.data;
                        var params = callbackOptions.params;
                        L.geoJson(data, {
                            pointToLayer: function(feature, latlng) {
                                return L.marker(latlng, {
                                    icon: L.divIcon({
                                        className: feature.properties.getAttributes().capacity,
                                        html: "<img src='" + item["icon-src"] + "'/>"
                                    })
                                });
                            },
                            onEachFeature: function(feature, layer) {

                            }
                        });
                    }
                }
            };
            return tabDef;
        })
    })).getUI().prependTo("body");

    $($(".ui-tab-trigger")[2]).click();










    map.on("zoomend", function() {
        setTimeout(function() {
            $("#map").find("div.marker-cluster").attrByFunction(function() {
                return {
                    "title": $(this).find("span").text() + " " + config["map-of"] + " in this cluster. Click to zoom in."
                };
            });

        }, 0);
    });

    map.fire("moveend");

});
$.fn.attrByFunction = function(fn) {
    return $(this).each(function() {
        $(this).attr(fn.call(this));
    });
};
