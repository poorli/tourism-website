var add = document.getElementById('add');

add.addEventListener('click', function(){
	var sight = document.createElement('div');
	sight.innerHTML = '<input class="input-lg" type="text" name="sight" /><span class="delete">删除景点</span>';
	sight.className = "control-group";
	this.parentNode.insertBefore(sight , this);	
}, false);

var deleteList = document.getElementsByClassName("delete");

/*deleteList.addEventListener("click", function(){

})*/



for (var i = deleteList.length - 1; i >= 0; i--) {
	deleteList[i].addEventListener('click', function(num){
		return function(num){
			deleteList[num].addEventListener(, listener)
			deleteList[num].parentNode = 'innerHTML';
		}(i)
	})
}