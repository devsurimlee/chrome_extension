// 배경색 변경 버튼
let changeColor = document.getElementById("changeColor");
// 배경색 리셋하는 버튼
let resetColor = document.getElementById("resetColor");

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});

changeColor.addEventListener("click", async (e) => {
    await btnClickEvent('changeColor');
});

resetColor.addEventListener("click", async () => {
    await btnClickEvent('resetColor');

});

async function btnClickEvent(color) {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if(color == 'changeColor') {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setPageBackgroundColor,
        });
    }

    if(color == 'resetColor') {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: resetPageBackgroundColor,
        });
    }
}

function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}

function resetPageBackgroundColor() {
    chrome.storage.sync.get("defaultColor", ({ defaultColor }) => {
        document.body.style.backgroundColor = defaultColor;
    });
}

// setPageBackgroundColor <-- 전체 배경화면 색 변경
// setPageBackgroundColor() <-- popup.html의 배경화면 색이 변경됨(default_popup)
// 무슨 차이인지 찾아보기

