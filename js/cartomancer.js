$(document).ready(function() {
    $(".numberCircle").hide();

    var cartograph = new Map({
        "basemaps": {
            "OpenStreetMap": {
                "tileLayer": L.tileLayer('http://104.131.69.181/osm/{z}/{x}/{y}.png', {})
            }
            ,
            "Satellite Imagery": {
                "tileLayer": new L.Google()
            }
        }
    });
    $("#map").find("a.leaflet-control-zoom-out").text("–");
    var map = cartograph.getMap();



    var popup = new Popup();
    mapGlobals = {
        map: map
    };

    map.setMaxBounds(map.getBounds().pad(0.025));

    L.control.scale({
        position: "bottomleft"
    }).addTo(map);

    L.control.zoom({
        position: "bottomleft"
    }).addTo(map);


    var mapData = new Data();


    mapGlobals.mapData = mapData;

    mapGlobals.frozen=false;
    mapGlobals.freezeScreen={
        freeze: function(){
            $(".freezeScreen").removeClass("hidden");
        },
        unfreeze: function(){
            $(".freezeScreen").addClass("hidden");
            $("#map").click();
        }
    }

    /*TODO: var layerGroupExtendedOptions = function() {
     var layerGroup = L.layerGroup();
     layerGroup["min-zoom"] = LayerStyles["map-features"]["min-zoom"];
     layerGroup["max-zoom"] = LayerStyles["map-features"]["max-zoom"];
     return layerGroup;
     };*/

    var tabs = {
        "survey-approved": {
            "layerGroups": {
                "mega": L.layerGroup(),
                "large": L.layerGroup(),
                "medium": L.layerGroup(),
                "small": L.layerGroup()
            }
        },
        "survey-applied": {
            "layerGroups": {
                "mega": L.layerGroup(),
                "large": L.layerGroup(),
                "medium": L.layerGroup(),
                "small": L.layerGroup()
            }
        },
        "construction-approved": {
            "layerGroups": {
                "mega": L.layerGroup(),
                "large": L.layerGroup(),
                "medium": L.layerGroup(),
                "small": L.layerGroup()
            }
        },
        "construction-applied": {
            "layerGroups": {
                "mega": L.layerGroup(),
                "large": L.layerGroup(),
                "medium": L.layerGroup(),
                "small": L.layerGroup()
            }
        },
        "operational": {
            "layerGroups": {
                "mega": L.layerGroup(),
                "large": L.layerGroup(),
                "medium": L.layerGroup(),
                "small": L.layerGroup()
            }
        },
        "all-projects": {
            "layerGroups": {
                "mega": L.layerGroup(),
                "large": L.layerGroup(),
                "medium": L.layerGroup(),
                "small": L.layerGroup()
            }
        }
    };

    /* var layerControls = {
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
    */

    var theLayerGroups = {
        "mega": L.layerGroup(),
        "large": L.layerGroup(),
        "medium": L.layerGroup(),
        "small": L.layerGroup()
    };


    $.map(tabs, function(_layerGroups, _category) {
        $.map(_layerGroups.layerGroups, function(_layerGroup, _size) {
            _layerGroup.addTo(theLayerGroups[_size]);
        });
    });


    var theLayerControl = L.control.layers({}, theLayerGroups, {
        collapsed: false
    });
    theLayerControl.addTo(map);

    $(theLayerControl._container).find("input").click();




    var currentTab = "";

    var extentMarqueeGroup = L.layerGroup();
    mapGlobals.extentMarqueeGroup = extentMarqueeGroup;

    /*
    layerControls["construction-approved"].addTo(map);
    layerControls["survey-approved"].addTo(map);
    layerControls["operational"].addTo(map);
    layerControls["survey-applied"].addTo(map);
    layerControls["construction-applied"].addTo(map);
    layerControls["all-projects"].addTo(map);
    */


    var highlightLayer = L.layerGroup();
    highlightLayer.addTo(map);

    var markerURLs = ["img/marker_mega.png", "img/marker_large.png", "img/marker_medium.png", "img/marker_small.png"]
    //setTimeout(function() {
    //$.map(theLayerControls, function(layerControl, index) {
    $(theLayerControl._container).find("input").each(function(c) {
        $(this).after(function() {
            return $("<span></span>").addClass("legend-icon").css({
                "background-image": "url('" + markerURLs[c] + "')"
            });
        });
    });

    $("<div class='controls-title controls-seperator'><h5>Project Size</h5></div>").prependTo(theLayerControl._container);
    //});
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
            if (!(((key.indexOf("S No") + 1)) || ((key.indexOf("NL") + 1)) || ((key.indexOf("SL") + 1)) || (key.indexOf("field") + 1) || (key.indexOf("atitiude") + 1) || (key.indexOf("atitude") + 1) || (key.indexOf("ongitude") + 1) || key === "sn" || key === "start_lat" || key === "start_lng" || key === "end_lat" || key === "start_lng" || key === "S_No" || key === "_metaX")) {
                var tableRow = $('<div></div>').addClass('table-row').append(function() {

                    return jsonData[key] ? $("<div></div>").html("<div class='row-label'>" + key.replace(/_/g, " ").replace("(", " (") + "  :</div>").append($("<div class='val'></div>").text((jsonData[key] + "").replace(/,/g, ", "))) : $("<div class='row-label'></div>").text(key.replace(/_/g, " ").replace("(", " (") + "  :").append($("<div class='val not-available'></div>").text("Not Available"));
                });

                if (key === "Project" && jsonData[key] === "Kali Gandaki A") {
                    tableRow.append("<a title='Wikipedia' class='wiki' target='_blank' href='http://en.wikipedia.org/wiki/Kaligandaki_A_Hydroelectric_Power_Station'></a>")
                }

                invert ? tableRow.prependTo(content).addClass(key) : tableRow.appendTo(content).addClass(key);
            }
        }
        return $(content)[0];
    }

    setTimeout(function() {

        var asyncListColumn = new UI_SimpleAsyncListColumn({
            filterByElements: config["filter-search-by-elements"],
            searchControl: {
                eventHandlers: {
                    found: function(resultArray) {
                        //console.log(currentTab);
                        highlightLayer.clearLayers();
                        setTimeout(function() {
                            for (var c in resultArray) {
                                //L.circle(mapData.getGeometries().points[currentTab].features[resultArray[c]].geometry.coordinates,2000000/(Math.pow(1.9,map.getZoom()/1.05)), config["layer-styles"]["highlight-circle"]).addTo(highlightLayer);
                                L.circleMarker(mapData.getGeometries().points[currentTab].features[resultArray[c]].geometry.coordinates, config["layer-styles"]["highlight-circle"]).addTo(highlightLayer);
                            }
                        }, 0);
                    },
                    notFound: function() {
                        highlightLayer.clearLayers();
                    }
                }
            }

        });
        asyncListColumn.getUI().appendTo("body");

        (new UI_Switchboard({
            switches: $.map(config["map-features"], function(item, index) {
                console.log(index);
                var tabDef = {
                    label: item["title"],
                    events: {
                        "switch-on": function(e) {

                            if($(this).attr("_id")===5)return;

                            mapGlobals.freezeScreen.freeze();

                            currentTab = index;

                            if (index !== "operational") {
                                $("#slider").hide();
                                $(".numberCircle").hide();
                            } else {
                                $("#slider").show();
                                if ($("#slider").css("display") !== "none")
                                    $(".numberCircle").show();
                            }

                            var deferred = $.Deferred();
                            //a=$(layerControls[index]._container).find("input")[0];

                            /*$.map(layerControls, function(layerControl, c) {
                                $(layerControl._container).hide();
                                //console.log($(layerControl._container).find("input"));
                                $(layerControl._container).find("input").each(function() {
                                    if ($(this)[0].checked)
                                        $(this).click();
                                });
                            });*/




                            var modelQueryPoints;


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




                                asyncListColumn.updateContent({
                                    contentGen: function() {

                                        /*mapData.generateExtentRectangleFromData({
                               "src-geometry-type": "points",
                                "src-feature-group": index,
                                "tgt-feature-group": index
                            });*/ //todo: not used here..a rectangle overlay is used here instead (see code somewhere below)..explore use of such function in other cases..

                                        var pointAttributeList = mapData.getAttributes({
                                            "order-by": "Project",
                                            "geometry-type": "points",
                                            "feature-group": index
                                        });
                                        //console.log(pointAttributeList);
                                        var overviewCollection = $("<div></div>");
                                        var featuresOverview = $.map(pointAttributeList, function(l1_item, l1_index) {
                                            var overviewBox = new UI_FeatureInfoOverview({
                                                "title": l1_index + 1 + ". " + l1_item.Project + ", " + l1_item["Capacity (MW)"] + "MW",
                                                "infoKeys": ["River", "Promoter"],
                                                "attributes": {
                                                    "_id": l1_item._cartomancer_id
                                                },
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


                                                setTimeout(function() {

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
                                                }, 100);
                                            });

                                            overviewBox.appendTo(overviewCollection);
                                        });



                                        deferred.resolve({
                                            data: data,
                                            params: params,
                                            jqObj: overviewCollection
                                        });

                                        deferred.done(function(callbackOptions) {

                                            var data = callbackOptions.data;
                                            var params = callbackOptions.params;

                                            var _marqueeStyle = $.extend(true, {}, config["layer-styles"]["extent-marquee"]);
                                            _marqueeStyle.opacity = 0;
                                            _marqueeStyle.fillOpacity = 0;

                                            feature=0;

                                            setTimeout(function() {


                                                for (var _c in data.features) {
                                                    setTimeout(function(){
                                                    //console.log(data.features[feature]["geometry"]["coordinates"]);
                                                    var markerCategory = data.features[feature].properties.getAttributes()["Project Size"].split("(")[0].trim().toLowerCase();
                                                    /*var marker = L.marker(data.features[feature]["geometry"]["coordinates"].reverse(), {
                                                        icon: L.divIcon({
                                                            className: data.features[feature].properties.getAttributes()["Project Size"].split("(")[0].trim().toLowerCase(),
                                                            //html: "<img src='" + item["icon-src"] + "'/>"
                                                            html: function() {
                                                                var markerCategory = data.features[feature].properties.getAttributes()["Project Size"].split("(")[0].trim().toLowerCase();

                                                                return "<img src='img/marker_" + markerCategory + ".png'/>";
                                                           // }()
                                                        //})
                                                    //});*/

                                                    //													var marker = L.circleMarker(data.features[feature]["geometry"]["coordinates"].reverse(), $.extend(config["layer-styles"]["markers"][index][markerCategory],setRandomStyle(config.colorList,config.opacity)));
                                                    //var marker = L.circleMarker(data.features[feature]["geometry"]["coordinates"].reverse(), config["layer-styles"]["markers"][index][markerCategory]);

                                                    var centerLatLng = data.features[feature]["geometry"]["coordinates"].reverse();
                                                    //                                                    marker = L.polygon(function(){
                                                    //                                                        return [
                                                    //                                                            L.latLng([centerLatLng[0], centerLatLng[1]+0.3]),
                                                    //                                                            L.latLng([centerLatLng[0]+0.15, centerLatLng[1]+0.15]),
                                                    //                                                            L.latLng([centerLatLng[0]+0.15, centerLatLng[1]-0.15]),
                                                    //                                                            L.latLng([centerLatLng[0], centerLatLng[1]-0.3]),
                                                    //                                                            L.latLng([centerLatLng[0], centerLatLng[1]+0.3])
                                                    //                                                        ];
                                                    //                                                    }(), config["layer-styles"]["markers"][index][markerCategory]);

                                                    var marker;

                                                    marker = new window[config["layer-styles"]["marker-shapes"][markerCategory]](centerLatLng, config["layer-styles"]["markers"][index][markerCategory]);
                                                    //marker.addTo(map);

                                                    //console.log(index);

                                                    var popupContent = new TableContent_fix(data.features[feature].properties.getAttributes());

                                                    marker.bindPopup(popupContent);




                                                    var marquee = L.rectangle(L.latLngBounds(data.features[feature].properties.getAttributes().NE.split(",").reverse(), data.features[feature].properties.getAttributes().SW.split(",").reverse()),
                                                        _marqueeStyle
                                                    );
                                                    marquee.bindPopup(popupContent);

                                                    var marqueeCloseButton = L.marker(marquee._latlngs[2], {
                                                        icon: L.divIcon({
                                                            iconSize: [10, 10],
                                                            iconAnchor: [21, 9],
                                                            className: "project-extent-rectangle-close-button frozen hidden",
                                                            html: "<a>&times;</a>"
                                                        })
                                                    });

                                                    var marqueeObj = L.featureGroup();
                                                    marqueeObj.addLayer(marquee);
                                                    marqueeObj.addLayer(marqueeCloseButton);

                                                    /*var popup = L.popup({});
                             marker.on('click', function(e) {
                             console.log(marker);
                             popup.setLatLng(e.latlng);
                             popup.setContent(new TableContent_fix(data.features[feature].properties.getAttributes()));
                             popup.openOn(map);
                             });*/
                                                    try {

                                                        marker.addTo(tabs[index]["layerGroups"][data.features[feature].properties.getAttributes()["Project Size"].split("(")[0].trim().toLowerCase()]);
                                                        marqueeObj.addTo(tabs[index]["layerGroups"][data.features[feature].properties.getAttributes()["Project Size"].split("(")[0].trim().toLowerCase()]);
                                                        marqueeObj.addTo(extentMarqueeGroup);

                                                        marqueeCloseButton.on("click", function(e) {
                                                            //extentMarqueeGroup.removeLayer(marqueeObj);
                                                            //tabs[index]["layerGroups"][data.features[feature].properties.getAttributes()["Project Size"].split("(")[0].trim().toLowerCase()].removeLayer(marqueeObj);
                                                            marqueeObj.eachLayer(function(layer, index) {
                                                                if (layer._icon) {
                                                                    $(layer._icon).addClass("frozen hidden");
                                                                } else {
                                                                    map._layers[layer._leaflet_id].setStyle({
                                                                        opacity: 0,
                                                                        fillOpacity: 0
                                                                    });
                                                                }
                                                            });


                                                        });
                                                        //console.log(marquee.toGeoJSON());
                                                    } catch (e) {
                                                        console.log(e);
                                                    }
                                                    //marker.addTo(tabs["operational"]["layerGroups"][data.features[feature].properties.getAttributes()["Project_Si"].split("(")[0].trim().toLowerCase()]);
                                                    //marker.addTo(map);
                                                        if(feature===data.features.length-1){
                                                            //mapGlobals.frozen=false;
                                                            mapGlobals.freezeScreen.unfreeze();
                                                        }
                                                        feature++;
                                                },100);}

                                                //$(theLayerControl._container).find("input").click();

                                                //setTimeout(function(){
                                                // $(theLayerControl._container).find("input").click();
                                                //},0);

                                            }, 0);
                                        });




                                        return deferred.promise();
                                    }
                                });

                            });

                        },
                        "switch-off": function(e, hackObj) {
                            if($(this).attr("_id")===5)return;
                            mapGlobals.freezeScreen.freeze();
                            var context = this;
                            setTimeout(function() {

                                //console.log(context);

                                $.map(tabs[index].layerGroups, function(_layerGroup, _size) {
                                    _layerGroup.clearLayers();
                                });
                                setTimeout(function() {
                                    $(context).click();



                                    setTimeout(function() {

                                        $(context).find("input")[0].checked = false;

                                        $.map(tabs[index].layerGroups, function(_layerGroup, _size) {
                                            //L.circleMarker([0,0]).addTo(_layerGroup);
                                            _layerGroup.clearLayers();
//                                            if(_size==="small"){
//                                                mapGlobals.freezeScreen.unfreeze();
//                                            }
                                        });
                                        hackObj.switchStates[hackObj.c] = 0;


                                    }, 0);
                                    setTimeout(function(){
                                        mapGlobals.freezeScreen.unfreeze();
                                    }, 5000);

                                }, 0);

                            }, 0);
                        }
                    }
                }
                return tabDef;
            }),
            checkbox: true
        })).done(function(context) {

            var ui = context.getUI().prependTo(".leaflet-top.leaflet-right");
            ui.find("._id_5").attr("title", "This option will be available soon..");

            $("<div class='controls-title controls-seperator'><h5>Project Status</h5></div>").prependTo($(".leaflet-top.leaflet-right").find(".ui-switchboard"));

            (new UI_Button({
                attributes: {
                    class: "sidebar-close-button"
                },
                eventHandlers: {
                    click: function(e) {
                        $(this).parent().hide({
                            duration: 400
                        });
                        var context = this;

                        (new UI_Button({
                            attributes: {
                                class: "sidebar-restore-button"
                            },
                            eventHandlers: {
                                click: function(e) {
                                    $(this).remove();
                                    $(context).parent().show({
                                        duration: 400
                                    });
                                }
                            },
                            content: "<span></span>"
                        })).appendTo("body");
                    }
                },
                content: "<span>&times;</span>"
            })).prependTo(".leaflet-top.leaflet-right");

            $(ui.find("a")[2]).click();
        });



    }, 0);


    var boundaryLayersControl = L.control.layers({}, {}, {
        collapsed: false,
        position: "topright"
    });

    var districtLayers = L.featureGroup();
    var vdcLayer = L.featureGroup();

    var modelQueryDistrict = {done:function(f){return;}}/*mapData.fetchData({
        query: {
            geometries: {
                type: "polygons",
                group: "districts"
            },
            url: "districts.geojson"
        },
        returnDataMeta: {}
    });*/

    modelQueryDistrict.done(function(data, params) {
        setTimeout(function() {

            districtLayers.addLayer(L.geoJson(data, {
                style: config["layer-styles"]["districts"],
                onEachFeature: function(feature, layer) {
                    setTimeout(function() {
                        /*layer.setStyle({
                            fillColor: randomColor()
                        });*/
                        //districtLabelsOverlay.addLayer(new L.LabelOverlays(L.latLng(getPolygonCentroid(feature.geometry)), "123"));
                        //districtLabelsOverlay.addLayer(new L.LabelOverlays(layer.getBounds().getCenter(), feature.properties.Name));
                        districtLayers.addLayer(function() {
                            return L.marker(layer.getBounds().getCenter(), {
                                icon: L.divIcon({
                                    html: "<span class='marker-label-districts seethru' title='" + feature.properties.getAttributes().Name + "'>" + feature.properties.getAttributes().Name + "</span>"
                                })
                            });
                        }());
                    }, 0);
                }
            }));

            boundaryLayersControl.addOverlay(districtLayers, "District");
            districtLayers.addTo(map);
            boundaryLayersControl.addTo(map);
            $(boundaryLayersControl._container).hide();

            $("<div class='controls-title controls-seperator'><h5>Administrative Boundaries</h5></div>").prependTo(boundaryLayersControl._container);

            cartograph.initializeBasemaps();
            L.tileLayer("../slippy-maps/nepaldistricts-vdcs/{z}/{x}/{y}.png",{}).addTo(map);

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
        }, 0);

    });


    var modelQueryVDC = mapData.fetchData({
        query: {
            geometries: {
                type: "polygons",
                group: "vdc"
            },
            url: "vdc.geojson"
        },
        returnDataMeta: {}
    });

    modelQueryVDC.done(function(data, params) {

        setTimeout(function() {

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

                    if ($(boundaryLayersControl._container).find("input")[2] && $(boundaryLayersControl._container).find("input")[2].checked) {
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

        }, 0);

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
        returnDataMeta: {}
    });

    modelQueryCountry.done(function(data, params) {

        setTimeout(function() {

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
        }, 0);

        //boundaryLayersControl.addTo(map);
    });



    //if (window.decodeURIComponent(window.location.href).split("#")[1] === "prototype") {

    $(".numberCircle").show();


    var tooltip = $('<div id="toolTipSlider" />');

    var year = "BS 207";

    var arrayYear = [1, 2, 3, 4, 5];

    var capacityYear = {
        2051: 291,
        2052: 334,
        2053: 523,
        2054: 552,
        2055: 552,
        2056: 552,
        2057: 625,
        2058: 625,
        2059: 628,
        2060: 633,
        2061: 640,
        2062: 640,
        2063: 647,
        2064: 654,
        2065: 660,
        2066: 703,
        2067: 708,
        2068: 718
    };

    $('#slider').slider({
        min: 2051,
        max: 2068,
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

    $('#slider').slider("value", 2068);

    $(".ui-slider-handle").append(function() {
        return "<img src='img/sliderknob.png'/>";
    });

    tooltip.text("BS 2071");
    $('.numberCircle').text(capacityYear[2068] + " MW");
    //}






    map.on("zoomend", function() {
        var element = this;
        setTimeout(function() {



            if (element.getZoom() > 11) {
                setTimeout(function() {
                    $.map(extentMarqueeGroup._layers, function(layer, leafletID) {
                        layer.setStyle({
                            opacity: config["layer-styles"]["extent-marquee"]["opacity"],
                            fillOpacity: config["layer-styles"]["extent-marquee"]["fillOpacity"]
                        })
                    });
                    $("#map").find(".project-extent-rectangle-close-button").removeClass("frozen hidden");
                }, 0);

            } else {
                setTimeout(function() {
                    $.map(extentMarqueeGroup._layers, function(layer, leafletID) {
                        layer.setStyle({
                            opacity: 0,
                            fillOpacity: 0
                        })
                    });
                    $("#map").find(".project-extent-rectangle-close-button").addClass("frozen hidden");
                }, 0);
            }

            if (element.getZoom() > 7) {
                $(".marker-label-districts").removeClass("seethru");
            } else {
                $(".marker-label-districts").addClass("seethru");
            }

        }, 0);
    });


    map.on("baselayerchange", function(layer) {
        if (layer.name === "Satellite Imagery") {
            districtLayers.setStyle({
                color: "#ffffff",
                fillOpacity: 0
            });
            $(".marker-label-districts").addClass("dark-background");
        } else {
            districtLayers.setStyle({
                color: "#333333",
                fillOpacity: 0.2
            });
            $(".marker-label-districts").removeClass("dark-background");
        }
        //$(map.getPanes().tilePane).toggleClass("grayscale", layer.name === "OpenStreetMap Grayscale");
    });

    $(new UI_Button({
        attributes: {
            class: "map-title"
        },
        eventHandlers: {
            click: function(e) {
                $("#about").removeClass("hidden");
            }
        },
        content: "<span>About</span>"
    })).appendTo("body");

    $("#about").find(".close-button").click(function(e) {
        $(this).parent().addClass("hidden");
    });

cartograph.initializeBasemaps();
            var districtsBasemap = L.tileLayer("../slippy-maps/nepal-districts-vdcs/{z}/{x}/{y}.png",{});
    map.addLayer(districtsBasemap);
    $(districtsBasemap._container).css("z-index",2);

    map.fire("moveend");

});

$.fn.attrByFunction = function(fn) {
    return $(this).each(function() {
        $(this).attr(fn.call(this));
    });
};
