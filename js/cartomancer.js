$(document).ready(function() {
    $(".numberCircle").hide();

    var cartograph = new Map({
        "basemaps": {
            "OpenStreetMap": {
                "tileLayer": L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {})
            }
            /*,"Satellite Imagery": {
                "tileLayer": new L.Google()
            }*/
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
    
    L.control.zoom({
        position: "bottomright"
    }).addTo(map);



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
        },
        "all-projects": {
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
        }),
        "all-projects": L.control.layers({}, tabs["all-projects"]["layerGroups"], {
            collapsed: false
        })
    };

    var currentTab = "";

    var extentMarqueeGroup = L.layerGroup();
    mapGlobals.extentMarqueeGroup = extentMarqueeGroup;

    layerControls["construction-approved"].addTo(map);
    layerControls["survey-approved"].addTo(map);
    layerControls["operational"].addTo(map);
    layerControls["survey-applied"].addTo(map);
    layerControls["construction-applied"].addTo(map);
    layerControls["all-projects"].addTo(map);

    var markerURLs = ["img/marker_small.png", "img/marker_medium.png", "img/marker_large.png", "img/marker_large.png"]
    //setTimeout(function() {
    $.map(layerControls, function(layerControl, index) {
        $(layerControl._container).find("input").each(function(c) {
            $(this).after(function() {
                return $("<span></span>").addClass("legend-icon").css({
                    "background-image": "url('" + markerURLs[c] + "')"
                });
            });
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
            if (!(((key.indexOf("NL")+1))||((key.indexOf("SL")+1))||(key.indexOf("field")+1) ||(key.indexOf("atitiude")+1)||(key.indexOf("atitude")+1)||(key.indexOf("ongitude")+1) || key === "sn" || key === "start_lat" || key === "start_lng" || key === "end_lat" || key === "start_lng" || key === "S_No" || key === "_metaX")) {
                var tableRow = $('<div></div>').addClass('table-row').append(function() {

                    return jsonData[key] ? $("<div></div>").html("<div class='row-label'>" + key.replace(/_/g, " ").replace("(", " (") + "  :</div>").append($("<div class='val'></div>").text((jsonData[key] + "").replace(/,/g, ", "))) : $("<div class='row-label'></div>").text(key.replace(/_/g, " ").replace("(", " (") + "  :").append($("<div class='val not-available'></div>").text("Not Available"));
                });
                invert ? tableRow.prependTo(content).addClass(key) : tableRow.appendTo(content).addClass(key);
            }
        }
        return $(content)[0];
    }

    setTimeout(function(){

    (new UI_DropdownMenuColumn({
        tabs: $.map(config["map-features"], function(item, index) {
            var tabDef = {
                title: item["title"],
                label: index.replace(/-/g, " "),
                eventHandlers: {
                    click: function(e) {

                        currentTab = index;

                        if (index !== "construction-approved") {
                            $("#slider").hide();
                            $(".numberCircle").hide();
                        } else {
                            $("#slider").show();
                            if ($("#slider").css("display") !== "none")
                                $(".numberCircle").show();
                        }

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

                        var modelQueryPoints;
                        /*if (index === "all-projects") {
                         modelQueryPoints = $.Deferred();
                         var modelQueryQueue = [];
                         setTimeout(function() {
                         $.map(config["map-features"], function(fnlocal_item, fnlocal_index) {
                         if (fnlocal_index === "all-projects")
                         return;
                         modelQueryQueue.push(mapData.fetchData({
                         query: {
                         geometries: {
                         type: "points",
                         group: index
                         },
                         url: fnlocal_item["src"]
                         },
                         returnDataMeta: {}
                         }));
                         });
                         $.when.apply(null, modelQueryQueue).done(function(dataConstructionApproved, dataSurveyApproved, dataSurveyApplied, dataConstructionApplied, dataOperational) {
                         
                         //var allPoints = $.extend(true, {}, mapData.getGeometries()["points"]["construction-applied"]);
                         //console.log(JSON.stringify(dataOperational));
                         //console.log(JSON.stringify(dataSurveyApproved));
                         var allPoints = {
                         "type": "FeatureCollection",
                         "crs": {
                         "type": "name",
                         "properties": {
                         "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                         }
                         },
                         "features": []
                         };
                         
                         //setTimeout(function(){
                         for(var feature in dataConstructionApproved.features){
                         allPoints.features.push(dataConstructionApproved.features[feature]);
                         }
                         for(var feature in dataSurveyApproved.features){
                         allPoints.features.push(dataSurveyApproved.features[feature]);
                         }
                         for(var feature in dataSurveyApplied.features){
                         allPoints.features.push(dataSurveyApplied.features[feature]);
                         }
                         for(var feature in dataConstructionApplied.features){
                         allPoints.features.push(dataConstructionApplied.features[feature]);
                         }
                         for(var feature in dataOperational.features){
                         allPoints.features.push(dataOperational.features[feature]);
                         }
                         //},0);
                         
                         
                         modelQueryPoints.resolve(allPoints, {
                         type: "points",
                         group: index
                         });
                         });
                         }, 0);
                         } else {*/

                        modelQueryPoints = mapData.fetchData({
                            query: {
                                geometries: {
                                    type: "points",
                                    group: index
                                },
                                url: config["map-features"][index]["src"]
                            },
                            returnDataMeta: {}
                        });

                        //}

                        modelQueryPoints.done(function(data, params) {

                            /*mapData.generateExtentRectangleFromData({
                               "src-geometry-type": "points",
                                "src-feature-group": index,
                                "tgt-feature-group": index
                            });*///todo: not used here..a rectangle overlay is used here instead (see code somewhere below)..explore use of such function in other cases..

                            var pointAttributeList = mapData.getAttributes({
                                "order-by": "Project",
                                "geometry-type": "points",
                                "feature-group": index
                            });
                            //console.log(pointAttributeList);
                            var overviewCollection = $("<div></div>");
                            var featuresOverview = $.map(pointAttributeList, function(l1_item, l1_index) {
                                var overviewBox = new UI_FeatureInfoOverview({
                                    "title": l1_item.Project + ", " + l1_item["Capacity (MW)"] + "MW",
                                    "infoKeys": ["River", "Promoter"],
                                    "data": l1_item,
                                    "index": l1_index
                                });

                                overviewBox.click(function(e) {
                                    //var pointOfAttributes = mapData.getGeometries()["points"][index]["features"][$(this).attr("_id")];
                                    var pointOfAttributes = mapData.getGeometries()["points"][index]["features"][l1_item["_cartomancer_id"]];
                                    var popup = L.popup({});
                                    map.closePopup();
                                    //popup.setLatLng(e.latlng);
                                    popup.setContent(new TableContent_fix(pointOfAttributes.properties.getAttributes()));
                                    //popup.openOn(map);
                                    //console.log(pointOfAttributes);
                                    var latlng = L.latLng(Number(pointOfAttributes.geometry.coordinates[0]) + 0.03, Number(pointOfAttributes.geometry.coordinates[1]));


                                    setTimeout(function(){

                                    map.setView(latlng, 12, {
                                        animate: false
                                    });


                                    latlng = L.latLng(pointOfAttributes.geometry.coordinates[0], pointOfAttributes.geometry.coordinates[1]);
                                    popup.setLatLng(latlng);

                                    //map.once("zoomend", function() {
                                    setTimeout(function() {
                                        popup.openOn(map);

                                        popup.update();
                                    }, 500);
                                    //});
                                },100);
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

                        var _marqueeStyle = $.extend(true, {}, config["layer-styles"]["extent-marquee"]);
                            _marqueeStyle.opacity=0;
                            _marqueeStyle.fillOpacity=0;


                        for (var feature in data.features) {
                            var marker = L.marker(data.features[feature]["geometry"]["coordinates"].reverse(), {
                                icon: L.divIcon({
                                    className: data.features[feature].properties.getAttributes()["Project Size"].split("(")[0].trim().toLowerCase(),
                                    //html: "<img src='" + item["icon-src"] + "'/>"
                                    html: function() {
                                        var markerCategory = data.features[feature].properties.getAttributes()["Project Size"].split("(")[0].trim().toLowerCase();
                                        if (markerCategory === "mega")
                                            markerCategory = "large";
                                        return "<img src='img/marker_" + markerCategory + ".png'/>";
                                    }()
                                })
                            });

                            var popupContent = new TableContent_fix(data.features[feature].properties.getAttributes());

                            marker.bindPopup(popupContent);



                            var marquee = L.rectangle(L.latLngBounds(data.features[feature].properties.getAttributes().NE.split(",").reverse(), data.features[feature].properties.getAttributes().SW.split(",").reverse()),
                                            _marqueeStyle
                            );
                            marquee.bindPopup(popupContent);

                            /*var popup = L.popup({});
                             marker.on('click', function(e) {
                             console.log(marker);
                             popup.setLatLng(e.latlng);
                             popup.setContent(new TableContent_fix(data.features[feature].properties.getAttributes()));
                             popup.openOn(map);
                             });*/
                            try {
                                marker.addTo(tabs[index]["layerGroups"][data.features[feature].properties.getAttributes()["Project Size"].split("(")[0].trim().toLowerCase()]);
                                marquee.addTo(tabs[index]["layerGroups"][data.features[feature].properties.getAttributes()["Project Size"].split("(")[0].trim().toLowerCase()]);
                                marquee.addTo(extentMarqueeGroup);
                                //console.log(marquee.toGeoJSON());
                            } catch (e) {
                                console.log(e);
                            }
//marker.addTo(tabs["operational"]["layerGroups"][data.features[feature].properties.getAttributes()["Project_Si"].split("(")[0].trim().toLowerCase()]);
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

    },0);


    var boundaryLayersControl = L.control.layers({}, {}, {
        collapsed: false,
        position: "topright"
    });

    var districtLayers = L.featureGroup();
    var vdcLayer = L.featureGroup();

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
        setTimeout(function(){

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

        $($(boundaryLayersControl._container).find("input")[0]).css({
            opacity: 0,
            "pointer-events": "none"
        });
        },0);

    });


    var modelQueryVDC = mapData.fetchData({
        query: {
            geometries: {
                type: "polygons",
                group: "vdc"
            },
            url: "vdc.geojson"
        },
        returnDataMeta: {
        }
    });

    modelQueryVDC.done(function(data, params) {

        setTimeout(function(){

        vdcLayer.addLayer(L.geoJson(data, {
            style: config["layer-styles"]["vdc"],
            onEachFeature: function(feature, layer) {
                setTimeout(function() {
                    //districtLabelsOverlay.addLayer(new L.LabelOverlays(L.latLng(getPolygonCentroid(feature.geometry)), "123"));
                    //districtLabelsOverlay.addLayer(new L.LabelOverlays(layer.getBounds().getCenter(), feature.properties.Name));
                    vdcLayer.addLayer(function() {
                        return L.marker(layer.getBounds().getCenter(), {
                            icon: L.divIcon({
                                html: "<span class='marker-label-districts' title='" + feature.properties.getAttributes().name + "'>" + feature.properties.getAttributes().name + "</span>"
                            })
                        });
                    }());
                }, 0);
            }
        }));

        //boundaryLayersControl.addTo(map);

        map.on("zoomend", function(e) {

            if (this.getZoom() > 12) {


                //districtLayers.addTo(map);

                boundaryLayersControl.addOverlay(vdcLayer, "VDC");

                $($(boundaryLayersControl._container).find("input")[2]).after(function() {
                    return $("<span></span>").addClass("legend-icon").css({
                        "background-image": "url('img/district.png')"
                    });
                });

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

                $($(boundaryLayersControl._container).find("input")[0]).css({
                    opacity: 0,
                    "pointer-events": "none"
                });
            } else {
                
                if($(boundaryLayersControl._container).find("input")[2] && $(boundaryLayersControl._container).find("input")[2].checked){
                    $($(boundaryLayersControl._container).find("input")[2]).click();
                }
                
                boundaryLayersControl.removeLayer(vdcLayer);

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

                $($(boundaryLayersControl._container).find("input")[0]).css({
                    opacity: 0,
                    "pointer-events": "none"
                });
            }
        });

        },0);

        $($(boundaryLayersControl._container).find("input")[1]).after(function() {
            return $("<span></span>").addClass("legend-icon").css({
                "background-image": "url('img/district.png')"
            });
        });
        /*$($(boundaryLayersControl._container).find("input")[0]).after(function() {
         return $("<span></span>").addClass("legend-icon").css({
         "background-image": "url('img/country.png')"
         });
         });
         
         $($(boundaryLayersControl._container).find("input")[0]).css({
         opacity: 0,
         "pointer-events": "none"
         });*/

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

        setTimeout(function(){

        var countryBoundary = L.geoJson(data, {
            style: config["layer-styles"]["country"],
            /*onEachFeature: function(feature, layer) {
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
            }*/
        });

        boundaryLayersControl.addOverlay(countryBoundary, "Nepal");
        countryBoundary.addTo(map);
        },0);

        //boundaryLayersControl.addTo(map);
    });



    //if (window.decodeURIComponent(window.location.href).split("#")[1] === "prototype") {

    $(".numberCircle").show();


    var tooltip = $('<div id="toolTipSlider" />');

    var year = "BS 207";

    var arrayYear = [1, 2, 3, 4, 5];

    var capacityYear = {
        1: 718,
        2: 718,
        3: 718,
        4: 718,
        5: 718
    };

    $('#slider').slider({
        min: 1,
        max: 5,
        slide: function(event, ui) {
            if ($.inArray(ui.value, arrayYear)) {
                tooltip.text(year + ui.value);
                $('.numberCircle').text(capacityYear[ui.value] + " MW");
            } else {
                tooltip.text("BS 2071");
                $('.numberCircle').text(capacityYear[1] + " MW");
            }
        }
    }).find(".ui-slider-handle").append(tooltip).hover(function() {
        tooltip.show();
    });

    $(".ui-slider-handle").append(function() {
        return "<img src='img/sliderknob.png'/>";
    });

    tooltip.text("BS 2071");
    $('.numberCircle').text(capacityYear[1] + " MW");
    //}






    map.on("zoomend", function() {
        var element = this;
        setTimeout(function() {



            if(element.getZoom()>11){
                setTimeout(function(){
                    $.map(extentMarqueeGroup._layers, function(layer, leafletID){
                       layer.setStyle({
                           opacity: config["layer-styles"]["extent-marquee"]["opacity"],
                           fillOpacity: config["layer-styles"]["extent-marquee"]["fillOpacity"]
                       })
                    });
                },0);

            }else{
                setTimeout(function(){
                    $.map(extentMarqueeGroup._layers, function(layer, leafletID){
                       layer.setStyle({
                           opacity: 0,
                           fillOpacity: 0
                       })
                    });
                },0);
            }

        }, 0);
    });



    map.fire("moveend");

});

$.fn.attrByFunction = function(fn) {
    return $(this).each(function() {
        $(this).attr(fn.call(this));
    });
};
