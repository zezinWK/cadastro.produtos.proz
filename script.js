const formProduto = document.getElementById("form_produto");
const nomeProdutoInput = document.getElementById("nomeProduto");
const descricaoProdutoInput = document.getElementById("descricaoProduto");
const quantidadeProdutoInput = document.getElementById("quantidadeProduto");
const produtosList = document.getElementById("produtosList");

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

formProduto.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const nomeProduto = nomeProdutoInput.value;
    const descricaoProduto = descricaoProdutoInput.value;
    const quantidadeProduto = quantidadeProdutoInput.value;
    const id = Date.now(); // ID único baseado no timestemp

    const novoProduto = {
        id,
        nomeProduto,
        descricaoProduto,
        quantidadeProduto
    };

    // Adiciona o novo produto ao arrai e salva no localStorage
    produtos.push(novoProduto);
    localStorage.setItem("produtos", JSON.stringify(produtos));

    // Limpar os campos do formulário e atualizar a tabela
    formProduto.reset();
    mostrarProdutos();
    Swal.fire({
        icon: "success",
        title: "Produto cadastrado com sucesso!",
        showConfirmButton: false,
        timer: 1500
    });
});

function mostrarProdutos() {
    produtosList.innerHTML = "";

    produtos.forEach(produto => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.nomeProduto}</td>
            <td>${produto.descricaoProduto}</td>
            <td>${produto.quantidadeProduto}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarProduto(${produto.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="excluirProduto(${produto.id})">Excluir</button>
            </td>
        `;
        produtosList.appendChild(tr);
    });
}

function editarProduto(id) {
    const produto = produtos.find(produto => produto.id === id);

    if (produto) {
        nomeProdutoInput.value = produto.nomeProduto;
        descricaoProdutoInput.value = produto.descricaoProduto;
        quantidadeProdutoInput.value = produto.quantidadeProduto;

        // Remove o produto da lista para poder atualizar
        produtos = produtos.filter(produto => produto.id !== id);
        localStorage.setItem("produtos", JSON.stringify(produtos));

        // Atualiza a tabela após editar
        mostrarProdutos();
    }
}

function excluirProduto(id) {
    produtos = produtos.filter(produto => produto.id !== id);
    localStorage.setItem("produtos", JSON.stringify(produtos));

    // Atualiza a tabela após excluir
    mostrarProdutos();
}

// Inicializa a tabela ao carregar a página
mostrarProdutos();

//aql bagulho de tem certeza que quer excluir

function excluirProduto(id) {
    Swal.fire({
        title: 'Tem certeza que quer excluir?',
        text: "Esta ação não pode ser desfeita!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            // Se o usuário confirmar, remove o produto
            produtos = produtos.filter(produto => produto.id !== id);
            localStorage.setItem("produtos", JSON.stringify(produtos));

            // Atualiza a tabela após excluir
            mostrarProdutos();

            Swal.fire({
                icon: 'success',
                title: 'Produto excluído com sucesso!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}

