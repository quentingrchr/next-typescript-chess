import type { NextPage } from 'next'
import Head from 'next/head'
import { Chessboard } from '@components'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title> Simple title </title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Chessboard />
    </>
  )
}

export default Home
