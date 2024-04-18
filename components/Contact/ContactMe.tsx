"use client";

import { Poppins } from "next/font/google";
import { MdEmail } from "react-icons/md";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import {
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
} from "@chakra-ui/react";
import {
  tweenAnimateFromLeft10,
  tweenAnimateFromRight10,
  tweenAnimateFromRight13,
  tweenAnimateFromRight16,
  tweenAnimateFromRight19,
} from "@/utils/variants";
import { motion } from "framer-motion";
import {
  BsFacebook,
  BsGithub,
  BsTelephoneFill,
  BsTwitter,
} from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import Link from "next/link";
import LoaderButtonChakra from "../Buttons/LoaderButtonChakra";
import { LuHeading1 } from "react-icons/lu";
import Heading1 from "../Headings/Heading1";

const font = Poppins({ weight: "400", subsets: ["latin"] });

const sendData = async (data: any) => {
  const res = await fetch("/api/send-email", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return await res.json();
};

const ContactMe = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({ mode: "onChange" });
  const onSubmit = async (data: any) => {
    setIsSubmitted(true);
    try {
      const responseKey = await recaptchaRef.current?.executeAsync();
      recaptchaRef.current?.reset();
      if (responseKey) {
        data.subject = "contact message";
        data.responseKey = responseKey;
        const response = await sendData(data);
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
        setIsSubmitted(false);
        reset();
      } else {
        toast.error("Please verify that you are not a robot.");
      }
    } catch (error) {
      toast.error("Error validating reCAPTCHA.");
      console.error("Error validating reCAPTCHA:", error);
    }
  };
  return (
    <section
      id="contact"
      className={` py-[35px] sm:py-[50px] md:px-[35px] xl:px-[70px] overflow-hidden`}
    >
      <div className={` px-4 mx-auto `}>
        <Heading1 first="Contact" second="Me" />
        <div className=" grid sm:grid-cols-2 ">
          <div className="contact-left pb-8">
            <motion.div
              variants={tweenAnimateFromLeft10}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0 }}
              className="flex items-center gap-2 my-8 "
            >
              <MdEmail size={25} className="text-color1" />
              <span className="text-base text-white">
                {" "}
                ramkumarsgurav@gmail.com
              </span>
            </motion.div>
            <motion.div
              variants={tweenAnimateFromLeft10}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0 }}
              className="flex items-center gap-2"
            >
              <BsTelephoneFill size={25} className="text-color1" />
              <span className="text-base text-white"> 8549065626</span>
            </motion.div>

            <motion.div
              variants={tweenAnimateFromLeft10}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0 }}
              className="social-icons"
            >
              <Link href="https://github.com/RamkumarGurav">
                <BsGithub size={25} />
              </Link>
              <Link href="https://www.linkedin.com/in/ramkumar-gurav-645585250/">
                <AiFillLinkedin size={25} />
              </Link>
              <Link href="https://twitter.com/Raamathecoder">
                <BsTwitter size={25} />
              </Link>
              <Link href="https://www.facebook.com/ram.gurav.79">
                <BsFacebook size={25} />
              </Link>
            </motion.div>
            {/* <a href="images/ramcircle.png" download className="btn btn2">
              Download CV
            </a> */}
          </div>
          <div className=" contact-right">
            <form onSubmit={handleSubmit(onSubmit)} className="text-gray-900">
              {" "}
              <motion.div
                variants={tweenAnimateFromRight10}
                initial={"offscreen"}
                whileInView={"onscreen"}
                viewport={{ once: true, amount: 0 }}
              >
                {" "}
                <FormControl isInvalid={!!errors.name} mb={1} isRequired>
                  {" "}
                  <Input
                    type="text"
                    placeholder="Name*"
                    size="lg"
                    textColor="gray.100"
                    className="!rounded-xl !font-medium !text-[14px]  !py-2  ||| 
                         "
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    }}
                    errorBorderColor="red.300"
                    _placeholder={{ color: "gray.300" }}
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                  />{" "}
                  <FormErrorMessage>
                    {" "}
                    {errors.name && String(errors.name.message)}{" "}
                  </FormErrorMessage>{" "}
                </FormControl>{" "}
              </motion.div>{" "}
              <motion.div
                variants={tweenAnimateFromRight13}
                initial={"offscreen"}
                whileInView={"onscreen"}
                viewport={{ once: true, amount: 0 }}
              >
                {" "}
                <FormControl isInvalid={!!errors.email} mb={1} isRequired>
                  {" "}
                  <Input
                    type="email"
                    placeholder="Email*"
                    size="lg"
                    textColor="gray.100"
                    className="!rounded-xl !font-medium !text-[14px]  !py-2  ||| 
                         "
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    }}
                    errorBorderColor="red.300"
                    _placeholder={{ color: "gray.300" }}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Please enter a valid email",
                      },
                    })}
                  />{" "}
                  <FormErrorMessage>
                    {" "}
                    {errors.email && String(errors.email.message)}{" "}
                  </FormErrorMessage>{" "}
                </FormControl>{" "}
              </motion.div>{" "}
              <motion.div
                variants={tweenAnimateFromRight16}
                initial={"offscreen"}
                whileInView={"onscreen"}
                viewport={{ once: true, amount: 0 }}
              >
                {" "}
                <FormControl
                  isInvalid={!!errors.contactNumber}
                  mb={1}
                  isRequired
                >
                  {" "}
                  <Input
                    type="tel"
                    placeholder="Contact Number*"
                    size="lg"
                    textColor="gray.100"
                    className="!rounded-xl !font-medium !text-[14px]  !py-2  ||| 
                         "
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    }}
                    errorBorderColor="red.300"
                    _placeholder={{ color: "gray.300" }}
                    {...register("contactNumber", {
                      required: "Contact Number is required",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Contact Number must be exactly 10 digits",
                      },
                    })}
                  />{" "}
                  <FormErrorMessage>
                    {" "}
                    {errors.contactNumber &&
                      String(errors.contactNumber.message)}{" "}
                  </FormErrorMessage>{" "}
                </FormControl>{" "}
              </motion.div>{" "}
              <motion.div
                variants={tweenAnimateFromRight19}
                initial={"offscreen"}
                whileInView={"onscreen"}
                viewport={{ once: true, amount: 0 }}
              >
                {" "}
                <FormControl isInvalid={!!errors.message} mb={1} isRequired>
                  {" "}
                  <Textarea
                    rows={4}
                    placeholder="Message*"
                    size="lg"
                    textColor="gray.100"
                    className="!rounded-xl !font-medium !text-[14px]  !py-2  ||| 
                         "
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    }}
                    errorBorderColor="red.300"
                    _placeholder={{ color: "gray.300" }}
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                      maxLength: {
                        value: 250,
                        message: "Message must be less than 250 characters",
                      },
                    })}
                  />{" "}
                  <FormErrorMessage>
                    {" "}
                    {errors.message && String(errors.message.message)}{" "}
                  </FormErrorMessage>{" "}
                </FormControl>{" "}
              </motion.div>{" "}
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={String(
                  process.env.NEXT_PUBLIC_RECAPTCHA2_IV_SITE_KEY!
                )}
                size="invisible"
              />{" "}
              <motion.div
                variants={tweenAnimateFromRight10}
                initial={"offscreen"}
                whileInView={"onscreen"}
                viewport={{ once: true, amount: 0 }}
              >
                {" "}
                <LoaderButtonChakra
                  className="!min-w-[100px] hover:!bg-gray-700"
                  type="submit"
                  bg="#E6272D"
                  textColor="white"
                  fontWeight="500"
                  _hover={{ bg: "black" }}
                  isLoading={isSubmitted}
                  loadingText="sending.."
                  // isDisabled={!isDirty || !isValid}
                >
                  Send{" "}
                </LoaderButtonChakra>{" "}
              </motion.div>{" "}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
