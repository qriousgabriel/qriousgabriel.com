import * as React from 'react'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getAllPostsMetaData } from '@libs/api'
import Layout from '@components/Layout'
import Bio from '@components/Bio'
import SEO from '@components/SEO'
import config from '@config'

type BlogIndexProps = {
  allPostsMetadata: PostMeta[]
}

const BlogIndex = ({ allPostsMetadata }: BlogIndexProps) => {
  return (
    <Layout>
      <SEO title={'All posts'} description={config.description} />
      <Bio />
      <ol style={{ listStyle: 'none' }}>
        {allPostsMetadata.map((post) => (
          <li key={post.slug}>
            <article
              className='post-list-item'
              itemScope
              itemType='http://schema.org/Article'
            >
              <header>
                <h2>
                  <Link href={`/posts/${post.slug}`}>
                    <a itemProp='headline'>{post.title}</a>
                  </Link>
                </h2>

                <small>{post.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: post.description || '',
                  }}
                  itemProp='description'
                />
              </section>
            </article>
          </li>
        ))}
      </ol>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsMetadata = getAllPostsMetaData()
  return {
    props: {
      allPostsMetadata,
    },
  }
}

export default BlogIndex
