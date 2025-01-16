const scriptURL =
  "https://script.google.com/macros/s/AKfycbzXjIR5XkxfA6r2ZhOz_NwLqE5YW88HpjtEN0fnX90aOM8bstuhr2WgA1Cak4zM0H-1/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      console.log("Success!", response);
      msg.innerHTML = "Thanks You For Subscribing!";
      setTimeout(() => {
        msg.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});
