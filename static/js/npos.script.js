// var __service_provider_host = 'http://127.0.0.1:3087';
var __service_provider_host = '//polling.portal.gov.bd';

/**
 * Create function for load online survey
 */
function closeOnlineSurvey(e){
    document.getElementById('online_survey_black_overlay').remove();
    document.getElementById('online_survey_view').remove();
}
async function loadOnlineSurvey(e){
    var __cur_location = window.location;
    console.log(__cur_location)
    var url = __service_provider_host + '/load-online-survey';
    
    var elm = document.createElement('div');
    elm.setAttribute('id','online_survey_view');    
    
    /**
     * Call for data
     */
    elm.innerHTML = '<span id="close_online_survey_view" onclick="closeOnlineSurvey(this)">x</span><object data="'+ url + '?req_from=' + __cur_location.host +'" width="100%" height="450" />';
    document.getElementById("onlineSurveyBlock").appendChild(elm);
    document.getElementById("online_survey_view").style.cssText = 'position:fixed;left:15%;top:10%;background-color:#fff;z-index:10000;width:70%;min-height:300px;box-shadow:0 0 15px #000;border-radius:5px;';
            
    document.getElementById("close_online_survey_view").style.cssText = 'position:absolute;width:30px;height:30px;line-height:30px;text-align:center;right:-10px;top:-10px;background-color:#fff;border-radius:50%;cursor:pointer;box-shadow:0 0 5px #000;z-index:5';
    
    /**
     * For black overlay
     */
    var elm = document.createElement('div');
    elm.setAttribute('id','online_survey_black_overlay');
    document.getElementById("onlineSurveyBlock").appendChild(elm);
    document.getElementById("online_survey_black_overlay").style.cssText = 'position:fixed;left:0;top:0;background-color:#00000080;z-index:9999;width:100%;height:100%;';
}

/**
 * SVG FILES
 */
var thumb_view_size = '-60px';
var survey_icon_svg = '<img id="survey_widget_icon" src="'+ __service_provider_host +'/survey-icon.png" />';

/**
 * Create element
 */
var elm = document.createElement('div');
elm.style.cssText = 'position:relative; z-index: 9999'
elm.setAttribute("id", "onlineSurveyBlock");
elm.innerHTML = '<div id="widget_survey_icon" title="Polling" onclick="loadOnlineSurvey(this)">'+ survey_icon_svg +'</div>';
document.body.appendChild(elm);
// document.getElementById("widget_survey_icon").style.cssText = 'position:fixed;right:0;top:35%;width:45px;height:45px;padding:0;background-color:#fff;border-radius:6px 0 0 6px;cursor:pointer;box-shadow:0 0 5px #000;z-index:9998';
document.getElementById("widget_survey_icon").style.cssText = 'position:fixed;right:0;top:35%;width:110px;height:50px;padding:0;cursor:pointer;transition:all 0.4s;z-index:9998';
document.getElementById('survey_widget_icon').style.cssText = 'width: 100%; height: 100%; object-fit: contain';

/**
 * Action script
 */
document.getElementById("widget_survey_icon").addEventListener("mouseover", function( event ) {
    this.style.right = '0'
});
document.getElementById("widget_survey_icon").addEventListener("mouseleave", function( event ) {
    this.style.right = thumb_view_size
});
var setPollTimeOut = setInterval(function(){
    document.getElementById('widget_survey_icon').style.right = thumb_view_size;
    clearInterval(setPollTimeOut)
}, 1000 * 5);