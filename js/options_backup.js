let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
let textBox = document.getElementById('textBox');
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1", "#bfbfbf"];

// 선택한 버튼을 표시하고 선택 항목을 저장하여 버튼 클릭에 반응합니다.
function handleButtonClick(event) {
    // Remove styling from the previously selected color
    let current = event.target.parentElement.querySelector(
        `.${selectedClassName}`
    );
    if (current && current !== event.target) {
        current.classList.remove(selectedClassName);
    }

    // 버튼을 선택된 것으로 표시
    let color = event.target.dataset.color;
    event.target.classList.add(selectedClassName);
    chrome.storage.sync.set({ color });

    textBox.innerHTML = '배경색: ' + color;
}

// 제공된 각 색상에 대해 페이지에 버튼 추가

function constructOptions(buttonColors) {
    chrome.storage.sync.get("color", (data) => {
        let currentColor = data.color;
        // For each color we were provided…
        for (let buttonColor of buttonColors) {
            // …create a button with that color…
            let button = document.createElement("button");
            button.dataset.color = buttonColor;
            button.style.backgroundColor = buttonColor;

            // …mark the currently selected color…
            if (buttonColor === currentColor) {
                button.classList.add(selectedClassName);
            }

            // …and register a listener for when that button is clicked
            button.addEventListener("click", handleButtonClick);
            page.appendChild(button);

        }
    });
}

// Initialize the page by constructing the color options
constructOptions(presetButtonColors);