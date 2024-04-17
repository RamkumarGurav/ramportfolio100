import React from "react";
import Heading1 from "./Headings/Heading1";
import AnimatedDiv from "./AnimatedComponents/AnimatedDiv";
import {
  springAnimate100perFromBelow10,
  tweenAnimateFromLeft10,
} from "@/utils/variants";

type Props = {
  name: string;
  percentage: number;
};

let skills: Props[] = [
  { name: "HTML", percentage: 100 },
  { name: "CSS", percentage: 90 },
  { name: "Javascript", percentage: 90 },
  { name: "Typescript", percentage: 90 },
  { name: "Nodejs", percentage: 90 },
  { name: "Reactjs", percentage: 90 },
  { name: "Nextjs Framework", percentage: 80 },
  { name: "Nestjs Framework", percentage: 60 },
  { name: "PHP", percentage: 80 },
  { name: "Codeigniter Framework", percentage: 80 },
  { name: "MySQL", percentage: 80 },
  { name: "MongoDB", percentage: 90 },
  { name: "Git & GitHub", percentage: 90 },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className={` py-[35px] sm:py-[50px] px-4  sm:px-[35px] xl:px-[70px]`}
    >
      <div className={` sm:px-4 mx-auto `}>
        <Heading1 first="My" second="Skills" />
        <div className="grid grid-cols-3  lg:grid-cols-4 gap-4 gap-y-6 place-items-center">
          {skills.map((item, i) => (
            <AnimatedDiv
              variants={springAnimate100perFromBelow10}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0 }}
              key={i}
              className=" flex justify-center items-center"
            >
              <div className="relative">
                <div
                  className="absolute bg-[#181717] top-0 left-0 w-full h-full bg-conic-gradient"
                  // style={{
                  //   background: `conic-gradient(white ${item.percentage}%, black 0)`,
                  //   WebkitMaskImage: `radial-gradient(white 55%, transparent 0)`,
                  //   maskImage: `radial-gradient(white 55%, transparent 0)`,
                  // }}
                ></div>
                <div className="absolute  bg-black inset-0 flex items-center text-color4 justify-center text-primary">
                  <span className="text-xs md:text-base text-center font-medium text-white">
                    {item.name}
                  </span>
                </div>
                <AnimatedDiv
                  animate={{ rotate: 360 }}
                  transition={{ ease: "linear", duration: 2, repeat: Infinity }}
                  className=" w-[70px] h-[70px]  md:w-[120px] sm:h-[120px] shadow shadow-color1 
                   rounded-full overflow-hidden transform"
                >
                  <div></div>
                </AnimatedDiv>
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
