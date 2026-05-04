import type { Metadata } from "next";
import { Playfair_Display, Inter, Courier_Prime } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const courier = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-rustic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cantinho a Bicicleta | O ponto de apoio mais bonito da rota",
  description: "No meio do caminho, existe um lugar para respirar. Água potável, ferramentas, calibragem e Wi-Fi na Fazenda Bela Vida.",
  keywords: ["ciclismo", "ponto de apoio", "fazenda bela vida", "descanso", "bike"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable} ${courier.variable}`}>
      <body className="font-body antialiased wood-texture">
        {children}
      </body>
    </html>
  );
}
