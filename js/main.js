$(document).ready(function() {
    // list of project titles to display in nav bar
    var titles = ["Welcome", "Primitive Magazine", "Nectar", "Yurbuds", "Ninth Letter", "Line Art", "Le Cafe", "Plan B", "Robin Red Breast", "Advertising", "SCUDO Gives", "Interactive Vinyl"];
    var titleHide = 1140, navHide = 730;
    var titleHidden = false, navHidden = false;

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
        
        if (!titleHidden && $(this).width() < titleHide) {
            $('#current-page-title').css('display', 'none');
            titleHidden = true;
        } else if (titleHidden && $(this).width() >= titleHide) {
            $('#current-page-title').css('display', 'inline-block');
            titleHidden = false;
        }
        
        if (!navHidden && $(this).width() < navHide) {
            $('.slides-pagination').css('display', 'none');
            navHidden = true;
        } else if (navHidden && $(this).width() >= navHide) {
            $('.slides-pagination').css('display', 'inline-block');
            navHidden = false;
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
    
    $(".play-button").click(function() {
        var id = $(this).attr('id');
        id = id.substring(0, id.indexOf('button')) + 'video';
        
        var vid = document.getElementById(id);
        vid.play();
        
        $(this).fadeOut(300);
        vid.setAttribute("controls", "controls");
    });
    
    $('#gallery-slider').lightSlider({
        item: 1,
        loop: true
    });
    
    // execute functions on page load
    updatePage();
});