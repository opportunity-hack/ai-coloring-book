import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import NewNavbar from '@/components/new-navbar/newnavbar.module'
import Upload from '@/components/upload/upload.module'


const AboutPage = () => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/> */}
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet"/>
      
      <Upload></Upload></Head>
    </>
  )
}

export default AboutPage
