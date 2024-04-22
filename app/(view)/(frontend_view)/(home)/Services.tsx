import AnimatedDiv from "@/components/AnimatetShells/AnimatedDiv";
import Heading1 from "@/components/Headings/Heading1";
import { tweenAnimateFromLeft10, tweenAnimateFromRight10 } from "@/lib/frontend_lib/fm_variants/variants";
import React from "react";
import { FaCode } from "react-icons/fa";
import { SiZend } from "react-icons/si";


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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              viewport={{ once: true, amount: 0 }}
              className={``}
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
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
