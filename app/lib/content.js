import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

const menuDefinitions = [
  { key: 'regional', name: 'Gastronomia regional', image: '/images/regional-grill.jpg', alt: 'Imagem ilustrativa de carnes grelhadas para a categoria de gastronomia regional.' },
  { key: 'seafood', name: 'Frutos do mar', image: '/images/seafood.jpg', alt: 'Imagem ilustrativa de peixe, sem relação com item confirmado do restaurante.' },
  { key: 'pasta', name: 'Massas', image: '/images/pasta.jpg', alt: 'Imagem ilustrativa de massa, sem relação com item confirmado do restaurante.' },
  { key: 'pizza', name: 'Pizzas', image: '/images/pizza.jpg', alt: 'Imagem ilustrativa de pizza, sem relação com item confirmado do restaurante.' },
  { key: 'drinks', name: 'Drinques e coquetéis', image: '/images/cocktail.jpg', alt: 'Imagem ilustrativa de drinque, sem relação com item confirmado do restaurante.' },
  { key: 'desserts', name: 'Sobremesas', image: '/images/dessert.jpg', alt: 'Imagem ilustrativa de sobremesa, sem relação com item confirmado do restaurante.' },
]

function plainText(node) {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value
  return (node.children ?? []).map(plainText).join('')
}

function findSection(nodes, title, depth) {
  const start = nodes.findIndex((node) => node.type === 'heading' && node.depth === depth && plainText(node).trim().includes(title))
  if (start < 0) return []
  let end = nodes.length
  for (let index = start + 1; index < nodes.length; index += 1) {
    if (nodes[index].type === 'heading' && nodes[index].depth <= depth) {
      end = index
      break
    }
  }
  return nodes.slice(start + 1, end)
}

function findField(nodes, label) {
  for (const node of nodes) {
    if (node.type === 'listItem') {
      const paragraph = node.children?.find((child) => child.type === 'paragraph')
      const value = paragraph ? plainText(paragraph).trim() : ''
      const prefix = `${label}:`
      if (value.startsWith(prefix)) return value.slice(prefix.length).trim()
    }
    const nestedValue = findField(node.children ?? [], label)
    if (nestedValue) return nestedValue
  }
  return ''
}

function getSeo(nodes) {
  const seo = findSection(nodes, 'SEO', 3)
  return { title: findField(seo, 'Título SEO'), description: findField(seo, 'Meta description') }
}

function getMenuCategories(nodes) {
  const menu = findSection(nodes, 'Cardápio', 2)
  return menuDefinitions.map((definition) => {
    const category = findSection(menu, definition.name, 4)
    const suggestions = findField(category, 'Sugestões ilustrativas — validar antes de publicar como itens')
      .split(';').map((item) => item.trim()).filter(Boolean)
    return {
      ...definition,
      introduction: findField(category, 'Texto da categoria — pronto para publicação'),
      suggestion: suggestions[0] ?? 'Sugestão ilustrativa pendente de validação',
    }
  })
}

export const readSiteCopy = cache(async function readSiteCopy() {
  const markdownPath = path.join(process.cwd(), 'conteudo-provisorio.md')
  const markdown = await readFile(markdownPath, 'utf8')
  const nodes = unified().use(remarkParse).parse(markdown).children
  const home = findSection(nodes, 'Home', 2)
  const menu = findSection(nodes, 'Cardápio', 2)
  const environment = findSection(nodes, 'Ambiente', 2)
  const about = findSection(nodes, 'Sobre', 2)
  const reservation = findSection(nodes, 'Reserva', 2)

  return {
    home: {
      seo: getSeo(home),
      title: findField(home, 'Título principal'),
      slogan: findField(home, 'Slogan'),
      introduction: findField(home, 'Texto de apresentação'),
      close: findField(findSection(home, 'Encerramento editorial', 3), 'Texto'),
    },
    menu: {
      seo: getSeo(menu),
      introduction: findField(findSection(menu, 'Abertura', 3), 'Introdução — pronta para publicação'),
      notice: findField(findSection(menu, 'Abertura', 3), 'Aviso provisório — manter visível enquanto a seleção não for confirmada'),
      categories: getMenuCategories(nodes),
    },
    environment: {
      seo: getSeo(environment),
      title: findField(findSection(environment, 'Apresentação', 3), 'Título da página'),
      introduction: findField(findSection(environment, 'Apresentação', 3), 'Texto introdutório'),
      supportingText: findField(findSection(environment, 'Apresentação', 3), 'Texto complementar'),
    },
    about: {
      seo: getSeo(about),
      title: findField(findSection(about, 'Apresentação', 3), 'Título da página'),
      introduction: findField(findSection(about, 'Apresentação', 3), 'Texto'),
      proposalTitle: findField(findSection(about, 'Proposta gastronômica', 3), 'Título da seção'),
      proposal: findField(findSection(about, 'Proposta gastronômica', 3), 'Texto'),
    },
    reservation: {
      seo: getSeo(reservation),
      title: findField(findSection(reservation, 'Contato para reserva', 3), 'Título da página'),
      instructions: findField(findSection(reservation, 'Contato para reserva', 3), 'Texto'),
    },
  }
})

export async function pageMetadata(page) {
  const copy = await readSiteCopy()
  const seo = copy[page].seo
  return { title: { absolute: seo.title }, description: seo.description }
}