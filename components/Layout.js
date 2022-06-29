import React from "react";
import Head from "next/head";
import Header from "./Header";

export default function Layout({ children }) {
  const metaTitle =
    "Sesame Foundation - Awarding prizes for solving mathematical problems of interest";
  const metaDescription =
    "The Sesame Foundation leverages Ethereum smart contracts to award monetary prizes for solving mathematical problems of interest.";

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="twitter:card" content="summary" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="" />
      </Head>
      <Header />
      {children}
    </>
  );
}
