let buttonsArray = document.querySelectorAll(".drum");

function handleClick() {
  alert("i got clicked");
}

for (let i = 0; i < buttonsArray.length; i++ ) {
  buttonsArray[i].addEventListener("click", handleClick);
}

console.log(buttonsArray);
