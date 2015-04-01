config = {
    "map-of": "Hydropower Projects in Nepal",
    "map-options": {
        "init-center": [28.478348, 83.342285],
        "map-bounds": {
            "northeast": [30.688485, 88.847341],
            "southwest": [26.487043, 79.739439],
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
            opacity: 1,
            color: '#d5aad0',
            dashArray: '2 6',
            fillOpacity: 0,
            clickable: false
        },
        "districts": {
            fillColor: '#ffffff',
            weight: 1.4,
            opacity: 1,
            //color: '#d5aad0',30
            color: '#000000',
            dashArray: '2 4',
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
            opacity: 1,
            weight: 1,
            fillColor: "#aaccee",
            fillOpacity: 0.4
        },
        "highlight-circle":{
            fillOpacity: 0,
            opacity: 1,
            weight: 2,
            color: "#0080ff",
            radius: 20
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
    ]    
};
