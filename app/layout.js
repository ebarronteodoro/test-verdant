import './styles/globals.css'
import Script from 'next/script'
import { Poppins } from 'next/font/google'

const poppinsSans = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata = {
  icons: {
    icon: '/icons/ISOTIPO_VERDANT.svg'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/icons/ISOTIPO_VERDANT.svg" />
        <link rel="canonical" href="https://verdant.pe/" />
        <link
          rel="preload"
          href="/animations/Logo_Verdant.json"
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"
          as="script"
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V7X7SEZ4BR"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V7X7SEZ4BR');
          `}
        </Script>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window, document, 'script', 'dataLayer', 'GTM-PHFJ5KHV');
          `}
        </Script>
      </head>
      <body className={poppinsSans.className}>{children}</body>
    </html>
  )
}
