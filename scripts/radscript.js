/* calculated values */
var itemheightprocent = 100/RADFILLNUMBER;
var itemsplaced = -RADFILLNUMBER;

var names = new Array();

function fillContent(){
  for(var i=0;i<RADFILLNUMBER;i++){
    addARandomName();
  }
}

function addARandomName(){
  var randno = Math.floor ( Math.random() * data.length );
  var namedata = data[randno];
  addName(namedata["name"], namedata["gender"]=="boy");
  names.push(namedata["name"]);
}

function removeLastName(){
  $('#radcontent .raditem:first').remove();
  names.shift();
}

function addName(name, isboy){
  $item = $("<div>")
    .addClass("raditem").addClass((isboy?"boy":"girl"))
    .css(
    { top: (-(itemsplaced+1)*itemheightprocent)+"%" , height: itemheightprocent+"%"}
    ).append(
      $("<div>").addClass("raditemcontent").text(name)
    );
  
  itemsplaced++;
    
  $("#radcontent").append($item);
}

function scrollUp(count){
  for(i=0;i<count;i++){
    addARandomName();
  }
  
  $("#radcontent").animate(
    {top:((itemsplaced)*itemheightprocent)+"%"},//radview
    SCROLLTIME,
    EASING,
    function() {
      for(i=0;i<count;i++){
        removeLastName();
      }
      
      // TODO -> give it to the others :)
      //alert("Hello, "+names[((RADFILLNUMBER-1)/2)]+"!");
    });
}

var machineworking = false;
function handledown() {
  if(!machineworking){
    machineworking=true;
    scrollUp(SCROLLNORMAL);
    
    $('#radhandle').addClass('down');
    setTimeout(stopHandle, 800);
  }
}

function stopHandle() {
  $('#radhandle').removeClass('down');
  machineworking=false;
}

function loadRad(){
  // LOAD DATA HERE
  // - TODO
  

  // fill the rad
  fillContent();
}


$(loadRad);