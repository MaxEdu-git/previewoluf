/**
 * Produtos da especialidade "Culinária japonesa" exibidos no pop-up da home.
 *
 * COMO EDITAR:
 * - `image`: caminho da foto (ex.: "/produtos/sushi-1.jpg" em `public/produtos/`)
 *   ou uma URL. Deixe "" para mostrar o espaço reservado da foto.
 * - `name`: nome do produto.
 * - `price`: valor já formatado (ex.: "R$ 89,90"). Deixe "" para ocultar.
 * - `description`: descrição curta do produto.
 *
 * Para adicionar ou remover produtos, basta acrescentar/apagar itens da lista.
 */
export type JapaneseProduct = {
  id: string;
  image: string;
  name: string;
  price: string;
  description: string;
};

export const JAPANESE_PRODUCTS: JapaneseProduct[] = [
  { id: "produto-1", image: "", name: "", price: "", description: "" },
  { id: "produto-2", image: "", name: "", price: "", description: "" },
  { id: "produto-3", image: "", name: "", price: "", description: "" },
  { id: "produto-4", image: "", name: "", price: "", description: "" },
];
