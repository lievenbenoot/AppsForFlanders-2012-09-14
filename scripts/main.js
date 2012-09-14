var girlMaxed;
var boyMaxed;

var windowWidth;

$(function() {    
    if($("div#loadScreen").length > 0) {
        loadFilteredJson();
    }
    else {
        windowWidth = $(window).width();
    
        initCarrousel();
        
        $("span.name").click(function(event) {
            scrollCarrousel();
        });
    }
    
    $('div#information').bind('swiperight', function(event) {
        scrollCarrousel(0);
    });
});

function loadFilteredJson() {
    if(localStorage['data'] === undefined) {
        var data;
    
        $.getJSON("http://data.appsforflanders.be/sql.json?query=SELECT%20*,%20'boy'%20gender%20FROM%20givennames.boys_born_2007_fl", function(boys) {
            boyMaxed = boys.sqlquery[0].amount;
           
            var data = boys.sqlquery;
           
            $.getJSON("http://data.appsforflanders.be/sql.json?query=SELECT%20*,%20'girl'%20gender%20FROM%20givennames.girls_born_2007_fl", function(girls) {
                girlMaxed = girls.sqlquery[0].amount;
       
                data = data.concat(girls.sqlquery);
                
                localStorage['data'] = data;
                
                window.location.href = 'home.html';
            });
        });
    }
    else {
        window.location.href = 'home.html';
    }
}

/**
 * Handles the resizing of the window. 
 */
$(window).resize(function() {
    windowWidth = $(window).width();
    
    initCarrousel();
});

/**
 * Initializes the carrousel. Just scales the width of the window. 
 */
function initCarrousel() {
    alert($('div#carrousel').attr('marginLeft'));
    
    $('div#carrousel div').each(function(){
        $(this).css({ width: windowWidth});
    }); 
}

function scrollCarrousel(page) {    
    if(page === undefined) {
        $('#carrousel').animate({ 'marginLeft' : -1*(windowWidth-100) });
    }
    else {
        if(page == 0) {
            $('#carrousel').animate({ 'marginLeft' : 0 });
        }
    }
}
