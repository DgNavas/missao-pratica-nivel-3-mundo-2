import { NextApiRequest, NextApiResponse } from 'next';
import ControleLivros from '../../../classes/controle/ControleLivros';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Verificar o método da requisição
  if (req.method === 'GET') {
    // Tratar requisições GET
    try {
      // Instanciar o controle de livros
      const controleLivro = new ControleLivros();
      
      // Obter os livros
      const livros = await controleLivro.obterLivros();

      // Responder com status 200 e o vetor de livros no formato JSON
      res.status(200).json(livros);
    } catch (error) {
      // Em caso de erro, responder com status 500 e uma mensagem de erro
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    // Tratar requisições POST
    try {
      // Instanciar o controle de livros
      const controleLivro = new ControleLivros();
      
      // Capturar os dados do livro fornecidos no corpo da requisição
      const novoLivro = req.body;

      // Adicionar o livro ao vetor de livros
      await controleLivro.incluir(novoLivro);

      // Responder com status 200 e uma mensagem de sucesso no formato JSON
      res.status(200).json({ message: 'Livro adicionado com sucesso' });
    } catch (error) {
      // Em caso de erro, responder com status 500 e uma mensagem de erro
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Se o método não for GET nem POST, responder com status 405 (Method Not Allowed)
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
