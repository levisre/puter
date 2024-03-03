import UIWindow from './UIWindow.js'

async function UIWindowRequestFiles(options){
    let h = '';
    h += `<div>`;
        h += `<h3 style="margin-bottom: 0;">File Request Link:</h3>`;
        h += `<p style="word-break: break-all;" class="filereq-link"></p>`;
    h += `</div>`;

    const el_window = await UIWindow({
        title: `Request Files`,
        icon: null,
        uid: null,
        is_dir: false,
        body_content: h,
        draggable_body: false,
        has_head: true,
        selectable_body: false,
        draggable_body: false,
        allow_context_menu: false,
        is_resizable: false,
        is_droppable: false,
        init_center: true,
        allow_native_ctxmenu: true,
        allow_user_select: true,
        width: 400,
        dominant: true,
        onAppend: function(el_window){
        },
        window_class: 'window-item-properties',
        window_css:{
            height: 'initial',
        },
        body_css: {
            padding: '10px',
            width: 'initial',
            'max-height': 'calc(100vh - 200px)',
            'background-color': 'rgba(231, 238, 245)',
            'backdrop-filter': 'blur(3px)',
            'padding-bottom': 0,
            'height': 'initial',
        }    
    });

    //check if there is a fr token available
    let stat = await puter.fs.stat(options.dir_path);
    if(stat.file_request_url !== undefined && stat.file_request_url !== null && stat.file_request_url !== ''){
        $(el_window).find('.filereq-link').html(stat.file_request_url);
    }
    // generate new fr url
    else{
        $.ajax({
            url: api_origin + "/filereq",
            type: 'POST',
            data: JSON.stringify({ 
                dir_path: options.dir_path
            }),
            async: true,
            contentType: "application/json",
            headers: {
                "Authorization": "Bearer "+auth_token
            },
            statusCode: {
                401: function (){
                    logout();
                },
            },
            success: function (filereq){
                $(el_window).find('.filereq-link').html(filereq.url);
            }
        });         
    }
}

export default UIWindowRequestFiles