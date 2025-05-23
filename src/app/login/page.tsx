"use client";

import Image from "next/image";
import classess from "./loginCss.module.css";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

type Formvalues = {
  email: string;
  password: string;
};

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);


  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Formvalues>();

  const onSubmit = async (data: Formvalues) => {
    console.log(data);
    setLoading(true);

    try {
      const response: any = await axios.post("api/user/login", data);

      if (response.status === 200) {
        console.log("response: ", response);
        router.push("/allprojectaccess");
      } else {
        setLoading(false);
        console.log("Login error: Invalid Username and Password");
      }

    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
      console.log("Internal server error");
      // throw new Error("Internal server error");
      router.push("/error");

    }
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <div className={classess.mainContainer}>
        <div className={classess.containerBox}>
          <div className={classess.smallDiv}>
            <Image
              src="/jnj_logo.png"
              alt="J&J Logo"
              width={140}
              height={50}
              style={{ height: "50px" }}
              priority
            />
            <Image
              src="/image.png"
              alt="Secondary logo"
              width={175}
              height={35}
              style={{ paddingRight: "30px", height: "40px" }}
              priority
            />
          </div>

          <div className={classess.smallDiv}>
            <label className={classess.font}>Login</label>
            <button className={classess.LoginFont}>J&J EMPLOYEE</button>
          </div>

          <div style={{ width: "100%", height: "60%" }}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <label className={classess.planeLabale}>Email</label>
              <input
                type="email"
                className={classess.customInput}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <div className={classess.errorStyle}>{errors.email.message}</div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label className={classess.planeLabale}>Password</label>
                <label className={classess.smallFont}>Forgot your Password?</label>
              </div>

              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className={classess.customInput}

                  style={{ paddingRight: "45px"}}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "55%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    padding: 0,
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Image
                    src={showPassword ? "/visibility_icon.svg" : "/visibility_off_icon.svg"}
                    alt={showPassword ? "Hide password" : "Show password"}
                    width={18}
                    height={18}
                  />
                </button>
              </div>
              {errors.password && (
                <div className={classess.errorStyle}>{errors.password.message}</div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                <button
                  type="submit"
                  className={classess.LoginBtn}
                  disabled={isSubmitting}
                >
                  LOGIN
                </button>
              </div>
            </form>

          </div>
          <div className={classess.lastLinkDiv}>
            <div></div>

            <div style={{ color: "#d51900" }}>
              <span className={classess.linkFonts}> Contact Us </span> |
              <span className={classess.linkFonts}> Privary Policy </span> |
              <span className={classess.linkFonts}> Legal Notice </span> |
              <span className={classess.linkFonts}> Terms & Conditions </span> |
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;