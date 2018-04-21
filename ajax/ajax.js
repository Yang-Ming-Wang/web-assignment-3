
function loadDoc(url, cFunction1, cFunction2) {
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

       global_videos = JSON.parse(this.responseText);

      cFunction1();
      cFunction2();

    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
loadDoc("data.json",videoParse,insertData);
