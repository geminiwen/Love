/**
 * Created by geminiwen on 15/10/20.
 */
$(function () {

    $("#detail-btn").click(function () {
        nextPage();
    });


    var nextPage = function () {
        var index = $('.current').index();
        var $next = $(".screen").get(index);
        if ($next == undefined) {
            return;
        }
        $($next).show()
            .css({
                "z-index": -1
            })
        $('.current').css({
            "transition": "transform 1s linear",
            "transform": "translateY(-100%)",
            "z-index": 1
        }).on("transitionend", function () {
            $(this).removeClass("current").hide();
            $($next).addClass("current")
                .css({
                    "z-index": 1
                })
        });

    };

});
