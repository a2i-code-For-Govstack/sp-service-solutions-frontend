// var __service_provider_host = 'http://127.0.0.1:3087';
// var __service_provider_host = 'https://np-service.tamanna.orangebd.com';
var __service_provider_host = '//polling.portal.gov.bd';

/**
 * Create function for load opinion poll
 */
function closeCommentSection(e){
    document.getElementById('service_access_black_overlay').remove();
    document.getElementById('service_access_content_view').remove();
}
async function loadContents(){
    var __cur_location = window.location;
    console.log(__cur_location)
    var url = __service_provider_host + '/sso-auth-client';
    var elm = document.createElement('div');
    elm.setAttribute('id','service_access_content_view');
    
    /**
     * Call for data
     */
    let get_height = window.innerHeight;
    elm.innerHTML = '<span id="close_service_access_content_view" onclick="closeCommentSection(this)">x</span><object data="'+ url + '?req_from=' + __cur_location.host +'&app_id='+ __app_id +'&secret_key='+ __secret_key +'" width="100%" height="'+ get_height +'" />';    
    
    document.getElementById("serviceAccessBlock").appendChild(elm);
    document.getElementById("service_access_content_view").style.cssText = 'position:fixed;left:0%;top:0%;background-color:#fff;z-index:10000;width:calc(100% - 150px);min-height:300px;box-shadow:0 0 15px #000;border-radius:5px;';
    document.getElementById("close_service_access_content_view").style.cssText = 'position:absolute;width:30px;height:30px;line-height:30px;text-align:center;right:-15px;top:43px;background-color:#fff;border-radius:50%;cursor:pointer;box-shadow:0 0 5px #000;z-index:5';
    
    /**
     * For black overlay
     */
    var elm = document.createElement('div');
    elm.setAttribute('id','service_access_black_overlay');
    document.getElementById("serviceAccessBlock").appendChild(elm);
    document.getElementById("service_access_black_overlay").style.cssText = 'position:fixed;left:0;top:0;background-color:#00000080;z-index:9999;width:100%;height:100%;';
}

/**
 * SVG FILES
 */
 var auth_icon_svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 289.44 289.44" width="100%" height="100%"><defs><style>.cls-1{fill:#17bb35;}.cls-2{fill:#fff;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M30.14,0h259.3a0,0,0,0,1,0,0V289.44a0,0,0,0,1,0,0H30.14A30.14,30.14,0,0,1,0,259.3V30.14A30.14,30.14,0,0,1,30.14,0Z"/><g id="Layer_2-2" data-name="Layer 2"><g id="Layer_1-2-2" data-name="Layer 1-2"><path class="cls-2" d="M177,157.24a33,33,0,0,1-32.29,26,32.56,32.56,0,0,1-31.85-26h-13a45.55,45.55,0,0,0,90.15,0Z"/><path class="cls-2" d="M203,157.24a58.42,58.42,0,0,1-116.14,0H33.75v6.51a6.51,6.51,0,0,0,4.46,6.13L65,178.65a90.05,90.05,0,0,0,3.58,8.77L56.2,212.22a6.48,6.48,0,0,0,1.22,7.49l18.33,18.34a6.51,6.51,0,0,0,7.49,1.22l24.81-12.34a94.23,94.23,0,0,0,8.77,3.58l8.72,26.75a6.52,6.52,0,0,0,6.18,4.45h26.44a6.5,6.5,0,0,0,6.17-4.45l8.73-26.75q4.47-1.57,8.77-3.58l24.8,12.34a6.51,6.51,0,0,0,7.5-1.22l18.32-18.34a6.48,6.48,0,0,0,1.23-7.49l-12.34-24.8a92.63,92.63,0,0,0,3.58-8.77l26.32-8.73a6.52,6.52,0,0,0,4.45-6.14v-6.54Z"/><path class="cls-2" d="M126.41,157.24a19.47,19.47,0,0,0,18.31,13,20.07,20.07,0,0,0,18.75-13Z"/><path class="cls-2" d="M144.72,39.77a26,26,0,0,0,0,52h0c14.35,0,26.45-11.66,26.45-26S159.07,39.77,144.72,39.77Z"/><path class="cls-2" d="M210.18,39.77a26,26,0,1,0,26,26h0A26.07,26.07,0,0,0,210.18,39.77Z"/><path class="cls-2" d="M79.7,39.77a26,26,0,1,0,26,26h0A26.08,26.08,0,0,0,79.7,39.77Z"/><path class="cls-2" d="M232.35,97.81a38.71,38.71,0,0,1-44.28.06,46.55,46.55,0,0,0-8.08,5.7,59.42,59.42,0,0,1,23.28,40.64h52.41v-6.5A46.06,46.06,0,0,0,232.35,97.81Z"/><path class="cls-2" d="M144.72,104.8c-22.89,0-41.89,17.42-45,39.44h90.5A46.33,46.33,0,0,0,144.72,104.8Z"/><path class="cls-2" d="M101.8,97.87a38.71,38.71,0,0,1-44.28-.06c-13.85,7.81-23.77,22.93-23.77,39.93v6.5H86.6a59.42,59.42,0,0,1,23.28-40.64A46.71,46.71,0,0,0,101.8,97.87Z"/></g></g></g></g></svg>';

/**
 * Create element
 */
var elm = document.createElement('div');
elm.style.cssText = 'position:relative; z-index: 9999'
elm.setAttribute("id", "serviceAccessBlock");
elm.innerHTML = '<div id="widget_polling_icon" title="Polling" onclick="loadContents()">'+ auth_icon_svg +'</div>';
document.body.appendChild(elm);
document.getElementById("widget_polling_icon").style.cssText = 'position:fixed;right:0;top:35%;width:45px;height:45px;padding:0;background-color:#fff;border-radius:6px 0 0 6px;cursor:pointer;box-shadow:0 0 5px #000;z-index:9998';