import Image from 'next/image'
import { PageHeading, SiteFrame } from '../components'
import { pageMetadata, readSiteCopy } from '../lib/content'

export async function generateMetadata() {
  return pageMetadata('menu')
}

export default async function MenuPage() {
  const { menu } = await readSiteCopy()

  return (
    <SiteFrame currentPath="/cardapio">
      <main id="conteudo" className="page-main menu-page">
        <div className="content-width">
          <PageHeading eyebrow="Pérola Restaurante · Ponta Negra" title="Cardápio" introduction={menu.introduction} />
          <p className="provisional-notice"><strong>Provisório.</strong> {menu.notice}</p>
          <nav className="category-index" aria-label="Ir para uma categoria do cardápio">
            {menu.categories.map((category) => <a key={category.key} href={`#${category.key}`}>{category.name}</a>)}
          </nav>

          <div className="menu-categories">
            {menu.categories.map((category, index) => (
              <section className="menu-category" id={category.key} key={category.key} aria-labelledby={`${category.key}-title`}>
                <header className="category-heading">
                  <span className="category-number">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h2 id={`${category.key}-title`}>{category.name}</h2>
                    <p>{category.introduction}</p>
                  </div>
                </header>
                <article className="menu-suggestion">
                  <div className="suggestion-image">
                    <Image src={category.image} alt={category.alt} fill sizes="(max-width: 760px) 100vw, 38vw" loading="lazy" />
                    <span className="image-label">Imagem ilustrativa</span>
                  </div>
                  <div className="suggestion-copy">
                    <p className="eyebrow">Sugestão provisória</p>
                    <h3>{category.suggestion}</h3>
                    <p>Exemplo visual para esta categoria. Item, composição e disponibilidade ainda não confirmados pelo restaurante.</p>
                  </div>
                </article>
              </section>
            ))}
          </div>
          <p className="menu-disclaimer">As imagens são ilustrativas e não representam pratos confirmados do Pérola Restaurante. Consulte o restaurante para conhecer o cardápio oficial.</p>
        </div>
      </main>
    </SiteFrame>
  )
}