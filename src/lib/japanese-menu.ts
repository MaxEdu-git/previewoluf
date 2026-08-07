/**
 * Produtos da especialidade "Culinária japonesa" exibidos no pop-up da home.
 *
 * COMO EDITAR:
 * - `image`: já preenchido com as fotos enviadas. Para trocar, use outra URL.
 * - `name`: nome do produto.
 * - `price`: valor já formatado (ex.: "R$ 89,90"). Enquanto vazio, aparece
 *   "Valor a definir" no cartão.
 * - `description`: descrição curta do produto.
 *
 * Para adicionar ou remover produtos, basta acrescentar/apagar itens da lista.
 */
import foto96 from "@/assets/produto_foto_96.jpg.asset.json";
import foto103 from "@/assets/produto_foto_103.jpg.asset.json";
import foto120 from "@/assets/produto_foto_120.jpg.asset.json";
import foto133 from "@/assets/produto_foto_133.jpg.asset.json";
import foto258 from "@/assets/produto_foto_258.jpg.asset.json";

export type JapaneseProduct = {
  id: string;
  image: string;
  name: string;
  price: string;
  description: string;
};

export const JAPANESE_PRODUCTS: JapaneseProduct[] = [
  {
    id: "produto-1",
    image: foto96.url,
    name: "Combo Especial Fulô",
    price: "",
    description: "Seleção variada com os principais sabores da nossa culinária japonesa. Ideal para compartilhar.",
  },
  {
    id: "produto-2",
    image: foto103.url,
    name: "Temaki Salmão",
    price: "",
    description: "Cone crocante recheado com arroz temperado, salmão fresco e cream cheese.",
  },
  {
    id: "produto-3",
    image: foto120.url,
    name: "Hot Roll",
    price: "",
    description: "Sushi empanado e levemente crocante, servido com molho especial da casa.",
  },
  {
    id: "produto-4",
    image: foto133.url,
    name: "Sashimi Tradicional",
    price: "",
    description: "Fatias frescas de peixe selecionado, acompanhadas de wasabi e gengibre.",
  },
  {
    id: "produto-5",
    image: foto258.url,
    name: "Uramaki Califórnia",
    price: "",
    description: "Rolinho por fora do arroz com kani, manga, pepino e finalização de sementes.",
  },
];
