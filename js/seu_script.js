var carrinhoItens = [];

function adicionarAoCarrinho(receitaId, topico, nomeReceita) {
    var receita = document.getElementById(receitaId);
    var ingredientes = receita.querySelectorAll('ul li');

    ingredientes.forEach(function(ingrediente) {
        var nomeIngrediente = ingrediente.textContent;
        var itemExistente = carrinhoItens.find(item => item.nome === nomeIngrediente && item.topico === topico);

        if (itemExistente) {
            // Se o item já existe, apenas incrementa a quantidade
            itemExistente.quantidade++;
        } else {
            // Se o item não existe, adiciona ao carrinho
            carrinhoItens.push({ nome: nomeIngrediente, quantidade: 1, topico: topico, nomeReceita: nomeReceita });
        }
    });

    // Atualizar a contagem do carrinho
    var cartCount = document.getElementById('cartCount');
    cartCount.textContent = calcularQuantidadeTotal();

    // Atualizar o conteúdo do dropdown do carrinho
    atualizarDropdownCarrinho();
}

function atualizarDropdownCarrinho() {
    var carrinhoDropdown = document.getElementById('carrinhoDropdown');
    carrinhoDropdown.innerHTML = '';

    // Agrupar os itens por tópico
    var itensAgrupados = {};
    carrinhoItens.forEach(function(item) {
        if (!itensAgrupados[item.topico]) {
            itensAgrupados[item.topico] = [];
        }
        itensAgrupados[item.topico].push(item);
    });

    // Exibir os itens agrupados no dropdown
    for (var topico in itensAgrupados) {
        if (itensAgrupados.hasOwnProperty(topico)) {
            var dropdownItem = document.createElement('li');
            dropdownItem.className = 'dropdown-item dropdown-submenu';
            dropdownItem.innerHTML = `<span class="dropdown-label">${topico}</span>`;
            carrinhoDropdown.appendChild(dropdownItem);

            var subDropdownList = document.createElement('ul');
            subDropdownList.className = 'submenu-list';
            dropdownItem.appendChild(subDropdownList);

            itensAgrupados[topico].forEach(function(item, index) {
                var subDropdownItem = document.createElement('li');
                subDropdownItem.className = 'dropdown-item';
                subDropdownItem.innerHTML = `${item.nome} (${item.quantidade}) - ${item.nomeReceita} <span class="badge bg-danger" onclick="removerDoCarrinho(${index})">X</span>`;
                subDropdownList.appendChild(subDropdownItem);
            });
        }
    }

    if (carrinhoItens.length > 0) {
        var divider = document.createElement('li');
        divider.className = 'dropdown-divider';
        carrinhoDropdown.appendChild(divider);
    }

    var finalizarCompraItem = document.createElement('li');
    finalizarCompraItem.className = 'dropdown-item';
    finalizarCompraItem.innerHTML = '<a href="#" onclick="finalizarCompra()">Finalizar Compra</a>';
    carrinhoDropdown.appendChild(finalizarCompraItem);

    var limparCarrinhoItem = document.createElement('li');
    limparCarrinhoItem.className = 'dropdown-item';
    limparCarrinhoItem.innerHTML = '<a href="#" onclick="limparCarrinho()">Limpar Carrinho</a>';
    carrinhoDropdown.appendChild(limparCarrinhoItem);
}

function removerDoCarrinho(index) {
    carrinhoItens.splice(index, 1);
    atualizarDropdownCarrinho();
}

function finalizarCompra() {
    // Lógica para finalizar a compra
    alert('Compra finalizada! Itens: ' + carrinhoItens.map(item => `${item.nome} (${item.quantidade}) - ${item.nomeReceita}`).join(', '));
    limparCarrinho();
}

function limparCarrinho() {
    carrinhoItens = [];
    var cartCount = document.getElementById('cartCount');
    cartCount.textContent = 0;
    atualizarDropdownCarrinho();
}

function calcularQuantidadeTotal() {
    // Calcula a quantidade total de itens no carrinho
    return carrinhoItens.reduce((total, item) => total + item.quantidade, 0);
}
