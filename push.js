// LINEBotのACCESS TOKEN
var CHANNEL_ACCESS_TOKEN = '<自分の ACCESS TOKEN>'; 
// pushで使用するID
var USER_ID = '<自分の User ID>';

//////////  ここからText Message の処理   ////////////
function sendText(){
  var message = "最新の記事100件から"+"\n"+
  "Likeの多い10件をお届けします．"+"\n\n";
  message += getArticleText();
  sendMessage(message);
}

function sendMessage(message_text) {
  //deleteTrigger();
  var postData = {
    "to": USER_ID,
    "messages": [{
      "type": "text",
      "text": message_text,
    }]
  };

  var url = "https://api.line.me/v2/bot/message/push";
  var headers = {
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };

  var options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };
  
  var response = UrlFetchApp.fetch(url, options);
  
  var responseCode = response.getResponseCode();
  var responseBody = response.getContentText();

  if (responseCode === 200) {
    var responseJson = JSON.parse(responseBody);
    Logger.log("I could send message");
    // ...
  } else {
    Logger.log(Utilities.formatString("Request failed. Expected 200, got %d: %s", responseCode, responseBody));
    // ...
  }
}

//////////  ここからcarouselの処理   ////////////
function sendCarousel(){
  var message;
  var tags;
  var firstmessage = "最新の記事100件から"+"\n"+
  "Likeの多い7件をお届けします．";
  sendMessage(firstmessage);
  
  message = getArticle();
//  Logger.log(message);
  var carousel = getCarousel(message);
  pushCarouselMessage(carousel);
}


// carousel pattern
function pushCarouselMessage(carouselJson){
  //deleteTrigger();
  var postData = {
    "to": USER_ID,
    "messages": [carouselJson]
  };

  var url = "https://api.line.me/v2/bot/message/push";
  var headers = {
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };

  var options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(postData),
    "muteHttpExceptions": true
  };
  
  Logger.log(options);
  
  var response = UrlFetchApp.fetch(url, options);
  
  var responseCode = response.getResponseCode();
  var responseBody = response.getContentText();

  if (responseCode === 200) {
    var responseJson = JSON.parse(responseBody);
    Logger.log("I could send carousel");
    // ...
  } else {
    Logger.log(Utilities.formatString("Request failed. Expected 200, got %d: %s", responseCode, responseBody));
    // ...
  }
}