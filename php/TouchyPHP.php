<?php
/* 
 * Copyright 2011 DoAT. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 *      conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright notice, this list
 *      of conditions and the following disclaimer in the documentation and/or other materials
 *      provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY Do@ ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of DoAT.
 */

class TouchyPHP {    
    /**
    * constructor
    */
    public function __construct() {}

    
    /**
     * Returns the contents of the css/js/image file
     * @param <string> $filename
     * @param <boolean> $forceInclude {optional}
     * If set to true or not set, the function returns manipulated content.
     * If set to false, the function returns original $filename (inside appropriate HTML tag)
     * @return <string>
     */
    public function getFile($filename, $forceInclude = null){
        $value = $filename;
        
        // get file extension
        $format = pathinfo($filename, PATHINFO_EXTENSION);
        
        if ($forceInclude !== false){
            switch ($format){
                case 'css':
                    // get file content
                    $content = file_get_contents($filename);
                    
                    // update path of relative image urls
                    //$content = self::_replaceImageUrls($filename, $content);
                    
                    // set content within <style> tag
                    $value = self::_getInternalTag($format, $content);
                case 'js':                    
                    // get file content
                    $content = file_get_contents($filename);
                    
                    // set content within <script> tag
                    $value = self::_getInternalTag($format, $content);
                default:
                    // if filename can be converted to image data URI
                    if (self::_canConvertToImageDataURI($filename)){
                        // get file content
                        $content = file_get_contents($filename);
                        
                        // set base64 data
                        $value = self::_getImageDataURI($format, $content);
                    }
            }
        }
        else {
            switch ($format){
                case 'css':
                case 'js':
                    // set content within <script>/<link> tag
                    $value = self::_getExternalTag($format, $filename);
                    break;
            }
        }
        return $value;
    }
    
    /**
     * Gets an image filename and returns if it can be converted to base64
     * @param <string> $filename
     * @return <boolean>
     */
    private function _canConvertToImageDataURI($filename) {
        // list of image formats allowed for base64 encoding
        $formatArray = array('jpeg', 'jpg', 'jpe', 'png', 'gif');

        // Get file format
        $format = pathinfo($filename, PATHINFO_EXTENSION);
        
        // Remove trailing querystring
        if (strrpos($format, '?')){
            $format = substr($format, 0, strrpos($format, '?'));
        }

        // Return whether the file format is allowed for base64 encoding
        return (in_array($format, $formatArray));
    }
    
    /**
     * Gets an image filename and returns it converted to base64 data string
     * @param <string> $format
     * @param <string> $content
     * @return <string> image data URI
     */
    private static function _getImageDataURI($format, $content) {        
        // encode
        $data = base64_encode($content);

        // return the image URI
        return 'data:image/'.$format.';base64,'.$data;
    }
    
    /**
     * Searches for url(filepath) in content and returns manipulated according to php page location
     * @param <string> $format
     * @param <string> $content
     * @ignore
     */
    private static function _replaceImageUrls($filename, $content){
        $content = preg_replace_callback('/url\([\'"]?([^\)\'"]+)/',
                                        function($m){
                                            return str_replace($m[1], '*** REPLACE string ***', $m[0]);
                                        },
                                        $content);
        return $content;
    }
    
    /**
     * Returns HTML tag according to format, pointing to an external resource
     * @param <string> $format
     * @param <string> $filename
     * @return <string> HTML tag
     */
    private static function _getExternalTag($format, $filename){
        switch ($format) {
            case 'css':
                $template = '<link href="{$filename}" rel="stylesheet" type="text/css" />';
                break;
            case 'js':
                $template = '<script src="{$filename}" type="text/javascript"></script>';
        }
    
        return str_replace('{$filename}', $filename, $template);
    }
    
    /**
     * Returns HTML tag according to format, including content
     * @param <string> $format
     * @param <string> $content
     * @return <string> HTML tag
     */
    private static function _getInternalTag($format, $content){
        switch ($format){
            case 'css':
                $template = '<style type="text/css">{content}</style>';
                break;
            case 'js':
                $template = '<script type="text/javascript">{content}</script>';
                break;
        }
    
        return str_replace('{content}', $content, $template);
    }
}