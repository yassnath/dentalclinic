import { Html, Head, Main, NextScript } from "next/document";

const themeInitScript = `
  (function () {
    try {
      var key = "healthease-theme";
      var stored = window.localStorage.getItem(key);
      var theme = (stored === "dark" || stored === "light")
        ? stored
        : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
    } catch (error) {}
  })();
`;

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <link rel="icon" type="image/png" href="/images/logo2.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
