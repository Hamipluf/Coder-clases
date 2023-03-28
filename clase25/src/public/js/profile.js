const currentName = document.getElementById("first_name");
const currentLastName = document.getElementById("last_name");
const currentAge = document.getElementById("current_age");
const currentEmail = document.getElementById("current_email");
fetch("http://localhost:8080/api/sessions/current", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    currentName.innerText = `${data.data.first_name}`;
    currentLastName.innerText = `${data.data.last_name}`;
    currentEmail.innerText = `${data.data.email}`;
    currentAge.innerText = `${data.data.age || 0}`;
  });
