import "@/styles/globals.css";
import type { AppProps } from "next/app";

// mock api import
import '@/mock-api'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
