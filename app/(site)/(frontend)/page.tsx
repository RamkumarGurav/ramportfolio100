import AboutMe from "@/components/AboutMe";
import ContactMe from "@/components/Contact/ContactMe";
import CircularMotion from "@/components/Header/CircularMotion";
import Header from "@/components/Header/Header";
import Navbar1 from "@/components/Navbar/Navbar1";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Link from "next/link";

export default function PageName() {
  return (
    <div className={`bg-black`}>
    
      <Header />
      <AboutMe />
      <Skills />
      <Services />
      <Projects />
      <ContactMe />
    </div>
  );
}
