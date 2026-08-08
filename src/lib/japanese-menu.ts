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
    name: "Combinado Especial 14 Peças", 
    price: "R$ 79,90", 
    description: "Composição do Prato\n\n• 2 Dyo de Salmão\n• 2 Make Fulô\n• 2 Make do Chef\n• 2 Ebitem Especial\n• 2 Hot Roll\n• 2 Hot Philadelphia\n• 2 Shake Couve" 

  },
  { 
    id: "produto-2", 
    image: foto103.url, 
    name: "Dog Sushi", 
    price: "R$ 59,90", 
    description: "Saboroso hot dog oriental com recheio premium." 
  },
  { 
    id: "produto-3", 
    image: foto120.url, 
    name: "Sashimi 5 Peças de Salmao", 
    price: "R$ 39,90", 
    description: "Fatias finas e frescas de salmão de alta qualidade." 
  },
  { 
    id: "produto-4", 
    image: foto133.url, 
    name: "Combinado Hot", 
    price: "R$ 89,90", 
    description: "Mix variado de sushis quentes e crocantes." 
  },
  { 
    id: "produto-5", 
    image: foto258.url, 
    name: "Combinado individual 2", 
    price: "R$ 47,90", 
    description: "Combinado perfeito para uma refeição individual." 
  },
];