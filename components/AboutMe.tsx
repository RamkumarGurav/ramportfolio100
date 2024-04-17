import React from "react";
import Image from "next/image";
import Heading1 from "./Headings/Heading1";
import AnimatedDiv from "./AnimatedComponents/AnimatedDiv";
import {
  tweenAnimateFromLeft10,
  tweenAnimateFromRight10,
} from "@/utils/variants";

const AboutMe = () => {
  return (
    <section
      id="about"
      className={` py-[35px] sm:py-[50px] sm:px-[35px] xl:px-[70px] overflow-hidden`}
    >
      <div className={` px-4 mx-auto `}>
        <div className="flex flex-col sm:flex-row items-start justify-around gap-10 ">
          <AnimatedDiv
            variants={tweenAnimateFromLeft10}
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{ once: true, amount: 0 }}
            className=" sm:w-[900px]"
          >
            <Image
              src={"/ram-square-removebg-preview-2.png"}
              width={500}
              height={500}
              alt="photo"
              className="shadow-md  rounded-md"
            />
          </AnimatedDiv>
          <div className="">
            {/* <h1 className="text-4xl sm:text-[60px] text-white py-6">About Me</h1> */}
            <Heading1 first="About" second="Me" />
            <AnimatedDiv
              variants={tweenAnimateFromRight10}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0 }}
              className="text-base leading-8"
            >
              Hi I am Ramkumar Shrikant Gurav. I have a passion for developing
              scalable web applications and working across the full-stack.I am
              looking to join forces with Web Development technologies to
              continue to grow my skill set while contributing to the positive
              outcome of making people "richer,smarter, and happier."
            </AnimatedDiv>
            <AnimatedDiv
              variants={tweenAnimateFromRight10}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0 }}
              className="tab-titles"
            >
              <p className="tab-links border-b-2 border-b-color1">Education</p>
            </AnimatedDiv>
            <AnimatedDiv
              variants={tweenAnimateFromRight10}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0 }}
              className="tab-contents active-tab "
              id="skills"
            >
              <ul>
                <li className="text-base leading-8">
                  <span className="!text-color1">2019</span>
                  <br />
                  BE in ECE ,from JSS Academy of Technical Education Bengaluru
                  560060.
                  <br />
                  cgpa: 8.02
                </li>
                <li>
                  <span className="!text-color1">2015</span>
                  <br />
                  PUC from Tungal PU Composite College JamaKhandi.
                </li>
              </ul>
            </AnimatedDiv>
            <div className="tab-contents" id="education">
              <ul>
                <li>
                  <span>2019</span>
                  <br />
                  BE in ECE ,from JSS Academy of Technical Education Bengaluru.
                </li>
                <li>
                  <span>2015</span>
                  <br />
                  PUC from Tungal PU Composite College JamaKhandi.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
