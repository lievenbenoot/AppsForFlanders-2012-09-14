var girlMaxed;
var boyMaxed;

var windowWidth;

/**
 * Extension to arrays:
 * now possible to use syntax like: some_array.remove(name);
 */
Array.prototype.remove = function(name) {
    for (var i = 0; i < this.length; ) {
        if (this[i] === name) {
            this.splice(i, 1);
        } 
        else {
           ++i;
        }
    }
}

$(function() {   
    localStorage.clear();    
    localStorage['favorites'] = JSON.stringify(new Array("Jeroen", "Lieven"));
    localStorage['recycleBin'] = JSON.stringify(new Array("Test", "Test 2"));
    /*localStorage['accounts'] = JSON.stringify(new Array("Account 1", "Account 2"));*/  
    
    /*var name = searchByName('Sam');
    console.log(name);*/
    
    if(typeof localStorage['selectedAccount'] == 'undefined') {
        localStorage['selectedAccount'] = 'Account 1';
        localStorage['accounts'] = JSON.stringify(new Array("Account 1"));
    } 
     
    if($("div#loadScreen").length > 0) {
        loadFilteredJson();
    }
    else if($("div#favoritesScreen").length > 0) {
        loadFavoritesScreen();
    }
    else if($("div#accountScreen").length > 0) {
        loadAccountScreen();
    }
    else {
        windowWidth = $(window).width();
    
        initCarrousel();
        
        $("span.name").click(function(event) {
            scrollCarrousel();
        });
    }
    
    $("span#goback").click(function(event) {
        scrollCarrousel(0);
    });
});

function removeFromLocalStorage(arrayName, name) {
    if(typeof localStorage[arrayName] != undefined) {
        var array = JSON.parse(localStorage[arrayName]);
        
        array.remove(name);
        
        localStorage[arrayName] = JSON.stringify(array);
    }
}

function loadFilteredJson() {
    if(localStorage['data'] === undefined) {
        var data;
    
        $.getJSON("http://data.appsforflanders.be/sql.json?query=SELECT%20*,%20'boy'%20gender%20FROM%20givennames.boys_born_2007_fl", function(boys) {
            boyMaxed = boys.sqlquery[0].amount;
           
            var data = boys.sqlquery;
           
            $.getJSON("http://data.appsforflanders.be/sql.json?query=SELECT%20*,%20'girl'%20gender%20FROM%20givennames.girls_born_2007_fl", function(girls) {
                girlMaxed = girls.sqlquery[0].amount;
       
                data = data.concat(girls.sqlquery);                
                localStorage['data'] = JSON.stringify(data);
                localStorage['filteredData']=localStorage['data'] ;
                window.location.href = 'home.html';
            });
        });
    }
    else {
        window.location.href = 'home.html';
    }
}

function searchByName(name) {
    var names=JSON.parse(localStorage['data']);
    
    $.each(names, function(key, val) {
        if(val.name == name) {
            return val;
        }    
    });
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
    $('div#carrousel>div').each(function(){
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
