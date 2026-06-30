import AdmissionsList from "../components/AdmissionsList";

export async function generateMetadata({ params }) {
    const { college } = params;
    const collegeNames = {
        bcca: "Badruka College of Commerce and Arts (BCCA)",
        bbcit: "Bankatlal Badruka College for Information Technology (BBCIT)",
        bcpgc: "Badruka College Post Graduate Centre (BCPGC)",
        bjcg: "Badruka Junior College for Girls (BJCG)",
        bbsmd: "Bansilal Badruka School of Music and Dance (BBSMD)"
    };
    
    const name = collegeNames[college] || "Admissions";
    return {
        title: `Admissions - ${name} | GKELITE`,
        description: `Admissions process, open applications, and guidelines for ${name}.`
    };
}

const Page = ({ params }) => {
    return <AdmissionsList college={params.college} />;
};

export default Page;
