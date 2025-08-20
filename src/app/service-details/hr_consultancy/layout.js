import React from 'react';

// export const metadata = {
//   title: "HR Consultancy | GKELITE",
//   description: "GKELITE-INFO-HR Consultancy",
// };

export const metadata = {
  title: "HR Consultancy Services | GKELITE",
  description:
    "GKELITE provides expert HR Consultancy services including recruitment, training, skill development, placement assistance, and end-to-end HR support to help businesses build strong, skilled teams.",
  keywords: [
    "HR Consultancy",
    "Recruitment Services",
    "Manpower Supply",
    "Training and Skill Development",
    "Placement Assistance",
    "HR Support",
    "Human Resource Management",
    "GKELITE HR Consultancy"
  ],
};

const HrConsultancyLayout = ({ children }) => {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default HrConsultancyLayout;