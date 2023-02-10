import Head from 'next/head';
import Link from 'next/link';
import { getAllPublished } from '../lib/notion';
import styles from '../styles/Home.module.css';
export default function Home({ posts }) {
  if (!posts) return <h1>No posts</h1>;
  return (
    <div className={styles.container}>
      <Head>
        <title>EDUPORA Blog</title>
        <meta name="description" content="Staying updated!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Blog</h1>

        <div className={styles.cards}>
          {posts.map((post, index) => (
            <section key={index} className={styles.card}>
              <div>
                <h2>
                  <Link href={`/posts/${post.slug}`}>
                    <a className={styles.action}>{post.title}</a>
                  </Link>
                </h2>
                <div>{post.date}</div>
              </div>
              <p>{post.description}</p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
export const getStaticProps = async () => {
  const data = await getAllPublished();
  return {
    props: {
      posts: data,
    },
    revalidate: 60,
  };
};
