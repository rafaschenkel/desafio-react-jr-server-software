const buscarProdutos = async () => {
  const produtos = await fetch("http://localhost:3333")
    .then((response) => response.json())
    .then((produtos) => {
      return produtos;
    });
  return produtos;
};

const buscarProduto = async (codigo) => {
  const produto = await fetch(`http://localhost:3333/${codigo}`, {
    method: "get",
  })
    .then((response) => response.json())
    .then((produto) => {
      return produto;
    });
  return produto;
};

const deletarProduto = async (codigo) => {
  const response = await fetch(`http://localhost:3333/${codigo}`, {
    method: "delete",
  }).then((response) => {
    if (response.ok) return response;
  });
  return response;
};

const atualizarProduto = async (produto) => {
  const response = await fetch("http://localhost:3333", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  }).then((response) => {
    return response;
  });
  return response;
};

const cadastrarProduto = async (produto) => {
  const response = await fetch("http://localhost:3333", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  }).then((response) => {
    return response;
  });
  return response;
};

export {
  buscarProdutos,
  buscarProduto,
  deletarProduto,
  atualizarProduto,
  cadastrarProduto,
};
