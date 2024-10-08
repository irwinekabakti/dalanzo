import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ErrorPage: FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-4 font-bold">Page is not found !</h1>
      <p className="text-2xl font-bold">
        You will be redirected to the home page
      </p>

      <div className=" font-semibold text-red-500 pt-12">
        <p className="text-xl">Redirecting in {countdown}...</p>
      </div>
    </div>
  );
};

export default ErrorPage;
