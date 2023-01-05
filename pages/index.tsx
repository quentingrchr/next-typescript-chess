import type { NextPage } from 'next'
import Head from 'next/head'
import { Chessboard } from '@components'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title> Simple title </title>
      </Head>
      <Chessboard />
    </>
  )
}

export default Home
