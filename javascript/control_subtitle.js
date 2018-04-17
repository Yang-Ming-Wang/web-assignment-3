var player;

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
			'onStateChange': onPlayerStateChange
		}
	});
};

function onPlayerStateChange(event) {
}
