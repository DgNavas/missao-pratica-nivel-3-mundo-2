// LivroLista.tsx

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Menu from '../components/Menu';
import { LinhaLivro } from '../components/LinhaLivro';
import styles from '../styles/Home.module.css';
import { Livro } from '../types';

// Definir a constante baseURL
const baseURL = "http://localhost:3000/api/livros";

// Criar a função obter, assíncrona, para fazer a requisição GET
const obter = async () => {
  const response = await fetch(baseURL);
  const livros = await response.json();
  return livros;
};

// Criar a função excluirLivro, assíncrona, para fazer a requisição DELETE
const excluirLivro = async (codigo: number) => {
  const response = await fetch(`${baseURL}/${codigo}`, {
    method: 'DELETE'
  });
  return response.ok;
};

// Definir o componente LivroLista
const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState<boolean>(false);

  useEffect(() => {
    obter().then((livros) => {
      setLivros(livros);
      setCarregado(true);
    }).catch((error) => {
      console.error('Erro ao obter livros:', error);
    });
  }, []);

  const excluir = async (codigo: number) => {
    const sucesso = await excluirLivro(codigo);
    if (sucesso) {
      setCarregado(false); // Forçar o recarregamento da página
    } else {
      console.error('Erro ao excluir livro');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Livros</title>
      </Head>

      <Menu />

      <main className={styles.main}>
        <h1 className={styles.title}>Livros</h1>

        {carregado ? (
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Resumo</th>
                <th>Autores</th>
                <th>Editora</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {livros.map((livro) => (
                <LinhaLivro key={livro.codigo} livro={livro} excluir={() => excluir(livro.codigo)} />
              ))}
            </tbody>
          </table>
        ) : (
          <p>Carregando...</p>
        )}
      </main>
    </div>
  );
};

export default LivroLista;
