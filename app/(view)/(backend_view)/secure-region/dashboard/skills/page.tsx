import { Badge } from "@chakra-ui/react";
import { cookies, headers } from "next/headers";
import Link from "next/link";

export const dynamic = "force-dynamic";

/* =======================================================================
  to fetch data from protected routes always attach the required 
  cookies that are stored in the browser(when you make a request to protected
  routes naturally cookies or not attched to it we have to manually attach
  required headers and cookies
          )
     ======================================================================= */
async function fetchData(path: string) {
  // console.log(`${process.env.NEXT_PUBLIC_BE_BASE_URL}${path}`);
  const res = await fetch(path, {
    method: "GET",
    headers: { Cookie: cookies().toString() },
    credentials: "include", // Ensure cookies are sent in the request
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return await res.json();
}
export default async function Skills() {
  const headersList = headers();
  const baseUrl = headersList.get("x-base-url"); // to get url

  // const skillsRes = await fetchData(`${baseUrl}api/v1/skills/authorised`);
  return (
    <div>
      <section className="py-1 bg-blueGray-50 ">
        <h1>{baseUrl ? baseUrl : "no base url found"}</h1>
        {/* <div className="w-full    rounded-xl overflow-hidden mx-auto mt-10 border-t-blue-400 shadow-lg pb-10 bg-white border-t-4">
          <div className="relative flex flex-col min-w-0 break-words w-full   rounded  ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    My Skills : {skillsRes.count}
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-sm font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    See all
                  </button>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto b-10">
              <table className="items-center w-full  text-blueGray-700   ">
                <thead className="thead-light bg-blue-400">
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-center text-white text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                      SL.No
                    </th>
                    <th className="px-6 bg-blueGray-50 text-center text-white text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                      Skill
                    </th>
                    <th className="px-6 bg-blueGray-50 text-center text-white text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                      Description
                    </th>
                    <th className="px-6 bg-blueGray-50 text-center text-white text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                      Level
                    </th>
                    <th className="px-6 bg-blueGray-50 text-center text-white text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                      Position
                    </th>
                    <th className="px-6 bg-blueGray-50 text-center text-white text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                      status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {skillsRes.data.map((item: any, i: number) => (
                    <tr key={i}>
                      <th className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        {i + 1}
                      </th>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        {item.skillName}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm text-center whitespace-nowrap p-4 ">
                        {item.description ? item.description : "NO DESCRIPTION"}
                      </td>
                      <td className="border-t-0 min-w-[100px]  align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">{item.level}%</span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-sm flex rounded bg-red-200">
                              <div
                                style={{ width: `${item.level}%` }}
                                className={`shadow-none flex flex-col text-center whitespace-nowrap
                               text-white justify-center bg-red-500  w-[${Number(
                                 item.level
                               )}%] `}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="border-t-0 px-6 text-center align-middle
                       border-l-0 border-r-0 text-sm whitespace-nowrap p-4 "
                      >
                        {item.position ? item.position : "0"}
                      </td>
                      <td
                        className="border-t-0 px-6 text-center align-middle
                   border-l-0 border-r-0 text-sm whitespace-nowrap p-4 "
                      >
                        {item.status == "active" ? (
                          <Badge variant="outline" colorScheme="green">
                            active
                          </Badge>
                        ) : (
                          <Badge variant="outline" colorScheme="red">
                            inactive
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
      </section>
    </div>
  );
}
