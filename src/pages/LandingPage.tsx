import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Services from '../components/Services';
import Products from '../components/Products';
import Footer from '../components/Footer';
import ComplaintPortal from '../components/ComplaintPortal';

const LandingPage = () => {
    useEffect(() => {
        document.title = 'Ola Cars Panama | Premium Car Rentals & Fleet';
    }, []);

    const handleSignupClick = () => {
        const el = document.getElementById('pricing');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#111111' }}>
            <Navbar onSignupClick={handleSignupClick} />

            <main className="flex-1">
                <Banner />
                <Services />
                <Products />
                <ComplaintPortal />
            </main>

            <Footer />

            {/* External widget handles chatbot on home screen. In-app ChatBot removed here. */}
        </div>
    );
};

export default LandingPage;
