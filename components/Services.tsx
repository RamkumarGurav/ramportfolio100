import React from "react";
import { FaCode } from "react-icons/fa";
import { SiZend } from "react-icons/si";
import Heading1 from "./Headings/Heading1";
import AnimatedDiv from "./AnimatedComponents/AnimatedDiv";
import {
  springAnimate70pxFromBelow10,
  tweenAnimateFromLeft10,
  tweenAnimateFromRight10,
} from "@/utils/variants";

const Services = () => {
  return (
    <section
      id="services"
      className={` py-[35px] sm:py-[50px] sm:px-[35px] xl:px-[70px]`}
    >
      <div className={` px-4 mx-auto `}>
        <div className={` sm:px-4 mx-auto `}>
          <Heading1 first="My" second="Services" />
          <div className="services-list px-6 sm:px-20">
            <AnimatedDiv
              variants={tweenAnimateFromRight10}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0 }}
            >
              <FaCode size={35} color="white" className="mb-2" />
              <h1 className="text-white">Web Applications</h1>
              <p className="text-white">
                Ready to build the web applications as per your requirements
                using modern tools and libraries.
              </p>
            </AnimatedDiv>
            <AnimatedDiv
              variants={tweenAnimateFromLeft10}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0 }}
            >
              <SiZend size={35} color="white" className="mb-2" />
              <h1 className="text-white">UI/UX Design</h1>
              <p className="text-white">
                Ready to design modern User interfaces as per your requirements
                using modern tools and libraries.
              </p>
            </AnimatedDiv>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
