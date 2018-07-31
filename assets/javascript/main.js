$(document).ready(function(){

    //Call to Firebase
    var config = {
        authDomain: "rock-paper-scissors-8ecf2.firebaseapp.com",
        databaseURL: "https://rock-paper-scissors-8ecf2.firebaseio.com",
        projectId: "rock-paper-scissors-8ecf2",
        storageBucket: "rock-paper-scissors-8ecf2.appspot.com",
        messagingSenderId: "496055855060"
      };
    firebase.initializeApp(config);

    //Global variables
    var db = firebase.database();
    var rock = "Rock";
    var paper = "Paper";
    var scissors = "Scissors";
    var message = function(){
        return $("#playerTextInput").val().trim()
    };
    var messageArr = [];
    var player1 = {
        name: "",
        wins: 0,
        losses: 0,
        exists: false,
    };
    var player2 = {
        name: "",
        wins: 0,
        losses: 0,
        exists: false,
    };
    //Firebase snapshot function
    
    //Function to assign player name entered to P1 or P2 respectively
    var getPlayerName = function(){
        var playerName = $("#playerName").val().trim();
        if (!player1.exists){
            player1.name = playerName;
            player1.exists = true;
            console.log("Player 1 is " + playerName);
        } else {
            player2.name = playerName;
            player2.exists = true;
            console.log("Player 2 is " + playerName);
        }
    }
    
    $("#playerNameSubmit").click(getPlayerName);
    
    $(".rpsChoice").click(function(){
        db.ref().set({
            pick: $(this).attr("data-pick")
        });
        console.log($(this).attr("data-pick"));
    })
    
    $("#send").click(function(){
        db.ref().on("value", function(snapshot){
            console.log("Message: " + message());
            console.log("Message array: " + messageArr);
            messageArr.push(message());
            db.ref().set({
                chat: messageArr
            })
            console.log("Snapshot of chat: " + snapshot.val().chat);
            $("#chat").text(snapshot.val().chat);
        })
})

    $("#clearArr").click(function(){
        console.log("messageArr: " + messageArr);
        messageArr = [];
        console.log("messageArr emptied: " + messageArr);
    })
    
    
    














})