var player, previousCaption,
	timeInterval = null, clickCaption = null
	captionEnd = 0, subtitle = [];

//load Youtube IFrame Player API code asynchronously.
(function (){
	var tag = document.createElement("script"),
		firstScriptTag = document.getElementsByTagName("script")[0];

		tag.src = "https://www.youtube.com/iframe_api";
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		width: '100%',
		videoId: document.getElementById('ytVideoId').dataset.ytvideoid,
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
};

// add EventListener to each subtitle
// and initial the subtitle data
function onPlayerReady(event) {
	var i, length = document.getElementsByTagName("tr").length;
	for (i = 0; i < length; i++) {
		(function (){
			var sub = {}, trElement = document.getElementById(i);

			sub.start = Number(trElement.dataset.start);
			sub.end = Number(trElement.dataset.end);
			sub.text = trElement.lastChild.innerHTML;

			subtitle.push(sub);

			trElement.addEventListener("click", () => {jumpToSubTime(sub)});
		})();
	}
	previousCaption = document.getElementById("0");
}

function jumpToSubTime(subtitle) {
	player.seekTo(subtitle.start,true);
	player.playVideo();

	if (clickCaption !== null) {
		clearInterval(clickCaption);
	}
	captionEnd = subtitle.end;
	clickCaption = setInterval(checkPlayedCaptionEnd, 50);
}

function checkPlayedCaptionEnd() {
	if (player.getCurrentTime() >= captionEnd) {
		player.pauseVideo();
		clearInterval(clickCaption);
		clickCaption = null;
	}
}

function onPlayerStateChange(event) {
	switch (event.data) {
		case YT.PlayerState.PLAYING:
			if (timeInterval == null) {
				timeInterval = setInterval(onTimeChange,250);
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
	var i,
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
