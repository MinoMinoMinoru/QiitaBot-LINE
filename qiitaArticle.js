function test(){

  Logger.log(getArticle());
}

function getArticle() {
  // Qiita APIのURL
  var url = 'http://qiita.com/api/v2/items?page=3&per_page=100';
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  json = JSON.parse(json);
  
  //title,url,likecountの順の2次元配列
  var article =[]
  
  for(var i=0;i<json.length;i++){
    var tagtext = getTagText(json[i].tags);
    article.push([json[i].title,json[i].url,json[i].likes_count,tagtext]);
  }
  
//  likes_countの数でSort（降順）
  var result = article.sort(function(a,b){return(b[2]-a[2]);});
  return result;
}

// tagをtext化
function getTagText(tags){
  var tagtext="";
  for(var i=0;i<tags.length;i++){
    if(i==0){
      tagtext+=tags[i].name;
    }
    else{
      tagtext+="、"+tags[i].name;
    }
  }
  return tagtext;
}

// tagに対応した記事のみを返す
function getTagArticle(article,wanttag){
  var result=[];
  for(var i=0;i<article.length;i++){
    if(article[i][3].match(wanttag)){
      result.push(article[i]);
    }
  }
  return result;
}

// commandとしての認識
function getStringDiff(message) {
  var command = "#tag ";
  var result = message.replace(command,"");
  return result;
}