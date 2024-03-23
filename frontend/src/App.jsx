import React from "react";
import "./App.css";
import { TiWarning } from "react-icons/ti";
import Produto from "./components/Produto";
import Button from "./components/Button";

import {
  atualizarProduto,
  buscarProduto,
  buscarProdutos,
  cadastrarProduto,
  deletarProduto,
} from "./api/apiProducts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produtos: [],
      codigo: null,
      descricao: "",
      preco: null,
      type: "cadastrar",
      details: false,
      cadastro: false,
      erro: "",
      atualizar: false,
    };
  }

  componentDidMount = async () => {
    const produtos = await buscarProdutos();
    this.setState({ produtos });
  };

  buscarProdutos = async () => {
    const produtos = await buscarProdutos();
    this.setState({ produtos });
  };

  buscarProduto = async (codigo) => {
    const produto = await buscarProduto(codigo);
    this.setState({
      codigo: produto.codigo,
      descricao: produto.descricao,
      preco: Number(produto.preco),
    });
  };

  deletarProduto = async (codigo) => {
    const response = await deletarProduto(codigo);
    if (response.ok) this.buscarProdutos();
  };

  atualizarProduto = async () => {
    if (!this.state.descricao)
      return this.setState({
        erro: "Adicione uma descrição ao produto!",
      });

    if (!this.state.preco)
      return this.setState({
        erro: "Adicione um preço ao produto!",
      });

    const produto = {
      codigo: Number(this.state.codigo),
      descricao: this.state.descricao,
      preco: Number(this.state.preco),
    };

    const response = await atualizarProduto(produto);

    if (response.ok) {
      this.buscarProdutos();
      this.setState({
        type: "cadastrar",
        erro: "",
      });
    } else {
      response.json().then((erro) =>
        this.setState({
          erro: erro,
        })
      );
    }
  };

  cadastrarProduto = async () => {
    if (!this.state.descricao)
      return this.setState({
        erro: "Adicione uma descrição ao produto!",
      });

    if (!this.state.preco)
      return this.setState({
        erro: "Adicione um preço ao produto!",
      });

    const produto = {
      descricao: this.state.descricao,
      preco: Number(this.state.preco),
    };

    const response = await cadastrarProduto(produto);

    if (response.ok) {
      this.buscarProdutos();
      this.abrirCadastro("cadastrar");
    } else {
      response.json().then((erro) =>
        this.setState({
          erro: erro,
        })
      );
    }
  };

  atualizaDescricao = (e) => {
    this.setState({
      descricao: e.target.value,
    });
  };

  atualizaPreco = (e) => {
    this.setState({
      preco: e.target.value,
    });
  };

  editarProduto = (codigo) => {
    this.setState({ atualizar: !this.state.atualizar });
    this.buscarProduto(codigo);
    this.abrirCadastro("editar");
  };

  mostrarDetalhes = () => {
    this.setState({
      details: !this.state.details,
    });
  };

  abrirCadastro = (type) => {
    this.setState({
      descricao: "",
      preco: null,
      codigo: null,
      cadastro: type === "editar" ? false : !this.state.cadastro,
      type: type,
      erro: "",
    });
    if (this.state.type === "editar") {
      this.atualizarProduto();
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Lista de produtos</h1>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th colSpan={2}>Descrição</th>
              {this.state.details ? (
                <>
                  <th>Preço</th>
                  <th>Data de cadastro</th>
                </>
              ) : (
                <></>
              )}
            </tr>
          </thead>
          <tbody>
            {this.state.produtos
              .sort(
                ({ codigo: previousCodigo }, { codigo: currentCodigo }) =>
                  previousCodigo - currentCodigo
              )
              .map((produto) => (
                <Produto
                  produto={produto}
                  detalhes={this.mostrarDetalhes}
                  editar={this.editarProduto}
                  remover={this.deletarProduto}
                  details={this.state.details}
                  key={produto.codigo}
                />
              ))}
          </tbody>
        </table>
        {this.state.type === "cadastrar" ? (
          <Button
            className="cadastrar"
            text={"Novo Cadastro"}
            onClick={() => this.abrirCadastro("cadastrar")}
          />
        ) : (
          <></>
        )}

        {this.state.cadastro ? (
          <div className="cadastro">
            <input
              defaultValue={this.state.descricao}
              onChange={(e) => this.atualizaDescricao(e)}
              type="text"
              name="descricao"
              id="descricao"
              placeholder="Descrição"
            />
            <input
              defaultValue={this.state.preco}
              onChange={(e) => this.atualizaPreco(e)}
              type="number"
              name="preco"
              id="preco"
              placeholder="Preço"
            />

            <Button
              onClick={
                this.state.type === "cadastrar"
                  ? () => this.cadastrarProduto()
                  : () => this.editarProduto(this.state.codigo)
              }
              text={this.state.type === "cadastrar" ? "Cadastrar" : "Atualizar"}
            />
          </div>
        ) : (
          <></>
        )}
        {this.state.erro ? (
          <span className="erro">
            <TiWarning size={14} />
            {this.state.erro}
          </span>
        ) : (
          <></>
        )}

        {/* ============================= */}

        {this.state.atualizar ? (
          <div className="cadastro">
            <input
              defaultValue={this.state.descricao}
              onChange={(e) => this.atualizaDescricao(e)}
              type="text"
              name="descricao"
              id="descricao"
              placeholder="Descrição"
            />
            <input
              defaultValue={this.state.preco}
              onChange={(e) => this.atualizaPreco(e)}
              type="number"
              name="preco"
              id="preco"
              placeholder="Preço"
            />

            <Button
              onClick={() => this.editarProduto(this.state.codigo)}
              text={"Atualizar"}
            />
          </div>
        ) : (
          <></>
        )}
        {this.state.erro ? (
          <span className="erro">
            <TiWarning size={14} />
            {this.state.erro}
          </span>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default App;
