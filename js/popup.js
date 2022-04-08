let onImageBlockBtn = document.getElementById("onImageBlockBtn");
let offImageBlockBtn = document.getElementById("offImageBlockBtn");

let onRefreshBtn = document.getElementById("onRefreshBtn");
let offRefreshBtn = document.getElementById("offRefreshBtn");

let isSwitchON = false;
let isAutoRefresh = false;

const onIconImg = "/images/on-48.png";
const offIconImg = "/images/off-48.png";

//이미지 on/off 라디오 저장
chrome.storage.sync.get('isSwitchON', (e) => {
	if (e.isSwitchON) {
		onImageBlockBtn.checked = true;
		isSwitchON = true
		changeIcon(onImageBlockBtn);
		handleImageBlock(onImageBlockBtn);
	} else {
		offImageBlockBtn.checked = true;
		isSwitchON = false;
		changeIcon(offImageBlockBtn);
		handleImageBlock(offImageBlockBtn);
	}
});


//새로고침 on/off 라디오 저장
chrome.storage.sync.get('isAutoRefresh', (e) => {
	if (e.isAutoRefresh) {
		onRefreshBtn.checked = true;
		isAutoRefresh = true;
	} else {
		offRefreshBtn.checked = true;
		isAutoRefresh = false;
	}
});


document.addEventListener("click", async (e) => {
	await btnClickEvent(e.target);
});

async function btnClickEvent(obj) {
	let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

	if (obj == onImageBlockBtn || obj == offImageBlockBtn) {
		changeIcon(obj);
		handleImageBlock(obj);

		if(isAutoRefresh) {
			chrome.scripting.executeScript({
				target: {tabId: tab.id},
				function : goRefresh,
			})
		}
	}

	if (obj == onRefreshBtn || obj == offRefreshBtn) {
		handleAutoRefresh(obj);
	}
}
function goRefresh() {
	location.reload();
}

function changeIcon(obj) {
	if (obj == onImageBlockBtn) {
		chrome.action.setIcon({path: onIconImg});
	} else if (obj == offImageBlockBtn) {
		chrome.action.setIcon({path: offIconImg});
	}
}

function handleImageBlock(obj) {

	if (obj == onImageBlockBtn) {
		isSwitchON = true;
	} else if (obj == offImageBlockBtn) {
		isSwitchON = false;
	}
	chrome.storage.sync.set({isSwitchON});

	if (chrome.contentSettings) {
		chrome.contentSettings["images"].set({
			primaryPattern: "<all_urls>",
			setting: isSwitchON ? 'block' : 'allow'
		});
	}
}

function handleAutoRefresh(obj) {
	if (obj == onRefreshBtn) {
		isAutoRefresh = true;
	} else if (obj == offRefreshBtn) {
		isAutoRefresh = false;
	}
	chrome.storage.sync.set({isAutoRefresh});
}
