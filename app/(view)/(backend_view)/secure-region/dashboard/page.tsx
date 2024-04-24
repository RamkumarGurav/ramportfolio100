import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { cookies } from "next/headers";
import { FaArrowRight } from "react-icons/fa6";
import { SiHyperskill } from "react-icons/si";
import { DiCodeigniter } from "react-icons/di";
import { PiCodesandboxLogoFill } from "react-icons/pi";
import Link from "next/link";
import { SiSpeedypage } from "react-icons/si";
/* =======================================================================
  to fetch data from protected routes always attach the required 
  cookies that are stored in the browser(when you make a request to protected
  routes naturally cookies or not attched to it we have to manually attach
  required headers and cookies
          )
     ======================================================================= */
async function fetchData(path: string) {
  console.log(`${process.env.NEXT_PUBLIC_BE_BASE_URL}${path}`);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}${path}`, {
    method: "GET",
    headers: { Cookie: cookies().toString() },
    credentials: "include", // Ensure cookies are sent in the request
  });

  if (!res.ok) return null;
  return await res.json();
}
export default async function PageName() {
  const projectsRes = await fetchData("api/v1/projects/authorised");
  const skillsRes = await fetchData("api/v1/skills/authorised");
  const applicationsRes = await fetchData("api/v1/job-applications/authorised");
  return (
    <div>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        <div
          className={`p-4 pb-0 bg-white flex flex-col   shadow  rounded-xl border-b-xblue border-b-2`}
        >
          <div className={`flex justify-between items-center`}>
            <div>
              <div>
                <DiCodeigniter size={45} className={`text-xgray`} />
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <h1 className="text-4xl text-xgray">{skillsRes.count}</h1>
              <h2 className=" text-xgray">Skills</h2>
            </div>
          </div>
          <Link
            href="/secure-region/dashboard/skills"
            className={`p-1 w-full  flex justify-center`}
          >
            <FaArrowRight size={20} className={`mx-auto text-xgray`} />
          </Link>
        </div>
        <div
          className={`p-4 pb-0 bg-white flex flex-col   shadow  rounded-xl border-b-xblue border-b-2`}
        >
          <div className={`flex justify-between items-center`}>
            <div>
              <div>
                <PiCodesandboxLogoFill size={45} className={`text-xgray`} />
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <h1 className="text-4xl text-xgray">{projectsRes.count}</h1>
              <h2 className=" text-xgray">Projects</h2>
            </div>
          </div>
          <Link
            href="/secure-region/dashboard/projects"
            className={`p-1 w-full  flex justify-center`}
          >
            <FaArrowRight size={20} className={`mx-auto text-xgray`} />
          </Link>
        </div>
        <div
          className={`p-4 pb-0 bg-white flex flex-col   shadow  rounded-xl border-b-xblue border-b-2`}
        >
          <div className={`flex justify-between items-center`}>
            <div>
              <div>
                <SiSpeedypage size={45} className={`text-xgray`} />
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <h1 className="text-4xl text-xgray">{applicationsRes.count}</h1>
              <h2 className=" text-xgray">Jobs</h2>
            </div>
          </div>
          <Link
            href="/secure-region/dashboard/job-applications"
            className={`p-1 w-full  flex justify-center`}
          >
            <FaArrowRight size={20} className={`mx-auto text-xgray`} />
          </Link>
        </div>
      </SimpleGrid>
    </div>
  );
}
