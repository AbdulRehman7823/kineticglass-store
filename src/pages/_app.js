import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return(
  <SessionProvider session={pageProps.session}>
    <ToastContainer
      autoClose={2000}
      pauseOnHover={false}
      pauseOnFocusLoss={false}
    />
    <Component {...pageProps} />
  </SessionProvider>
  )
}
