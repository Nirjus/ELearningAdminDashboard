'use client'
import { useEffect } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import { Toaster } from "@/components/ui/toaster";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { ConfettiProvider } from "@/components/provider/confetti-provider";

const inter = Inter({ subsets: ["latin"] });

 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Custom>
            <ConfettiProvider />
           {children}
          </Custom>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}

const Custom = ({children}:{children: React.ReactNode}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      try {
         await axios.get("/user/me",{withCredentials:true}).then((res) => {
             dispatch({
              type:"LOAD_USER",
              payload: {
                user: res.data.user,
                token: res.data.token
              }
             })
         }).catch((error) => {
              router.replace("/sign-in");
         })
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  },[dispatch, router])
  return(
    <>
    {children}
    </>
  )
}