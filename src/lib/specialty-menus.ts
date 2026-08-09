/**
 * Produtos exibidos nos pop-ups das especialidades da home.
 *
 * COMO EDITAR:
 * - `image`: URL da foto (deixe "" para exibir o espaço reservado com ícone).
 * - `name`: nome do produto (vazio mostra "Nome do produto").
 * - `price`: valor já formatado, ex.: "R$ 89,90" (vazio mostra "Valor a definir").
 * - `description`: descrição/composição do prato. Use "\n" para quebrar linhas.
 *
 * Para adicionar ou remover produtos, acrescente/apague itens da lista.
 */
import { JAPANESE_PRODUCTS, type JapaneseProduct } from "@/lib/japanese-menu";

export type SpecialtyProduct = JapaneseProduct;

export type SpecialtyMenu = {
  title: string;
  products: SpecialtyProduct[];
};

/** Cria slots vazios prontos para preencher (foto, nome, valor e descrição). */
function emptySlots(prefix: string, count = 5): SpecialtyProduct[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index + 1}`,
    image: "",
    name: "",
    price: "",
    description: "",
  }));
}

export const SPECIALTY_MENUS: Record<string, SpecialtyMenu> = {
  "Culinária japonesa": {
    title: "Culinária japonesa",
    products: JAPANESE_PRODUCTS,
  },
  "Moquecas e ensopados": {
    title: "Moquecas e ensopados",
    products: emptySlots("moqueca"),
  },
  "Pratos individuais": {
    title: "Pratos individuais",
    products: emptySlots("massa"),
  },
  "Pratos para 2": {
    title: "Pratos para 2",
    products: emptySlots("frutos-do-mar"),
  },
};
