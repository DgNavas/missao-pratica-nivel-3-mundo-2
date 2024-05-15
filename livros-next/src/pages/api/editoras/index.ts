// Importar ControleEditora
import ControleEditora from '../../../classes/controle/ControleEditora';
import { NextApiRequest, NextApiResponse } from 'next';

// Instanciar ControleEditora
const controleEditora = new ControleEditora();

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      // Obter as editoras
      const editoras = controleEditora.getEditoras();
      // Responder com status 200 e o vetor de editoras no formato JSON
      res.status(200).json(editoras);
    } catch (error) {
      // Em caso de erro interno do servidor, responder com status 500
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Se o método da requisição não for permitido, responder com status 405
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
