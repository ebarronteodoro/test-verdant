import "./styles/globals.css";
import { Poppins } from "next/font/google";

const poppinsSans = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  icons: {
    icon: "/icons/ISOTIPO_VERDANT.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/icons/ISOTIPO_VERDANT.svg" />
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
      </head>
      <body className={poppinsSans.className}>
        {children}
      </body>
    </html>
  );
}
