const onIconImg = "/images/on.png";
const offIconImg = "/images/off.png";


chrome.storage.sync.get('isSwitchON', (e) => {
	if (e.isSwitchON) {
		changeIcon(onIconImg);
	} else {
		changeIcon(offIconImg);
	}
});

function changeIcon(img) {
	chrome.action.setIcon({path: img});
}


// let isSwitchON = false
// const onIconImg = "/images/on-48.png";
// const offIconImg = "/images/off-48.png";


//아이콘 클릭 이벤트
// chrome.action.onClicked.addListener((tab) => {
// 	if (isSwitchON) {
// 		isSwitchON = false
// 		changeIcon(offIconImg);
// 	} else {
// 		isSwitchON = true
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
// 			setting: isSwitchON ? 'block' : 'allow'
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