/* ALL RIGHTS RESERVED - BATUHANOZTURK.NET 2021 */
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    if(tabs[0].url.includes("http")){
        
        chrome.tabs.sendMessage(tabs[0].id, {get: "getPageTitle"}, function(response){
            $("#controller h5").text(response);
        });
        chrome.tabs.sendMessage(tabs[0].id, {get: "getPlaybackRate"}, function(response){
            showRateOnInputs(response);
        });

        $("#controller .speedControlButton button.decreaseSpeed").click(function(){
            setCurrentRate(getCurrentRate() - 0.25);
        });
        $("#controller .speedControlButton button.increaseSpeed").click(function(){
            setCurrentRate(getCurrentRate() + 0.25);
        });

        $(document).on("input", "#controller .speedControllerScroll input", function() {
            setCurrentRate( $(this).val() );
        });

        function getCurrentRate(){
            let currRate = $("#controller .speedControlButton h1").text().replace('x', '');
            return parseFloat(currRate);
        }
        function setCurrentRate(rate){
            chrome.tabs.sendMessage(tabs[0].id, {setPlaybackRate: rate}, function(response){
                showRateOnInputs(response);
            });
        }

        function showRateOnInputs(rate){
            if(rate){
                $("#controller .speedControlButton h1").text('x'+rate.toFixed(2));
                $("#controller .speedControllerScroll input").val(rate);
            }
        }
    }
    else {

        $("#controller .speedControlButton button.decreaseSpeed").prop("disabled", true);
        $("#controller .speedControlButton button.increaseSpeed").prop("disabled", true);
        $("#controller .speedControllerScroll input").prop("disabled", true);
    }
});