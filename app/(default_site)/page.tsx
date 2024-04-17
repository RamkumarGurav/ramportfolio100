import AboutMe from "@/components/AboutMe";
import ContactMe from "@/components/Contact/ContactMe";
import Header from "@/components/Header/Header";
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
