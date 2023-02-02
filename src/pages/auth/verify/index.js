import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./style.module.css";
import Image from "next/image";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const { userId, token } = router.query;
        console.log(userId, token);
        if (userId == undefined || token == undefined) {
          return;
        }
        const url = `${process.env.SERVER_URL}/api/auth/${userId}/verify/${token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [userId,token]);

  return (
    <div>
      {validUrl ? (
        <div className={styles.container}>
          <Image
            src="/images/verified.png"
            alt="success_img"
            width="100%"
            height="100%"
          />
          <h1 className="text-xl text-gray-700 my-12">
            Email verified successfully
          </h1>
          <button
            className="bg-cyan-800 text-white px-12 py-4 rounded-lg hover:bg-cyan-700 shadow-lg"
            onClick={() => router.push("/auth/login")}
          >
            Go Back to Login!
          </button>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </div>
  );
};

export default EmailVerify;
