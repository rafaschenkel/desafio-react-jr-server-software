import { CgDetailsMore } from "react-icons/cg";
import { TiDelete, TiEdit } from "react-icons/ti";

const Produto = ({ produto, detalhes, editar, remover, details }) => {
  return (
    <tr key={produto.codigo} className="produto">
      <td className="codigo">{produto.codigo}</td>
      <td colSpan={2}>{produto.descricao}</td>
      {details ? (
        <>
          <td>
            {Number(produto.preco).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </td>
          <td>{produto.data_cadastro.substring(0, 10)}</td>
        </>
      ) : (
        <></>
      )}
      <td className="buttons">
        <button onClick={detalhes} className="detalhes">
          <CgDetailsMore size={18} />
          Detalhes
        </button>
        <button onClick={() => editar(produto.codigo)} className="editar">
          <TiEdit size={18} />
          Editar
        </button>
        <button onClick={() => remover(produto.codigo)} className="remover">
          <TiDelete size={18} />
          Remover
        </button>
      </td>
    </tr>
  );
};

export default Produto;
