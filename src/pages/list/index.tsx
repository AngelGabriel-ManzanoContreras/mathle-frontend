import useList from './useList'

import Layout from '../layout'
import Article from '../../components/explore/article-card'

export default function List() {
  const { listName, listItems } = useList()

  return (
    <Layout>
      <h2>{ listName }</h2>
      <br />

      <section>
        <span>
          {listItems.map((item, index) => (
            <Article 
              key={index}
              img_cover={item.img_cover}
              title={item.title}
              type={item.type}
              relativePath={item.relativePath}
            />
          ))}
        </span>
      </section>
    </Layout>
  )
}
