import AboutMe from "@/components/AboutMe";
import ContactMe from "@/components/Contact/ContactMe";
import Header from "@/components/Header/Header";
import Navbar1 from "@/components/Navbar/Navbar1";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Link from "next/link";

export default function PageName() {
  return (
    <div className={`bg-black`}>
      <Navbar1 />
      <Header />
      <AboutMe />
      <Skills />
      <Services />
      <Projects />
      <ContactMe />
    </div>
  );
}