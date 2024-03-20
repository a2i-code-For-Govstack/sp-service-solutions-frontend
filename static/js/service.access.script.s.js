var __service_provider_host = 'http://127.0.0.1:3087';
// var __service_provider_host = 'https://np-service.tamanna.orangebd.com';
var __service_arr = {
    1: 'comment-list',
    2: 'poll-list'
}

/**
 * Create function for load opinion poll
 */
function closeCommentSection(e){
    document.getElementById('service_access_black_overlay').remove();
    document.getElementById('service_access_content_view').remove();
}
async function loadContents(id){
    var __cur_location = window.location;
    console.log(__cur_location)
    var url = __service_provider_host + '/service-access/load-' + __service_arr[id];    
    var elm = document.createElement('div');
    elm.setAttribute('id','service_access_content_view');
    
    /**
     * Call for data
     */
    let get_height = window.innerHeight;
    elm.innerHTML = '<span id="close_service_access_content_view" onclick="closeCommentSection(this)">x</span><object data="'+ url + '?req_from=' + __cur_location.host +'&app_id='+ __app_id +'&secret_key='+ __secret_key +'" width="100%" height="'+ get_height +'" />';    
    
    document.getElementById("serviceAccessBlock").appendChild(elm);
    document.getElementById("service_access_content_view").style.cssText = 'position:fixed;left:0%;top:0%;background-color:#fff;z-index:1000;width:calc(100% - 150px);min-height:300px;box-shadow:0 0 15px #000;border-radius:5px;';
    document.getElementById("close_service_access_content_view").style.cssText = 'position:absolute;width:30px;height:30px;line-height:30px;text-align:center;right:-15px;top:43px;background-color:#fff;border-radius:50%;cursor:pointer;box-shadow:0 0 5px #000;z-index:5';
    
    /**
     * For black overlay
     */
    var elm = document.createElement('div');
    elm.setAttribute('id','service_access_black_overlay');
    document.getElementById("serviceAccessBlock").appendChild(elm);
    document.getElementById("service_access_black_overlay").style.cssText = 'position:fixed;left:0;top:0;background-color:#00000080;z-index:999;width:100%;height:100%;';
}

/**
 * SVG FILES
 */
 var poll_icon_svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 317.02 317.02"><g id="Group_392" data-name="Group 392" transform="translate(-6612.98 -4707.98)"><path id="Rectangle_111" data-name="Rectangle 111" d="M45,0H317.02a0,0,0,0,1,0,0V317.02a0,0,0,0,1,0,0H45a45,45,0,0,1-45-45V45A45,45,0,0,1,45,0Z" transform="translate(6612.98 4707.98)" fill="#39b54a"/><g id="Group_391" data-name="Group 391"><path id="Path_1300" data-name="Path 1300" d="M6722.6,4904.684a24.463,24.463,0,1,0-24.463-24.463A24.491,24.491,0,0,0,6722.6,4904.684Z" fill="#fff"/><path id="Path_1301" data-name="Path 1301" d="M6722.6,4845.973a34.255,34.255,0,0,1,32.444,45.225,30.958,30.958,0,0,1,12.567,24.9V4784H6722.6Z" fill="#fff"/><path id="Path_1302" data-name="Path 1302" d="M6797.941,4880.221a24.463,24.463,0,1,0,24.463-24.463A24.491,24.491,0,0,0,6797.941,4880.221Z" fill="#fff"/><path id="Path_1303" data-name="Path 1303" d="M6788.156,4880.221a34.287,34.287,0,0,1,34.248-34.248v-15.33h-45.011V4916.1a30.958,30.958,0,0,1,12.567-24.9A34.131,34.131,0,0,1,6788.156,4880.221Z" fill="#fff"/><path id="Path_1304" data-name="Path 1304" d="M6722.6,4914.469a34.21,34.21,0,0,1-27.227-13.5A21.131,21.131,0,0,0,6689,4916.1V4951h66.539v-34.9a21.126,21.126,0,0,0-6-14.759A34.205,34.205,0,0,1,6722.6,4914.469Z" fill="#fff"/><path id="Path_1305" data-name="Path 1305" d="M6849.631,4900.97a34.208,34.208,0,0,1-54.169.371,21.126,21.126,0,0,0-6,14.759V4951H6856v-34.9A21.131,21.131,0,0,0,6849.631,4900.97Z" fill="#fff"/></g></g></svg>';

var comment_icon_svg = '<?xml version="1.0" encoding="UTF-8"?><svg viewBox="0 0 317.02 317.02" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-6612.3 -3981.5)" data-name="Group 388"><path transform="translate(6612.3 3981.5)" d="m45 0h272.02v317.02h-272.02a45 45 0 0 1-45-45v-227.02a45 45 0 0 1 45-45z" fill="#39b54a" data-name="Rectangle 109"/><path d="m6844.1 4061h-139.64a26.511 26.511 0 0 0-26.48 26.48v85.459a26.508 26.508 0 0 0 26.386 26.48v38.781l55.73-38.78h84.005a26.51 26.51 0 0 0 26.479-26.483v-85.457a26.51 26.51 0 0 0-26.479-26.48zm-25.071 99.315h-89.5v-11.285h89.5zm0-24.076h-89.5v-11.285h89.5zm0-24.075h-89.5v-11.285h89.5z" fill="#fff" data-name="Path 1295"/></g></svg>';

/**
 * Create element
 */
var elm = document.createElement('div');
elm.style.cssText = 'position:relative; z-index: 999'
elm.setAttribute("id", "serviceAccessBlock");
elm.innerHTML = '<div id="widget_comment_icon" title="Comment" onclick="loadContents(1)">'+ comment_icon_svg +'</div><div id="widget_polling_icon" title="Polling" onclick="loadContents(2)">'+ poll_icon_svg +'</div>';
document.body.appendChild(elm);
document.getElementById("widget_comment_icon").style.cssText = 'position:fixed;right:0;top:45%;width:40px;height:auto;padding:0;background-color:#fff;border-radius:5px 0 0 5px;cursor:pointer;box-shadow:0 0 5px #000;z-index:998';
document.getElementById("widget_polling_icon").style.cssText = 'position:fixed;right:0;top:35%;width:40px;height:auto;padding:0;background-color:#fff;border-radius:5px 0 0 5px;cursor:pointer;box-shadow:0 0 5px #000;z-index:998';