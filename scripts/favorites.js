function loadFavoritesPage() {
    if(typeof localStorage['favorites'] != 'undefined') {
        $.each(JSON.parse(localStorage['favorites']), function(key, val) {
            var del = $("<span />").attr("data-val", val).html("delete");
            $(del).click(function(event) {
                $(this).parent().slideUp(function() {
                    $(this).remove();
                });
                
                removeFromLocalStorage('favorites', $(this).attr('data-val'));
            });
            
            var d = $("<div />").attr({id: "fav", class: "element"}).append(val).append(del);
            
            $("div#favorites").append(d);   
        });
    }
    
    if(typeof localStorage['recycleBin'] != 'undefined') {
        $.each(JSON.parse(localStorage['recycleBin']), function(key, val) {
            var del = $("<span />").attr("data-val", val).html("delete");
            $(del).click(function(event) {
                $(this).parent().slideUp(function() {
                    $(this).remove();
                });
                
                removeFromLocalStorage('recycleBin', $(this).attr('data-val'));
            });
            
            var d = $("<div />").attr({id: "rec", class: "element"}).append(val).append(del);
            
            $("div#recycle").append(d);   
        });
    }
}
