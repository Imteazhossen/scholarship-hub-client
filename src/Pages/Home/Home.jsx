import React from 'react';
import Banner from './Banner';
import TopScholarships from './TopScholarships';
import PartnerUniversities from './PartnerUniversities';
import TestimonialsSection from './TestimonialsSection';
import Faq from './Faq';
import HowItWorks from './HowItWorks';
import Webinars from './Webinars';
import Overview from './Overview';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TopScholarships></TopScholarships>
            <PartnerUniversities></PartnerUniversities>
            <TestimonialsSection></TestimonialsSection>
            <HowItWorks></HowItWorks>
            <Webinars></Webinars>
            <Overview></Overview>
            <Faq></Faq>
        </div>
    );
};

export default Home;