"use client";

import LoaderButtonChakra from "@/components/Buttons/LoaderButtonChakra";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const doLogin = async (data: any) => {
  const res = await fetch("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return await res.json();
};

export default function PageName() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data: any) => {
    setIsSubmitted(true);
    try {
      const response = await doLogin(data);
      if (response.success) {
        setIsSubmitted(false);
        toast.success("Successfully logged in");
        router.push("/secure-region/dashboard");
      } else {
        setIsSubmitted(false);
        toast.error(response.message);
      }

      reset();
    } catch (error) {
      setIsSubmitted(false);
      toast.error("Error while logging in.");
      console.error("Error while logging in.", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-center py-6 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md m-2">
        <div className="bg-white py-8  px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full mb-6 sm:max-w-md">
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
              Sign in
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="text-gray-900">
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
                _placeholder={{ color: "gray.700" }}
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
            <FormControl isInvalid={!!errors.password} mb={1} isRequired>
              <FormLabel className={`!my-0`}>Password</FormLabel>{" "}
              <Input
                type="text"
                placeholder="Enter your password"
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
                _placeholder={{ color: "gray.700" }}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 2,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />{" "}
              <FormErrorMessage>
                {" "}
                {errors.password && String(errors.password.message)}{" "}
              </FormErrorMessage>{" "}
            </FormControl>{" "}
            <div className={`flex justify-center items-center mt-10`}>
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
            </div>{" "}
          </form>
        </div>
      </div>
    </div>
  );
}
