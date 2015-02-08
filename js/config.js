config = {
    "map-of": "Hydropower Projects in Nepal",
    "map-options": {
        "init-center":[28.478348, 83.342285],
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
        }
    }
};