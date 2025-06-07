import Nav from "../components/Nav";
import Hero from "../components/Hero";
import DemoVideo from "../components/Demo";
import Features from "../components/Features";
import LogoCarousel from "@/components/LogoCarousel";
import About from "@/components/About";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-50">
      <Nav/>
      <div id="home">
        <Hero/>
      </div>
      <div className="">
        <DemoVideo/>
      </div>
      <div className="bg-gray-50 h-[200px] top-[1200px] flex items-center justify-center absolute z-20 left-0 right-0">
        <LogoCarousel />
      </div>
      <div className="left-0 right-0">
      <Features/>
      </div>
      <div id="about">
        <About/>
      </div>
      <Pricing/>
    </div>
  );
}
