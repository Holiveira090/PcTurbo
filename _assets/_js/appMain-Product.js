document.addEventListener("DOMContentLoaded", function () {
  const modalCloseButton = document.getElementById("modalCloseP");
  const cadastrarProdutoButton = document.getElementById("cadastrarProduto");
  const modal = document.getElementById("modal");
  const salvarProdutoButton = document.getElementById("salvarProduto");
  const cancelButtonProduct = document.getElementById("cancelButtonProduct");
  const productListContainer = document.getElementById("product-list");

  const openModal = () => modal.classList.add("active");
  const closeModal = () => {
    modal.classList.remove("active");
    resetModalFields();
  };

  cadastrarProdutoButton.addEventListener("click", function () {
    openModal();
  });

  cancelButtonProduct.addEventListener("click", function () {
    closeModal();
  });

  modalCloseButton.addEventListener("click", function () {
    closeModal();
  });

  salvarProdutoButton.addEventListener("click", saveNewProduct);

  productListContainer.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("button") &&
      event.target.classList.contains("green")
    ) {
      const row = event.target.closest("tr");
      const id = row.dataset.id;
      const nomeProduto = row.querySelector("td:first-child").innerText;
      const descricaoProduto = row.querySelector("td:nth-child(2)").innerText;
      const estoqueProduto = row.querySelector("td:nth-child(3)").innerText;
      const localProduto = row.querySelector("td:nth-child(4)").innerText;
      const urlProduto = row.querySelector("td:nth-child(5) img").src;

      document.querySelector(".modal-form input:nth-child(1)").value =
        nomeProduto;
      document.querySelector(".modal-form input:nth-child(2)").value =
        descricaoProduto;
      document.querySelector(".modal-form input:nth-child(3)").value =
        estoqueProduto;
      document.querySelector(".modal-form input:nth-child(4)").value =
        localProduto;
      document.querySelector(".modal-form input:nth-child(5)").value =
        urlProduto;

      salvarProdutoButton.removeEventListener("click", saveNewProduct);
      salvarProdutoButton.addEventListener("click", function () {
        updateProduct(id);
      });

      openModal();
    } else if (
      event.target.classList.contains("button") &&
      event.target.classList.contains("red")
    ) {
      const row = event.target.closest("tr");
      const id = row.dataset.id;
      const nomeProduto = row.querySelector("td:first-child").innerText;
      const confirmDelete = confirm(
        `Tem certeza que deseja excluir o produto ${nomeProduto}?`
      );
      if (confirmDelete) {
        deleteProduct(id);
      }
    }
  });

  function saveNewProduct() {
    const nomeProduto = document.querySelector(
      ".modal-form input:nth-child(1)"
    ).value;
    const descricaoProduto = document.querySelector(
      ".modal-form input:nth-child(2)"
    ).value;
    const estoqueProduto = document.querySelector(
      ".modal-form input:nth-child(3)"
    ).value;
    const localProduto = document.querySelector(
      ".modal-form input:nth-child(4)"
    ).value;
    const urlProduto = document.querySelector(
      ".modal-form input:nth-child(5)"
    ).value;

    if (
      nomeProduto &&
      descricaoProduto &&
      estoqueProduto &&
      localProduto &&
      urlProduto
    ) {
      $.ajax({
        type: "POST",
        url: "../_php/productRegister.php",
        data: {
          nomeProduto: nomeProduto,
          descricaoProduto: descricaoProduto,
          estoqueProduto: estoqueProduto,
          localProduto: localProduto,
          urlProduto: urlProduto,
        },
        success: function (response) {
          console.log(response);
          location.reload(1);
        },
        error: function (xhr, status, error) {
          console.error("Erro na solicitação AJAX:", error);
          console.log("Status da requisição:", status);
          console.log("Resposta do servidor:", xhr.responseText);
        },
        complete: function () {
          closeModal();
        },
      });
    } else {
      window.alert("Por favor, preencha todos os campos.");
    }
  }

  function updateProduct(id) {
    const nomeProduto = document.querySelector(
      ".modal-form input:nth-child(1)"
    ).value;
    const descricaoProduto = document.querySelector(
      ".modal-form input:nth-child(2)"
    ).value;
    const estoqueProduto = document.querySelector(
      ".modal-form input:nth-child(3)"
    ).value;
    const localProduto = document.querySelector(
      ".modal-form input:nth-child(4)"
    ).value;
    const urlProduto = document.querySelector(
      ".modal-form input:nth-child(5)"
    ).value;

    if (
      nomeProduto &&
      descricaoProduto &&
      estoqueProduto &&
      localProduto &&
      urlProduto
    ) {
      $.ajax({
        type: "POST",
        url: `../_php/productUpdate.php?id=${id}`,
        contentType: "application/json",
        data: JSON.stringify({
          nomeProduto: nomeProduto,
          descricaoProduto: descricaoProduto,
          estoqueProduto: estoqueProduto,
          localProduto: localProduto,
          urlProduto: urlProduto,
        }),
        success: function (response) {
          console.log(response);
          resetModalFields();
          location.reload(1);
        },
        error: function (xhr, status, error) {
          console.error("Erro na solicitação AJAX:", error);
          console.log("Status da requisição:", status);
          console.log("Resposta do servidor:", xhr.responseText);
        },
        complete: function () {
          closeModal();
        },
      });
    }
  }

  function deleteProduct(id) {
    $.ajax({
      type: "GET",
      url: `../_php/productDelete.php?id=${id}`,
      success: function (response) {
        console.log(response);
        location.reload(1);
      },
      error: function (xhr, status, error) {
        console.error("Erro na solicitação AJAX:", error);
        console.log("Status da requisição:", status);
        console.log("Resposta do servidor:", xhr.responseText);
      },
    });
  }

  function loadProducts() {
    $.ajax({
      type: "GET",
      url: "../_php/productLoad.php",
      success: function (response) {
        console.log(response);
        try {
          const produtos =
            typeof response === "string" ? JSON.parse(response) : response;

          if (Array.isArray(produtos)) {
            displayProdutos(produtos);
          } else {
            console.error("A resposta não é um array de produtos:", produtos);
          }
        } catch (error) {
          console.error("Erro ao processar a resposta JSON:", error);
        }
      },
      error: function (xhr, status, error) {
        console.error("Erro na solicitação AJAX:", error);
        console.log("Status da requisição:", status);
        console.log("Resposta do servidor:", xhr.responseText);
      },
    });
  }

  function displayProdutos(produtos) {
    productListContainer.innerHTML = "";

    if (Array.isArray(produtos)) {
      if (produtos.length > 0) {
        produtos.forEach(function (produto) {
          const row = document.createElement("tr");
          row.dataset.id = produto.id;
          row.innerHTML = `
                        <td>${produto.name}</td>
                        <td>${produto.description}</td>
                        <td>${produto.stock}</td>
                        <td>${produto.source}</td>
                        <td><img src="${produto.image}" alt="Imagem do produto" style="max-width: 50px; max-height: 50px;"></td>
                        <td>
                            <button type="button" class="button green">editar</button>
                            <button type="button" class="button red">excluir</button>
                        </td>
                    `;

          productListContainer.appendChild(row);
        });
      } else {
        console.error("Nenhum produto encontrado na resposta.");
      }
    } else {
      console.error("A resposta não é um array de produtos:", produtos);
    }
  }

  function resetModalFields() {
    document.querySelector(".modal-form input:nth-child(1)").value = "";
    document.querySelector(".modal-form input:nth-child(2)").value = "";
    document.querySelector(".modal-form input:nth-child(3)").value = "";
    document.querySelector(".modal-form input:nth-child(4)").value = "";
    document.querySelector(".modal-form input:nth-child(5)").value = "";
  }

  loadProducts();
});
