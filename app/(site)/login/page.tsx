"use client";

import LoaderButtonChakra from "@/components/Buttons/LoaderButtonChakra";
import {
  tweenAnimateFromRight10,
  tweenAnimateFromRight13,
} from "@/utils/variants";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function PageName() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({ mode: "onChange" });
  const onSubmit = async (data: any) => {
    setIsSubmitted(true);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="text-gray-900">
            {" "}
            <motion.div
              variants={tweenAnimateFromRight13}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0 }}
            >
              {" "}
              <FormControl isInvalid={!!errors.email} mb={1} isRequired>
                <FormLabel className={`!my-0`}>Email</FormLabel>{" "}
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  size="lg"
                  variant="filled"
                  textColor="gray.900"
                  className="!rounded-xl !font-medium !text-[14px]  !py-2 !mb-1 ||| 
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
              variants={tweenAnimateFromRight10}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0 }}
            >
              {" "}
              <FormControl isInvalid={!!errors.password} mb={1} isRequired>
                <FormLabel className={`!my-0`}>Password</FormLabel>{" "}
                <Input
                  type="text"
                  placeholder="Password*"
                  variant="filled"
                  size="lg"
                  textColor="gray.900"
                  className="!rounded-xl !font-medium !text-[14px]  |||  !py-2 !mb-1 ||| 
                         "
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  }}
                  errorBorderColor="red.300"
                  _placeholder={{ color: "gray.300" }}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 2,
                      message: "Password must be at least 2 characters",
                    },
                  })}
                />{" "}
                <FormErrorMessage>
                  {" "}
                  {errors.password && String(errors.password.message)}{" "}
                </FormErrorMessage>{" "}
              </FormControl>{" "}
            </motion.div>{" "}
            <motion.div
              variants={tweenAnimateFromRight10}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0 }}
              className={`flex justify-center items-center mt-10`}
            >
              {" "}
              <LoaderButtonChakra
                className="!min-w-[90%]  hover:!bg-gray-700"
                type="submit"
                bg="blue"
                textColor="white"
                fontWeight="500"
                _hover={{ bg: "black" }}
                isLoading={isSubmitted}
                loadingText="Sign in.."
                // isDisabled={!isDirty || !isValid}
              >
                Sign in{" "}
              </LoaderButtonChakra>{" "}
            </motion.div>{" "}
          </form>
        </div>
      </div>
    </div>
  );
}
