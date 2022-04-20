const onIconImg = "/images/on.png";
const offIconImg = "/images/off.png";


chrome.storage.sync.get('isSwitchOn', (e) => {
	if (e.isSwitchOn) {
		changeIcon(onIconImg);
	} else {
		changeIcon(offIconImg);
	}
});

//새탭열기 & 새로고침 & url 이동 등
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	chrome.storage.sync.get('isSwitchOn', (e) => {
		if (e.isSwitchOn) {
			chrome.storage.sync.get("whiteList", (e) => {
				if (e.whiteList != 'undefined' && tab.status == 'loading' && isCorrectUrl(tab.url)) {
					let whiteListArr = e.whiteList.split(',');
					for (let i = 0; i < whiteListArr.length; i++) {
						if (tab.url.includes(whiteListArr[i].trim())) {
							//화이트리스트에 있음
							if (chrome.contentSettings) {
								chrome.contentSettings["images"].set({
									primaryPattern: "<all_urls>",
									setting: 'allow'
								});
								changeIcon(offIconImg);
								return;
							}
						}
						//화이트리스트에 없음
						if (chrome.contentSettings) {
							chrome.contentSettings["images"].set({
								primaryPattern: "<all_urls>",
								setting: 'block'
							});
							changeIcon(onIconImg);
						}
					}
				}
			});

		}
	});
});

//탭 활성화 이벤트
chrome.tabs.onActivated.addListener(async activeInfo => {
	const tabOption = {active: true, currentWindow: true};
	let [tab] = await chrome.tabs.query(tabOption);

	chrome.storage.sync.get('isSwitchOn', (e) => {
		if (e.isSwitchOn) {
			chrome.storage.sync.get("whiteList", (e) => {
				if (e.whiteList != 'undefined') {
					let whiteListArr = e.whiteList.split(',');
					for (let i = 0; i < whiteListArr.length; i++) {
						//화이트리스트에 있음
						if (tab.url.includes(whiteListArr[i].trim())) {
							if (chrome.contentSettings) {
								chrome.contentSettings["images"].set({
									primaryPattern: "<all_urls>",
									setting: 'allow'
								});
								changeIcon(offIconImg);
								return;
							}
						}
						//화이트리스트에 없음
						if (chrome.contentSettings) {
							chrome.contentSettings["images"].set({
								primaryPattern: "<all_urls>",
								setting: 'block'
							});
							changeIcon(onIconImg);
						}
					}
				}
			});

		}
	});
});


function isCorrectUrl(url) {
	if (!url.includes("chrome://") && !url.includes("chrome-extension://")) {
		return true;
	} else {
		return false;
	}
}

function changeIcon(img) {
	chrome.action.setIcon({path: img});
}


//////////////////////////////////
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => handleCreateTab());
// chrome.tabs.onActivated.addListener(activeInfo => handleMoveTab());
//
//
// async function handleCreateTab() {
// 	const tabOption = {active: true, currentWindow: true};
// 	let [tab] = await chrome.tabs.query(tabOption);
// 	getTabUrl(tab);
// }
//
// async function handleMoveTab() {
// 	const tabOption = {active: true, currentWindow: true};
// 	let [tab] = await chrome.tabs.query(tabOption);
// 	getTabUrl(tab);
// }
//
// function getTabUrl(tab) {
// 	if (tab.status == 'loading' && !tab.url.includes("chrome://") && !tab.url.includes("chrome-extension://")) {
// 		let url = tab.url;
// 		chrome.storage.sync.get("whiteList", (e) => {
// 			if (e.whiteList.length > 0) {
// 				let whiteListArr = e.whiteList.split(',');
// 				for (let i = 0; i < whiteListArr.length; i++) {
// 					if (url.includes(whiteListArr[i].trim())) {
// 						if (chrome.contentSettings) {
// 							chrome.contentSettings["images"].set({
// 								primaryPattern: "<all_urls>",
// 								setting: 'allow'
// 							});
// 						}
// 						chrome.action.setIcon({path: offIconImg});
// 						return;
// 					}
// 				}
// 				chrome.action.setIcon({path: onIconImg});
// 			}
// 		});
// 	}
// }

// let isSwitchOn = false
// const onIconImg = "/images/on-48.png";
// const offIconImg = "/images/off-48.png";


//아이콘 클릭 이벤트
// chrome.action.onClicked.addListener((tab) => {
// 	if (isSwitchOn) {
// 		isSwitchOn = false
// 		changeIcon(offIconImg);
// 	} else {
// 		isSwitchOn = true
// 		changeIcon(onIconImg);
// 	}
// 	handleImage();
// });
//
//
// function changeIcon(img) {
// 	chrome.action.setIcon({path: img});
// }
//
// function handleImage() {
// 	if (chrome.contentSettings) {
// 		chrome.contentSettings["images"].set({
// 			primaryPattern: "<all_urls>",
// 			setting: isSwitchOn ? 'block' : 'allow'
// 		});
// 	}
// }


////////////////////////////////////////////////
// 예제
//
// //기본색 (초록)
// let color = '#3aa757';
// // 배경 리셋용 색상(흰색)
// let defaultColor = '#ffffff';
//
// //색상 코드 세팅
// chrome.runtime.onInstalled.addListener( () => {
//     chrome.storage.sync.set({ color });
//     chrome.storage.sync.set({ defaultColor });
// });