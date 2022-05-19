/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import styles from '../styles/Home.module.css'

function youtubeApi({ endpoint, query }) {
  let searchParams = new URLSearchParams({
    ...query,
    key: process.env.YOUTUBE_API_KEY,
  })
  return `https://www.googleapis.com/youtube/v3/${endpoint}?${searchParams.toString()}`
}

export async function getServerSideProps(ctx) {
  const link = youtubeApi({
    endpoint: 'playlistItems',
    query: {
      part: 'snippet',
      maxResults: '10',
      playlistId: 'PLRY6603I8SKsEAwoYGty0st-79dSzxror',
    },
  })
  const data = await fetch(link).then((res) => res.json())
  return { props: { data } }
}

export default function Home({ data }) {
  return (
    <div className='container'>
      <Head>
        <title>Youtube API Test</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1>YT API test</h1>
        <ul className='posts'>
          {data.items.map(({ id, snippet = {} }) => {
            const {
              title,
              thumbnails,
              description = {},
              resourceId = {},
            } = snippet

            let length = 300
            let myTruncatedString = description.substring(0, length)
            const { medium } = thumbnails
            return (
              <li key={id}>
                {/* <div>
                  <div className='card card-page'>
                    <iframe
                      src={`https://www.youtube.com/embed/${resourceId.videoId}`}
                      allowFullScreen='allowFullScreen'
                      width={medium.width}
                      height={medium.height}
                    />
                    <p>
                      <h3 className='post-title'>{title}</h3>
                      <h4>
                        {myTruncatedString}.. <br />
                        Read more
                      </h4>
                    </p>
                  </div>
                </div> */}

                <a href={`https://www.youtube.com/embed/${resourceId.videoId}`}>
                  <p>
                    <img
                      width={medium.width}
                      height={medium.height}
                      src={medium.url}
                      alt={title}
                    />
                  </p>
                  <h3>{title}</h3>
                  <h4>{myTruncatedString}.. Read more</h4>
                </a>
              </li>
            )
          })}
        </ul>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  )
}
