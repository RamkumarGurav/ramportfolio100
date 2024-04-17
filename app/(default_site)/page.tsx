import AboutMe from "@/components/AboutMe";
import ContactMe from "@/components/Contact/ContactMe";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Link from "next/link";

export default function PageName() {
  return (
    <div className={`bg-black`}>
      <AboutMe />
      <Skills />
      <Services />
      <Projects />
      <ContactMe />
    </div>
  );
}
