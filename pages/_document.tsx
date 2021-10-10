import NextDocument, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/images/favicon.png" />
          <meta charSet="UTF-8" />
          <link
            rel="preload"
            href="/fonts/basiercircle-bold.woff"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/basiercircle-medium.woff"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/basiercircle-semibold.woff"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/basiercircle-regular.woff"
            as="font"
            crossOrigin=""
          />

          <meta name="description" content="Dropful." />
          <meta property="og:title" content="Onlook" />
          <meta property="og:description" content="Dropful." />
          <meta name="twitter:image:alt" content="Dropful." />
        </Head>
        <body className="bg-gray-100 overflow-hidden">
          <main className="overflow-y-auto max-h-screen w-full">
            <Main />
          </main>
          <NextScript />
        </body>
      </Html>
    );
  }
}
