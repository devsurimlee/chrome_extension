const resetWhiteListBtn = document.getElementById("resetWhiteListBtn");
const saveWhiteListBtn = document.getElementById("saveWhiteListBtn");
const whiteList = document.getElementById("whiteList");

saveWhiteListBtn.addEventListener("click", handleWhiteList);
resetWhiteListBtn.addEventListener("click", resetWhiteList);
loadWhiteList();


function resetWhiteList() {
	whiteList.value = '';
}

function handleWhiteList() {
	parsingDomain();
	saveWhiteList();
}

function parsingDomain() {
	const domain_pattern = /(?!w{1,}\.)(\w+\.?)([a-zA-Z]+)(\.\w+)/g;
	whiteList.value = whiteList.value.match(domain_pattern);
	whiteList.value = whiteList.value.replaceAll(',', ', ');
}

function saveWhiteList() {
	chrome.storage.sync.set({"whiteList": whiteList.value});
}

function loadWhiteList() {
	chrome.storage.sync.get("whiteList", (e) => {
		whiteList.value = e.whiteList;
	});
}