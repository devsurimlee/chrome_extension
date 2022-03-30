
let isSwitchON = true
const onIconImg = "/images/on.png";
const offIconImg = "/images/off.png";



//아이콘 클릭 이벤트
chrome.action.onClicked.addListener((tab) => {
	if(isSwitchON) {
		isSwitchON = false
		chrome.action.setIcon({path: offIconImg});

	} else {
		isSwitchON = true
		chrome.action.setIcon({path: onIconImg});
	}
});






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