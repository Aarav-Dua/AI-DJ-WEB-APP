song1 = "";
song2 = "";
leftWristY = 0;
leftWristX = 0;
rightWristY = 0;
rightWristX = 0;
song1_status = "";
song2_status = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("Avengers Theme Kazoo Orchestra.mp3")
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('poseNet Is Initialized');
}

function gotPoses(results){
    if(results.length > 0 )
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log( "scoreRightWrist = "+scoreRightWrist+" scoreLeftWrist = "+ scoreLeftWrist);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);

    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#4BB3FD");
    stroke("#4BB3FD");

    if(scoreRightWrist > 0.2){

    song2.stop();
    circle(rightWristX, rightWristY, 20);

    if(song1_status == false){
        song1.play();
        document.getElementById("song").innerHTML = "Playing - Harry Potter Theme - KZ Remix";
    }
    }
    
    if(scoreLeftWrist > 0.2){

        song1.stop();

    circle(leftWristX, leftWristY, 20);

    if (song2_status == false){
        song2.play();
        document.getElementById("song").innerHTML = "Playing - Avengers Kazoo Theme"
    }
}
 }

function playbutton(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}