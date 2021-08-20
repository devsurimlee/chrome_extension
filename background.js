//기본색 (초록)
let color = '#3aa757';
// 배경 리셋용 색상(흰색)
let defaultColor = '#ffffff';

//색상 코드 세팅
chrome.runtime.onInstalled.addListener( () => {
    chrome.storage.sync.set({ color });
    chrome.storage.sync.set({ defaultColor });
});