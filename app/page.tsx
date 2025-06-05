import Image from "next/image";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import DemoVideo from "../components/Demo";
import Features from "../components/Features";

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-50">
      <Nav/>
      <Hero/>
      <DemoVideo/>
      <Features/>
    </div>
  );
}
