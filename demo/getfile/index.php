<?php
    // TouchyPHP enables file inclusion in the page for rowser http request reduction
    // Three types of assets are supported: CSS, JS and Images. All the rest simply return as is.
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
        
        <!--
            Example #1: embedding a js file.
            @param <string> file path relative to php page
            @param <boolean> (optional) Default is TRUE. The script will be embedded within a <script> tag
                Sending FALSE will result a <script> tag pointing to the original file path supplied
            -->
        <? echo TouchyPHP::getFile("js/scripts.js", TRUE); ?>
        
        <!--
            Example #2: embedding a css file.
            @param <string> file path relative to php page
            @param <boolean> (optional) Default is TRUE. The css rules will be embedded within a <link> tag
                Sending FALSE will result a <style> tag pointing to the original file path supplied
            
            Notice that backround-image url paths will be adapted to the php page location
        -->        
        <? echo TouchyPHP::getFile("css/style.css", TRUE); ?>
    </head>
    <body>
        <!-- This element's background image is specified in style.css. If you see the image - all works OK -->
        <div class="image"></div>
        <br>
        <!--
           Example #3: embedding an image
           @param <string> file path relative to php page. path must be relative.
           param <boolean> (optional) Default is TRUE, the image data will be embeded as data uri (base64 encoding) 
                Sending FALSE will return the original file path supplied
                
           Use judgement when embedding images for they might be larger in size then by a simple http request
        -->
        <img src="<? echo TouchyPHP::getFile("img/image.png", TRUE); ?>" alt="image" />
        <br>
        <img src="<? echo TouchyPHP::getFile("img/image.png?v=2", FALSE); ?>" alt="image" />
    </body>
</html>
