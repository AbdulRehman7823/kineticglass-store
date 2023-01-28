import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Hero from "@/components/hero";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import authServices from "../Services/AuthServices";
import alert from "../Services/Alert";

import React from "react";
import Navbar from "@/components/navbar";
import TopSection from "@/components/TopSection/TopSection";

export default function Home() {
  const { data: session } = useSession();

  const [user, setUser] = React.useState();
  async function handleSighout() {
    session ? signOut() : authServices.logout();
  }

  useEffect(() => {
    if (session) {
      console.log(authServices.getLoggedInUser());
      console.log(session);
      authServices
        .thirdPartyRegister(session.user)
        .then((response) => {
          console.log(response);
          alert.showSuccessAlert(response);
          console.log(authServices.getLoggedInUser());
        })
        .catch((error) => {
          alert.showErrorAlert(error);
        });
    }
  }, [session]);

  useEffect(() => {
    setUser(authServices.getLoggedInUser());
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <TopSection></TopSection>
    </>
  );
}
