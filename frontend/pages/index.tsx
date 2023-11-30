import Body from "@/components/Body";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col justify-around">
      <Navbar />
      <Body />
      <Footer />
    </div>
  );
};

export default Home;
