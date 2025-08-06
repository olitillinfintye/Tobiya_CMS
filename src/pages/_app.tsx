import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
// import Footer from '../components/Footer' // You can create a Footer component later

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-[#0F1A2C] min-h-screen flex flex-col text-white">
      <Navbar />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default MyApp