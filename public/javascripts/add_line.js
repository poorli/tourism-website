var addSight = document.getElementById('add');
var firstSight = document.getElementsByClassName("sight")[0];
var sightDom = firstSight.innerHTML;
var sightNum = 1;



addSight.addEventListener('click', function(){
	var sight = document.createElement('div');
	sight.innerHTML = sightDom;
	sight.className = "sight";
	this.parentNode.insertBefore(sight , this);	
}, false);

// var deleteList = document.getElementsByClassName("delete")[0];

var sightContainer = document.getElementById('line');

sightContainer.addEventListener('click', function(ev) {
	var ev =ev || window.event;
	var target = ev.target || ev.srcElement;
	var parent = target.parentNode;
	var firstChild = parent.children[0];
	console.log(target.className);
	if (target.className == "delete") {
		// console.log("delete dom");
		// alert("click");
		// console.log(firstChild);
		parent.removeChild(firstChild);
		parent.removeChild(target);
		// target.parentNode.removeNode(true);
		// target.setAttribute(style, "display:none""")
		// target.style.display == "none"
		// target.parentNode.removeChild(child) =="";
	}
})

/*deleteList.addEventListener("click", function(){

})*/



// for (var i = deleteList.length - 1; i >= 0; i--) {
// 	deleteList[i].addEventListener('click', function(num){
// 		return function(num){
// 			deleteList[num].addEventListener(, listener)
// 			deleteList[num].parentNode = 'innerHTML';
// 		}(i)
// 	})
// }