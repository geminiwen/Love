/**
 * Created by geminiwen on 15/10/20.
 */
$(function () {

    var map = new BMap.Map("allmap");    // 创建Map实例
    var point = new BMap.Point(120.666293, 27.776319);
    map.centerAndZoom(point, 18);  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件

    var marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);               // 将标注添加到地图中
    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    map.setCurrentCity("瑞安");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    $("#detail-btn").click(function () {
        $('.pre-wrap').show();

        nextPage(pageChangeCallback);
    });

    $(".first-page").fadeIn();


    var nextPage = function (cb) {
        var index = $('.screen').index($('.current')) + 1;
        var $next = $(".screen").get(index);
        if ($next == undefined) {
            return;
        }
        $($next).show()
            .css({
                "z-index": -1
            });
        $('.current').css({
            "transition": "transform 1s linear",
            "transform": "translateY(-100%)",
            "z-index": 1
        }).on("transitionend", function () {
            $(this).removeClass("current").hide();
            $($next).addClass("current")
                .css({
                    "z-index": 1
                });
            cb && cb(index);
        });
    };


    var pageChangeCallback = function (page) {
        switch (page) {
            case 1: {
                startHeartAnimation();
                $('#married').fadeIn(4000);
                $('#detail-btn').fadeIn(4000);
                $('.pre-wrap').hide();
                break;
            }
            case 5: {
                $('.pre-wrap').hide();
                map.centerAndZoom(point, 18);  // 初始化地图,设置中心点坐标和地图级别
                break;
            }
        }
    };

    $(".pre-wrap").on("touchstart", function (e) {
        nextPage(pageChangeCallback);
        e.preventDefault();
        e.stopPropagation();
    })

});
