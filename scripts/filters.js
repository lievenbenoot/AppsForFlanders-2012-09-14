
$(function() {  
    if(typeof localStorage["filterShowBoys"]== 'undefined')
        localStorage["filterShowBoys"]=true;
    if(typeof localStorage["filterShowGirls"]== 'undefined')
        localStorage["filterShowGirls"]=true;
    if(typeof localStorage["popular"]== 'undefined')
        localStorage["popular"]=true;
    if(typeof localStorage["original"]== 'undefined')
        localStorage["original"]=true;
    if(typeof localStorage["common"]== 'undefined')
        localStorage["common"]=true;
        
    $('div#fireFilterSection').click(function(event) {
        $('div#filter').slideToggle('slow', function() {
            if($('div#filter').is(':visible')) {
                $('#legendarrow').addClass('rotate');   
            }
            else {
                $('#legendarrow').removeClass('rotate');   
            }
        }); 
    });    
    $('#boys').change(function(evt){
        localStorage["filterShowBoys"]=$('#boys').is(':checked');
        filterUpdated();
    }); 
    $('#girls').change(function(evt){
        localStorage["filterShowGirls"]=$('#girls').is(':checked');
        filterUpdated();
    }); 
    $('#popular').change(function(evt){
        localStorage["popular"]=$('#popular').is(':checked');
        filterUpdated();
    }); 
    $('#original').change(function(evt){
        localStorage["original"]=$('#original').is(':checked');
        filterUpdated();
    }); 
    $('#common').change(function(evt){
        localStorage["common"]=$('#common').is(':checked');
        filterUpdated();
    }); 
});

function filterUpdated(){
    
}
