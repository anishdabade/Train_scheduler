
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyATXq_GF0_OFp61oU4LK6rGKAHYY1Xa0e8",
    authDomain: "train-ride.firebaseapp.com",
    databaseURL: "https://train-ride.firebaseio.com",
    projectId: "train-ride",
    storageBucket: "train-ride.appspot.com",
    messagingSenderId: "156862806206"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName="";
  var destination="";
  var trainTime="";
  var frequency;



  database.ref().on("child_added", function(childSnapshot) {
    trainName = childSnapshot.val().name;
    destination = childSnapshot.val().desti;
    trainTime = childSnapshot.val().time;
    frequency = childSnapshot.val().freq;

    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

  
    console.log(moment().format());

    var firstTimeConverted = moment(trainTime, "HH:mm");

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var diffTime =moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);


    var tFrequency = frequency;

    var firstTime = trainTime;

    
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    /***** To make sure the time difference is always positive ******/
    if(diffTime < 0) {
      diffTime = diffTime*(-1);
    }
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    $("#train-list > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  });  



  $("#submit-button").on("click",function() {
  	trainName = $("#train-name").val().trim();
  	destination = $("#destination").val().trim();
  	trainTime = $("#first-train").val().trim();
  	frequency = $("#frequency").val().trim();

  	database.ref().push({
  		name:trainName,
  		desti:destination,
  		time:trainTime,
  		freq:frequency
  	});

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");

  });