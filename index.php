<?php
$fileString = file_get_contents("data.json");
$videos = json_decode($fileString);
$page = filter_input(INPUT_GET, "page", FILTER_VALIDATE_INT);
if ($page === null || $page === false) {
    $page = 0;
}
if ($page < 0 || $page >= sizeof($videos)/4) {
    $page = 0;
}
function setbtnColor($btnId) {
    if ($GLOBALS["page"] == $btnId) {
        echo "style=\"background-color:#eee\"";
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>voicetube</title>
    <meta charset="utf-8"/>

    <!-- Latest compiled and minified CSS --> 
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/main.css" >
    <!-- font awesome -->
    <!-- <script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js" integrity="sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl" crossorigin="anonymous"></script> -->

    <link href="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css" rel="stylesheet">
    <link href="https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">

</head>
<body>
    <div class="container-fluid">
        
        <nav class="navbar navbar-inverse navbar-fixed-top main-navbar">
            <div class="container-fluid" id="container-navbar">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>

                    <!-- logo of voicetube on the navigation bar -->
                    <a class="navbar-brand-test" href="#">
                        <img id="brand-img" alt="Brand" src="https://cdn.voicetube.com/assets/img/vt_logo-with_icon-170111-white.png">
                    </a>
                    

                </div>
                <div class="collapse navbar-collapse container-fluid" id="bs-example-navbar-collapse-1">
                  <ul class="nav nav-pull" nav-pull>
                    <!-- <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li> -->
                    <!-- <li><a href="#">Link</a></li> -->
                    <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">精選頻道 <span class="caret"></span></a>
                      <ul class="dropdown-menu">
                        <li><a href="#">中英文雙字幕影片</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">深度英文演講</a></li>
                        <li><a href="#">知識型動化</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">看BBC學英文</a></li>
                      </ul>
                    </li>

                    <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">程度分級 <span class="caret"></span></a>
                      <ul class="dropdown-menu">
                        <li><a href="#">初級：TOEIC 250-545</a></li>
                        <li><a href="#">中級：TOEIC 550-780</a></li>
                        <li><a href="#">高級：TOEIC 780-990</a></li>
                      </ul>
                    </li>

                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">聽力與口說 <span class="caret"></span></a>
                    </li>

                  </ul>

                  <ul class="nav navbar-nav navbar-right class-icon">
                    <li>
                        <i class="icon-user icon-light icon-2x"></i>  
                    </li>
                    <li>
                        <i class="icon-flag icon-light icon-2x"></i>
                    </li>
                    <li>
                        <i class="icon-envelope icon-light icon-2x"></i>
                    </li>
                    <li>
                        <i class="icon-check icon-light icon-2x"></i>
                    </li>
                    <li>
                        <img class="ico_user" src="https://graph.facebook.com/2103565943210499/picture?width=22&height=22">
                    </li>
                  </ul>
                </div><!-- /.navbar-collapse -->
            </div>
        </nav>
        

        <div class="container" id="div-video">

            <div class="index-block">
                <span class="left-section span8">
                    <h1 id="id-new-videos">
                        NEW VIDEOS
                    </h1>

                    <ul class="thumbnails", id="video_thumbnails" >
                       <?php $startId = $page*4;
                             $endId = min($startId + 4, sizeof($videos));
                            for ($id = $startId; $id < $endId; $id++): ?>
                        <li class="span2">
                            <div class="thumbnail" id="<?=$id + 1?>">
                            <div class="photo">
                                <a href="video_page.php?id=<?=$id?>"><img src="https://i.ytimg.com/vi/<?=$videos[$id]->ytVideoId?>/hqdefault.jpg"></a><span class="label label-inverse class-photo-label"><span class="video-time"><?=$videos[$id]->duration?></span></span>
                            </div>
                            <div class="caption">
                                <a href="video_page.html?id=<?=$id?>">
                                <h5><?=$videos[$id]->title?></h5></a>
                                <div><i class="icon-headphones"><?=$videos[$id]->views?></i></div>
                            <div>
                                <span class="label">中文</span><span class="label label-warning">美國腔</span>
                            </div>
                            </div>
                        </div>
                        </li>
                        <?php endfor; ?>
                    </ul>

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="text-center" >
                            <nav aria-label="Page navigation">
                                 <ul class="pagination">
                                    <li class="page-item">
                                        <a class="page-link" href="index.php?page=<?=max(0, $page - 1)?>">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    <li class="page-item"><a id="page1" class="page-link" <?php setbtnColor(0);?> href="index.php?page=0">1</a></li>
                                    <li class="page-item"><a id="page2" class="page-link" <?php setbtnColor(1);?> href="index.php?page=1">2</a></li>
                                    <li class="page-item"><a id="page3" class="page-link" <?php setbtnColor(2);?> href="index.php?page=2">3</a></li>
                                    <li class="page-item">
                                        <a class="page-link"  href="index.php?page=<?=min($page + 1, 2)?>">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </span>
                
                <!-- right span -->
                <span class="span3">
                    <span class="span3 well">
                        <div class="everyday_index_banner">
                            每日口說挑戰
                            <br>
                            【TED-ed】動物界的自相殘殺：吃了自己的手足是為了長得更快更壯！ 
                        </div>
                        <div class="everyday_index_img">
                            <img src="https://cdn.voicetube.com/assets/thumbnails/bVMVxJJ7P8M.jpg" class="img-polaroid img-rounded">
                        </div>
                    </span>
                    <span>
                        <form class="navbar-form navbar-left" id="search-form">
                            <h5 id="search-title">Top Search Keywords</h5>
                            <div class="search-group">
                              <input type="text" placeholder="Search words & phrase" class="form-control" placeholder="Search">
                              <input type="submit" value="Go">
                            </div>
                        </form>
                    </span>

                    <span class="span3">
                        <hr>
                    </span>
                </span>


                
                
            </div>

        </div>
    </div>
    <!-- bootstap 3  -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

</body>
</html>
