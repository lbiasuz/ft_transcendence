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

function  handleButtonPlayClick() {
  contentElement.innerHTML = ''; // Clear previous content
  const itemElement = document.createElement('h1');
  itemElement.textContent = "/PLAY";
  contentElement.appendChild(itemElement);
}
