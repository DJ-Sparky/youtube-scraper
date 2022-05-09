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
      playlistId: 'PLip9VFMc6Z_hD1vNoFh5N0rTDSyAf0-6W',
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

        <ul className={styles.grid}>
          {data.items.map(({ id, snippet = {} }) => {
            const { title, thumbnails = {}, resourceId = {} } = snippet;
            const { medium } = thumbnails;
            return (
              <li key={id} className={styles.card}>
                <a
                  href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}
                >
                  <p>
                    <img
                      width={medium.width}
                      height={medium.height}
                      src={medium.url}
                      alt=''
                    />
                  </p>
                  <h3>{title}</h3>
                </a>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
