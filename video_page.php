<?php
function getVideo() {
	$fileString = file_get_contents("data.json");
	$videos = json_decode($fileString);
	$id = filter_input(INPUT_GET, "id", FILTER_VALIDATE_INT);
	if ($id === null || $id === false) {
		$id = 0;
	}
	if ($id < 0 || $id >= sizeof($videos)) {
		$id = 0;
	}
	return $videos[$id];
}

$video = getVideo();
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<link rel="stylesheet" href="css/fontawesome-all.min.css">
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/videoPageStyle.css">
</head>
<body>
	<nav class="navbar navbar-inverse navbar-fixed-top">
		<div class="container-fluid">

			<!-- Brand/logo -->
			<div class="navbar-header">
				<a class="navbar-brand">FakeTube</a>
			</div>

			<p class="navbar-text">we copy the voiceTube</p>

		</div>
	</nav>
	<div class="container">
		<div class="row">
			<div class="col-lg-12">
			<h1 id="video_title"><?=$video->title?></h1>
			</div>
		</div>
		<div class="row">
		<div class="col-lg-8">
			<div>
				<div id="player"></div>
				<div id="video_caption"></div>
			</div>
		</div>
		<div class="col-lg-4">
			<div id="caption_block">
				<table id="subtitleList">
				<?php $i = 0; ?>
				<?php foreach ($video->subtitle as $subtitle) : ?>
					<tr id="<?=$i++?>">
					<td><i class="far fa-play-circle"></i></td>
					<td data-start="<?=$subtitle->start?>"
						data-end="<?=$subtitle->end?>">
						<?=$subtitle->text?>
					</td>
					</tr>
				<?php endforeach; ?>
				</table>
			</div>
		</div>
		</div>
	</div>
</body>
</html>
