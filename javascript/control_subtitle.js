var	player, currentVideo, previousCaption,
	timeInterval = null, clickCaption = null
	captionEnd = 0;

var global_videos;


function videoParse() {
	var urlId = getAllUrlParams().id;

	if (urlId === undefined) {
		console.log("undefined id");
		urlId = 0;
	} else if (urlId >= global_videos.length || urlId < 0) {
		console.log("inValid id");
		urlId = 0;
	} else {
		console.log(urlId);
	}
	currentVideo = global_videos[urlId];

	//load Youtube IFrame Player API code asynchronously.
	(function (){
		var tag = document.createElement("script"),
			firstScriptTag = document.getElementsByTagName("script")[0];

			tag.src = "https://www.youtube.com/iframe_api";
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	})();
}

function jumpToSubTime(subtitle) {
	player.seekTo(subtitle.start,true);
	player.playVideo();

	if (clickCaption !== null) {
		clearInterval(clickCaption);
	}
	captionEnd = subtitle.end;
	clickCaption = setInterval(checkPlayedCaptionEnd,50);
}


function checkPlayedCaptionEnd() {
	if (player.getCurrentTime() >= captionEnd) {
		player.pauseVideo();
		clearInterval(clickCaption);
		clickCaption = null;
	}
}


//insert data into html <table> element
function insertData() {
	var ulElement = document.getElementById("subtitleList"),
		i, trElement;
	for (i = 0;i < currentVideo.subtitle.length;i++) {
		trElement = document.createElement("tr");
		trElement.innerHTML = "<td><i class=\"far fa-play-circle\"></i></td>";
		trElement.innerHTML += "<td>" + currentVideo.subtitle[i].text + "</td>";
		trElement.setAttribute("id",i);
		ulElement.insertBefore(trElement, null);
		(function (){
			var subtitle = currentVideo.subtitle[i];
			trElement.addEventListener("click", function (){jumpToSubTime(subtitle);});
		})();
	}
	previousCaption = document.getElementById("0");
}


// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		width: '100%',
		videoId: currentVideo.ytVideoId,
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
};


function onPlayerReady(event) {
	document.getElementById("video_title").innerHTML = currentVideo.title;
}

function onPlayerStateChange(event) {
	switch (event.data) {
		case YT.PlayerState.PLAYING:
			if (timeInterval == null) {
				timeInterval = setInterval(onTimeChange,100);
			}
			break;
		case YT.PlayerState.PAUSED:
			clearInterval(timeInterval);
			timeInterval = null;
			if (clickCaption !== null) {
				clearInterval(clickCaption);
				clickCaption = null;
			}
			break;
		case YT.PlayerState.ENDED:
			clearInterval(timeInterval);
			timeInterval = null;
			if (clickCaption !== null) {
				clearInterval(clickCaption);
				clickCaption = null;
			}
			break;
	}
}

function onTimeChange() {
	var	i, subtitle = currentVideo.subtitle,
		subtitleLength = subtitle.length,
		currentTime = player.getCurrentTime();

	for (i = 0; i < subtitleLength; i++) {
		if (subtitle[i].start <= currentTime && currentTime <= subtitle[i].end) {
			break;
		}
	}
	if (i == subtitleLength) {
		document.getElementById("video_caption").innerHTML = "";
	} else {
		document.getElementById("video_caption").innerHTML = subtitle[i].text;
		previousCaption.style.color = "initial";
		previousCaption = document.getElementById(i);
		previousCaption.style.color = "#468847"; //green
	}
}

// source https://www.sitepoint.com/get-url-parameters-with-javascript/
// Example usage of getAllUrlParams()

// http://example.com/?product=shirt&color=blue&newuser&size=m
// getAllUrlParams().product; // 'shirt'
// getAllUrlParams().color; // 'blue'
// getAllUrlParams().newuser; // true
// getAllUrlParams().nonexistent; // undefined
// getAllUrlParams('http://test.com/?a=abc').a; // 'abc'
function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}
