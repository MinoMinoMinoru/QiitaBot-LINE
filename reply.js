// LINE developersのメッセージ送受信設定に記載のアクセストークン
var ACCESS_TOKEN = '<自分のaccess token>';

function doPost(e) {
  // Webhookで受信した応答用Token
  var replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
  // ユーザーのメッセージを取得
  var userMessage = JSON.parse(e.postData.contents).events[0].message.text;
  // 応答メッセージ用のAPI URL
  var url = 'https://api.line.me/v2/bot/message/reply';
  // 特定のWord
  var replyMessage = "I got message that I could not Reply";
  if(userMessage.match(/Article/) || userMessage.match(/article/)){
    replyMessage="最新の記事100件から"+"\n"+
                  "Likeの多い7件をお届けします．";
                  
    var article = getArticle();
    var carousel = getCarousel(article);
    
    var message = getReplyCarousel(replyMessage,carousel);
  }
  // tagで検索したい
  else if(userMessage.match(/#tag /)){
    var article = getArticle();
    var wanttag = getStringDiff(userMessage);
    
    if(wanttag==""){
      replyMessage="#tagの後に検索したいtagを入力して下さい．"
      var message = getReplyMessage(replyMessage);
    }
    else{
      // tagのwordを抽出
      var wantarticle = getTagArticle(article,wanttag);
      // そのTagを含んだ記事があるかCheck
      if(wantarticle.length!=0){
        replyMessage="最新の100件からTag["+wanttag+"]を含む記事をお届けします．"
        var carousel = getCarousel(wantarticle);
        var message = getReplyCarousel(replyMessage,carousel);
      }
      else{
        replyMessage="最新の100件にTag["+wanttag+"]を含む記事はありませでした．"
        var message = getReplyMessage(replyMessage);
      }
    }
    
  }
  // どのパターンにもかからない時
  else{
    replyMessage = "I got message that I could not Reply";
    var message = getReplyMessage(replyMessage);
  }
  // Send Json to LINE Server
  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': message
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

function getReplyMessage(replyMessage){
  var message = [
    {
      'type': 'text',
      'text': replyMessage
    }
  ]
  return message;
}

function getReplyCarousel(replyMessage,carousel){
  var message = [
    {
        'type': 'text',
        'text': replyMessage
     },
     carousel
   ]
  return message;
}