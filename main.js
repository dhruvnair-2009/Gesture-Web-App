Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_qualtiy: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/MjXB8wqkQ/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');

}

function speak() {
    var synth = window.speechSynthesis;
    speak_data = toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) { console.error(error); } else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        gesture = results[0].label;
        toSpeak = "";
        if (gesture == "scissors") {
            toSpeak = "scissors";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#9996;";
        } else if (gesture == "rock") {
            toSpeak = "rock";

            document.getElementById("result_object_gesture_icon").innerHTML = "&#9994;";
        } else if (gesture == "paper") {
            toSpeak = "paper";

            document.getElementById("result_object_gesture_icon").innerHTML = "&#9995;";
        }

        speak();
    }
}