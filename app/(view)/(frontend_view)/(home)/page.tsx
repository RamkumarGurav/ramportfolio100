import { headers } from "next/headers";
import AboutMe from "./AboutMe";
import ContactMe from "./ContactMe";
import Header from "./Header";
import Projects from "./Projects";
import Services from "./Services";
import Skills from "./Skills";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Ramkumar Gurav",
  description:
    "Welcome to Ramkumar's portfolio. Explore my projects, skills, and experience.",
};

export const dynamic = "force-dynamic";

async function fetchData(path: string) {
  const res = await fetch(path);

  if (!res.ok) return null;
  return await res.json();
}
export default async function PageName() {
  const headersList = headers();
  const baseUrl = headersList.get("x-base-url"); // to get url

  const skillsRes = await fetchData(`${baseUrl}api/v1/skills/public`);
  const projectsRes = await fetchData(`${baseUrl}api/v1/projects/public`);
  // console.log(projectsRes);
  return (
    <div className={`bg-black`}>
      <Header />
      <AboutMe />
      <Skills skillsRes={skillsRes} />
      <Services />
      <Projects projectsRes={projectsRes} />
      <ContactMe />
    </div>
  );
}
