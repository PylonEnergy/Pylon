import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingSidebarCTA from "@/components/FloatingSidebarCTA";
import LeadPopup from "@/components/LeadPopup";
import SchemaMarkup from "@/components/SchemaMarkup";
import Link from "next/link";
import Script from "next/script";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pylon Energy — Solar Panels & Battery Storage | NSW Australia",
    template: "%s | Pylon Energy",
  },
  description:
    "Pylon Energy Pty Ltd — Premium solar panels, battery storage & EV charger installation across NSW and Australia. CEC Approved. 25-Year Warranties. Save up to $3,500 with 2026 government rebates.",
  keywords: [
    "solar panels NSW",
    "solar installation Australia",
    "solar battery storage",
    "residential solar",
    "commercial solar",
    "EV charger installation",
    "Pylon Energy",
    "solar panels Sydney",
    "solar rebates 2026",
    "CEC approved solar",
  ],
  authors: [{ name: "Pylon Energy Pty Ltd" }],
  creator: "Pylon Energy Pty Ltd",
  metadataBase: new URL("https://pylonenergy.com.au"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://pylonenergy.com.au",
    siteName: "Pylon Energy",
    title: "Pylon Energy — Solar Panels & Battery Storage | NSW Australia",
    description:
      "Premium solar panels, battery storage & EV charger installation. CEC Approved. Save up to $3,500 with 2026 rebates.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pylon Energy — Solar Panels & Battery Storage",
    description:
      "Premium solar panels & battery storage across NSW. CEC Approved. 25-Year Warranties.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

async function getSettings() {
  try {
    const res = await fetch("http://localhost:4000/api/settings", { next: { revalidate: 5 } });
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.settings;
  } catch {
    return {
      primaryNavy: "#002B5C",
      accentOrange: "#29ABE2",
      bannerVisible: false,
      bannerMessage: "",
      bannerLink: "",
      gtmId: "",
      pixelId: "",
      ga4Id: "",
      siteVerification: "",
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html
      lang="en-AU"
      className={`${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <SchemaMarkup />
        {/* Google Search Console site verification */}
        {settings.siteVerification && (
          <meta name="google-site-verification" content={settings.siteVerification} />
        )}

        {/* Dynamic style block to inject admin custom brand colors */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --color-pe-navy: ${settings.primaryNavy || "#002B5C"};
              --color-pe-navy-dark: ${settings.primaryNavy ? settings.primaryNavy + "d9" : "#001A3A"};
              --color-pe-orange: ${settings.accentOrange || "#29ABE2"};
              --color-pe-orange-dark: ${settings.accentOrange ? settings.accentOrange + "d9" : "#1A8CBD"};
              --color-pe-orange-light: ${settings.accentOrange ? settings.accentOrange + "1a" : "#E8F7FD"};
              /* Logo brand cyan — always fixed to logo colour */
              --color-pe-cyan: #29ABE2;
              --color-pe-cyan-dark: #1A8CBD;
              --color-pe-cyan-light: #E8F7FD;
            }
          `
        }} />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased bg-white text-pe-gray-900">
        {/* Google Tag Manager (Script Injection) */}
        {settings.gtmId && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${settings.gtmId}');
              `,
            }}
          />
        )}

        {/* Google Analytics 4 (Script Injection) */}
        {settings.ga4Id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.ga4Id}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${settings.ga4Id}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Meta Pixel (Script Injection) */}
        {settings.pixelId && (
          <Script
            id="fb-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${settings.pixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}

        {/* Dynamic Announcement Banner */}
        {settings.bannerVisible && (
          <div className="bg-pe-orange text-white text-center py-2 px-4 text-xs font-bold transition-all relative z-50 animate-fade-in-up">
            <Link href={settings.bannerLink || "#"} className="hover:underline flex items-center justify-center gap-1.5">
              {settings.bannerMessage}
            </Link>
          </div>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingSidebarCTA />
        <LeadPopup />
        <WhatsAppButton />
      </body>
    </html>
  );
}
