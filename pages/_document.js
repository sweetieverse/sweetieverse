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
          <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          <script src="https://www.gstatic.com/firebasejs/5.0.3/firebase.js" />
          <script src="https://cdn.firebase.com/libs/firebaseui/2.5.1/firebaseui.js"></script>
          <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/2.5.1/firebaseui.css" />
          <link rel="stylesheet" href="/base.css" />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <script src="/js/initFirebase.js" />
          <script src="/js/three.min.js" />
          <script src="/js/OBJLoader.js" />
        </Head>
        <body className="body">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
