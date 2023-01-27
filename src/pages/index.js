import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Hero from '@/components/hero'
import { signOut, useSession } from "next-auth/react"

export default function Home() {

  const {data: session} = useSession();
  async function handleSighout() {
    signOut();
  }
  return (
    <div className="flex flex-col justify-center m-12">
      {session ?
      <div className="flex flex-col justify-center m-12">
        <button className=''  onClick={handleSighout}>signout</button>
      <h1>{session.user.email}</h1>
      <h1>{session.user.name}</h1>
      <img src={session.user.image}/>
      </div>:<h1>Un Authorization</h1>}

      </div>

  )
}
