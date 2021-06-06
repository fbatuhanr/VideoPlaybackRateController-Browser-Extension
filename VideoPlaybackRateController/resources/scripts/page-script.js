chrome.runtime.sendMessage({todo: "showPageAction"});
/* ALL RIGHTS RESERVED - BATUHANOZTURK.NET 2021 */
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        
        $("body video:not([class*='getThisVideoRate'])").addClass("getThisVideoRate");
        if( $("body video.getThisVideoRate").length ) {
            if(message.get){
                if(message.get == "getPlaybackRate"){
                    sendResponse( document.getElementsByClassName("getThisVideoRate")[0].playbackRate );
                }
                else if (message.get == "getPageTitle") {
                    sendResponse( document.title );
                }
            }
            else if(message.setPlaybackRate) {
                document.getElementsByClassName("getThisVideoRate")[0].playbackRate = message.setPlaybackRate;
                sendResponse( document.getElementsByClassName("getThisVideoRate")[0].playbackRate );
            }
        }
        return true;
    }
);

/*
$(document).ready(function(){ 

    if ($("body video").length){

    let controllerHTML = "<div id=\"playbackRateController\"><button class=\"decreaseSpeed\">-</button><span>1.0</span><button class=\"increaseSpeed\">+</button></div>";
    $("body").prepend(controllerHTML);

    let videoPositions = $("body .html5-main-video").offset();
    $("#playbackRateController").css({"top":videoPositions.top, "left":videoPositions.left});

    $("body").on("click", "#playbackRateController button.decreaseSpeed", function() {
       document.getElementsByClassName("html5-main-video")[0].playbackRate -= 0.25;
       currentRateTextUpdate();
    });

    $("body").on("click", "#playbackRateController button.increaseSpeed", function() {
        document.getElementsByClassName("html5-main-video")[0].playbackRate += 0.25;
        currentRateTextUpdate();
     });

     function currentRateTextUpdate(){

        let currRate = document.getElementsByClassName("html5-main-video")[0].playbackRate;
         $("#playbackRateController span").text(currRate);
     }

    }
});
*/