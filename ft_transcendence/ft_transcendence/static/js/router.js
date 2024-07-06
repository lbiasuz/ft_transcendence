function  handleButtonHomeClick() {
  contentElement.innerHTML = ''; // Clear previous content
  const itemElement = document.createElement('h1');
  itemElement.textContent = "/HOME";
  contentElement.appendChild(itemElement);
}

function  handleButtonProfileClick() {
  contentElement.innerHTML = ''; // Clear previous content
  const itemElement = document.createElement('h1');
  itemElement.textContent = "/PROFILE";
  contentElement.appendChild(itemElement);
}

function  handleButtonTournamentsClick() {
  contentElement.innerHTML = ''; // Clear previous content
  const itemElement = document.createElement('h1');
  itemElement.textContent = "/TOURNAMENTS";
  contentElement.appendChild(itemElement);
}

function  handleButtonExitClick() {
	contentElement.innerHTML = ''; // Clear previous content
	const itemElement = document.createElement('h1');
	itemElement.textContent = "/EXIT";
	contentElement.appendChild(itemElement);
  }

function  handleButtonPlayClick() {
  contentElement.innerHTML = ''; // Clear previous content
  let itemElement = document.createElement('canvas');
  itemElement.setAttribute('id', 'canvas');
  contentElement.appendChild(itemElement);
  itemElement = document.createElement('script');
  itemElement.setAttribute('src', '../static/Pong/main.js');
  itemElement.setAttribute('type', 'module');
  contentElement.appendChild(itemElement);
}