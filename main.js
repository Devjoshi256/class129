song = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw() {
    image(video, 0, 0, 600, 500);
    
    fill("#FF0000");
    stroke("#FF00000");
    if(scoreLeftWrist > 0.2)
        {
    circle(leftwristX,leftwristY,20);
    InNumberleftWristY = Number(leftwristY);
    remove_decimals = floor(InNumberleftWristY);
    leftWristY_divide_1000 = remove_decimals/1000;
    volume = leftWristY_divide_1000 *2 ;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
        }
}

function gotPoses(results)
{
    if(results.length > 0)
        {
            console.log(results);
            scoreLeftWrist = results[0].pose.keypoints[9].score;
            console.log("scoreLeftWrist = " + scoreLeftWrist);
            
            leftwristX = results[0].pose.leftWrist.x;
            leftwristY = results[0].pose.leftWrist.y;
            console.log("left wrist X = " + leftwristX + " and left wrist Y = " + leftwristY);
            rightwristX = results[0].pose.rightwrist.x;
            rightwristY = results[0].pose.rightwrist.y;
            console.log("right wrist X = " + rightwristX + " and right wrist Y = " + rightwristY);
        }
}
function modelLoaded() {
    console.log('PoseNet Is Initialised!');
}


function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
