export const SITE = {
  name: "Restaurante Fulô",
  shortName: "Fulô",
  subtitle: "Moquecaria, Temakeria e Creperia",
  slogan: "Sabores que abraçam. Momentos que ficam.",
  since: "Desde 2016 transformando sabores em memórias",
  description:
    "Restaurante acolhedor em Camaçari que reúne culinária baiana, japonesa, massas, frutos do mar e opções para compartilhar em família ou com amigos.",
  email: "contatofulorestaurante@gmail.com",
  whatsapp: "5571996949900",
  phoneDisplay: "(71) 99694-9900",
  instagram: {
    handle: "@fulorestaurante",
    url: "https://www.instagram.com/fulorestaurante/",
  },
  address: {
    formatted: "R. Monte Gordo, 245 - Bela Vista, Camaçari - BA, 42809-453",
    street: "R. Monte Gordo, 245",
    neighborhood: "Bela Vista",
    city: "Camaçari",
    state: "BA",
    postalCode: "42809-453",
  },
  mapsSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=R.+Monte+Gordo%2C+245+-+Bela+Vista%2C+Cama%C3%A7ari+-+BA%2C+42809-453",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=R.+Monte+Gordo%2C+245+-+Bela+Vista%2C+Cama%C3%A7ari+-+BA%2C+42809-453&output=embed",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  general: "Olá! Vim pelo site do Restaurante Fulô e gostaria de mais informações.",
  menu: "Olá! Gostaria de consultar o cardápio e os pratos disponíveis hoje.",
  order:
    "Olá! Gostaria de fazer um pedido no Restaurante Fulô. Poderia me enviar o cardápio disponível?",
} as const;

export const NAV_ITEMS = [
  { label: "Início", href: "/#inicio" },
  { label: "Sobre nós", href: "/#sobre" },
  { label: "Especialidades", href: "/#especialidades" },
  { label: "Cardápio", href: "/#cardapio" },
  { label: "Reservas", href: "/reservas" },
  { label: "Pedidos", href: "/pedidos" },
  { label: "Localização", href: "/#localizacao" },
  { label: "Contato", href: "/#contato" },
] as const;

export const OPENING_HOURS = [
  { day: "Segunda-feira", hours: "Fechado", closed: true },
  { day: "Terça-feira", hours: "11:00 às 22:00", closed: false },
  { day: "Quarta-feira", hours: "11:00 às 22:00", closed: false },
  { day: "Quinta-feira", hours: "11:00 às 22:00", closed: false },
  { day: "Sexta-feira", hours: "11:00 às 22:00", closed: false },
  { day: "Sábado", hours: "11:00 às 22:00", closed: false },
  { day: "Domingo", hours: "11:00 às 22:00", closed: false },
] as const;

export const ABOUT_PARAGRAPHS = [
  "O Fulô nasceu de um sonho simples, mas gigante: criar em Camaçari um lugar que parecesse um abraço. Um espaço onde o aroma da comida boa se mistura com o som de gargalhadas francas, brindes animados e o aconchego de estar entre amigos.",
  "Para nós, comer bem vai muito além do prato. É sobre criar memórias. Por isso, preparamos cada detalhe com um carinho que você sente ao entrar: no cuidado do nosso sushi feito na hora, no sabor afetivo dos nossos petiscos regionais e naquela cerveja gelada no ponto certo para celebrar as pequenas e grandes vitórias da vida.",
  "Seja para cantar junto com a música ao vivo, vibrar com o seu time, curtir um happy hour com o pessoal do trabalho ou ver as crianças brincando sem preocupação, a nossa casa é sua.",
  "No Fulô, cada sorriso de vocês é o que dá vida ao nosso trabalho.",
  "Vem viver essa experiência com a gente. Afinal, a mesa já está posta e você é sempre de casa!",
] as const;

export const OWNER_MESSAGE = {
  title: "Um convite da nossa equipe",
  content:
    "Venham viver uma experiência única aqui no Restaurante Fulô, em Camaçari, onde cada visita se torna uma memória preciosa. Nosso restaurante é o palco perfeito para celebrar a vida, compartilhar alegrias e aproveitar noites especiais com amigos e família. Aqui, vocês encontram o melhor da culinária japonesa e as riquezas da gastronomia baiana, preparadas com qualidade, carinho e autenticidade. Estamos ansiosos para recebê-los de braços abertos e criar juntos momentos que ficarão para sempre em nossas memórias.",
  signature: "João Paulo e toda a equipe Fulô",
} as const;

export const SPECIALTIES = [
  {
    title: "Culinária japonesa",
    description: "Sushis, temakis e combinações preparadas com cuidado.",
  },
  {
    title: "Moquecas e ensopados",
    description: "O sabor da Bahia em receitas marcantes e acolhedoras.",
  },
  {
    title: "Pratos individuais",
    description: "Pratos inspirados na culinária italiana com combinações especiais.",
  },
  {
    title: "Pratos para 2",
    description: "Sabores do mar presentes em diferentes preparações da casa.",
  },
] as const;

export const DIFFERENTIALS = [
  {
    title: "Música ao vivo",
    description: "Programação musical para tornar os encontros ainda mais especiais.",
    icon: "music",
  },
  {
    title: "Espaço kids",
    description:
      "Um espaço pensado para as crianças aproveitarem enquanto a família desfruta o momento.",
    icon: "baby",
  },
  {
    title: "Ambientes fotográficos",
    description: "Cenários acolhedores e especiais para registrar bons momentos.",
    icon: "camera",
  },
  {
    title: "Ambiente familiar",
    description: "Um lugar para almoços, jantares, encontros e celebrações.",
    icon: "users",
  },
  {
    title: "Happy hour",
    description: "Petiscos, bebidas e encontros depois do trabalho.",
    icon: "wine",
  },
  {
    title: "Transmissão de jogos",
    description: "Espaço para acompanhar partidas e vibrar com os amigos.",
    icon: "tv",
  },
] as const;

export const HERO_SLIDES = [
  {
    eyebrow: "Culinária que cria memórias",
    title: "Sabores que abraçam. Momentos que ficam.",
    subtitle:
      "Moquecas, culinária japonesa, massas e frutos do mar em um ambiente feito para celebrar.",
  },
  {
    eyebrow: "O sabor da Bahia",
    title: "Receitas cheias de afeto e personalidade.",
    subtitle: "Uma experiência acolhedora para famílias, amigos e encontros especiais.",
  },
  {
    eyebrow: "Massas e frutos do mar",
    title: "Uma mesa preparada para boas histórias.",
    subtitle: "Venha viver uma experiência gastronômica especial em Camaçari.",
  },
] as const;

export const OCCASIONS = [
  "Almoço",
  "Jantar",
  "Aniversário",
  "Encontro com amigos",
  "Reunião",
  "Outra",
] as const;
