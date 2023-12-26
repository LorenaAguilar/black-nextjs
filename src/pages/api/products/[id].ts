import { NextApiRequest, NextApiResponse } from "next";
import products from "../../../../database.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  //É possível acessar o id da seguinte forma: (podemos acessar qualquer parâmetro da rota dessa forma)
  const { id } = req.query;

  const product = products.find((prod) => prod.id === Number(id));
  res.status(200).json(product);
}
