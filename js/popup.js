let onImageBlockBtn = document.getElementById("onImageBlockBtn");
let offImageBlockBtn = document.getElementById("offImageBlockBtn");

let onRefreshBtn = document.getElementById("onRefreshBtn");
let offRefreshBtn = document.getElementById("offRefreshBtn");

let isSwitchON = false;

const onIconImg = "/images/on-48.png";
const offIconImg = "/images/off-48.png";

//이미지 on/off 라디오 저장
chrome.storage.sync.get('isSwitchON', (e)=> {
	if(e.isSwitchON) {
		onImageBlockBtn.checked = true;
		changeIcon(onImageBlockBtn);
		handleImageBlock(onImageBlockBtn);
	} else {
		offImageBlockBtn.checked = true;
		changeIcon(offImageBlockBtn);
		handleImageBlock(offImageBlockBtn);
	}
});


document.addEventListener("click", async (e) => {
	await btnClickEvent(e.target);
});

async function btnClickEvent(obj) {
	let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

	changeIcon(obj);
	handleImageBlock(obj);

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
