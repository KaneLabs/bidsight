import { InvoicesProvider } from "../state/InvoicesProvider";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <InvoicesProvider>
      <Component {...pageProps} />
    </InvoicesProvider>
  );
}

export default MyApp;
