import Banner from './Banner';
import Catagory from './Catagory';
import Popularmenu from './PopularMenu/Popularmenu';
import FeaturedItem from './FeaturedItem/FeaturedItem';
import Testimonial from './Testimonial';
import BrandTagLine from './BrandTagline/BrandTagLine';
import Contact from './Contact';

import { Helmet } from "react-helmet"


const Home = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Fast Food | Home</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Banner></Banner>
            <Catagory></Catagory>
            <BrandTagLine></BrandTagLine>
            <Popularmenu></Popularmenu>
            <Contact></Contact>
            <FeaturedItem></FeaturedItem>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;