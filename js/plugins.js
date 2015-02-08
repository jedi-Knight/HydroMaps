function Search(data) {
    function search(txt) {
        var points = data.getFeatureAttributePair("points", "name");
    }
    ;
    this.getControlElement = function() {
//        var inputDiv = 
    };
}


function UI_Control_Search(options) {  //work in progress..
    var searchControlUI = $("<div/>").addClass("search-box").append(function() {
        return $("<input type='text'/>", "<a><div class='icon'></a>");
    });
    var result = {};
    for (var geomType in options.db) {

    }
}
;



function Util_DateConverter(options) {
    var date = new Date(options.date);

    function _format(format) {

        if (format === "mm/dd/yy") {
            return date.getUTCMonth() + 1 + "/" + date.getUTCDate() < 10 ? ("0" + date.getUTCDate()) : date.getUTCDate() + "/" + date.getUTCFullYear();
        }

        return date;
    }

    this.format = function(format) {
        return _format(format);
    };
}