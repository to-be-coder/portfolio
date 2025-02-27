// src/components/demo/log-in/login-demo.tsx
'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const LoginDemo = () => {
  const [isContinueButtonClicked, setIsContinueButtonClicked] = useState(false)

  const handleButtonClick = () => {
    setIsContinueButtonClicked(true)
    console.log(isContinueButtonClicked) // This will log the previous state due to closure
  }

  return (
    <div className="flex  items-center w-full h-full bg-white px-8 py-18">
      <div className="flex flex-1 justify-center items-center">
        <div className="flex flex-col justify-center items-start  max-w-[450px] h-full flex-1">
          {isContinueButtonClicked ? (
            <>
              <h2 className="text-3xl flex mb-2">We Sent the code to</h2>
              <h2 className="text-3xl flex mb-12 text-gray-500 font-semibold">jessica@thoughtful.llc</h2>

              <div className="flex  flex-1 justify-between w-full mb-2">
                {[...Array(6)].map((_, index) => (
                  <input key={index} type="text" maxLength={1} className="w-15 h-17 border border-gray-300 rounded text-center" />
                ))}
              </div>
              <div className="flex justify-between w-full mb-4">
                <button className="text-blue-500 text-sm">Resent code</button>
              </div>
              <div className="flex flex-1 space-x-4 w-full">
                <Button className="flex flex-1 bg-[#F6F6F6] hover:bg-[#E6E6E6] rounded-lg text-black h-12" onClick={() => setIsContinueButtonClicked(false)}>
                  Back
                </Button>
                <Button className="flex flex-1 bg-black hover:bg-gray-800 rounded-lg text-white h-12">Login</Button>
              </div>
              <p className="text-sm mt-4">
                By logging in, you have agreed to the{' '}
                <a href="#" className="text-blue-500">
                  Terms of Use
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-500">
                  Privacy Policy
                </a>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl flex mb-12">Login to Thoughtful</h2>
              <form className="flex flex-col justify-center items-start w-full space-y-6 mb-2">
                <input type="email" placeholder="example@mozilla.com" className="w-full p-3  border border-gray-300 rounded-lg h-12" aria-label="Email" />
                <Button type="submit" className="w-full p-3 bg-black text-white hover:bg-gray-800 rounded-lg h-12" onClick={handleButtonClick}>
                  Continue
                </Button>
              </form>
              <p>
                No Account yet?{' '}
                <Link href="#" className="text-blue-500">
                  Create your Account
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-1 h-full justify-center items-center">
        <Image src="/login-demo.jpeg" alt="Login Demo" width={600} height={400} className="w-[90%] h-full bg-gray-900 rounded-2xl" />
      </div>
    </div>
  )
}

export default LoginDemo
