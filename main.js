video="";
status="";
objects = [];
function preload()
{
    video = createVideo('video.mp4');
    video.hide();
}

function setup()
{
    canvas = createCanvas(600,450);
    canvas.position(425,275);
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw()
{
    image(video, 0, 0, 600, 450);

    if (status != "")
    {
        objectDetector.detect(video, gotResult);

        for (i=0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Model Loaded";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects: " + objects.length;
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].width, objects[i].height, objects[i].x, objects[i].y);

        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded()
{
    console.log("model is loaded");
    status = true; 
    video.loop();
    video.speed(1);
    video.volume(0);
}