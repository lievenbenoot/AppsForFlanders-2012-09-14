function loadAccountScreen() {    
    $("span.new").click(function(event) {
        var name = prompt("Geef uw naam op", "");
        
        var accounts = JSON.parse(localStorage['accounts']);
        accounts.push(name);
        
        localStorage['accounts'] = JSON.stringify(accounts);
        localStorage['selectedAccount'] = name;

        append(name);
    });
    
    if(typeof localStorage['accounts'] != 'undefined') {
        $.each(JSON.parse(localStorage['accounts']), function(key, val) {
            append(val);
        });
    }
}

function append(name) {
    var del = $("<span />").attr("data-val", name).html("delete");
            
    $(del).click(function(event) {
        $(this).parent().slideUp(function() {
            $(this).remove();
        });
        
        removeFromLocalStorage('accounts', $(this).attr('data-val'));
    });
    
    var d = $("<div />").attr({id: "fav", class: "element"}).append(name).append(del);
    
    $("div#list").append(d);
}
