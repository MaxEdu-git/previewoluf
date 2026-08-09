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
import foto117 from "@/assets/produto_foto_117.jpg.asset.json";
import foto114 from "@/assets/produto_foto_114.jpg.asset.json";
import foto99 from "@/assets/produto_foto_99.jpg.asset.json";
import foto100 from "@/assets/produto_foto_100.jpg.asset.json";
import foto260 from "@/assets/produto_foto_260.jpg.asset.json";
import foto129 from "@/assets/produto_foto_129.jpg.asset.json";
import foto98 from "@/assets/produto_foto_98.jpg.asset.json";
import foto131 from "@/assets/produto_foto_131.jpg.asset.json";
import foto110 from "@/assets/produto_foto_110.jpg.asset.json";
import foto119 from "@/assets/produto_foto_119.jpg.asset.json";
import foto113 from "@/assets/produto_foto_113.jpg.asset.json";
import foto112 from "@/assets/produto_foto_112.jpg.asset.json";
import foto259 from "@/assets/produto_foto_259.jpg.asset.json";
import foto93 from "@/assets/produto_foto_93.jpg.asset.json";
import foto124 from "@/assets/produto_foto_124.jpg.asset.json";

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
    name: "Combinado Especial ", 
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
    name: "Sashimi de Salmão", 
    price: "R$ 39,90", 
    description: "Composição do Prato\n\n• 5 Sashimi de Salmão" 
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
    description: "Composição do Prato\n\n• 1 Temaki Philadelphia\n• 4 Uramaki" 
  },
  {
    id: "produto-6",
    image: foto123.url,
    name: "Temaki Hot Shake EBI",
    price: "R$ 44,90",
    description: "Composição do Prato\n\n• Salmão Grelhado\n• Cream Cheese\n• Cebolinha\n• Massa Harumaki",
  },
  {
    id: "produto-7",
    image: foto108.url,
    name: "Dyo de Salmão",
    price: "R$ 27,90",
    description: "Composição do Prato\n\n• Arroz envolto com Tartar de Salmão\n• Cebolinha\n• Pimenta\n• Gergelim Torrado",
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
    description: "Composição do Prato\n\n• 2 Mini Temakis de Salmão com Cream Cheese\n• 4 Uramaki Hot\n• 4 Hot Shake Couve\n• 4 Hot Philadelphia",
  },
  {
    id: "produto-11",
    image: foto117.url,
    name: "Niguiri de Salmão Trufado",
    price: "R$ 21,90",
    description: "Composição do Prato\n\n• 2 unidades de Salmão\n• Arroz\n• Salsa de Trufa\n• Ova de Massago\n• Cebolinha",
  },
  {
    id: "produto-12",
    image: foto114.url,
    name: "Make da Chefe",
    price: "R$ 49,90",
    description: "Composição do Prato\n\n• 6 unidades\n• Enrolado de Salmão\n• Cream Cheese\n• Camarão Empanado\n• Maçaricado com Geleia de Frutas Vermelhas\n• Teriyaki",
  },
  {
    id: "produto-13",
    image: foto99.url,
    name: "Combinado Hot Especial ",
    price: "R$ 99,90",
    description: "Composição do Prato\n\n• 5 Hot Roll\n• 4 Hot Shake Couve\n• 4 Hot Philadelphia\n• 4 Niguiri de Salmão Maçaricado\n• 4 Uramaki Ebitem Maçaricado",
  },
  {
    id: "produto-14",
    image: foto100.url,
    name: "Sugestão Trio Maky Roll",
    price: "R$ 89,90",
    description: "Composição do Prato\n\n• 10 Hot Roll\n• 2 Hot Temaki Shake Ebi",
  },
  {
    id: "produto-15",
    image: foto260.url,
    name: "Combinado Individual 4",
    price: "R$ 49,90",
    description: "Composição do Prato\n\n• 1 Temaki Philadelphia\n• 4 Uramaki",
  },
  {
    id: "produto-16",
    image: foto129.url,
    name: "Combinado Especial 30 P.",
    price: "R$ 139,90",
    description: "Composição do Prato\n\n• 10 Hot Roll\n• 4 Hot Philadelphia\n• 4 Niguiri Torô Trufado\n• 2 Niguiri de Salmão Trufado\n• 2 Niguiri de Salmão Maçaricado\n• 4 Joy de Atum\n• 4 Joy de Salmão",
  },
  {
    id: "produto-17",
    image: foto98.url,
    name: "Sugestão 4 Mini Temakis",
    price: "R$ 79,90",
    description: "Composição do Prato\n\n• 2 Hot de Salmão Grelhado Empanado com Cream Cheese\n• 2 Hot Temaki de Salmão Grelhado com Camarão, Cream Cheese e Cebolinha",
  },
  {
    id: "produto-18",
    image: foto131.url,
    name: "Temaki Empanado",
    price: "R$ 42,90",
    description: "Composição do Prato\n\n• Salmão Grelhado\n• Cream Cheese",
  },
  {
    id: "produto-19",
    image: foto110.url,
    name: "Hassomaki",
    price: "R$ 24,90",
    description: "Composição do Prato\n\n• Nori\n• Shari\n• Arroz\n• Salmão\n• Cream Cheese",
  },
  {
    id: "produto-20",
    image: foto119.url,
    name: "Niguiri de Salmão Torô Trufado",
    price: "R$ 19,90",
    description: "Composição do Prato\n\n• 2 unidades de Barriga de Salmão\n• Arroz\n• Azeite Trufado\n• Limão-Siciliano\n• Flor de Sal",
  },
  { id: "produto-21", image: foto113.url, name: "Hot Roll", price: "R$ 49,90", description: "Composição do Prato:\n\n• 10 unidades\n• Enrolado de Massa Harumaki\n• Salmão\n• Kani\n• Cream Cheese\n• Frito" },
  { id: "produto-22", image: foto112.url, name: "Hot Philadelphia", price: "R$ 49,90", description: "Composição do Prato:\n\n• 8 unidades\n• Enrolado de Nori\n• Arroz\n• Cream Cheese\n• Salmão\n• Cebolinha\n• Empanado e Frito" },
  { id: "produto-23", image: foto259.url, name: "Combinado Individual 3", price: "R$ 39,90", description: "Composição do Prato:\n\n• 4 Uramaki\n• 4 Hossomaki" },
  { id: "produto-24", image: foto93.url, name: "Carpacio de Salmão", price: "R$ 69,90", description: "Composição do Prato:\n\n• 12 unidades de Salmão\n• Salsa de Trufa\n• Ova de Massago\n• Molho de Ervas\n• Raspa de Limão-Siciliano\n• Flor de Sal" },
  { id: "produto-25", image: foto124.url, name: "Temaki Philadelphia", price: "R$ 37,90", description: "Composição do Prato\n\n• Salmão em Cubos\n• Cream Cheese\n• Cebolinha\n• Arroz\n• Nori" },
];