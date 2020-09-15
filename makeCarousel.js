function getCarousel(article) {
  var carousel = getCarouselTemplate();
  var carouselNum=7;
  if(article.length<7){
  carouselNum=article.length;
  }
  Logger.log(article);
  // carouselが10件未満しか対応していない
  for(var i =0 ; i<carouselNum;i++){
//  for(var i =0 ; i<article.length;i++){  
    var body = getBubbleBody();
    var footer = getBubbleFooter();
    
    body['contents'][0]['text'] = article[i][0];
    footer['contents'][0]['text']="Tags 📝:"+article[i][3];
    footer['contents'][1]['text']="Like 👍:"+article[i][2];
    footer['contents'][2]['text']="閲覧する";
    footer['contents'][2]['action']['uri']=article[i][1];
    
    var bubble = getBubbleTemplate(body,footer);
    carousel['contents']['contents'][i] = getBubbleTemplate(body,footer);
    var bubble = getBubbleTemplate(body,footer);
  }
  return carousel;
}

function test(){
//  var carousel = JSON.stringify(getCarouselTemplate());
  var carousel = getCarouselTemplate();
  Logger.log(carousel);
  Logger.log(carousel['contents']);
  var body = getBubbleBody();
  var footer = getBubbleFooter();
    Logger.log(body);
    Logger.log(footer);
}
