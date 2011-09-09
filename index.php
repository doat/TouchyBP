<?php
    // PHP performance tools: https://github.com/doat/TouchyPHP
    require "build/tools/TouchyPHP.php";
?>
<!doctype html>
<!-- For storing resources in offline cache -->
<html manifest="cache.manifest">
    <head>
        <meta charset="utf-8">
        <title></title>
        <meta name="description" content="">
        <meta name="author" content="">
        <!-- Viewport scale setting (required): http://labs.doat.com/touchybp/#meta-viewport -->
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
        <!-- iPhone standalone settings: http://labs.doat.com/touchybp/#standalone -->
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <link rel="apple-touch-icon" href="img/icon.png"/>
        <link rel="apple-touch-startup-image" href="img/splash.png" />        
        
        <!-- Initial configuration script -->
        <script>
            // Determines if the agent has a touch interface:  http://labs.doat.com/touchybp/#istouch
            var isTouch = location.href.indexOf('istouch=true') ? true : ('ontouchstart' in window);
            // TouchyJs configuration: http://labs.doat.com/touchyjs/#configuration
            var touchyjsConfig = {
                'fixedPositioning': true, // default
                'browserHistory': true // default
            };
        </script>
        
        <!-- Normalize css by : http://labs.doat.com/touchybp/#normalize.mobile.css -->
        <script> 
            var csspath = isTouch ? 'normalize.mobile.css' : 'normalize.css';
            document.write('<link rel="stylesheet" href="css/normalize.css/' + csspath + '"><\/script>');
        </script>
        <!-- TouchyPHP:getFile lets you reduce http requests: http://labs.doat.com/touchyphp/#getFile -->
        <? echo TouchyPHP::getFile('css/style.css'); ?>

        <!-- Hide content before rendering: http://labs.doat.com/touchyjs/#nav-dependancy  -->
        <style type="text/css"> .touchyjs-content { display: none; } </style>
    </head>
    <body>
        <div class="touchyjs-header">
            header content
            <a href="" onclick="TouchyJS.Nav.goTo('search')">Back home</a>
        </div>
        <div class="touchyjs-content" id="search">
            <div>
                Content page 1 <a href="" onclick="TouchyJS.Nav.goTo('item'); return false;">Next page</a>
                <br /><br /><br />
                <iframe width="300" frameborder="0" allowfullscreen="" src="http://www.youtube.com/embed/ntnKPA6TnQg?hl=en&amp;fs=1"></iframe>
                <!-- TouchyPHP:getFile lets you reduce http requests: http://labs.doat.com/touchyphp/#getFile -->
                <img src="<? echo TouchyPHP::getFile('img/splash.png');?>" alt="image" />
                <br><br><br><br><br><br><br>
            </div>
        </div>
   
        <div class="touchyjs-content" id="item">
            <div>
                Content page 2 <a href="" onclick="TouchyJS.Nav.goTo('gila-sheli-i-love-u'); return false;">Ran to Gila</a>
                <br />
                <img src="http://upload.wikimedia.org/wikipedia/commons/5/52/Heart_icon_red_hollow.svg" alt="animated heart" id="heart" />
            </div>
        </div>
        
        <div class="touchyjs-content" id="gila-sheli-i-love-u">
            <div>
                I really do <a href="" onclick="TouchyJS.Nav.back(); return false;">Back</a>
            </div>
        </div>
        
        <script>
            if(!isTouch) {
                document.write('<script src="js/libs/jquery-1.6.2.min.js"><\/script>');
                document.write('<script src="js/plugins/touche-min.js"><\/script>');
            } else {
                //document.write('<script src="js/libs/zepto.0.7.min.js"><\/script>');
                document.write('<script src="http://developer.loc.doat.com/min/g=zepto.0.7&debug"><\/script>');
            }
        </script>
        
        <!--script src="js/libs/touchy.js"></script-->
        <script src="http://developer.loc.doat.com/min/g=TouchyJS.boilerplate&debug"></script>
        

        <!-- TouchyPHP:getFile lets you reduce http requests: http://labs.doat.com/touchyphp/#getFile -->
        <? echo TouchyPHP::getFile('js/script.js', FALSE);?>

        <!-- Change UA-XXXXX-X to be your site's ID -->
        <script>
            window._gaq = [['_setAccount', 'UAXXXXXXXX1'], ['_trackPageview'], ['_trackPageLoadTime']];
            document.write('<script src="' + ('https:' == location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js"><\/script>');

        </script>
    </body>
</html>
