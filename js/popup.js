// 사용자가 원하는 색상으로 버튼 초기화
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = green;
});

// 버튼 클릭 시, 현재 페이지에 setPageBackgroundColor 삽입
changeColor.addEventListener("click", async () => {

    // setPageBackgroundColor <-- 전체 배경화면 색 변경
    // setPageBackgroundColor() <-- popup.html의 배경화면 색이 변경됨(default_popup)
    // 무슨 차이인지 찾아보기

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    });

});

// 이 함수의 본문은 현재 페이지 내에서 콘텐츠 스크립트로 실행됩니다.
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}


