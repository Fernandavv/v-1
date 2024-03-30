const products = [
    { id: 1, name: "Bolo ", category: "receitas", price: 15.99, image: "img/fr.png", ingredients: [
        { name: "Farinha", price: 2.99 },
        { name: "Açúcar", price: 1.99 },
        { name: "Cacau", price: 3.99 },
        { name: "Ovos", price: 0.99 },
        { name: "Leite", price: 1.49 },
        { name: "Fermento", price: 0.49 }
    ]},
    { id: 2, name: "Maçã", category: "frutas", price: 2.99, image: "img/fr.png" },
    { id: 3, name: "Suco de Laranja", category: "sucos", price: 4.99, image: "img/fr.png" },
    { id: 4, name: "Vegano", category: "vegano", price: 3.99, image: "img/fr.png" },
    // produtos 
];

const categoryButtons = document.querySelectorAll(".category-button");
const productCards = document.querySelector(".product-cards");
const cartItemList = document.getElementById("cartItemList");
const cartItemCount = document.getElementById("cartItemCount");
const checkoutButton = document.getElementById("checkoutButton");

const cart = [];

function updateCartCount() {
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartItemCount.textContent = totalCount;
}

function addToCart(product, ingredient) {
    // Verifica se o item já está no carrinho
    const existingItem = cart.find(item => item.product.id === product.id && item.ingredient.name === ingredient.name);

    if (existingItem) {
        // Se o item já existe, apenas aumenta a quantidade
        existingItem.quantity++;
    } else {
        // Caso contrário, adiciona o item ao carrinho com quantidade 1
        cart.push({ product, ingredient, quantity: 1 });
    }

    updateCartCount();
}

function removeFromCart(item) {
    // Reduz a quantidade do item no carrinho
    item.quantity--;

    if (item.quantity <= 0) {
        // Se a quantidade chegar a zero, remove o item do carrinho
        const index = cart.indexOf(item);
        if (index !== -1) {
            cart.splice(index, 1);
        }
    }

    updateCartCount();
}

function displayCart() {
    cartItemList.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        const row = document.createElement("tr");

        const productName = document.createElement("td");
        productName.textContent = item.ingredient.name;
        row.appendChild(productName);

        const productQuantity = document.createElement("td");
        productQuantity.textContent = item.quantity; // Exibe a quantidade
        row.appendChild(productQuantity);

        const productSubtotal = document.createElement("td");
        const subtotal = item.ingredient.price * item.quantity; // Calcula o subtotal
        productSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        row.appendChild(productSubtotal);
        totalPrice += subtotal;

        const removeButtonCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.className = "remove-button btn btn-danger btn-sm";
        removeButton.textContent = "Remover";
        removeButton.addEventListener("click", () => {
            removeFromCart(item);
            displayCart();
        });
        removeButtonCell.appendChild(removeButton);
        row.appendChild(removeButtonCell);

        cartItemList.appendChild(row);
    });

    // Adiciona linha com o total
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td colspan="2" class="text-right">Total:</td><td>$${totalPrice.toFixed(2)}</td><td></td>`;
    cartItemList.appendChild(totalRow);
}

// Função para exibir os cards com base na categoria selecionada
function filterProducts(category) {
    productCards.innerHTML = "";

    if (category === "all") {
        // Mostrar todos os produtos
        products.forEach(product => createProductCard(product));
    } else {
        // Mostrar apenas produtos da categoria selecionada
        const filteredProducts = products.filter(product => product.category === category);
        filteredProducts.forEach(product => createProductCard(product));
    }
}

// Função para criar um card de venda
function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card";

    const productImage = document.createElement("img");
    productImage.className = "product-image";
    productImage.src = product.image;
    card.appendChild(productImage);

    const productName = document.createElement("h2");
    productName.textContent = product.name;
    card.appendChild(productName);

    if (product.category !== "receitas") {
        // Se não for uma receita, exiba o botão "Comprar"
        const buyButton = document.createElement("button");
        buyButton.className = "buy-button";
        buyButton.textContent = "Comprar";
        buyButton.addEventListener("click", () => {
            addToCart(product, { name: product.name, price: product.price });
        });
        card.appendChild(buyButton);
    } else {
        // Se for uma receita, exiba um botão "Adicionar Todos os Ingredientes"
        const addIngredientsButton = document.createElement("button");
        addIngredientsButton.className = "buy-button";
        addIngredientsButton.textContent = "Adicionar Todos os Ingredientes";
        addIngredientsButton.addEventListener("click", () => {
            product.ingredients.forEach(ingredient => {
                addToCart(product, ingredient);
            });
        });
        card.appendChild(addIngredientsButton);
    }

    productCards.appendChild(card);
}

// Event listener para atualizar os produtos quando um botão de categoria é clicado
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedCategory = button.getAttribute("data-category");
        filterProducts(selectedCategory);
    });
});

// Event listener para exibir o carrinho quando o modal é mostrado
$('#cartModal').on('show.bs.modal', function () {
    displayCart();
});

// Event listener para finalizar a compra
checkoutButton.addEventListener("click", () => {
    alert("Compra finalizada! Você comprou os seguintes itens: \n" + cart.map(item => `${item.ingredient.name} (Quantidade: ${item.quantity})`).join(", "));
    cart.length = 0;
    updateCartCount();
});

// Atualiza o número no carrinho inicialmente
updateCartCount();

// Inicialmente, exiba todos os produtos
filterProducts("all");
