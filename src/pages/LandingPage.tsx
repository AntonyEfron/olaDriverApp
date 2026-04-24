import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Services from '../components/Services';
import Products from '../components/Products';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => { navigate('/login'); };
    const handleSignupClick = () => { navigate('/signup'); };

    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#111111' }}>
            <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />

            <main className="flex-1">
                <Banner />
                <Services />
                <Products />
            </main>

            <Footer />

            <ChatBot />
        </div>
    );
};

export default LandingPage;
