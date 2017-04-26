//links
//http://eloquentjavascript.net/09_regexp.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
//meSpeak.loadConfig("mespeak_config.json");
//meSpeak.loadVoice('en-us.json');
nlp = window.nlp_compromise;
var hi = ['hi','howdy','hello','hey'];

var initial = true;
var question_one = false;
var question_two = false;
var question_three = true;
var question_four = true;
var question_five = true;
var qone = 0;
var qtwo = 0;
var qthree = 0;
var qfour = 0;
var qfive = 0;
var qsix = 0;
var qsum = 0;
var 
  messages = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'Orbit', //name of the chatbot
  talking = true; //when false the speach function doesn't work
//
//
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//edit this function to change what the chatbot says


function chatbotResponse() {
 
  talking = true;
  //botMessage = "I don't get it"; //the default message

  if (lastUserMessage === 'hello' && initial === true)  {
  botMessage = 'Hello there! My name is ' + botName + '. Would you like to start the pre-diabetes screener?';
  } else if (lastUserMessage === 'yes' && initial === true) {
  botMessage = 'Okay! Lets begin. First of all, are you a woman who has had a baby weighing more than nine pounds at birth?';
    initial = false;
    question_one = true;
  } else if (lastUserMessage === 'no' && initial === true) {
  botMessage = 'Oh, I am sorry, thats all I know how to do';
    initial = true;
  }
  // initial
  else if (lastUserMessage === 'yes' && question_one === true) {
  botMessage = 'OK. Next question, do you have a sister or brother with diabetes?';
    qone = 1;
    console.log(qone)
    question_one = false;
    question_two = true;
  } else if (lastUserMessage === 'no' && question_one === true) {
  botMessage = 'OK. Next question, do you have a sister or brother with diabetes?';
    qone = 0;
    console.log(qone)
    question_one = false;
    question_two = true;
  }
  // question_one
  else if (lastUserMessage === 'yes' && question_two === true) {
  botMessage = 'Alright. Do you have a parent with diabetes?';
    qtwo = 1;
    console.log(qtwo)
    question_two = false;
    question_three = true;
  }else if (lastUserMessage === 'no' && question_two === true) {
  botMessage = 'Alright. Do you have a parent with diabetes?';
    qtwo = 0;
    console.log(qtwo)
    question_two = false;
    question_three = true;
  }
  // question two
  else if (lastUserMessage === 'yes' && question_three === true) {
  botMessage = 'OK. Almost done, are you younger than 65 years of age?';
    qthree = 1;
    console.log(qthree)
    question_three = false;
    question_four = true;
  }else if (lastUserMessage === 'no' && question_three === true) {
  botMessage = 'OK. Almost done, are you younger than 65 years of age?';
    qthree = 0;
    console.log(qthree)
    question_three = false;
    question_four = true;
  }
  // question three
  else if (lastUserMessage === 'yes' && question_four === true) {
  botMessage = 'Do you get little or no exercise in a typical day?';
    qfour = 1;
    console.log(qfour)
    question_four = false;
    question_five = true;
  } else if (lastUserMessage === 'no' && question_four === true) {
  botMessage = 'Do you get little or no exercise in a typical day?';
    qfour = 9;
    console.log(qfour)
    question_four = false;
    question_five = true;
  }
  //question four
   else if (lastUserMessage === 'yes' && question_five === true) {
  botMessage = 'OK, all done! Would you like to know your score?';
    qfive = 5;
    console.log(qfive)
    question_five = false;
    question_six = true;
  } else if (lastUserMessage === 'no' && question_five === true) {
  botMessage = 'OK, all done! Would you like to know your score?';
    qfive = 0;
    console.log(qfive)
    question_five = false;
    question_six = true;
  } 
    //question five
  else if (lastUserMessage === 'yes' && question_six === true) {
    qsum = qone + qtwo + qthree + qfour + qfive;
    console.log(qsum)
  botMessage = 'Great! you score is ' + qsum;
    question_six = false;
    initial = true;
  } else if (lastUserMessage === 'no' && question_six === true) {
  botMessage = 'Oh, so you are immortal. I guess you probably dont have diabetes';
    question_six = false;
    initial = true;
  } 
  // question six
  else if (lastUserMessage === 'quit') {
  botMessage = 'You have stopped the survey!';
  initial = true;
  } 
  // quit
  else {
    botMessage = "I don't get it";
  }

  //fin
  
 
}
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//
//
//
//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry() {
  //if the message from the user isn't empty then run 
  if (document.getElementById("chatbox").value != "") {
    //pulls the value from the chatbox ands sets it to lastUserMessage
    lastUserMessage = document.getElementById("chatbox").value;
    //sets the chat box to be clear
    document.getElementById("chatbox").value = "";
    //adds the value of the chatbox to the array messages
    messages.push(lastUserMessage);
    //Speech(lastUserMessage);  //says what the user typed outloud
    //sets the variable botMessage in response to lastUserMessage
    chatbotResponse();
    //add the chatbot's name and message to the array messages
    messages.push("<b>" + botName + ":</b> " + botMessage);
    // says the message using the text to speech function written below
    Speech(botMessage);
    //outputs the last few array elements of messages to html
    for (var i = 1; i < 8; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}

//text to Speech
//https:developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
speechSynthesis.getVoices().forEach(function(voice) {
  console.log(voice.name, voice.default ? voice.default :'');
});

function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    var utterance = new SpeechSynthesisUtterance(say);
 //msg.voice = voices[10]; //Note: some voices don't support altering params
// msg.voiceURI = 'native';
  //  utterance.volume = 1; // 0 to 1
    utterance.rate = .9; // 0.1 to 10
    utterance.pitch = 1.2; //0 to 2
  //  utterance.text = 'Hello World';
  //  utterance.lang = 'en-US';
    utterance.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Daniel'; })[0];
    speechSynthesis.speak(utterance);
  }
}

//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    newEntry();
  }
  if (key == 38) {
    console.log('hi')
     // document.getElementById("chatbox").value = lastUserMessage;
  }
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}