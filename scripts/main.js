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
<<<<<<< HEAD
    //localStorage.clear();    
    localStorage['favorites'] = JSON.stringify(new Array());
    localStorage['recycleBin'] = JSON.stringify(new Array("Test", "Test 2"));
    localStorage['accounts'] = JSON.stringify(new Array("Account 1", "Account 2"));
    /*localStorage['accounts'] = JSON.stringify(new Array("Account 1", "Account 2"));*/  
    
    if(typeof localStorage['selectedAccount'] == 'undefined') {
        localStorage['selectedAccount'] = 'Account 1';
        localStorage['accounts'] = JSON.stringify(new Array("Account 1"));
    } 
=======
    /*localStorage['favorites'] = JSON.stringify(new Array("Jeroen", "Lieven"));
    localStorage['recycleBin'] = JSON.stringify(new Array("Test", "Test 2"));*/
>>>>>>> 7bd896af44bdf15064d38e35e693870b39b74f93
     
    if($("div#loadScreen").length > 0) {
        loadFilteredJson();
    }
    else if($("div#favoritesScreen").length > 0) {
        loadFavoritesScreen();
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

<<<<<<< HEAD
function findByName(name) {
    var names=JSON.parse(localStorage['data']);
    
    var result;
    
    $.each(names, function(key, val) {
        if(val.name == name) {
            result = val;
        }    
    });
    
    return result;
=======
function loadFavorites() {
    
>>>>>>> 7bd896af44bdf15064d38e35e693870b39b74f93
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

function addToFavorite() {
    var favorites = JSON.parse(localStorage['favorites']);
    
    favorites.push(currentnamedata['name']);
    
    localStorage['favorites'] = JSON.stringify(favorites);
}

var currentnamedata=null;
function setCurrentName(_currentnamedata) {
  currentnamedata=_currentnamedata;
  var max = (currentnamedata["gender"]=="girl"?girlMaxed:boyMaxed);
  $("#user_name").text(currentnamedata["name"]);
  $("#user_populatirity").text("Populariteit: "+(currentnamedata["amount"]/max)*100+"%");
}

