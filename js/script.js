// Obtém o caminho da URL atual
var path = window.location.pathname;

// Pega o nome do arquivo da URL atual (por exemplo, "index.html" ou "about.html")
var page = path.split("/").pop();

// Remove a extensão do arquivo (por exemplo, ".html") se houver
page = page.replace(/\.[^/.]+$/, "");

// Itera pelos links do navbar para encontrar o link correspondente à página atual
var links = document.querySelectorAll('.navbar li a');
for (var i = 0; i < links.length; i++) {
  var link = links[i];
  var href = link.getAttribute('href').split("/").pop().replace(/\.[^/.]+$/, "");
  if (href === page) {
    link.classList.add('selected');
    break; // Para quando o link for encontrado
  }
}

// Adicione esta parte de código no seu arquivo JavaScript ou na seção <script> do seu HTML

window.addEventListener("scroll", function() {
  var header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 0);

  // Obtém o elemento com a ID "cartItemCount"
  var cartItemCount = document.getElementById("cartItemCount");

  // Verifica se a posição de rolagem é maior que 0
  if (window.scrollY > 0) {
    // Se a rolagem for maior que 0, defina a cor do texto para branco
    cartItemCount.style.color = "white";
  } else {
    // Caso contrário, defina a cor do texto de volta para a cor desejada (por exemplo, preta)
    cartItemCount.style.color = "black"; // Substitua "black" pela cor desejada
  }
});





document.addEventListener('DOMContentLoaded', function () {
  var botoes = document.querySelectorAll('#botoes button');

  // Adicionar um ouvinte de evento a cada botão
  botoes.forEach(function (botao) {
      botao.addEventListener('click', function () {
          var categoria = botao.getAttribute('data-categoria');
          mostrarCards(categoria);
      });
  });
});

function mostrarCards(categoria) {
  var cards = document.querySelectorAll('.card');

  cards.forEach(function (card) {
      var cardCategoria = card.getAttribute('data-categoria');
      if (categoria === 'todos' || categoria === cardCategoria) {
          card.style.display = 'block';
      } else {
          card.style.display = 'none';
      }
  });

  // Remover a classe "active" de todos os botões
  var botoes = document.querySelectorAll('#botoes button');
  botoes.forEach(function (botao) {
      botao.classList.remove('active');
  });

  // Adicionar a classe "active" ao botão selecionado
  event.target.classList.add('active');
}

// Inicialmente, mostrar todos os cards
mostrarCards('todos');

