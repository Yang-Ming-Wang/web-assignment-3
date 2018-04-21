
var global_videos;
var thumbnails = document.getElementById("video_thumbnails");
var maxVideoNumberPerPage=4;
var currentPage=1;
var maxPage;
var preFlag=1;
var flag = 1;

    a_bgcolor();
    loadDoc2("data.json",function(){ generateVideoBlock(currentPage);}, 
        function(){ if(global_videos.length <= maxVideoNumberPerPage)
         maxVideoNumberPerPage = global_videos.length;}, 
         function(){maxPage = Math.ceil(global_videos.length/maxVideoNumberPerPage);
});

function a_bgcolor()
{

    document.getElementById("page"+preFlag).style.backgroundColor ="" ;
    document.getElementById("page"+flag).style.backgroundColor ="#eee" ;
}

function onClickPaginationA()
{
    var myNode = document.getElementById("video_thumbnails");
    while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}
    preFlag=flag;
    flag=1;

    currentPage=parseInt(document.getElementById("page1").innerText);

    loadDoc2("data.json",function(){ generateVideoBlock(currentPage);});

    a_bgcolor();


}
function onClickPaginationB()
{
    var myNode = document.getElementById("video_thumbnails");
    while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}
    preFlag=flag;
    flag=2;

    currentPage=parseInt(document.getElementById("page2").innerText);

    loadDoc2("data.json",function(){ generateVideoBlock(currentPage);});

    a_bgcolor();


}
function onClickPaginationC()
{
    var myNode = document.getElementById("video_thumbnails");
    while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}
    preFlag=flag;
    flag=3;

    currentPage=parseInt(document.getElementById("page3").innerText);

    loadDoc2("data.json",function(){ generateVideoBlock(currentPage);});

    a_bgcolor();


}


function onClickPaginationPrevious()
{
    var myNode = document.getElementById("video_thumbnails");
    while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}

    if(currentPage>1)
    currentPage-=1;
    loadDoc2("data.json",function(){ generateVideoBlock(currentPage);});

    preFlag=flag;

     if(flag>1)
     flag--;

     a_bgcolor();

     if(currentPage >= 1&&flag==1)
     {
        document.getElementById("page3").innerHTML=currentPage+2;
        document.getElementById("page2").innerHTML=currentPage+1;
        document.getElementById("page1").innerHTML=currentPage;
     }
    console.log(currentPage);


}

function onClickPaginationNext()
{
    var myNode = document.getElementById("video_thumbnails");
    while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}
    
    if(currentPage<maxPage)
    currentPage+=1;
    loadDoc2("data.json",function(){ generateVideoBlock(currentPage);});

    preFlag=flag;

     //a_bgcolor();
     if(flag<3)
     flag++;

     a_bgcolor();

     if(currentPage > 3&&flag==3)
     {
        document.getElementById("page3").innerHTML=currentPage;
        document.getElementById("page2").innerHTML=currentPage-1;
        document.getElementById("page1").innerHTML=currentPage-2;
     }

     console.log(currentPage);

}


function generateVideoBlock( page ){

for( i = (page-1)*maxVideoNumberPerPage ; i< Math.min(page * maxVideoNumberPerPage,global_videos.length); i++) {
    var video_block = document.createElement("li");
    video_block.classList.add("span2");
    // video_block.innerHTML = '<div class="thumbnail" id='+ String(global_videos["id"]) +'>';
    // video_block.innerHTML +=     '<div class="photo">'
    // video_block.innerHTML +=     '<a href=video_page.html?id='+ String(global_videos["id"])  +'>';
    var thumbnail = document.createElement("div");
    thumbnail.classList.add("thumbnail");
    thumbnail.id = String(global_videos[i]["id"]);

    var cover_photo_block = document.createElement("div");
    cover_photo_block.classList.add("photo");

    var a = document.createElement("a");
    // a.href= "video_page.html?id=" + String(global_videos[i]["id"]);
    a.href= "video_page.php?id=" + String(i);

    var img=document.createElement("img");
    img.src = "https://i.ytimg.com/vi/" + String(global_videos[i]["ytVideoId"]) + "/hqdefault.jpg";

    var video_label = document.createElement("span");
    video_label.classList.add("label");
    video_label.classList.add("label-inverse");
    video_label.classList.add("class-photo-label");

    var video_time = document.createElement("span");
    video_time.classList.add("video-time");
    video_time.innerHTML=global_videos[i]["duration"];
    


    a.appendChild(img);
    cover_photo_block.appendChild(a)

    video_label.appendChild(video_time);
    cover_photo_block.appendChild(video_label);
    thumbnail.appendChild(cover_photo_block);
    
    //===============================================
    var info_block = document.createElement("div");
    info_block.classList.add("caption");

    var a1 = document.createElement("a");
    // a1.href="video_page.html?id=" + String(global_videos[i]["id"]);
    a1.href= "video_page.html?id=" + String(i);

    var h5 = document.createElement("h5");
    h5.innerHTML = global_videos[i]["title"];

    var icon_div = document.createElement("div");
    var icon = document.createElement("i");
    icon.classList.add("icon-headphones");
    icon.innerHTML=global_videos[i]["views"];
    
    var lang_label_block = document.createElement("div");
    var span_ch = document.createElement("span");
    var span_en = document.createElement("span");
    span_en.classList.add("label");
    span_en.classList.add("label-warning");
    span_ch.classList.add("label");
    span_en.innerHTML="美國腔";
    span_ch.innerHTML="中文";


    a1.appendChild(h5);
    icon_div.appendChild(icon);

    lang_label_block.appendChild(span_ch);
    lang_label_block.appendChild(span_en);

    info_block.appendChild(a1);
    info_block.appendChild(icon_div);
    info_block.appendChild(lang_label_block);


    thumbnail.appendChild(info_block);
    video_block.appendChild(thumbnail);
    // console.log(video_block);
    // console.log(thumbnails);
    thumbnails.appendChild(video_block);

}

}
