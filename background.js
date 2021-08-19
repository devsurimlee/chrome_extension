let green = '#3aa757';
let white = '#ffffff';

chrome.runtime.onInstalled.addListener( () => {
    chrome.storage.sync.set({ green });
    chrome.storage.sync.set({ white });
    console.log('background:: color is ' + green);

});