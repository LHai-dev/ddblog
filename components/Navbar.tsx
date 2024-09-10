'use client';
import { useState } from 'react'
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {

  const [state, setState] = useState(false)

  // Replace javascript:void(0) path with your path
//   const navigation = [
//     //   { title: "Customers", path: "javascript:void(0)" },
//     // //   { title: "Careers", path: "javascript:void(0)" },
//     // //   { title: "Guides", path: "javascript:void(0)" },
//     // //   { title: "Partners", path: "javascript:void(0)" }
//   ]

  return (
      <nav className="bg-white w-full border-b md:border-0 md:static">
          <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
              <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <Link href="/">
                        <Image
                            src="https://miro.medium.com/v2/resize:fill:128:128/4*f7EyGRullh3Ih_2tm3k5xw.png"
                            width={50}
                            height={50}
                            alt="Float UI logo"
                        />
                    </Link>
                  <div className="md:hidden">
                      <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                          onClick={() => setState(!state)}
                      >
                          {
                              state ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                              ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                  </svg>
                              )
                          }
                      </button>
                  </div>
              </div>
              <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${ state ? 'block' : 'hidden'}`}>
                  <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                      {/* {
                          navigation.map((item, idx) => {
                              return (
                                <li key={idx} className="text-gray-600 hover:text-indigo-600">
                                    <a href={item.path}>
                                        { item.title }
                                    </a>
                                </li>
                              )
                          })
                      } */}
                  </ul>
              </div>
              <div className="hidden md:inline-block">
                <a href="/blog/create" className="py-3 px-4 text-white bg-black hover:bg-slate-700 rounded-md shadow">
                    Get Started
                </a>
              </div>
          </div>
      </nav>
  )
}
export default Navbar;