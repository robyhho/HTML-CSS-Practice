function validateEmail() {
  const email_div = document.querySelector(".email-div");
  const result_text = document.querySelector(".result-text");
  let email_input = document.getElementById("email-input").value;
  let result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_input);
  if (!result) {
    result_text.innerHTML = `Please provide a valid email`;
    let img = createErrorImg();
    email_div.appendChild(img);
  }
}

function createErrorImg() {
  var img = document.createElement("img");
  img.src = "images/icon-error.svg";
  img.className = "email-exclamation";
  return img;
}

function main() {
  const email_btn = document.querySelector(".email-btn");
  email_btn.addEventListener("click", () => {
    validateEmail();
  });
}

main();
