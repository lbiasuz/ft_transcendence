const data = [
  { name: "Item 1" },
  { name: "Item 2" },
  { name: "Item 3" },
];

const contentElement = document.getElementById('content');

function renderItems(items) {
  console.log(contentElement);
  contentElement.innerHTML = ''; // Clear previous content
  items.forEach(item => {
    const itemElement = document.createElement('h1');
    itemElement.textContent = item.name;
    contentElement.appendChild(itemElement);
  });
}

renderItems(data); // Render initial data
let Button = document.getElementById("home-tab2");
Button.addEventListener("click", handleButtonHomeClick);
Button = document.getElementById("profile-tab2");
Button.addEventListener("click", handleButtonProfileClick);
Button = document.getElementById("tournaments-tab2");
Button.addEventListener("click", handleButtonTournamentsClick);
Button = document.getElementById("play-tab2");
Button.addEventListener("click", handleButtonPlayClick);
Button = document.getElementById("exit-tab2");
Button.addEventListener("click", handleButtonExitClick);
