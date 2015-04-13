$(document).ready(function() {
    $(".numberCircle").hide();


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

    mapGlobals.frozen = false;
    mapGlobals.freezeScreen = {
        freeze: function() {
            $(".freezeScreen").removeClass("hidden");
        },
        unfreeze: function() {
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

    var markerURLs = ["img/markers/mega.svg", "img/markers/large.svg", "img/markers/medium.svg", "img/markers/small.svg"]
    //setTimeout(function() {
    //$.map(theLayerControls, function(layerControl, index) {
    $(theLayerControl._container).find("input").each(function(c) {
        $(this).after(function() {
            return $("<span></span>").addClass("legend-icon").css({
                "background-image": "url('" + markerURLs[c] + "')"
            });
        });
    });

    var capacityYear = {
        "updated": false
    };

    for (var c = config["special-function-parameters"]["operational-year-range"][0]; c <= config["special-function-parameters"]["operational-year-range"][1]; c++) {
        capacityYear[c] = 0;
    }

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

    var dataPrepList = [];
    $.map(Object.keys(tabs), function(tabKey, index) {
        if (tabKey === "all-projects") {
            return;
        }
        dataPrepList.push(
            mapData.fetchData({
                query: {
                    geometries: {
                        type: "points",
                        group: tabKey
                    },
                    url: config["map-features"][tabKey]["src"]
                },
                returnDataMeta: {}
            })
        );
    });
    
    var markersPrep = $.Deferred();
    
    $.whenListDone(dataPrepList).done(function(dataArr){
        var markersGroupsGen = new UI_MarkerGroups(dataArr);
        markersGroupsGen.done(function(markerGroups){
            mapGlobals.freezeScreen.unfreeze();
            markersPrep.resolve(markerGroups);
        });
    })


    markersPrep.done(function(markerGroups) {

        setTimeout(function() { /*1*/

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
                            "switch-on": function(e, switchObj, context) {

                                    if($(context).hasClass("busy")) return;

                                    $(context).find("input")[0].checked=true;
                                    $(context).addClass("on");
                                    $(context).removeClass("off");

                                if (index === "all-projects") {

                                    setTimeout(function(){$(context).addClass("busy");}, 0);
                                    setTimeout(function(){$(context).removeClass("busy");}, 300);

                                    $(context).parent().siblings(".ui-switch").find("a.off").each(function(_indx) {
                                        var _context = this;
                                        setTimeout(function() {
                                            $(_context).click();
                                        }, _indx * 0);
                                    });

                                    return;
                                }else if(index === "operational"){
                                    $("#slider").show();
                                    if ($("#slider").css("display") !== "none")
                                        $(".numberCircle").show();
                                };

                                //mapGlobals.freezeScreen.freeze();

                                currentTab = index;



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
                                                "feature-group": function(){
                                                    var lookupFeatureGroups = [];
                                                    $.map(Object.keys(tabs), function(tabName, _indx){
                                                        if($(context).closest(".ui-switchboard").find("input")[_indx].checked){
                                                            lookupFeatureGroups.push(tabName);
                                                        }
                                                    });
                                                    return lookupFeatureGroups;
                                                }()
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

                                                

                                                var feature = 0;

                                                setTimeout(function() {


                                                    for (var _c in data.features) {
                                                        //$.map(data.features, function(feature, _c){
                                                        setTimeout(function() {
                                                            //console.log(data.features[feature]["geometry"]["coordinates"]);
                                                            //var markerCategory = data.features[feature].properties.getAttributes()["Project Size"].split("(")[0].trim().toLowerCase();
                                                            /*var marker = L.marker(data.features[feature]["geometry"]["coordinates"].reverse(), {
                                                                icon: L.divIcon({
                                                                    className: data.features[feature].properties.getAttributes()["Project Size"].split("(")[0].trim().toLowerCase() + " project-marker-icon",
                                                                    //html: "<img src='" + item["icon-src"] + "'/>"
                                                                    html: function() {
                                                                        var markerCategory = data.features[feature].properties.getAttributes()["Project Size"].split("(")[0].trim().toLowerCase();

                                                                        return "<img src='img/markers/" + index + "/" + markerCategory + ".svg'/>";
                                                                    }()
                                                                })
                                                            });

                                                            //													var marker = L.circleMarker(data.features[feature]["geometry"]["coordinates"].reverse(), $.extend(config["layer-styles"]["markers"][index][markerCategory],setRandomStyle(config.colorList,config.opacity)));
                                                            //var marker = L.circleMarker(data.features[feature]["geometry"]["coordinates"].reverse(), config["layer-styles"]["markers"][index][markerCategory]);

                                                            /*var centerLatLng = data.features[feature]["geometry"]["coordinates"].reverse();
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
                                                        //marker.addTo(map);*\\\\/

                                                            //console.log(index);


                                                            var dom = new PanelDocumentModel(data.features[feature].properties.getAttributes(), config["popup-docdef"]);

                                                            var panelDocument = new PanelDocument(dom);
                                                            panelDocument.addToTitleBar(dom.titleBarJson);
                                                            panelDocument.addHeader(dom.headerJson);
                                                            panelDocument.addTabs(dom.tabsJson, PlugsForStyling.popup && PlugsForStyling.popup.body ? PlugsForStyling.popup.body : false);


                                                            //var popupContent = new TableContent_fix(data.features[feature].properties.getAttributes());

                                                            //marker.bindPopup(popupContent);

                                                            var popupContent = panelDocument.getDocument();

                                                            marker.bindPopup(popupContent, {
                                                                offset: L.point(0, -22)
                                                            });

                                                            var highLightCircle;

                                                            marker.on("popupopen", function(e) {
                                                                highLightCircle = L.circleMarker(this._latlng, config["layer-styles"]["highlight-circle"]);
                                                                highLightCircle.addTo(map);
                                                            });
                                                            marker.on("popupclose", function(e) {
                                                                map.removeLayer(highLightCircle);
                                                            });*/
                                                            
                                                            var marker = markerGroups[index][feature].marker;
                                                            var popupContent = markerGroups[index][feature].popupContent;
                                                            var marqueeObj = markerGroups[index][feature].marqueeObj;




                                                            

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

                                                                if (index === "operational" /* && data.features[feature].properties.getAttributes()["Commercial Operation Year"]>=config["special-function-parameters"]["operational-year-range"][0] && data.features[feature].properties.getAttributes()["Commercial Operation Year"]<=config["special-function-parameters"]["operational-year-range"][1]*/ ) {
                                                                    if (capacityYear[data.features[feature].properties.getAttributes()["Commercial Operation Year"]]) {
                                                                        capacityYear[data.features[feature].properties.getAttributes()["Commercial Operation Year"]].increment += capacityYear.updated ? 0 : data.features[feature].properties.getAttributes()["Capacity (MW)"];
                                                                        capacityYear[data.features[feature].properties.getAttributes()["Commercial Operation Year"]]._icons.push(marker._icon);
                                                                    } else {
                                                                        capacityYear[data.features[feature].properties.getAttributes()["Commercial Operation Year"]] = {
                                                                            increment: data.features[feature].properties.getAttributes()["Capacity (MW)"],
                                                                            _icons: [marker._icon]
                                                                        };
                                                                    }
                                                                    if (feature === data.features.length - 1) {
                                                                        capacityYear.updated = true;
                                                                    }
                                                                }
                                                                //a=capacityYear;

                                                                
                                                                //console.log(marquee.toGeoJSON());
                                                            } catch (e) {
                                                                throw(e);
                                                            }
                                                            //marker.addTo(tabs["operational"]["layerGroups"][data.features[feature].properties.getAttributes()["Project_Si"].split("(")[0].trim().toLowerCase()]);
                                                            //marker.addTo(map);
                                                            /*if (feature === data.features.length - 1) {
                                                                //mapGlobals.frozen=false;
                                                                mapGlobals.freezeScreen.unfreeze();
                                                            }*/
                                                            feature++;
                                                        }, 0);
                                                    //});
                                                }

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
                            "switch-off": function(e, hackObj, context) {

                                if($(context).hasClass("busy")) return;

                                    $(context).find("input")[0].checked=false;
                                    $(context).removeClass("on");
                                    $(context).addClass("off");
                                    //hackObj.switchStates[hackObj.c] = 0;


                                if (index === "all-projects"){

                                    setTimeout(function(){$(context).addClass("busy");}, 0);
                                    setTimeout(function(){$(context).removeClass("busy");}, 300);

                                    $(context).parent().siblings(".ui-switch").find("a.on").each(function(_indx) {
                                        $(this).find("input")[0].checked=false;
                                        $(this).removeClass("on");
                                        $(this).addClass("off");
                                        var _context = this;
                                        setTimeout(function() {
                                            $(_context).click();
                                        }, _indx * 0);
                                    });



                                    return;
                                }else if(index === "operational"){
                                    $("#slider").hide();
                                    $(".numberCircle").hide();
                                };


                                //mapGlobals.freezeScreen.freeze();
                                //var context = this;
                                setTimeout(function() {

                                    //console.log(context);

                                    $.map(tabs[index].layerGroups, function(_layerGroup, _size) {
                                        _layerGroup.clearLayers();
                                    });


                                    setTimeout(function() {
                                        //$(context).click();



                                        setTimeout(function() {

                                            //$(context).find("input")[0].checked = false;

                                            /*$.map(tabs[index].layerGroups, function(_layerGroup, _size) {
                                                //L.circleMarker([0,0]).addTo(_layerGroup);
                                                _layerGroup.clearLayers();
                                                //                                            if(_size==="small"){
                                                //                                                mapGlobals.freezeScreen.unfreeze();
                                                //                                            }
                                            });*/
                                            //hackObj.switchStates[hackObj.c] = 0;


                                        }, 0);
                                        /*setTimeout(function() {
                                            mapGlobals.freezeScreen.unfreeze();
                                        }, 0);*/

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

                ui.find("a").addClass("off");

                $(ui.find("a")[0]).click();
            });



        }, 0); /*1*/
    });


    var boundaryLayersControl = L.control.layers({}, {}, {
        collapsed: false,
        position: "topright"
    });

    var districtLayers = L.featureGroup();
    var vdcLayer = L.featureGroup();

    var modelQueryDistrict = {
        done: function(f) {
            return;
        }
    }
    /*mapData.fetchData({
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
            L.tileLayer("../slippy-maps/nepaldistricts-vdcs/{z}/{x}/{y}.png", {}).addTo(map);

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

    function sliderSlid(event, ui) {
        if (ui.value < config["special-function-parameters"]["operational-year-range"][1]) {
            $(".project-marker-icon").addClass("greyed-out");
        } else {
            $(".project-marker-icon").removeClass("greyed-out");
        }

        var aggr = 0;

        for (var c in capacityYear) {
            if (c <= ui.value && capacityYear[c]) {
                //console.log(capacityYear[c]);
                aggr += capacityYear[c].increment;

                $.map(capacityYear[c]._icons, function(_icon, index) {
                    //setTimeout(function(){
                    //if(c<=ui.value){
                    $(_icon).removeClass("greyed-out");
                    //}
                    //},0);
                });
            }
        }
        $('.numberCircle').text(aggr > 99 ? Math.floor(aggr) + " MW" : (Math.floor(aggr * 10)) / 10 + " MW");

    };

    /*var capacityYear = {
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
    };*/

    $('#slider').slider({
        min: config["special-function-parameters"]["operational-year-range"][0],
        max: config["special-function-parameters"]["operational-year-range"][1],
        slide: sliderSlid
    }).find(".ui-slider-handle").append(tooltip).hover(function() {
        tooltip.show();
    });

    $("#slider").hover(function(e) {
        console.log(e);
    });

    //$('#slider').slider("value", 2068);

    $(".ui-slider-handle").append(function() {
        return "<img src='img/sliderknob.png'/>";
    });

    tooltip.text("BS 2071");
    $('.numberCircle').text("718 MW");
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
            /*districtLayers.setStyle({
                color: "#ffffff",
                fillOpacity: 0
            });
            $(".marker-label-districts").addClass("dark-background");*/

            $(".overlay-tiles").addClass("dark-background");

        } else {
            /*districtLayers.setStyle({
                color: "#333333",
                fillOpacity: 0.2
            });
            $(".marker-label-districts").removeClass("dark-background");*/

            $(".overlay-tiles").removeClass("dark-background");
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
    var districtsBasemap = L.tileLayer("http://raw.githubusercontent.com/jedi-Knight/Maps-of-Nepal/v2/nepal-districts-vdcs/{z}/{x}/{y}.png", {});
    map.addLayer(districtsBasemap);
    $(districtsBasemap._container).addClass("overlay-tiles districts").css("z-index", 2);

    var powergridBasemap = L.tileLayer("http://raw.githubusercontent.com/jedi-Knight/Maps-of-Nepal/v2/power-grid-2/{z}/{x}/{y}.png", {});
    map.addLayer(powergridBasemap);
    $(powergridBasemap._container).addClass("hidden overlay-tiles powergrid").css("z-index", 3);

    var detailsBasemap = L.tileLayer("tiles/project_details/{z}/{x}/{y}.png", {});
    map.addLayer(detailsBasemap);
    $(detailsBasemap._container).addClass("overlay-tiles project-details").css("z-index", 4);

    /*cartograph.initializeBasemaps();
    var districtsBasemap = L.tileLayer("http://raw.githubusercontent.com/jedi-Knight/Maps-of-Nepal/master/nepal-districts-vdcs/{z}/{x}/{y}.png", {});
    map.addLayer(districtsBasemap);
    $(districtsBasemap._container).css("z-index", 2);

    var powergridBasemap = L.tileLayer("https://raw.githubusercontent.com/jedi-Knight/Maps-of-Nepal/master/power-grid-2/{z}/{x}/{y}.png", {});
    map.addLayer(powergridBasemap);
    $(powergridBasemap._container).addClass("hidden").css("z-index", 3);

    var detailsBasemap = L.tileLayer("tiles/project_details/{z}/{x}/{y}.png", {});
    map.addLayer(detailsBasemap);
    $(detailsBasemap._container).css("z-index", 4);*/

    $("<div class='leaflet-control-layers leaflet-control-layers-expanded leaflet-control miscellaneous-controls'/>").append(function() {
        return $("<div class='controls-title controls-seperator'><input type='checkbox'/><h5>Transmission Lines</h5></div>").on("click", function() {
            $(powergridBasemap._container).toggleClass("hidden");
            $(this).find("input").attr("checked", "checked");
        });
    }).appendTo(".leaflet-top.leaflet-right");

    map.fire("moveend");




    var mouseoverTriggered = 0;

    map.on("click", function(e) {
        //if(eventFlag.mouseIsDragging) return;
        //console.log(e);
        $("#slider").slider("value", config["special-function-parameters"]["operational-year-range"][1]);
        sliderSlid(null, {
            value: config["special-function-parameters"]["operational-year-range"][1]
        });



        //        $("#slider").find(".scale-marking").hide();
        //        $("#slider").animate({
        //           height:"4px",
        //            "margin-top": "-40px"
        //        }, 400);

        // var mouseoverTriggered = 0;

        $("#slider").addClass("inactive");
        mouseoverTriggered = 0;

    });

    map.on("move", function(e) {
        //scalefocusout = 1;
        if (!mouseoverTriggered) return;
        setTimeout(function() {

            $("#slider").slider("value", config["special-function-parameters"]["operational-year-range"][1]);
            sliderSlid(null, {
                value: config["special-function-parameters"]["operational-year-range"][1]
            });


            $("#slider").addClass("inactive");
            mouseoverTriggered = 0;

        }, 10000);
    });



    $("#slider").on("mouseenter", function(e) {

        if (mouseoverTriggered) return;

        mouseoverTriggered = 1;

        $("#slider").removeClass("inactive");

    });

    /*$("#slider").on("mouseleave", function(){
        if(!mouseoverTriggered) return;
        intervalID = setInterval(function(){
            if(sliderfocusout){
            $("#slider").addClass("inactive");
            mouseoverTriggered = 0;
            }
            clearInterval(intervalID);
        }, 10000);
    });*/


});

$.fn.attrByFunction = function(fn) {
    return $(this).each(function() {
        $(this).attr(fn.call(this));
    });
};
