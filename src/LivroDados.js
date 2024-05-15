// LivroDados.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ControleLivros from './ControleLivros';
import ControleEditora from './ControleEditora';

const LivroDados = () => {
  const controleLivro = new ControleLivros();
  const controleEditora = new ControleEditora();
  
  // Passo 2: Definir o vetor de opções para a lista de seleção (combo) de editoras
  const opcoes = controleEditora.getEditoras().map(editora => ({
    value: editora.codEditora,
    text: editora.nome
  }));
  
  // Passo 3: Definir os estados para as propriedades do livro e obter o controlador de navegação
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0].value);
  const navigate = useNavigate();
  
  // Passo 4: Implementar o método para tratar a seleção da combo de editoras e incluir um livro
  const tratarCombo = (event) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = (event) => {
    event.preventDefault();
    const livro = {
      codigo: 0,
      titulo,
      resumo,
      autores: autores.split('\n'),
      codEditora
    };
    controleLivro.incluir(livro);
    navigate('/');
  };
  
  // Passo 5: Renderizar o formulário de inclusão de livro
  return (
    <main>
      <h1>Cadastro de Livro</h1>
      <form onSubmit={incluir}>
        <div>
          <label>Título:</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div>
          <label>Resumo:</label>
          <textarea value={resumo} onChange={(e) => setResumo(e.target.value)}></textarea>
        </div>
        <div>
          <label>Autores:</label>
          <textarea value={autores} onChange={(e) => setAutores(e.target.value)}></textarea>
        </div>
        <div>
          <label>Editora:</label>
          <select value={codEditora} onChange={tratarCombo}>
            {opcoes.map(opcao => (
              <option key={opcao.value} value={opcao.value}>{opcao.text}</option>
            ))}
          </select>
        </div>
        <button type="submit">Salvar</button>
      </form>
    </main>
  );
}

export default LivroDados;
