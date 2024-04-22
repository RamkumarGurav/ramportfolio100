import AboutMe from "./AboutMe";
import ContactMe from "./ContactMe";
import Header from "./Header";
import Projects from "./Projects";
import Services from "./Services";
import Skills from "./Skills";

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
