import React from 'react';
import Banner from './Banner';
import TopScholarships from './TopScholarships';
import PartnerUniversities from './PartnerUniversities';
import TestimonialsSection from './TestimonialsSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TopScholarships></TopScholarships>
            <PartnerUniversities></PartnerUniversities>
            <TestimonialsSection></TestimonialsSection>
        </div>
    );
};

export default Home;