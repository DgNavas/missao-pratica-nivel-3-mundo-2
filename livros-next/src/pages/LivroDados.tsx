// LivroDados.tsx

import React, { useState } from 'react';
import Head from 'next/head';
import Menu from '../components/Menu';
import styles from '../styles/Home.module.css';
import { ControleEditora } from '../classes/ControleEditora';

// Definir um objeto do tipo ControleEditora
const controleEditora = new ControleEditora();

// Definir a constante baseURL
const baseURL = "http://localhost:3000/api/livros";

// Criar a função incluirLivro, assíncrona, para fazer a requisição POST
const incluirLivro = async (livro: any) => {
  const response = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(livro)
  });
  return response.ok;
};

// Definir o componente LivroDados
const LivroDados: React.FC = () => {
  const [titulo, setTitulo] = useState<string>('');
  const [resumo, setResumo] = useState<string>('');
  const [autores, setAutores] = useState<string>('');
  const [codEditora, setCodEditora] = useState<number>(0);

  const [carregado, setCarregado] = useState<boolean>(false);

  const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const livro = {
      titulo,
      resumo,
      autores,
      codEditora
    };

    const sucesso = await incluirLivro(livro);
    if (sucesso) {
      setCarregado(false); // Forçar o recarregamento da página
    } else {
      console.error('Erro ao incluir livro');
    }
  };

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const codEditora = Number(event.target.value);
    setCodEditora(codEditora);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Cadastro de Livro</title>
      </Head>

      <Menu />

      <main className={styles.main}>
        <h1 className={styles.title}>Cadastro de Livro</h1>

        <form onSubmit={incluir}>
          <label>
            Título:
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </label>
          <br />
          <label>
            Resumo:
            <textarea value={resumo} onChange={(e) => setResumo(e.target.value)} />
          </label>
          <br />
          <label>
            Autores:
            <textarea value={autores} onChange={(e) => setAutores(e.target.value)} />
          </label>
          <br />
          <label>
            Editora:
            <select value={codEditora} onChange={tratarCombo}>
              {controleEditora.getEditoras().map(editora => (
                <option key={editora.codEditora} value={editora.codEditora}>{editora.nome}</option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit">Salvar</button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
