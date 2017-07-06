$(function() {
    "use strict";
    var windowBackgroundHeight = $(".window-background .window-background-content"),
        navBar = $("nav"),
        featuresSection = $(".features"),
        menuShowButton = $("nav .menu-button i.fa-bars"),
        menuHideButton = $("nav .menu-button i.fa-times"),
        mobileMenu = $(".mobile-menu"),
        myWorkMix = $(".my-work-filtering .mix"),
        myWorkShowMore = $(".my-work .show-more"),
        galleryImg = $(".portfolio-lightbox .gallery-image img"),
        galleryH4 = $(".portfolio-lightbox .gallery-image h4"),
        galleryP = $(".portfolio-lightbox .gallery-image p"),
        galleryLink = $(".portfolio-lightbox .gallery-image a"),
        lightbox = $(".portfolio-lightbox"),
        ScrollToTop = $("#Scroll-To-Top"),
        Body = $("body"),
        htmlBody = $("html, body"),
        $window = $(window);
    windowBackgroundHeight.height($window.height());
    $window.on("resize", function() {
        windowBackgroundHeight.height($window.height())
    });
    $(".window-background i").on("click", function() {
        htmlBody.animate({
            scrollTop: $window.height()
        }, 1e3)
    });
    if ($window.scrollTop() < $("div.features").offset().top) {
        $(".home-button").addClass("active").parent("li").siblings("li").children("a").removeClass("active")
    }
    if ($window.scrollTop() >= $("div.features").offset().top - $("nav").height() - 1 && $window.scrollTop() < $("div.my-skills").offset().top - 60) {
        $(".features-button").addClass("active").parent("li").siblings("li").children("a").removeClass("active")
    }
    if ($window.scrollTop() >= $("div.my-skills").offset().top - 61 && $window.scrollTop() < $("div.my-work").offset().top - 60) {
        $(".my-skills-button").addClass("active").parent("li").siblings("li").children("a").removeClass("active")
    }
    if ($window.scrollTop() >= $("div.my-work").offset().top - 61 && $window.scrollTop() < $("div.get-in-touch").offset().top - 60) {
        $(".my-work-button").addClass("active").parent("li").siblings("li").children("a").removeClass("active")
    }
    if ($window.scrollTop() >= $("div.get-in-touch").offset().top - 61) {
        $(".contact-button").addClass("active").parent("li").siblings("li").children("a").removeClass("active")
    }
    $window.on("scroll", function() {
        if ($window.scrollTop() < $("div.features").offset().top) {
            $(".home-button").addClass("active").parent("li").siblings("li").children("a").removeClass("active")
        }
    });
    $window.on("scroll", function() {
        if ($window.scrollTop() >= $("div.features").offset().top - $("nav").height() - 1 && $window.scrollTop() < $("div.my-skills").offset().top - 60) {
            $(".features-button").addClass("active").parent("li").siblings("li").children("a").removeClass("active")
        }
    });
    $window.on("scroll", function() {
        if ($window.scrollTop() >= $("div.my-skills").offset().top - 61 && $window.scrollTop() < $("div.my-work").offset().top - 60) {
            $(".my-skills-button").addClass("active").parent("li").siblings("li").children("a").removeClass("active")
        }
    });
    $window.on("scroll", function() {
        if ($window.scrollTop() >= $("div.my-work").offset().top - 61 && $window.scrollTop() < $("div.get-in-touch").offset().top - 60) {
            $(".my-work-button").addClass("active").parent("li").siblings("li").children("a").removeClass("active")
        }
    });
    $window.on("scroll", function() {
        if ($window.scrollTop() >= $("div.get-in-touch").offset().top - 61) {
            $(".contact-button").addClass("active").parent("li").siblings("li").children("a").removeClass("active")
        }
    });
    $window.on("scroll", function() {
        if ($(this).scrollTop() > $(".window-background").height()) {
            navBar.css({
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                width: "100%",
                zIndex: 5e3,
                boxShadow: "0px 0px 5px #000"
            });
            featuresSection.css({
                paddingTop: "140px"
            })
        } else {
            navBar.css({
                position: "static",
                top: "",
                left: "",
                right: "",
                width: "",
                zIndex: "",
                boxShadow: "none"
            });
            featuresSection.css({
                paddingTop: ""
            })
        }
    });
    $("nav ul li a, .mobile-menu li a").on("click", function(o) {
        o.preventDefault();
        htmlBody.animate({
            scrollTop: $("#" + $(this).data("value")).offset().top - 60
        }, 1e3)
    });
    menuShowButton.on("click", function() {
        $(this).hide(0);
        menuHideButton.show(0).css("display", "flex");
        mobileMenu.animate({
            right: 0
        }, 500)
    });
    menuHideButton.on("click", function() {
        $(this).hide(0);
        menuShowButton.show(0).css("display", "flex");
        mobileMenu.animate({
            right: "-160px"
        }, 500)
    });
    $(".mobile-menu li a").on("click", function() {
        menuHideButton.hide(0);
        menuShowButton.show(0).css("display", "flex");
        mobileMenu.animate({
            right: "-160px"
        }, 500)
    });
    $window.on("scroll", function() {
        if ($(this).scrollTop() < $(".window-background").height()) {
            mobileMenu.css({
                position: "absolute",
                top: 0
            })
        } else {
            mobileMenu.css({
                position: "fixed",
                top: "60px"
            })
        }
    });
    $(".webDesign-circle-progress, .graphicsDesign-circle-progress, .phpDeveloper-circle-progress, .javaScript-circle-progress").circleProgress({
        size: 80,
        startAngle: 4.74,
        thickness: 3,
        fill: "#00a7ff",
        emptyFill: "rgb(68, 68, 68)",
        animation: {
            duration: 2e3
        }
    });
    $window.on("scroll.mySkills-1", function() {
        if ($(this).scrollTop() >= $(".my-skills-boxs div:first-of-type").offset().top - $window.height() + 150) {
            $(".webDesign-circle-progress").circleProgress({
                value: .85
            }).on("circle-animation-progress", function(event, progress) {
                $(this).find("strong").html(Math.round(85 * progress) + "<i>%</i>")
            });
            $window.off("scroll.mySkills-1")
        }
    });
    $window.on("scroll.mySkills-2", function() {
        if ($(this).scrollTop() >= $(".my-skills-boxs div:nth-of-type(2)").offset().top - $window.height() + 150) {
            $(".graphicsDesign-circle-progress").circleProgress({
                value: .65
            }).on("circle-animation-progress", function(event, progress) {
                $(this).find("strong").html(Math.round(65 * progress) + "<i>%</i>")
            });
            $window.off("scroll.mySkills-2")
        }
    });
    $window.on("scroll.mySkills-3", function() {
        if ($(this).scrollTop() >= $(".my-skills-boxs div:nth-of-type(3)").offset().top - $window.height() + 150) {
            $(".phpDeveloper-circle-progress").circleProgress({
                value: .8
            }).on("circle-animation-progress", function(event, progress) {
                $(this).find("strong").html(Math.round(80 * progress) + "<i>%</i>")
            });
            $window.off("scroll.mySkills-3")
        }
    });
    $window.on("scroll.mySkills-4", function() {
        if ($(this).scrollTop() >= $(".my-skills-boxs div:last-of-type").offset().top - $window.height() + 150) {
            $(".javaScript-circle-progress").circleProgress({
                value: .75
            }).on("circle-animation-progress", function(event, progress) {
                $(this).find("strong").html(Math.round(75 * progress) + "<i>%</i>")
            });
            $window.off("scroll.mySkills-4")
        }
    });
    $(".my-work-filtering .mix:gt(11)").addClass("hidden");
    $(".my-work ul li").on("click", function() {
        $(this).addClass("active").siblings().removeClass("active")
    });
    $(".my-work ul li:first-of-type").on("click", function() {
        myWorkMix.fadeOut(0);
        $(".my-work-filtering .mix:not('.hidden')").fadeIn(600)
    });
    $(".my-work ul li:not(:first-of-type)").on("click", function() {
        myWorkMix.fadeOut(0);
        $("." + $(this).data("value") + ":not('.hidden')").fadeIn(600)
    });
    myWorkShowMore.on("click", function() {
        $(".my-work-filtering .mix:visible:last").nextAll(":lt(4)").slideDown(600).removeClass("hidden")
    });
    $(".my-work-filtering .mix .overlay").on("click", function() {
        var mixIndex = $(this).parent(".mix").index();
        galleryImg.attr("src", $(this).siblings("img").attr("src"));
        galleryImg.attr("alt", $(this).siblings("img").attr("alt"));
        galleryH4.text($(this).siblings("h4").text());
        galleryP.text($(this).siblings("p").text());
        galleryLink.attr("href", $(this).siblings("a").attr("href"));
        $(".portfolio-lightbox").fadeIn().css("display", "flex");
        $(".portfolio-lightbox .gallery-navigate .next").on("click", function() {
            if (mixIndex < $(".my-work-filtering .mix:visible").length - 1) {
                mixIndex++
            } else {
                mixIndex = 0
            }
            galleryImg.attr("src", $(".my-work-filtering .mix:visible").eq(mixIndex).children("img").attr("src"));
            galleryImg.attr("alt", $(".my-work-filtering .mix:visible").eq(mixIndex).children("img").attr("alt"));
            galleryH4.text($(".my-work-filtering .mix:visible").eq(mixIndex).children("h4").text());
            galleryP.text($(".my-work-filtering .mix:visible").eq(mixIndex).children("p").text());
            galleryLink.attr("href", $(".my-work-filtering .mix:visible").eq(mixIndex).children("a").attr("href"))
        });
        $(".portfolio-lightbox .gallery-navigate .prev").on("click", function() {
            if (mixIndex > 0) {
                mixIndex--
            } else if (mixIndex === 0) {
                mixIndex = $(".my-work-filtering .mix:visible").length - 1
            }
            galleryImg.attr("src", $(".my-work-filtering .mix:visible").eq(mixIndex).children("img").attr("src"));
            galleryImg.attr("alt", $(".my-work-filtering .mix:visible").eq(mixIndex).children("img").attr("alt"));
            galleryH4.text($(".my-work-filtering .mix:visible").eq(mixIndex).children("h4").text());
            galleryP.text($(".my-work-filtering .mix:visible").eq(mixIndex).children("p").text());
            galleryLink.attr("href", $(".my-work-filtering .mix:visible").eq(mixIndex).children("a").attr("href"))
        })
    });
    $(document).on("click", function(e) {
        if ($(e.target).closest(".my-work-filtering .mix .overlay").length) {
            console.log("by Webrouk")
        } else if (!$(e.target).closest(".portfolio-lightbox .gallery-image").length) {
            lightbox.fadeOut()
        } else if ($(e.target).closest(".portfolio-lightbox .gallery-image i").length) {
            lightbox.fadeOut()
        }
    });
    if ($window.height() < 500) {
        galleryImg.css({
            maxHeight: "200px"
        });
        galleryH4.css({
            textAlign: "center"
        });
        galleryP.css({
            display: "none"
        })
    } else {
        galleryImg.css({
            maxHeight: ""
        });
        galleryH4.css({
            textAlign: ""
        });
        galleryP.css({
            display: ""
        })
    }
    $window.on("resize", function() {
        if ($window.height() < 500) {
            galleryImg.css({
                maxHeight: "200px"
            });
            galleryH4.css({
                textAlign: "center"
            });
            galleryP.css({
                display: "none"
            })
        } else {
            galleryImg.css({
                maxHeight: ""
            });
            galleryH4.css({
                textAlign: ""
            });
            galleryP.css({
                display: ""
            })
        }
    });
    $(".da-thumbs > div").hoverdir();
    google.maps.event.addDomListener(window, "load", myMap);

    function myMap() {
        var myCenter = new google.maps.LatLng(30.0444196, 31.23571160000006),
            mapOptions = {
                center: myCenter,
                mapTypeControl: false,
                streetViewControl: false,
                scrollwheel: false,
                zoom: 12
            },
            mapCanvas = document.getElementById("map"),
            map = new google.maps.Map(mapCanvas, mapOptions),
            marker = new google.maps.Marker({
                position: myCenter
            });
        marker.setMap(map)
    }
    if ($(this).scrollTop() >= 1200) {
        ScrollToTop.css({
            left: "20px"
        }, 500)
    } else {
        ScrollToTop.css({
            left: "-60px"
        }, 500)
    }
    $window.on("scroll", function() {
        if ($(this).scrollTop() >= 1200) {
            ScrollToTop.css({
                left: "20px"
            }, 500)
        } else {
            ScrollToTop.css({
                left: "-60px"
            }, 500)
        }
    });
    ScrollToTop.on("click", function() {
        htmlBody.animate({
            scrollTop: 0
        }, 1500)
    });
    if (Body.find(".loading-screen")) {
        Body.css("overflow", "hidden")
    }
});
$(window).on("load", function() {
    "use strict";
    $(".loading-screen").fadeOut(1e3, function() {
        $(this).remove()
    });
    $("body").css({
        overflowY: "auto",
        overflowX: "hidden"
    });
    $(".window-background-content span:first-of-type").typed({
        strings: ["Lorem ipsum é um texto pseudo-latino usado no web design,"],
        typeSpeed: 16,
        startDelay: 1200,
        showCursor: false
    });
    $(".window-background-content span:last-of-type").typed({
        strings: ["Isso ajuda a delinear os elementos visuais de um documento ou apresentação, <br>Por exemplo, tipografia, fonte ou layout. Lorem ipsum é principalmente uma parte de um texto latino <br>Pelo autor e filósofo clássico Cicero ..."],
        typeSpeed: 16,
        startDelay: 5e3,
        showCursor: false
    });
    $("html").niceScroll({
        cursorcolor: "#328dc9",
        cursorborder: "none",
        cursorwidth: "7px",
        horizrailenabled: false,
        zindex: "7000"
    })
});