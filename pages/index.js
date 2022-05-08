import Head from 'next/head';
import styles from '../styles/Home.module.css';
import youtubeApi from '../utils/helper.js';

export async function getServerSideProps(ctx) {
  const link = youtubeApi({
    endpoint: 'playlistItems',
    query: {
      part: 'snippet',
      maxResults: '50',
      playlistId: 'PLFsfg2xP7cbLuAglQob6zjS4nVbyAfSVV',
    },
  });
  const data = await fetch(link).then((res) => res.json());
  return { props: { data } };
}

export default function Home({ data }) {
  console.log('Home index.js data is:', data);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>YT API test</h1>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
