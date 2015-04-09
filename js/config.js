config = {
    "map-of": "Hydropower Projects in Nepal",
    "map-options": {
        "init-center": [28.478348, 86.542285],
        "map-bounds": {  //78.739439,26.487043,89.847341,30.688485
            "northeast": [30.688485, 89.847341],
            "southwest": [26.487043, 78.739439],
        },
        "init-zoom": 7,
        "min-zoom": 7
    },
    "api": {
        "url": "data/",
        "requestType": "GET"
    },
    "map-features": {
        "operational": {
            "src": "operational.geojson",
            "title": "Operational Projects",
            "icon-src": "markers/operational.png"
        },
        "construction-approved": {
            "src": "construction-approved.geojson",
            "title": "Construction License Approved",
            "icon-src": "markers/construction-approved.png"
        },
        "construction-applied": {
            "src": "construction-applied.geojson",
            "title": "Applied for Construction License",
            "icon-src": "markers/construction-applied.png"
        },
        "survey-approved": {
            "src": "survey-approved.geojson",
            "title": "Survey License Approved",
            "icon-src": "markers/survey-approved.png"
        },
        "survey-applied": {
            "src": "survey-applied.geojson",
            "title": "Applied for Survey License",
            "icon-src": "markers/survey-applied.png"
        },
        
        
        
        "all-projects": {
            "src": "all-projects.geojson",
            "title": "All Projects",
            "icon-src":"markers/all-projects.png"
        }
    },
    "layer-styles": {
        "vdc": {
            fillColor: '#ffffff',
            weight: 1,
            opacity: 0.8,
            color: '#4b4b4b',
            dashArray: '2 6',
            fillOpacity: 0,
            clickable: false
        },
        "districts": {
            fillColor: '#ffffff',
            weight: 1.6,
            opacity: 0.8,
            //color: '#d5aad0',30
            color: '#4b4b4b',
            dashArray: '1 4',
            fillOpacity: 0.2,
            clickable: false
        },
        "country": {
            fillColor: '#956690',
            weight: 3,
            opacity: 0,
            color: '#d5aad0',
            fillOpacity: 0,
            clickable: false
        },
        "extent-marquee":{
            color: "#666666",
            opacity: 0.8,
            weight: 1,
            fillColor: "#aaccee",
            fillOpacity: 0.4
        },
        "highlight-circle":{
            fillOpacity: 0,
            opacity: 0.8,
            weight: 2,
            color: "#0080ff",
            radius: 20
        },
		"markers":{
			"operational":{
				"small":{
					color: "#ffffff",
					fillColor: "#0080ff",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 5
				},
				"medium":{
					color: "#ffffff",
					fillColor: "#0080ff",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 10
				},
				"large":{
					color: "#ffffff",
					fillColor: "#0080ff",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 15
				},
				"mega":{
					color: "#ffffff",
					fillColor: "#0080ff",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 20
				}
			},
			"construction-approved":{
				"small":{
					color: "#ffffff",
					fillColor: "#a6d854",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 5
				},
				"medium":{
					color: "#ffffff",
					fillColor: "#a6d854",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 10
				},
				"large":{
					color: "#ffffff",
					fillColor: "#a6d854",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 15
				},
				"mega":{
					color: "#ffffff",
					fillColor: "#a6d854",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 20
				}
			},
			"construction-applied":{
				"small":{
					color: "#ffffff",
					fillColor: "#66c2a5",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 5
				},
				"medium":{
					color: "#ffffff",
					fillColor: "#66c2a5",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 10
				},
				"large":{
					color: "#ffffff",
					fillColor: "#66c2a5",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 15
				},
				"mega":{
					color: "#ffffff",
					fillColor: "#66c2a5",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 20
				}
			},
			"survey-approved":{
				"small":{
					color: "#ffffff",
					fillColor: "#fc8d62",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 5
				},
				"medium":{
					color: "#ffffff",
					fillColor: "#fc8d62",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 10
				},
				"large":{
					color: "#ffffff",
					fillColor: "#fc8d62",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 15
				},
				"mega":{
					color: "#ffffff",
					fillColor: "#fc8d62",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 20
				}
			},
			"survey-applied":{
				"small":{
					color: "#ffffff",
					fillColor: "#e78ac3",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 5
				},
				"medium":{
					color: "#ffffff",
					fillColor: "#e78ac3",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 10
				},
				"large":{
					color: "#ffffff",
					fillColor: "#e78ac3",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 15
				},
				"mega":{
					color: "#ffffff",
					fillColor: "#e78ac3",
					weight: 3,
					fillOpacity: 1,
					opacity: 0.8,
					radius: 20
				}
			}
		},
        "marker-shapes":{
            "small": "TriangleMarker",
            "medium": "CircleMarker",
            "large": "SquareMarker",
            "mega": "HexagonMarker"
        }
    },
    "filter-search-by-elements":[
        {
            title: "No Filter",
            icon: "img/ui-filter-search-by-icon-none.png",
            className: "ui-filter-search-by-icon"
        },
        {
            title: "River",
            icon: "img/ui-filter-search-by-icon-river.png",
            className: "ui-filter-search-by-icon"
        }
    ],



colorList:["#66c2a5","#fc8d62","#8da0cb", "#e78ac3", "#a6d854"],
opacity: 0.8
};

function setRandomStyles(colorList, opacity){
return {
	fillColor: colorList[Math.floor(Math.random()*colorList.length)],
	opacity: opacity
};
}
