var acc = document.getElementsByClassName("accordion");
var i;


function buttonclickedPark(id) {
    var x = document.getElementById(id);
    document.getElementById('selectedPanel').value=id;
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

    document.getElementById('selectedZone').value=id;
  var x = document.getElementById(id);
  for (i = 0; i < accB.length; i++) 
  {
    accB[i].style='background-color:white;font-size: small;width: -webkit-fill-available;';
  }
    x.style='background-color:#919191;font-size: small; width: -webkit-fill-available;';
    /*document.getElementById("parkSpace").value=id;*/
    document.getElementById("selectedValue").value=id;
    document.getElementById("toggle").value="Toggle";
}
function callPostPage(id)
{
   var parkDetail=document.getElementById(id+"_hidden").value;
   document.getElementById('parkSpace').value=parkDetail;
   var spaceS=document.getElementById(id+"_SpaceS").value.split("--");
   //alert("ss="+ss);
   var divide=10;
   var col=Math.ceil(parkDetail/divide);
var htmlBody="<h1>Parking Area Layout</h1>";
htmlBody+="<table style='width: 100%;''>"+
"<tr><td style='height:20px'></td></tr>";
    var parkNo=1;
    var loop=(parkDetail<divide?parkDetail:divide);
 for(var i=1; i<=col; i++) 
 { 
     htmlBody+="<tr>";
    for(var j=1;j<=(loop<divide?loop:divide);j++)
    {
                var flag=false;
                var ss=""
       for(var k=0;k<spaceS.length;k++)
                {
                if(parkNo==spaceS[k].split("::")[1])
                  {
                    flag=true;
                     ss=spaceS[k].split("::");
                  }
                }          
                if(flag)
                {
                    if(Number(ss[3])>4)
                    {
                      htmlBody+="<td id='trShow' style='background-color:#ff0000' >"+parkNo;
                    }
                    else
                    {
                      if(ss[2]=='empty')
                      {
                        htmlBody+="<td id='trShow' style='background-color:lawngreen'>"+parkNo;
                      }
                      else
                      {
                      htmlBody+="<td id='trShow' style='background-color:white' >"+parkNo;
                    }
                    }
                    htmlBody+="<br>Status: "+ss[2]+
                            "<br>Hours Occupied: "+ss[3];
                }
                else
                {
                    htmlBody+="<td id='trShow' style='background-color:lawngreen'>"+parkNo;
                }



      htmlBody+="</td>"+
                "<td class='trHide'>"+
                "</td>";
                
                parkNo++;
    }
  htmlBody+="</tr>"+
  "<tr>"+
  "<td style='height:80px'>"+
  "</td>"+
  "</tr>";
  loop=parkDetail-(divide*i);
}
htmlBody+="</table>";
   document.getElementById('iframeBody').innerHTML=htmlBody;
}
function toggleView(id)
{
  var view=document.getElementById("toggle").value;
  var x=document.getElementById("selectedValue").value;
  if(view=='Toggle')
   {
    layout();
    document.getElementById("toggle").value='Grid';  
  }
  else
  {
     callPostPage(x);
     document.getElementById("toggle").value='Toggle';
  }

}
function layout(){
    var x=document.getElementById("selectedValue").value;
    var parkDetail=document.getElementById(x+"_hidden").value;
    document.getElementById('parkSpace').value=parkDetail;
    var spaceS=document.getElementById(x+"_SpaceS").value.split("--");
   //alert("ss="+ss);
    var divide=10;
    var col=Math.ceil(parkDetail/divide);
    var htmlBody="";
    htmlBody="<h1>Parking Area Layout</h1><table border='1' style='background-color: white;width:100%; color: black;''><th>Parking Number</th><th>Status</th><th>Hours Occupied </th>";
    var parkNo=1;
    var loop=(parkDetail<divide?parkDetail:divide);
    for(var i=1; i<=col; i++) 
    { 
      
      for(var j=1;j<=(loop<divide?loop:divide);j++)
      {

                var ss=""
       for(var k=0;k<spaceS.length;k++)
                {
                if(parkNo==spaceS[k].split("::")[1])
                  {
                    flag=true;
                     ss=spaceS[k].split("::");
                  }
                } 
          var status="";
          if(ss[2]=='empty' || ss[2]=='parked')
            status=ss[2];
          else
            status='empty';
          var hours="";
          if(ss=="")
              hours=0;
            else
              hours=ss[3];
          if(Number(ss[3])>4)
            htmlBody+="<tr style='background-color:red'><td>"+parkNo+"</td><td>"+status+"</td><td>"+hours+"</td></tr>";
          else if(status=='parked')
            htmlBody+="<tr style='background-color:white'><td>"+parkNo+"</td><td>"+status+"</td><td>"+hours+"</td></tr>";
          else
             htmlBody+="<tr style='background-color:lawngreen'><td>"+parkNo+"</td><td>"+status+"</td><td>"+hours+"</td></tr>";
                
                
                parkNo++;
    }
   loop=parkDetail-(divide*i);
}
htmlBody+="</table>";
   document.getElementById('iframeBody').innerHTML=htmlBody;
}

function setValue()
{
  var x=document.getElementsByClassName("accordion active")[0].id;
  document.getElementById('zoneVal').value=x;
}