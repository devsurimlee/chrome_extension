const resetWhiteListBtn = document.getElementById("resetWhiteListBtn");
const saveWhiteListBtn = document.getElementById("saveWhiteListBtn");
const whiteList = document.getElementById("whiteList");

resetWhiteListBtn.addEventListener("click", resetWhiteList);
saveWhiteListBtn.addEventListener("click", handleWhiteList);


function resetWhiteList() {
	whiteList.value = '';
}

function handleWhiteList() {
	parsingDomain();
	//save domain
}

function parsingDomain() {
	const domain_pattern = /(?!w{1,}\.)(\w+\.?)([a-zA-Z]+)(\.\w+)/g;
	whiteList.value = whiteList.value.match(domain_pattern);
	whiteList.value = whiteList.value.replaceAll(',', ', ');
}