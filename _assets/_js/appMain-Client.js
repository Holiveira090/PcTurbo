// FUNÇÃO - CRUD CLIENTES
document.addEventListener("DOMContentLoaded", function () {
  const modalCloseButton = document.getElementById("modalClose");
  const cadastrarClienteButton = document.getElementById("cadastrarCliente");
  const modal = document.getElementById("modal");
  const salvarClienteButton = document.getElementById("salvarCliente");
  const cancelModalButton = document.getElementById("cancelButton");
  const clienteListContainer = document.getElementById("user-list");

  const openModal = () => modal.classList.add("active");
  const closeModal = () => {
    modal.classList.remove("active");
    resetModalFields();
  };

  cadastrarClienteButton.addEventListener("click", function () {
    openModal();
  });

  cancelModalButton.addEventListener("click", function () {
    closeModal();
  });

  modalCloseButton.addEventListener("click", function () {
    closeModal();
  });

  salvarClienteButton.addEventListener("click", saveNewClient);

  clienteListContainer.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("button") &&
      event.target.classList.contains("green")
    ) {
      const row = event.target.closest("tr");
      const id = row.dataset.id;
      const nomeCliente = row.querySelector("td:first-child").innerText;
      const emailCliente = row.querySelector("td:nth-child(2)").innerText;
      const celularCliente = row.querySelector("td:nth-child(3)").innerText;
      const cidadeCliente = row.querySelector("td:nth-child(4)").innerText;

      document.getElementById("nomeCliente").value = nomeCliente;
      document.getElementById("emailCliente").value = emailCliente;
      document.getElementById("celularCliente").value = celularCliente;
      document.getElementById("cidadeCliente").value = cidadeCliente;

      salvarClienteButton.removeEventListener("click", saveNewClient);
      salvarClienteButton.addEventListener("click", function () {
        console.log("ID do cliente:", id);
        updateClient(id);
      });

      openModal();
    } else if (
      event.target.classList.contains("button") &&
      event.target.classList.contains("red")
    ) {
      const row = event.target.closest("tr");
      const id = row.dataset.id;
      const nomeCliente = row.querySelector("td:first-child").innerText;
      const confirmDelete = confirm(
        `Tem certeza que deseja excluir o cliente ${nomeCliente}?`
      );
      if (confirmDelete) {
        deleteClient(id);
      }
    }
  });

  function saveNewClient() {
    const nomeCliente = document.getElementById("nomeCliente").value;
    const emailCliente = document.getElementById("emailCliente").value;
    const celularCliente = document.getElementById("celularCliente").value;
    const cidadeCliente = document.getElementById("cidadeCliente").value;

    if (nomeCliente && emailCliente && celularCliente && cidadeCliente) {
      $.ajax({
        type: "POST",
        url: "../_php/clientRegister.php",
        data: {
          nomeCliente: nomeCliente,
          emailCliente: emailCliente,
          celularCliente: celularCliente,
          cidadeCliente: cidadeCliente,
        },
        success: function (response) {
          try {
            const cliente = JSON.parse(response);
            displayClientes([cliente]);
            resetModalFields();
            location.reload(1);
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

      closeModal();
    } else {
      window.alert("Por favor, preencha todos os campos.");
    }
  }

  function updateClient(id) {
    const nomeCliente = document.getElementById("nomeCliente").value;
    const emailCliente = document.getElementById("emailCliente").value;
    const celularCliente = document.getElementById("celularCliente").value;
    const cidadeCliente = document.getElementById("cidadeCliente").value;

    if (nomeCliente && emailCliente && celularCliente && cidadeCliente) {
      $.ajax({
        type: "POST",
        url: `../_php/clientUpdate.php?id=${id}`,
        contentType: "application/json",
        data: JSON.stringify({
          nomeCliente: nomeCliente,
          emailCliente: emailCliente,
          celularCliente: celularCliente,
          cidadeCliente: cidadeCliente,
        }),
        success: function (response) {
          try {
            const result = JSON.parse(response);
            if (result.success) {
              resetModalFields();
              location.reload(1);
            } else {
              console.error(
                "Erro no servidor:",
                result.error || "Erro indefinido."
              );
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

      closeModal();
      resetModalFields();
    }
  }

  function deleteClient(id) {
    $.ajax({
      type: "GET",
      url: `../_php/clientDelete.php?id=${id}`,
      success: function (response) {
        location.reload(1);
      },
      error: function (xhr, status, error) {
        console.error("Erro na solicitação AJAX:", error);
        console.log("Status da requisição:", status);
        console.log("Resposta do servidor:", xhr.responseText);
      },
    });
  }

  function displayClientes(clientes) {
    clienteListContainer.innerHTML = "";

    if (Array.isArray(clientes)) {
      if (clientes.length > 0) {
        clientes.forEach(function (cliente) {
          const row = document.createElement("tr");
          row.dataset.id = cliente.id;
          row.innerHTML = `
                        <td>${cliente.nome}</td>
                        <td>${cliente.email}</td>
                        <td>${cliente.celular}</td>
                        <td>${cliente.cidade}</td>
                        <td>
                            <button type="button" class="button green">editar</button>
                            <button type="button" class="button red">excluir</button>
                        </td>
                    `;

          clienteListContainer.appendChild(row);
        });
      } else {
        console.error("Nenhum cliente encontrado na resposta.");
      }
    } else {
      console.error("A resposta não é um array de clientes:", clientes);
    }
  }

  function loadClients() {
    $.ajax({
      type: "GET",
      url: "../_php/clientLoad.php",
      success: function (response) {
        try {
          const clientes =
            typeof response === "string" ? JSON.parse(response) : response;

          if (Array.isArray(clientes)) {
            displayClientes(clientes);
          } else {
            console.error("A resposta não é um array de clientes:", clientes);
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

  function resetModalFields() {
    document.getElementById("nomeCliente").value = "";
    document.getElementById("emailCliente").value = "";
    document.getElementById("celularCliente").value = "";
    document.getElementById("cidadeCliente").value = "";
  }

  loadClients();
});
