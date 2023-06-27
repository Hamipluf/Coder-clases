// Elementos del DOM
const btnPremium = document.getElementById("role_premium");
const btnUser = document.getElementById("role_user");
const btnAdmin = document.getElementById("role_admin");

let premium = false;
let user = false;
let admin = false;
btnAdmin.addEventListener("click", (e) => {
  console.log(e.target.checked);
  e.target.checked ? (admin = true) : (admin = false);
});
btnUser.addEventListener("click", (e) => {
  e.target.checked ? (user = true) : (user = false);
});
btnPremium.addEventListener("click", (e) => {
  e.target.checked ? (premium = true) : (premium = false);
});
function changeRole(uid) {
  if ((admin && premium) || (admin && user) || (user && premium)) {
    Toastify({
      text: "Seleccione solo un rol",
      duration: 2000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
      },
    }).showToast();
  }
  if (admin) {
    fetch(`http://localhost:8080/api/auth/premium/${uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "admin",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "succses") {
          Toastify({
            text: data.message,
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
              background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
            },
          }).showToast();
        }
        if (data.status === "error") {
          Toastify({
            text: data.message,
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
              background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
            },
          }).showToast();
        }
      })
      .catch((err) => console.log(err));
  }
  if (premium) {
    fetch(`http://localhost:8080/api/auth/premium/${uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "premium",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.status === "succses") {
          Toastify({
            text: data.message,
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
              background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
            },
          }).showToast();
        }
        if (data.status === "error") {
          Toastify({
            text: data.message,
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
              background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
            },
          }).showToast();
        }
      })
      .catch((err) => console.log(err));
  }
  if (user) {
    fetch(`http://localhost:8080/api/auth/premium/${uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "user",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.status === "succses") {
          Toastify({
            text: data.message,
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
              background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
            },
          }).showToast();
        }
        if (data.status === "error") {
          Toastify({
            text: data.message,
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
              background: "linear-gradient(147deg, #ffc53b 0%, #FF2525 74%)",
            },
          }).showToast();
        }
      })
      .catch((err) => console.log(err));
  }
  console.log(user, premium, admin);
}
