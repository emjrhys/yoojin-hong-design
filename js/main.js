$(document).ready(function() {
    // list of project titles to display in nav bar
    var titles = ["Welcome", "Primitive Magazine", "Nectar"];

    // init portfolio carousel
    $('#slides').superslides({
        hashchange: true
    });

    // keep the splash video fullscreen
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

    // initialization functions
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
    
    //var containerWidth = 800;
    $('#nectar-content').masonry({
        itemSelector: '.box',
        columnWidth: function( containerWidth ) {
            return containerWidth /4;
        }(),
        isAnimated: false
    });

    // listeners for carousel actions
    $('html').on('animating.slides', function() {
        updatePage();
    });
    
    $('html').on('animated.slides', function() {
        $('.project-splash').css({
            "display": "block",
            "opacity": 1
        });
    });
    
    // page-specific interactions
    $(".about-button").click(function() {
        $(".splash-content").toggleClass("about-active"); 
    });
    
    $(".project-splash").click(function() {
        $(this).fadeOut(300); 
    });
    
//    $(".project-image").click(function() {
//        $(this).toggleClass("active");
//    });
    
    // execute functions on page load
    updatePage();
});