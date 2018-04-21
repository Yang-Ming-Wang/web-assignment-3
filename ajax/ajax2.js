
function loadDoc2(url, cFunction1,cFunction2,cFunction3) {
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

       global_videos = JSON.parse(this.responseText);

      cFunction1();
      if(cFunction2!=undefined)
        cFunction2();
      if(cFunction3!=undefined)  
        cFunction3();

    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
