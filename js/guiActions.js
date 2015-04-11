guiFunctions = {
    "ui-thumbnail-slider-getViewIndex": function(stripSelector) {
        if (!stripSelector)
            stripSelector = ".ui-thumbnail-strip";
        var stripElement = $(this).find(stripSelector);
        return 0 - Math.floor(Number(stripElement.css("margin-left").replace("px", "")) / $(stripElement).find(".thumbnail").outerWidth());
    },
    "ui-thumbnail-slider-setViewToIndex": function(index, stripSelector) {
        if (!stripSelector)
            stripSelector = ".ui-thumbnail-strip";
        var stripElement = $(this).find(stripSelector);
        stripElement.animate({
            "margin-left": 0 - index*$(stripElement).find(".thumbnail").outerWidth()+22+"px"
        });
    }
};



$.fn.switchToTab = function(fn) {
    $(this).each(function(index) {
        
        $(this).parent().each(function() {
            var c = 0;
            $(this).removeClass("inactive")
                    .siblings().addClass("inactive");
            $(this).prevAll().find("a.tab-trigger").each(function(index) {
                $(this).css({
                    "margin-left": 12 + index * 46,
                    "z-index": index+1
                });
                $(this).addClass("left-of-center");
                $(this).removeClass("right-of-center");
                c = index + 1;
            });

            $(this).find("a.tab-trigger").css({
                "margin-left": 12 + c * 46,
                "z-index":1001
            });


            $(this).nextAll().find("a.tab-trigger").each(function(index) {
                $(this).css({
                    "margin-left": 12 + c * 46 + 114 + (index+1) * 46,
                    "z-index": 999-index
                });
                $(this).addClass("right-of-center");
                $(this).removeClass("left-of-center");
            });
        });

    });

    $(this).removeClass("left-of-center");
    $(this).removeClass("right-of-center");

    if (fn)
        fn.call(this);
};

$.fn.getViewIndex = function(stripSelector) {
    var returnVal = [];
    this.each(function() {
        returnVal.push(guiFunctions[$(this).attr("class") + "-getViewIndex"].call(this, stripSelector));
    });
    return returnVal.length - 1 ? returnVal[0] : returnVal;
};

$.fn.setViewToIndex = function(index, stripSelector) {
    this.each(function() {
        guiFunctions[$(this).attr("class") + "-setViewToIndex"].call(this, index, stripSelector);
    });
};
