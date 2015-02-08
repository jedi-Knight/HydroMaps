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

    map.setMaxBounds(map.getBounds().pad(0.025));



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

    var layerControls = {
        "survey-approved": L.control.layers({}, tabs["survey-approved"]["layerGroups"], {
            collapsed: false
        }),
        "survey-applied": L.control.layers({}, tabs["survey-applied"]["layerGroups"], {
            collapsed: false
        }),
        "construction-approved": L.control.layers({}, tabs["construction-approved"]["layerGroups"], {
            collapsed: false
        }),
        "construction-applied": L.control.layers({}, tabs["construction-applied"]["layerGroups"], {
            collapsed: false
        }),
        "operational": L.control.layers({}, tabs["operational"]["layerGroups"], {
            collapsed: false
        })
    };

    layerControls["construction-approved"].addTo(map);
    layerControls["survey-approved"].addTo(map);
    layerControls["operational"].addTo(map);
    layerControls["survey-applied"].addTo(map);
    layerControls["construction-applied"].addTo(map);

    var markerURLs = ["img/marker_small.png", "img/marker_medium.png", "img/marker_large.png", "img/marker_large.png"]
    //setTimeout(function() {
    $.map(layerControls, function(layerControl, index) {
        $(layerControl._container).find("input").each(function(c) {
            $(this).after(function() {
                return $("<span></span>").addClass("legend-icon").css({
                    "background-image": "url('" + markerURLs[c] + "')"
                });
            })
        });
    });
    //}, 0);

    //console.log(layerControls["construction-approved"]._container);

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

    function TableContent_fix(jsonData, invert) {
        var content = $('<div></div>').addClass('table-content');
        for (var key in jsonData) {
            if (!(key === "sn" || key === "start_lat" || key === "start_lng" || key === "end_lat" || key === "start_lng" || key === "S_No" || key === "_metaX")) {
                var tableRow = $('<div></div>').addClass('table-row').append(function() {

                    return jsonData[key] ? $("<div></div>").html("<div class='row-label'>" + key.replace(/_/g, " ").replace("(", " (") + "  :</div>").append($("<div class='val'></div>").text((jsonData[key] + "").replace(/,/g, ", "))) : $("<div class='row-label'></div>").text(key.replace(/_/g, " ").replace("(", " (") + "  :").append($("<div class='val not-available'></div>").text("Not Available"));
                });
                invert ? tableRow.prependTo(content).addClass(key) : tableRow.appendTo(content).addClass(key);
            }
        }
        return $(content)[0];
    }

    (new UI_VerticalTabbedColumn({
        tabs: $.map(config["map-features"], function(item, index) {
            var tabDef = {
                title: item["title"],
                label: index.replace(/-/g, " "),
                eventHandlers: {
                    click: function(e) {
                        var deferred = $.Deferred();
                        //a=$(layerControls[index]._container).find("input")[0];

                        $.map(layerControls, function(layerControl, c) {
                            $(layerControl._container).hide();
                            //console.log($(layerControl._container).find("input"));
                            $(layerControl._container).find("input").each(function() {
                                if ($(this)[0].checked)
                                    $(this).click();
                            });
                        });
                        $(layerControls[index]._container).show();
                        $(layerControls[index]._container).find("input").click();
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
                                var overviewBox = new UI_FeatureInfoOverview({
                                    "title": l1_item.Project + ", " + l1_item.Capacity__ + "MW",
                                    "infoKeys": ["River", "Promoter"],
                                    "data": l1_item
                                });

                                overviewBox.click(function(e) {
                                    //var pointOfAttributes = mapData.getGeometries()["points"][index]["features"][$(this).attr("_id")];
                                    var pointOfAttributes = mapData.getGeometries()["points"][index]["features"][l1_item["_cartomancer_id"]];
                                    var popup = L.popup({});
                                    //popup.setLatLng(e.latlng);
                                    popup.setContent(new TableContent_fix(pointOfAttributes.properties.getAttributes()));
                                    //popup.openOn(map);
                                    //console.log(pointOfAttributes);
                                    var latlng = L.latLng(pointOfAttributes.geometry.coordinates[0] + 0.03, pointOfAttributes.geometry.coordinates[1]);


                                    map.setView(latlng, 12, {
                                        animate: false
                                    });


                                    latlng = L.latLng(pointOfAttributes.geometry.coordinates[0], pointOfAttributes.geometry.coordinates[1]);
                                    popup.setLatLng(latlng);

                                    //map.once("zoomend", function() {
                                    setTimeout(function() {
                                        popup.openOn(map);

                                        popup.update();
                                    }, 300);
                                    //});
                                });

                                overviewBox.appendTo(overviewCollection);
                            });



                            deferred.resolve({
                                data: data,
                                params: params,
                                jqObj: overviewCollection
                            });
                        });

                        return deferred.promise();

                    }
                },
                eventCallbacks: {
                    click: function(e, callbackOptions) {
                        var data = callbackOptions.data;
                        var params = callbackOptions.params;


                        for (var feature in data.features) {
                            var marker = L.marker(data.features[feature]["geometry"]["coordinates"].reverse(), {
                                icon: L.divIcon({
                                    className: data.features[feature].properties.getAttributes().Project_Si.split("(")[0].trim().toLowerCase(),
                                    //html: "<img src='" + item["icon-src"] + "'/>"
                                    html: function(){
                                        var markerCategory = data.features[feature].properties.getAttributes().Project_Si.split("(")[0].trim().toLowerCase();
                                        if(markerCategory==="mega")markerCategory="large";
                                        return "<img src='img/marker_" + markerCategory + ".png'/>";
                                    }()
                                })
                            });
                            var popup = L.popup({});
                            marker.on('click', function(e) {
                                popup.setLatLng(e.latlng);
                                popup.setContent(new TableContent_fix(data.features[feature].properties.getAttributes()));
                                popup.openOn(map);
                            });
                            marker.addTo(tabs[index]["layerGroups"][data.features[feature].properties.getAttributes()["Project_Si"].split("(")[0].trim().toLowerCase()]);
                            //marker.addTo(map);
                        }

                        /*L.geoJson(data, {
                         pointToLayer: function(feature, latlng) {
                         //console.log(feature);
                         return L.marker(latlng, {
                         icon: L.divIcon({
                         className: feature.properties.getAttributes().capacity,
                         html: "<img src='" + item["icon-src"] + "'/>"
                         })
                         });
                         },
                         onEachFeature: function(feature, layer) {
                         console.log(feature);
                         tabs["construction-approved"]["layerGroups"]["small"].addLayer(layer);
                         }
                         });*/
                    }
                },
                layerControl: layerControls[index]
            };
            return tabDef;
        })
    })).getUI().prependTo("body");

    $($(".ui-tab-trigger")[2]).click();


    var boundaryLayersControl = L.control.layers({}, {}, {
        collapsed: false,
        position: "topright"
    });

    var districtLayers = L.featureGroup();

    var modelQueryDistrict = mapData.fetchData({
        query: {
            geometries: {
                type: "polygons",
                group: "districts"
            },
            url: "districts.geojson"
        },
        returnDataMeta: {
        }
    });

    modelQueryDistrict.done(function(data, params) {

        districtLayers.addLayer(L.geoJson(data, {
            style: config["layer-styles"]["districts"],
            onEachFeature: function(feature, layer) {
                setTimeout(function() {
                    //districtLabelsOverlay.addLayer(new L.LabelOverlays(L.latLng(getPolygonCentroid(feature.geometry)), "123"));
                    //districtLabelsOverlay.addLayer(new L.LabelOverlays(layer.getBounds().getCenter(), feature.properties.Name));
                    districtLayers.addLayer(function() {
                        return L.marker(layer.getBounds().getCenter(), {
                            icon: L.divIcon({
                                html: "<span class='marker-label-districts' title='" + feature.properties.getAttributes().Name + "'>" + feature.properties.getAttributes().Name + "</span>"
                            })
                        });
                    }());
                }, 0);
            }
        }));

        boundaryLayersControl.addOverlay(districtLayers, "District");
        districtLayers.addTo(map);
        boundaryLayersControl.addTo(map);
        $($(boundaryLayersControl._container).find("input")[1]).after(function() {
            return $("<span></span>").addClass("legend-icon").css({
                "background-image": "url('img/district.png')"
            });
        });
        $($(boundaryLayersControl._container).find("input")[0]).after(function() {
            return $("<span></span>").addClass("legend-icon").css({
                "background-image": "url('img/country.png')"
            });
        });
    });


    var modelQueryCountry = mapData.fetchData({
        query: {
            geometries: {
                type: "polygons",
                group: "districts"
            },
            url: "nepal.geojson"
        },
        returnDataMeta: {
        }
    });

    modelQueryCountry.done(function(data, params) {

        var countryBoundary = L.geoJson(data, {
            style: config["layer-styles"]["country"],
            onEachFeature: function(feature, layer) {
                setTimeout(function() {
                    //districtLabelsOverlay.addLayer(new L.LabelOverlays(L.latLng(getPolygonCentroid(feature.geometry)), "123"));
                    //districtLabelsOverlay.addLayer(new L.LabelOverlays(layer.getBounds().getCenter(), feature.properties.Name));
                    districtLayers.addLayer(function() {
                        return L.marker(layer.getBounds().getCenter(), {
                            icon: L.divIcon({
                                html: "<span class='marker-label-districts' title='" + feature.properties.getAttributes().Name + "'>" + feature.properties.getAttributes().Name + "</span>"
                            })
                        });
                    }());
                }, 0);
            }
        });

        boundaryLayersControl.addOverlay(countryBoundary, "Nepal");
        countryBoundary.addTo(map);
        
        //boundaryLayersControl.addTo(map);
    });










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
