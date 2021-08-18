// Initialize button with user's preferred color

console.log('test2');

let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});

// click event
changeColor.addEventListener('click', async () => {
   console.log('test!');
});



