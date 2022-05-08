import Head from 'next/head';
import styles from '../styles/Home.module.css';

const YOUTUBE_PLAYLIST_ITEMS_API =
  'https://www.googleapis.com/youtube/v3/playlistItems'; //stores API endpoint

export async function getServerSideProps() {
  //snippet:this tells the API we want the snippet
  //

  const res = await fetch(
    `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PL6-aZ2HEYXZrVLoPp9AuGvjKsciYplq0q&key=${process.env.YOUTUBE_API_KEY}`
  );
  const data = await res.json(); //transfer to JSON
  //return data as props in our object
  return {
    props: {
      data,
    },
  };
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
