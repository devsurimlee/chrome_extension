const imageBlockBtn = document.getElementById("imageBlockBtn");
const refreshBtn = document.getElementById("refreshBtn");

const onIconImg = "/images/on.png";
const offIconImg = "/images/off.png";


//이미지 on/off 라디오 저장
chrome.storage.sync.get('isSwitchOn', (e) => {
	if (e.isSwitchOn) {
		imageBlockBtn.checked = true;
	} else {
		imageBlockBtn.checked = false;
	}
	changeIcon(imageBlockBtn.checked);
	handleImageBlock();
});


//새로고침 on/off 라디오 저장
chrome.storage.sync.get('isAutoRefresh', (e) => {
	if (e.isAutoRefresh) {
		refreshBtn.checked = true;
	} else {
		refreshBtn.checked = false;
	}
});


document.addEventListener("click", async (e) => {
	await btnClickEvent(e.target);
});


async function btnClickEvent(obj) {
	const tabOption = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(tabOption);

	if (obj == imageBlockBtn) {
		changeIcon(imageBlockBtn.checked);
		handleImageBlock();

		if(tab.url.includes("chrome://") || tab.url.includes("chrome-extension://")) {
			return;
		}

		if (refreshBtn.checked) {
			chrome.scripting.executeScript({
				target: {tabId: tab.id},
				function: goRefresh,
			})
		}
	}

	if (obj == refreshBtn) {
		handleAutoRefresh(refreshBtn.checked);
	}
}

function goRefresh() {
	location.reload();
}

function changeIcon(check) {
	if (check) {
		chrome.action.setIcon({path: onIconImg});
	} else {
		chrome.action.setIcon({path: offIconImg});
	}
}

function handleImageBlock() {
	chrome.storage.sync.set({'isSwitchOn': imageBlockBtn.checked});

	if (chrome.contentSettings) {
		chrome.contentSettings["images"].set({
			primaryPattern: "<all_urls>",
			setting: imageBlockBtn.checked ? 'block' : 'allow'
		});
	}
}

function handleAutoRefresh(check) {
	chrome.storage.sync.set({'isAutoRefresh': refreshBtn.checked});
}



