import { getSession } from "@/app/api/_api_auth/auth";
import DashNavbar3 from "@/components/Layout/Backend/Navbar/DashNavbar3";
import NextTopLoader from "nextjs-toploader";
import { cookies, headers } from "next/headers";

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

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* =======================================================================
          in 2 ways we can get the user-data from request headers
     ======================================================================= */
  //  1)))
  let userData = headers().get("x-user-data")
    ? JSON.parse(headers().get("x-user-data")!)
    : null;

  // 2)))
  let sessionData: any = await getSession();
  //==]

  const projectsRes = await fetchData("api/v1/projects/authorised");
  const skillsRes = await fetchData("api/v1/skills/authorised");
  const applicationsRes = await fetchData("api/v1/job-applications/authorised");

  // console.log(applicationsRes);

  return (
    <div className={`overflow-hidden`}>
      <NextTopLoader color="#007bff" />
      <DashNavbar3
        userData={sessionData.data}
        projectsRes={projectsRes}
        skillsRes={skillsRes}
        applicationsRes={applicationsRes}
      >
        {children}
      </DashNavbar3>
    </div>
  );
}
