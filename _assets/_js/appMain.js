// MENU MOBILE 
const nav = document.querySelector(".nav");
const btnMenu = document.querySelector(".btn-menu");
const menu = document.querySelector(".menu");

function handleButtonClick(event) {
  if (event.type === "touchstart") event.preventDefault();
  event.stopPropagation();
  nav.classList.toggle("active");
  handleClickOutside(menu, () => {
    nav.classList.remove("active");
    setAria();
  });
  setAria();
}

function handleClickOutside(targetElement, callback) {
  const html = document.documentElement;
  function handleHTMLClick(event) {
    if (!targetElement.contains(event.target)) {
      targetElement.removeAttribute("data-target");
      html.removeEventListener("click", handleHTMLClick);
      html.removeEventListener("touchstart", handleHTMLClick);
      callback();
    }
  }
  if (!targetElement.hasAttribute("data-target")) {
    html.addEventListener("click", handleHTMLClick);
    html.addEventListener("touchstart", handleHTMLClick);
    targetElement.setAttribute("data-target", "");
  }
}

function setAria() {
  const isActive = nav.classList.contains("active");
  btnMenu.setAttribute("aria-expanded", isActive);
  if (isActive) {
    btnMenu.setAttribute("aria-label", "Fechar Menu");
  } else {
    btnMenu.setAttribute("aria-label", "Abrir Menu");
  }
}

btnMenu.addEventListener("click", handleButtonClick);
btnMenu.addEventListener("touchstart", handleButtonClick);

// CARROSSEL DE IMAGENS
var radio = document.querySelector(".manual-btn");
var cont = 1;

document.getElementById("radio1").checked = true;

setInterval(() => {
  proximaImg();
}, 5000);

function proximaImg() {
  cont++;

  if (cont > 4) {
    cont = 1;
  }

  document.getElementById("radio" + cont).checked = true;
}

// CARDS DE PRODUTOS DINAMICO
document.addEventListener("DOMContentLoaded", function () {
  const urls = ["./_assets/_php/productAutoLoad.php", "../_php/productAutoLoad.php"];

  const tryFetch = (urls) => {
    if (urls.length === 0) {
      return Promise.reject(new Error("Todas as tentativas de fetch falharam"));
    }

    const url = urls.shift();
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Erro ao buscar dados (${url}): ${response.status}`);
        }
      })
      .catch((error) => {
        console.error(error);
        return tryFetch(urls);
      });
  };

  tryFetch(urls)
    .then((data) => {
      if (data.success) {
        const container = document.getElementById("products-container");
        const produtos = data.data;

        if (Array.isArray(produtos)) {
          produtos.forEach((produto) => {
            const card = document.createElement("div");
            card.className = "card";

            const corAleatoria = getRandomColor();
            card.style.setProperty("--cor", corAleatoria);

            const caixaImg = document.createElement("div");
            caixaImg.className = "caixaImg";

            const img = document.createElement("img");
            img.src = produto.image;
            img.alt = produto.name;

            caixaImg.appendChild(img);

            const conteudo = document.createElement("div");
            conteudo.className = "conteudo";

            const h2 = document.createElement("h2");
            h2.textContent = produto.name;

            const p = document.createElement("p");
            p.textContent = produto.description;

            const a = document.createElement("a");
            a.href = "https://web.whatsapp.com";
            a.textContent = "Confira!";

            conteudo.appendChild(h2);
            conteudo.appendChild(p);
            conteudo.appendChild(a);

            card.appendChild(caixaImg);
            card.appendChild(conteudo);

            container.appendChild(card);
          });
        } else {
          console.error("Erro: Os dados não são um array.");
        }
      } else {
        console.error("Erro ao buscar dados:", data.error);
      }
    })
    .catch((error) => console.error("Erro ao buscar dados:", error));
});

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  const randomColorComponent = () =>
    Math.floor(Math.random() * (256 - 100) + 100);

  for (let i = 0; i < 3; i++) {
    color += letters[randomColorComponent() % 16];
  }

  return color;
}
