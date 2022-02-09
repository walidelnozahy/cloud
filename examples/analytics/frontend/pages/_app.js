import "@styles/globals.css";

import { NEXT_PUBLIC_API_URL } from "@state/config";

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <SafeHydrate>
      <img src={`${NEXT_PUBLIC_API_URL}/pixel.gif`} />
      <Component {...pageProps} />
    </SafeHydrate>
  );
}
