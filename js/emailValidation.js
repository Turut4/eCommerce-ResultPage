const emailInput = document.getElementById("email-field");
const subcriptionBtn = document.getElementById("button-subbmit");
const subscriptionResult = document.getElementById("subscription-result");

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

subcriptionBtn.addEventListener("click", () => {
  subscriptionResult.innerHTML = "";
  if (isValidEmail(emailInput.value)) {
    subcriptionBtn.innerHTML = "Subscribed";
    subscriptionResult.innerHTML = `<p style="color:green; font-size:14px;">Thank you! You're subscribed!</p>`;
    emailInput.value = "";
  } else {
    subscriptionResult.innerHTML = `<p style="color:red; font-size:14px;">Please enter a valid email address.</p>`;
  }
});
