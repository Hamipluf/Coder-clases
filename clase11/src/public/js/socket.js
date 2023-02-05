const socket = io();

// Elmentos DOM
const listProducts = document.getElementById("listporducts");
const newProduct = document.getElementById("newproduct");

// Listado de productos ya guardados
socket.on("realtimeproduct.route:oldProducts", (oldProducts) => {
  oldProducts.forEach((products) => {
    const oldProduct = document.createElement("li");
    oldProduct.innerHTML = `<h1>Title: ${products.title}</h1><h2>Category: ${products.category}</h2><p>Description: ${products.description}</p><p>Code: ${products.code}</p><p>Id: ${products.id}</p><p>Price: ${products.price}</p><p>Status: ${products.status}</p><p>Stock: ${products.stock}</p><p>Image: ${products.thumbnail}</p>`;
    listProducts.append(oldProduct);
  });
});

// New Product real time
socket.on("product.route:products", (products) => {
  newProduct.innerHTML += `<ul class="listado"><li><h1>Title: ${products.title}</h1><h2>Category: ${products.category}</h2><p>Description: ${products.description}</p><p>Code: ${products.code}</p><p>Id: ${products.id}</p><p>Price: ${products.price}</p><p>Status: ${products.status}</p><p>Stock: ${products.stock}</p><p>Image: ${products.thumbnail}</p></li></ul>`;
});
