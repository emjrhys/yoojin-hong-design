$(document).ready(function() {
    var titles = ["Welcome", "Primitive Magazine", "Little Robin Red Breast"];

    $('#slides').superslides({
        hashchange: true
    });

    var resizeVideo = function() {
        var aspectRatio = $(this).height() / $(this).width();
        if (aspectRatio > 0.5625) {
            $("#splash-video").css({
                width: "auto",
                height: "100%"
            });
        } else {
            $("#splash-video").css({
                width: "100%",
                height: "auto"
            });
        }
    }

    $(window).resize(resizeVideo).ready(resizeVideo);

    $("#splash-video").ready(function() {
        document.getElementById("splash-video").play();
    });

    function updatePage() {
        var currPage = parseInt(location.hash.substring(1)) - 1;
        $('#current-page-title').html(titles[currPage]);
    }

    $(".slides-pagination > a").hover(function() {
        var i = parseInt($(this).text()) - 1;
        $('#current-page-title').html(titles[i]);
    }, function() {
        updatePage();
    });

    $('html').on('animating.slides', function() {
        updatePage();
    });

    updatePage();
    
    $(".about-button").click(function() {
        $(".splash-content").toggleClass("about-active"); 
    });
});