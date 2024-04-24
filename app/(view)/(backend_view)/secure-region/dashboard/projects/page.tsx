import { Badge } from "@chakra-ui/react";
import { cookies } from "next/headers";
import Link from "next/link";

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
export default async function Skills() {
  const projectsRes = await fetchData("api/v1/projects/authorised");
  return (
    <div>
      <section className="py-1 bg-blueGray-50 ">
        <div className="w-full  rounded-xl overflow-hidden mx-auto mt-10 border-t-xyellow border-t-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    My Projects : {projectsRes.count}
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

            <div className="block w-full overflow-x-auto">
              <table className="items-center w-full border-collapse text-blueGray-700  ">
                <thead className="thead-light bg-xyellow text-gray-950">
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-center  text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                      SL.No
                    </th>
                    <th className="px-6 bg-blueGray-50 text-center  text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                      Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-center  text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                      URL
                    </th>
                    <th className="px-6 bg-blueGray-50 text-center  text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                      Description
                    </th>
                    <th className="px-6 bg-blueGray-50 text-center  text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                      Position
                    </th>
                    <th className="px-6 bg-blueGray-50 text-center  text-base align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold">
                      status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projectsRes.data.map((item: any, i: number) => (
                    <tr key={i}>
                      <th className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        {i + 1}
                      </th>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        {item.projectName}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm text-center whitespace-nowrap p-4 ">
                        {item.url}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm text-center whitespace-nowrap p-4 ">
                        {item.description ? item.description : "NO DESCRIPTION"}
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
        </div>
      </section>
    </div>
  );
}
