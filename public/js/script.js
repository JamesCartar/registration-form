const form = document.querySelector(".form");
const nameInput = document.querySelector(".name-input");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");
const btn = document.querySelector(".btn-submit");
const alertText = document.querySelector(".alert-text");
const loginLink = document.querySelector(".login");

// Form
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let name = nameInput.value;
  let email = emailInput.value;
  let password = passwordInput.value;
  try {
    await axios.post("/register", { name, email, password });
    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    loginLink.style.display = "inline";
    alertText.style.display = "inline";
    alertText.style.color = "green";
    alertText.textContent = "You have successfully register!";
  } catch (err) {
    if (err.response.data.err.name === "ValidationError") {
      let message = "Please provide ";
      const { name, email, password } = err.response.data.err.errors;
      if (name) {
        message += "name ,";
      }
      if (email) {
        message += " email ,";
      }
      if (password) {
        message += " password";
      }
      if (message.endsWith(",")) {
        message = message.slice(0, message.length - 1);
      }
      alertText.style.display = "inline";
      alertText.style.color = "red";
      alertText.textContent = message;
    } else {
      alertText.style.display = "inline";
      alertText.textContent = "User already exist !";
    }
  }
  setTimeout(() => {
    alertText.style.display = "none";
  }, 2000);
});
