
const resetWhiteListBtn = document.getElementById("resetWhiteListBtn");
const removeWhiteListBtn = document.getElementById("removeWhiteListBtn");
const whiteList = document.getElementById("whiteList");

resetWhiteListBtn.addEventListener("click", resetWhiteList);


function resetWhiteList() {
	whiteList.value = '';

}