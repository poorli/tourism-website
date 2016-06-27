/**
 * Created by HaoBo on 2016/5/18.
 */
console.log("1");

//var xhr = new XMLHttpRequest();
//xhr.open("get", "/", true);
//xhr.send(null);
//xhr.onreadystatechange = function(){
//    if (xhr.readyState==4){
//        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
//            alert(xhr.responseText);
//        }else {
//            alert("Request was unsuccessful: " + xhr.status);
//        }
//    }
//}

var xhr = new XMLHttpRequest();
xhr.open("get", "/", false);
xhr.send(null);

if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
    //alert(xhr.responseText);
}else {
    alert("Request was unsuccessful: " + xhr.status);
}



