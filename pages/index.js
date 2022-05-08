import Head from 'next/head';
import styles from '../styles/Home.module.css';

function youtubeApi({ endpoint, query }) {
  let searchParams = new URLSearchParams({
    ...query,
    key: process.env.YOUTUBE_API_KEY,
  });
  return `https://www.googleapis.com/youtube/v3/${endpoint}?${searchParams.toString()}`;
}

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
        <h1 className={styles.title}>
          Welcome to <a href='https://nextjs.org'>Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
