import Home from "@/components/Home";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Homepage = () => {
  return (
    <div className="flex min-h-screen flex-col justify-around">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default Homepage;
