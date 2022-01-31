let inputs = document.querySelectorAll("#app input"),
  peopleInput = document.querySelector(".people input");
(services = document.querySelectorAll(".tip__options .option:not(.custom)")),
  (tipAmountFiled = document.querySelector(".tip-amount span:last-child")),
  (totalFiled = document.querySelector(".total span:last-child")),
  (customButton = document.querySelector(".tip__options .custom"));

inputs.forEach((input) => {
  input.addEventListener("input", (_) => {
    calculateTip();
  });
});
peopleInput.addEventListener("input", () => {
  if (peopleInput.value <= 0) {
    peopleInput.classList.add("error");
  } else {
    peopleInput.classList.remove("error");
  }
});
services.forEach((service) => {
  service.addEventListener("click", (e) => {
    services.forEach((e) => e.classList.remove("option--active"));
    customButton.classList.remove("option--active");
    e.target.classList.add("option--active");
    calculateTip();
  });
});
document.getElementById("reset").onclick = reset;
//
// The main function
function calculateTip() {
  let bill = document.querySelector(".bill input").value,
    service = document.querySelector(".tip .option--active").dataset.tip,
    people = document.querySelector(".people input").value,
    totalTip = (bill * service) / 100,
    perPerson = (totalTip / people).toFixed(2);
  tipAmountFiled.innerHTML = perPerson;
  totalFiled.innerHTML = totalTip;
}
// custom button
let customButtonInput = document.querySelector(".tip__options .custom input");
customButton.addEventListener("click", (e) => {
  services.forEach((e) => e.classList.remove("option--active"));
  customButton.classList.add("active", "option--active");
  customButtonInput.focus();
});
customButtonInput.addEventListener("input", (e) => {
  if (customButtonInput.value > 100) {
    customButtonInput.value = 100;
  }
  customButton.dataset.tip = customButtonInput.value;
});
// resetting all of the fields
function reset() {
  document.querySelector(".bill input").value = 0;
  document.querySelector(".people input").value = 1;
  services.forEach((e) => e.classList.remove("option--active"));
  document
    .querySelector(".tip .option:first-child")
    .classList.add("option--active");
  customButton.classList.remove("active");
  calculateTip();
}
calculateTip();
