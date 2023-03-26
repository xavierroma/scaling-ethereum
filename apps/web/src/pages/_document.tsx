import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

export const getInitialProps = async (
  ctx: DocumentContext
): Promise<DocumentInitialProps> => {
  const initialProps = await Document.getInitialProps(ctx);

  return initialProps;
};

export default () => (
  <Html lang="en">
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <title>Splitz - Request money from your friends and family</title>
      <meta
        name="description"
        content="Splitz is a decentralized app that allows you to request money from your friends and family."
      />
      <link rel="shortcut icon" href="/static/favicon.png" />
    </Head>
    <body>
      <NextScript />
      <Main />
    </body>
  </Html>
);
