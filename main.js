status = "";
objects = [];
song = "";

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log('Model is loaded');
    status = true;

}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
        console.log(results);
        objects = results;
}


img="";

function preload(){
    song = loadSound("music.mp3");
}



function draw(){

    image(video, 0, 0, 380, 380);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i=0 ; i<objects.length ; i++){
            document.getElementById("status").innerHTML = "Object Detected";
            
            fill('red');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == 'person'){
                document.getElementById("baby_status").innerHTML = 'Baby found';
                song.stop();
            }
            else{
                document.getElementById("baby_status").innerHTML = 'Baby not found';
                song.play();
            }
        }
            if(objects.length <= 0){
                document.getElementById("baby_status").innerHTML = 'baby not detected';
                song.play();
            }
    }

    
}
