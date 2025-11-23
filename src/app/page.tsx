import Navbar from "./Components/header";
import Footer from "./Components/footer";
import HeroPage from "./Components/hero";
import Products from "./Components/mp";
import AttentionBar from "./Components/AttentionBar";
import ChannelPartners from "./Components/cp";
import FeatureSection from "./Components/skills";


export default function Home() {
  return (
    <div>
      <AttentionBar/>
      <Navbar/>
      <HeroPage/>
      <ChannelPartners/>
      <Products/>
     <FeatureSection/> 
      <Footer/>
    </div>
  );
}