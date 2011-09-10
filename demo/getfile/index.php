<?
    require "../../php/TouchyPHP.php";
?>
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>TouchyPHP demo</title>
        <meta name="description" content="">
        <meta name="author" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
        
        <? echo TouchyPHP::getFile("css/style.css", TRUE); ?>
    </head>
    <body>
        <div class="image"></div>
        <br>
        <img src="<? echo TouchyPHP::getFile("img/image.png?v=1", TRUE); ?>" alt="image" />
        <br>
        <img src="<? echo TouchyPHP::getFile("img/image.png?v=2", FALSE); ?>" alt="image" />
        <? echo TouchyPHP::getFile("js/scripts.js", TRUE); ?>
    </body>
</html>
