function getCarouselTemplate() {
  var carouseltemplate = {
        "type": "flex",
        "altText": "Flex Message",
        "contents": {
            "type": "carousel",
            "contents": [
            ]
        }
   }
  return carouseltemplate;
}

function getBubbleTemplate(bubblebody,bublefooter){
  var bubbletemplate = {
        "type": "bubble",
        "body": bubblebody,
        "footer": bublefooter
   }
  return bubbletemplate;
}

function getBubbleBody(){
  var bubblebody = {
        "type": "box",
        "layout": "vertical",
        "contents": [
            {
                "type": "text",
                "text": "Title",
                "wrap": true,
                "weight": "bold"
            }
        ]
    }
  return bubblebody;
}

function getBubbleFooter(){
  var bubblefooter = {
        "type": "box",
        "layout": "vertical",
        "flex": 0,
        "spacing": "sm",
        "contents": [
            {
          "type": "text",
          "text": "Tags:Azure,WAF,セキュリティ,Firewall,ApplicationGateway",
          "wrap": true
            },
            {
                "type": "text",
                "text": "LIKE:100"
            },
            {
          "type": "text",
          "text": "URL:~~~~~~~~~",
          "size": "xl",
          "align": "center",
          "weight": "bold",
          "color": "#6B0C64",
          "action": {
            "type": "uri",
            "uri": "https://www.youtube.com/?hl=ja&gl=JP"
          }
        }
        ]
    }
   return bubblefooter;
}