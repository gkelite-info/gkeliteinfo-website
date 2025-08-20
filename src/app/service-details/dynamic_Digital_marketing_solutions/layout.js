import React from 'react';

// export const metadata = {
//   title: "Dynamic Digital marketing solutions | GKELITE",
//   description: "GKELITE-INFO-Dynamic Digital marketing solutions",
// };

export const metadata = {
  title: "Dynamic Digital Marketing Solutions | GKELITE",
  description:
    "Explore Dynamic Digital Marketing Solutions with GKELITE. Learn SEO, social media marketing, content marketing, and email strategies to grow your business online.",
  keywords: [
    "Digital Marketing Solutions",
    "Dynamic Digital Marketing",
    "SEO Services",
    "Social Media Marketing",
    "Content Marketing",
    "Email Marketing",
    "Online Marketing Strategies",
    "B2B Marketing",
    "B2C Marketing",
  ],
  openGraph: {
    title: "Dynamic Digital Marketing Solutions | GKELITE",
    description:
      "Unlock the power of SEO, social media, content, and email marketing with GKELITE’s Dynamic Digital Marketing Solutions.",
    url: "https://yourwebsite.com/service-details/dynamic_Digital_marketing_solutions",
    images: [
      {
        url: "/assets/img/hero-carousel/digital_marketing.jpg",
        width: 1200,
        height: 630,
        alt: "Dynamic Digital Marketing Solutions",
      },
    ],
  },
};


const HrConsultancyLayout = ({ children }) => {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default HrConsultancyLayout;