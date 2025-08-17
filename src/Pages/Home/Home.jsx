import React from 'react';
import Banner from './Banner';
import TopScholarships from './TopScholarships';
import PartnerUniversities from './PartnerUniversities';
import TestimonialsSection from './TestimonialsSection';
import Faq from './Faq';
import HowItWorks from './HowItWorks';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TopScholarships></TopScholarships>
            <PartnerUniversities></PartnerUniversities>
            <TestimonialsSection></TestimonialsSection>
            <Faq></Faq>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;