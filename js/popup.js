const imageBlockBtn = document.getElementById("imageBlockBtn");
const refreshBtn = document.getElementById("refreshBtn");

const onIconImg = "/images/on-48.png";
const offIconImg = "/images/off-48.png";


//이미지 on/off 라디오 저장
chrome.storage.sync.get('isSwitchON', (e) => {
	if (e.isSwitchON) {
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
	let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

	if (obj == imageBlockBtn) {
		changeIcon(imageBlockBtn.checked);
		handleImageBlock();

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
	chrome.storage.sync.set({'isSwitchON': imageBlockBtn.checked});

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



