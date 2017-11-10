var acc = document.getElementsByClassName("accordion");
var i;

function buttonclicked(id) {
    var x = document.getElementById(id);
    for (i = 0; i < acc.length; i++) 
{
  if(x!=acc[i])
  {
           acc[i].className='accordion';
           acc[i].nextElementSibling.style.display = "none";
  }
}
    if (x.className.indexOf("active") == -1) {
        x.className += " active";
        x.nextElementSibling.style='display:block'
        x.nextElementSibling.className+=" w3-white";
    } else { 
        x.className='accordion';
         x.nextElementSibling.className="w3-bar-item w3-button"; 
        x.nextElementSibling.style='display:none'
        x.className = x.className.replace(" w3-show", "");
    }
}

function changeColor(id)
{
   var accB=document.getElementsByName("list");
  var x = document.getElementById(id);
  for (i = 0; i < accB.length; i++) 
  {
    accB[i].style='background-color:white;';
  }
    x.style='background-color:#919191;';
    document.getElementById("selectedValue").value=id;
    document.getElementById("toggle").value="Grid";
}
function toggleView(id)
{

    var x=document.getElementById("selectedValue").value;

  if(document.getElementById(id).value=='Grid')
  {
    x=x+"Layout";
   document.getElementById("iframeBody").src=x+".html";
   document.getElementById(id).value="Layout";
  }
  else
  {
     document.getElementById("iframeBody").src=x+".html";
      document.getElementById(id).value="Grid";
  }
}

