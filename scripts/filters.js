
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
    var names=JSON.parse(localStorage['data']);
    //total names=names[names.length-1];
    var counter=0;
    var filteredGender=new Array();
    var showboys=localStorage["filterShowBoys"]=='true';
    var showgirls=localStorage["filterShowGirls"]=='true';
    $.each(names,function(id,name){
        if(showboys && name.gender=='boy')
            filteredGender.push(name);
        if(showgirls && name.gender=='girl')
            filteredGender.push(name);                
    });     
    var topOneThirth=Math.round(filteredGender.length/3);
    var topTwoTirth=Math.round(topOneThirth*2);   
    var counter=0;
    var filteredNames=new Array();
    var showPopular=localStorage["popular"]=='true';
    var showCommon=localStorage["common"]=='true';
    var showOriginal=localStorage["original"]=='true';
    $.each(filteredGender,function(id,name){
        if(counter<=topOneThirth ) {
            if(showPopular)
                filteredNames.push(name);
        }
        else if(counter<=topTwoTirth ){
            if(showCommon)
                filteredNames.push(name);
        }
        else if(showOriginal){         
            filteredNames.push(name);
        }        
        counter++;
    })
    localStorage['filteredData'] =JSON.stringify(filteredNames);
    console.log(JSON.parse(localStorage['filteredData']));
    $('#filterResult').html(JSON.parse(localStorage['filteredData']));
}
