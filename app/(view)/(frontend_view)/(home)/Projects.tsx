import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoLinkExternal } from "react-icons/go";
import Heading1 from "@/components/Headings/Heading1";
import AnimatedTitle from "@/components/AnimatetShells/AnimatedDiv";
import {
  springAnimate70pxFromBelow10,
  springAnimate70pxFromLeft10,
} from "@/lib/frontend_lib/fm_variants/variants";
import AnimatedText from "@/components/AnimatetShells/AnimatedText";
import AnimatedDiv from "@/components/AnimatetShells/AnimatedDiv";

// const projects = [
//   {
//     link: "https://my-exams-ramkumargurav.vercel.app",
//     name: "MyExams.com",
//     image: "/myexams2.png",
//     desc: "It's an education related app where one can take tests , browse and search mcqs, download notes and also buy books using stripe payment interface",
//   },
//   {
//     link: "https://myblogs-ramkumargurav.vercel.app",
//     name: "MyBlogs.com",
//     image: "/myblogs1.png",
//     desc: "It's a blogging related app where you can see blog posts of others and also you can create an account and Post your own blog posts",
//   },
//   {
//     link: "https://royal-villas-ramkumargurav.vercel.app",
//     name: "RoyalVillas.com",
//     image: "/royalvillas2.png",
//     desc: "It's an app related to hotel bookings where one can make advance reservations for rooms and also can buy villa party packages using stripe payment interface",
//   },

//   {
//     link: "https://ramkumargurav.github.io/Tindog",
//     name: "Tindog.com",
//     image: "/tindog1.png",
//     desc: "It's a social media app for dogs so they can meet new dogs and find their true love",
//   },
//   {
//     link: "https://ramkumargurav.github.io/My-Portfolio",
//     name: "Portfolio.com",
//     image: "/portfolio1.png",
//     desc: "It's a portfolio app for web developers ",
//   },
//   {
//     link: "https://ramkumargurav.github.io/Get-Weather",
//     name: "GetWeather.com",
//     image: "/getweather1.png",
//     desc: "It's an app where we can search for weather details of various cities  ",
//   },
//   {
//     link: "https://ramkumargurav.github.io/Simon-Game",
//     name: "SimonGame.com",
//     image: "/simongame1.png",
//     desc: "It's a popular simon game where one must remember the previously displayed colors",
//   },
//   {
//     link: "https://ramkumargurav.github.io/Dice-Game/",
//     name: "DiceRollGame.com",
//     image: "/dicegame1.png",
//     desc: "It's a 2 player game of dices where one wins if he get higher score than other one",
//   },
//   {
//     link: "https://ramkumargurav.github.io/guess-it-game",
//     name: "NumberGuessGame.com",
//     image: "/numberguessgame1.png",
//     desc: "It's a game about guessing the hidden number generated by computer",
//   },
//   {
//     link: "https://jagadeeshgudaguntimla.vercel.app",
//     name: "jagadishgulaguntimla.com",
//     image: "/mla_homepage.png",
//     desc: "It's a portfolio web application for a politician and where you can submit your complaints  ",
//   },
//   {
//     link: "https://talented-ant-loincloth.cyclic.app/api/v1/posts",
//     name: "myblogs.com/api/v1/villa-reservations",
//     image: "/apiImg5.png",
//     desc: "It's an API for blogs website using MongoDB Database and built using Nodejs",
//   },
//   {
//     link: "https://talented-ant-loincloth.cyclic.app/api/v1/questions",
//     name: "myexams.com/api/v1/posts/all",
//     image: "/apiImg5.png",
//     desc: "It's an API for educational webstie using MongoDB Database and built using Nodejs",
//   },
//   {
//     link: "https://talented-ant-loincloth.cyclic.app/api/v1/villa-reservations",
//     name: "villas.com/api/v1/villa-reservations",
//     image: "/apiImg5.png",
//     desc: "It's an API for educational webstie using MongoDB Database and built using Nodejs",
//   },
//   {
//     link: "https://test-sm-blogs-api.onrender.com/api/v1/swagger-ui/index.html",
//     name: "rblogs.com/api/v1",
//     image: "/apiImg5.png",
//     desc: "It's an API for Blogs website using MongoDB Database and built using Springboot framework",
//   },
// ];

const Projects = ({ projectsRes }: { projectsRes: any }) => {
  return (
    <section
      id="projects"
      className={`relative z-10 py-[35px] sm:py-[50px] sm:px-[35px] xl:px-[70px] overflow-hidden`}
    >
      <div className={` px-4 mx-auto `}>
        <Heading1 first="My" second="Projects" />

        <AnimatedTitle
          variants={springAnimate70pxFromBelow10}
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ once: true, amount: 0 }}
          className="rounded-md my-4 mx-10 py-4 pl-4 mt-10 text-xl font-semibold nunito uppercase
          sm:text-[30px] text-white bg-[#131111]"
        >
          {projectsRes?.count} Web Applications <br />
        </AnimatedTitle>
        <AnimatedText
          variants={springAnimate70pxFromLeft10}
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ once: true, amount: 0 }}
          className="pl-16 my-4 mb-8 text-base text-gray-200   sm:text-[20px]  "
        >
          {" "}
          Built thier Frontend using Reactjs,Nextjs and Backend using
          Nodejs,Nextjs,PHP and Codeigniter Framework
        </AnimatedText>
        <section className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-10 py-4 place-content-center place-items-center">
            {projectsRes?.data.map((app: any, i: number) => (
              <AnimatedDiv
                variants={springAnimate70pxFromBelow10}
                initial={"offscreen"}
                whileInView={"onscreen"}
                whileHover={{ scale: 1.1 }}
                viewport={{ once: true, amount: 0 }}
                key={i}
                className="z-[9999] card rounded-md  relative w-[300px] h-[300px] overflow-hidden"
              >
                <Image
                  src={`${app.image}`}
                  alt="profile"
                  fill
                  sizes="(max-width: 640px) 100vw
              (max-width: 1024px) 50vw,
              33vw" //thie is used when we use grid with cards images (this downloads small size imagees at bigger devices width and bigger images at smaller devices width to improve userexperience)
                  priority //When true, the image will be considered high priority and preload. Lazy loading is automatically disabled for images using priority.
                  className="rounded-md object-cover" //always give object-cover class to make image responsive without losing its aspects ratio( The image keeps its aspect ratio and fills the given dimension. The image will be clipped to fit)
                />
                <div
                  className="absolute top-0 left-0  ||| cgx-primary  |||  w-full h-full  
                |||  flex flex-col justify-center items-center gap-4 px-2"
                >
                  <Link href={`${app.url}`} className="text-xl text-white ">
                    {app.projectName}
                  </Link>
                  <p className="text-sm text-white px-2 text-center ">
                    {app.description}
                  </p>
                  <Link
                    href={`${app.url}`}
                    className="rounded-full p-4 bg-white"
                  >
                    <GoLinkExternal size={25} className="col-primary" />
                  </Link>
                </div>
              </AnimatedDiv>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Projects;
