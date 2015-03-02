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
        "operational": {
            "src": "operational.geojson",
            "title": "Operational Projects",
            "icon-src": "markers/operational.png"
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
            color: '#d5aad0',
            dashArray: '4',
            fillOpacity: 0,
            clickable: false
        },
        "country": {
            fillColor: '#956690',
            weight: 3,
            opacity: 0,
            color: '#d5aad0',
            fillOpacity: 0,
            clickable: false
        }
    }
};