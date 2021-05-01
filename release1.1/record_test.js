import { Primrose } from "./package/src/primrose.js";
import { grammars } from "./package/src/grammars.js";
import { themes   } from "./package/src/themes.js";
import { version  } from "./package/src/version.js";

//import { Primrose, grammars, themes } from "./package/primrose.min.js";


// The sample page records the program editing behavior. 
// The "index.js" code in Primrose was used to create this sample. 
// As connecting an online compiler from this sample may result 
// in security lapses, careful implementation is recommended in vulnerable networks.

   var your_site_url = "http://"+location.host+"/compilers/c.php";
   // The parameters should be customized to fit your online compiler.
   // This tool should be used carefully outside a localhost. 


    timer_display_text_line( Number( document.getElementById("set_timer").value )/1000 );



const editor = new Primrose({
    element: document.querySelector("canvas")
});

    editor.scaleFactor =  devicePixelRatio;
    editor.value       =  "";
    editor.language    =  grammars.get("js");
    editor.theme       =  themes.get("dark");

    var edit_buffer =  "";
    var my_stream   =  editor.canvas.captureStream();
    var my_recorder =  new MediaRecorder(my_stream, {mimeType:'video/webm;h264,opus'});

    var anchor = document.getElementById('downloadlink');

    var start           =  0;
    var remaining_time  =  0;
    var time_id         =  null;


        const playArea = document.getElementById("recorded");

    if ( document.getElementById("start_flg").value == "1"){
        record_start();
    }



my_recorder.ondataavailable = function(e) {

    document.getElementById("stop_button").disabled   =  true;
    document.getElementById("status").innerHTML       =  "stop recording";
    clear_timer();

    let videoBlob  =  new Blob([e.data], { type: e.data.type });
    let video_url  =  window.URL.createObjectURL(videoBlob);

    anchor.download  =  "movie_"+check_time()+".webm";
    anchor.href      =  video_url;
    anchor.style.display  = 'block';

    playArea.srcObject    = null;
    playArea.src          = video_url;
    playArea.controls     = true;
    playArea.playbackRate = 2;
    playArea.play();

}


document.querySelector("#play_speed").onchange = function() {
    let options = document.getElementById("play_speed").options;
    playArea.playbackRate = Number(options[options.selectedIndex].text);
}


document.querySelector("#stop_button").onclick = function() {
    record_stop();
}

document.querySelector("#start_button").onclick = function() {
    record_start();
}

function record_start(){
    document.getElementById("start_button").disabled  = true;
    document.getElementById("stop_button").disabled   = false;
    document.getElementById("status").innerHTML       = '<font color="#ff0000">Recording</font>';
    my_recorder.start();
    timer_start();
    let set_timer = document.getElementById("set_timer").value;
    setTimeout(record_stop,set_timer);

}


function record_stop(){
    document.getElementById("stop_button").disabled  = true;
    document.getElementById("status").innerHTML      = "recording stopped";
    clear_timer();
    my_recorder.stop();
}

function check_time() {
    let now   = new window.Date();
    let Year  = now.getFullYear();
    let Month = now.getMonth()+1;
    let Date  = now.getDate();
    let Hour  = now.getHours();
    let Min   = now.getMinutes();
    let Sec   = now.getSeconds();
    let msec   = now.getMilliseconds()
    return Year + "_" + Month + "_" + Date + "_" + Hour + "_" + Min + "_" + Sec+"_"+msec;
}



const loadText = (str) =>{
    editor.value = str;
};


(async function() {
    await Primrose.ready

    const loadDemo = async () => {
        const file = "./record_test.txt",
        response = await fetch(file),
        code = await response.text();

        editor.scaleFactor = devicePixelRatio;
        editor.language = grammars.get("js");
        editor.theme = themes.get("dark");
        editor.value = code;

        edit_buffer  = code;

    };

    loadDemo();

})();


document.querySelector("#edit_button").onclick = function() {
    loadText(edit_buffer);
}


document.querySelector("#execute_button").onclick = function() {

    let result  =  "";

    edit_buffer =  editor.value;
    var code    =  editor.value;
    
    code = code.replace(/&lt;/g, "<"); 
    code = code.replace(/&gt;/g, ">");

    code = encodeURIComponent(code);

    var input ="";





    var get_url= your_site_url+"?code="+code+"&input="+input;  
   // The parameters should be customized to fit your online compiler.
   // This tool should be used carefully outside a localhost. 




    let req = new XMLHttpRequest();
    req.open("GET",get_url, true);
    req.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");

    req.onreadystatechange = function(){

        if(req.readyState == 4){
            result = req.responseText;

            if( result != null ){
                loadText(result);
            }else{
//                alert("Ajax error");
                return;
            }

        }
    }
    req.send(null);

}





window.addEventListener("wheel", (evt) => {
    if (evt.ctrlKey
        && !evt.altKey
        && !evt.shiftKey
        && !evt.metaKey) {
        for (let editor of Primrose.editors) {
            if (editor.isInDocument
                && editor.focused) {
                evt.preventDefault();
                const dir = -Math.sign(evt.deltaY);
                editor.scaleFactor += dir / 4;
            }
        }
    }
}, { passive: false });




function timer_start(){
    start      = (new Date()).getTime() + Number(document.getElementById("set_timer").value);
    display_time();
}


function clear_timer(){
    clearTimeout(time_id);
}

function display_time(){

    timer_display_text();

    remaining_time  = start - (new Date()).getTime();

    if(remaining_time > 0){
        time_id = setTimeout(display_time, 1000);
    }

}

function timer_display_text(){
    let date_txt = parseInt((start - (new Date()).getTime()) / 1000);
    timer_display_text_line(date_txt);
}

function timer_display_text_line(str){
    let hour  = parseInt(  str / 3600);
    let min   = parseInt( (str / 60) % 60);
    let sec   = str % 60;
    if(hour < 10) { hour = "0" + hour; }
    if(min  < 10) { min  = "0" + min;  }
    if(sec  < 10) { sec  = "0" + sec;  }
    document.getElementById("timer").value = hour + ':' + min + ':' + sec;
}

