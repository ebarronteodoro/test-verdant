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
      </head>
      <body className={poppinsSans.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
