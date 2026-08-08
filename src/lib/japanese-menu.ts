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
import foto123 from "@/assets/produto_foto_123.jpg.asset.json";
import foto108 from "@/assets/produto_foto_108.jpg.asset.json";
import foto115 from "@/assets/produto_foto_115.jpg.asset.json";
import foto257 from "@/assets/produto_foto_257.jpg.asset.json";
import foto102 from "@/assets/produto_foto_102.jpg.asset.json";

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
    description: "Composição do Prato\n\n• Hot Roll de Salmão Grelhado\n• Camarão\n• Cream Cheese\n• Crispys de Batata-Doce\n• Cebolinha" 
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
    description: "Composição do Prato\n\n• 4 Hot Roll\n• 4 Hot Maracujá\n• 4 Hot Salmão com Geleia de Pimenta\n• 4 Hot Batata Crispy\n• 4 Shake Couve" 
  },
  { 
    id: "produto-5", 
    image: foto258.url, 
    name: "Combinado Individual 2", 
    price: "R$ 47,90", 
    description: "Composição do Prato:\n\n• 1 Temaki Philadelphia\n• 4 Uramaki" 
  },
  {
    id: "produto-6",
    image: foto123.url,
    name: "Temaki Hot Shake EBI",
    price: "R$ 44,90",
    description: "Composição do Prato:\n\n• Salmão Grelhado\n• Cream Cheese\n• Cebolinha\n• Massa Harumaki",
  },
  {
    id: "produto-7",
    image: foto108.url,
    name: "Dyo de Salmão",
    price: "R$ 27,90",
    description: "Composição do Prato:\n\n• Arroz envolto com Tartar de Salmão\n• Cebolinha\n• Pimenta\n• Gergelim Torrado",
  },
  {
    id: "produto-8",
    image: foto115.url,
    name: "Make Fulô",
    price: "R$ 44,90",
    description: "Composição do Prato\n\n• Arroz envolto com Salmão\n• Cream Cheese\n• Camarão\n• Maçaricado\n• Geleia de Frutas Vermelhas\n• Molho Teriyaki",
  },
  {
    id: "produto-9",
    image: foto257.url,
    name: "Combinado Individual 1",
    price: "R$ 54,90",
    description: "Composição do Prato\n\n• 1 Hot Temaki de Salmão Grelhado\n• 5 Hot Roll",
  },
  {
    id: "produto-10",
    image: foto102.url,
    name: "Sugestão Hot",
    price: "R$ 89,90",
    description: "Composição do Prato:\n\n• 2 Mini Temakis de Salmão com Cream Cheese\n• 4 Uramaki Hot\n• 4 Hot Shake Couve\n• 4 Hot Philadelphia",
  },
];