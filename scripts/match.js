

function loadMatchScreen() {
    selectedMatches=new Array();
    if(typeof localStorage['accounts']!='undefined'){
        var accounts = JSON.parse(localStorage['accounts']);
        $.each(accounts,function(key,val){
            
            var li='<li>'+
            '<label><input type="checkbox" id=match"'+val+'"></input>'+
            val+'</label>'
            +'</li>';
            $('ul#matchAccounts').append(li);
        });        
    }
    $("#btnMatch").click(function(evt){
        /*if(selectedMatches.length!=2)
            alert('you should select exactly 2 accounts.');
        else{
            
        }*/
       var table=$('#matchTable');
       table.html('<tr><th>'+selectedMatches[0]+'</th><th>'+selectedMatches[1]+'</th><tr>');
    });
    
    $('input').click(function(evt){
        var matchid=evt.target.id;
        var acc=matchid.substring(6,matchid.length-1);
        if($(evt.target).is(':checked'))
            selectedMatches.push(acc);
        else{
         /*   var found=-1;
            var counter=0;
            $.each(selectedMatches,function(id,val){
                if(val==acc)
                    found=counter;
                counter++;
            });
            alert(found);
            if(found!=-1)
                selectedMatches.remove(found);*/
        }

       
       //table.show();
        
    });
}

