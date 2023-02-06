const socket = io();

// Elmentos DOM
const listProducts = document.getElementById("listporducts");
const newProduct = document.getElementById("newproduct");
const form = document.getElementById("form");
const formDelete = document.getElementById("form-delete");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`${url}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: e.target[0].value,
      description: e.target[1].value,
      code: e.target[2].value,
      price: e.target[3].value,
      status: e.target[4].checked,
      stock: e.target[5].value,
      category: e.target[6].value,
    }),
  })
    .then((res) => {
      if (res.status === 400) {
        Toastify({
          text: "Faltan campos a rellenar",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
      }
      if (res.status === 500) {
        Toastify({
          text: "No se pudo agregar el producto",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
      } else {
        Toastify({
          text: "Producto agregado correctamente",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
      }
    })
    .catch((e) => console.log("errror", e));
});
formDelete.addEventListener("submit", (e) => {
  e.preventDefault();
  const idToDelete = e.target[0].value;
  fetch(`${url}/api/products/${idToDelete}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 404) {
        Toastify({
          text: "Indique un Id a eliminar",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
      }
      if (res.status === 500) {
        Toastify({
          text: "No se pudo eliminar el producto indicado",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
      } else {
        Toastify({
          text: "Producto eliminado correctamente",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          },
        }).showToast();
      }
    })
    .catch((e) => console.log(e));
});

// Listado de productos ya guardados
socket.on("realtimeproduct.route:oldProducts", (oldProducts) => {
  oldProducts.forEach((products) => {
    const li = document.createElement("li");
    li.innerHTML = `<h1>Title: ${products.title}</h1><h2>Category: ${products.category}</h2><p>Description: ${products.description}</p><p>Code: ${products.code}</p><p>Id: ${products.id}</p><p>Price: ${products.price}</p><p>Status: ${products.status}</p><p>Stock: ${products.stock}</p><p>Image: ${products.thumbnail}</p>`;
    listProducts.appendChild(li);
  });
});

// New Product real time
socket.on("product.route:products", (products) => {
  newProduct.innerHTML += `<ul class="listado"><li><h1>Title: ${products.title}</h1><h2>Category: ${products.category}</h2><p>Description: ${products.description}</p><p>Code: ${products.code}</p><p>Id: ${products.id}</p><p>Price: ${products.price}</p><p>Status: ${products.status}</p><p>Stock: ${products.stock}</p><p>Image: ${products.thumbnail}</p></li></ul>`;
});
