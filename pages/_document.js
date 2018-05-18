import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

import '../assets/css/normalize.css';
import '../assets/css/base.css';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet" />
          <link rel="stylesheet" href="/normalize.css" />
          <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          <link rel="stylesheet" href="/base.css" />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <script src="https://rawgit.com/shawwn/leetsaber/master/three.js" />
          <script src="https://rawgit.com/shawwn/leetsaber/master/OBJLoader.js" />
        </Head>
        <body className="body">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
