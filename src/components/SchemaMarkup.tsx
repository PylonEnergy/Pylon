export default function SchemaMarkup() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Pylon Energy Pty Ltd",
    description:
      "Premium solar panel installation, battery storage and EV charger solutions across NSW and Australia.",
    url: "https://pylonenergy.com.au",
    telephone: "+611300001598",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sydney",
      addressRegion: "NSW",
      postalCode: "2000",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -33.8688,
      longitude: 151.2093,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "13:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "10",
      bestRating: "5",
    },
    sameAs: [
      "https://www.facebook.com/pylonenergy",
      "https://www.instagram.com/pylonenergy",
      "https://www.linkedin.com/company/pylonenergy",
    ],
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pylon Energy Pty Ltd",
    url: "https://pylonenergy.com.au",
    description:
      "Australian-owned solar company offering residential, commercial and battery solar solutions.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+611300001598",
      contactType: "customer service",
      areaServed: "AU",
      availableLanguage: "English",
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a solar system cost in NSW?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A residential solar system in NSW typically costs between $3,990 and $12,990 fully installed, depending on system size (5kW–13kW). After government STC rebates, the net cost is significantly lower. Pylon Energy handles all rebate paperwork for you.",
        },
      },
      {
        "@type": "Question",
        name: "What solar rebates are available in Australia in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The federal Small-scale Technology Certificates (STC) rebate is active in 2026, offering savings of up to $3,500 depending on your location and system size. Additional state-based incentives may also apply. Pylon Energy calculates and applies all eligible rebates to your quote.",
        },
      },
      {
        "@type": "Question",
        name: "How long does solar panel installation take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A standard residential solar installation takes 1 day. Commercial systems typically take 2–5 days depending on size. Pylon Energy handles all council and network approvals, and schedules at your convenience.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
