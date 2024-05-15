// LinhaLivro.tsx

import React from 'react';
import ControleEditora from '../classes/controle/ControleEditora';
import { Livro } from '../types';

// Iniciando com a definição de uma instância de ControleEditora
const controleEditora = new ControleEditora();

// Definir a interface LinhaLivroProps
interface LinhaLivroProps {
  livro: Livro;
  excluir: () => void;
}

// Definir o componente LinhaLivro
export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
  // Copiar o corpo da função LinhaLivro do arquivo LivroLista.js
  const { livro, excluir } = props;

  return (
    <tr>
      <td>{livro.titulo}</td>
      <td>{livro.resumo}</td>
      <td>{livro.autores}</td>
      <td>{controleEditora.getNomeEditora(livro.codEditora)}</td>
      <td>
        <button onClick={excluir}>Excluir</button>
      </td>
    </tr>
  );
};
