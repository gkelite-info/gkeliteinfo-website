import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import BootstrapClient from "./components/BootstrapClient";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import AOSProvider from "./aos-provider";


// export const metadata = {
//   title: "GKELITE-INFO",
//   description: "GKELITE-INFO",
// };

export const metadata = {
  title: {
    default: "GKELITE | HR, BPO & Business Solutions",
    template: "%s | GKELITE",
  },
  description:
    "GKELITE provides HR consultancy, recruitment, BPO, AI services, and business solutions in Hyderabad and worldwide.",
  keywords: [
    "HR consultancy",
    "recruitment services",
    "BPO solutions",
    "digital marketing",
    "AI services",
    "business consulting",
    "Hyderabad HR",
  ],

  openGraph: {
    title: "GKELITE | HR, BPO & Business Solutions",
    description:
      "Trusted HR consultancy, BPO, AI, and digital marketing services from GKELITE.",
    url: "https://www.gkeliteinfo.com",
    siteName: "GKELITE",
    images: [
      {
        url: "https://www.gkeliteinfo.com/assets/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GKELITE Global Banner",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "GKELITE | HR, BPO & Business Solutions",
    description:
      "HR consultancy, recruitment, BPO, AI services, and business solutions in Hyderabad.",
    images: ["https://www.gkeliteinfo.com/assets/img/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <BootstrapClient />
        <Header />
        <AOSProvider>
          {children}
        </AOSProvider>
        <Footer />
      </body>
    </html>
  );
}