import React from "react";
import Link from "next/link";
const hero = () => {

  return (
    <section className="relative pb-10 pt-20 md:pt-32 h-1527">
     
      <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10  block">
        <img
          src="/images/gradient_dark.jpg"
          alt="gradient dark"
          className="h-full w-full"
        />
      </picture>

      <div className="container h-full mx-auto">
        <div className="grid h-full items-center gap-4 md:grid-cols-12">
          <div className="col-span-6 flex h-full flex-col items-center justify-center py-10 md:items-start md:py-20 xl:col-span-4">
            <h1 className="text-jacarta-700 font-bold font-display mb-6 text-center text-5xl text-white md:text-left lg:text-6xl xl:text-7xl">
              Buy & sell UI templates
            </h1>
            <p className="text-jacarta-200 mb-8 text-center text-lg md:text-left">
              Here you will get the most popular Ui templates that are themable and interactive
            </p>
            <div className="flex space-x-4">
              <Link href="/create">
                <h1 className="bg-accent shadow-accent-volume hover:bg-accent-dark w-36 rounded-full py-3 px-8 text-center font-semibold text-white transition-all">
                  Wana Sell?
                </h1>
              </Link>
              <Link href="/collection/explore_collection">
                <h1 className="text-accent shadow-white-volume hover:bg-accent-dark hover:shadow-accent-volume w-36 rounded-full bg-white py-3 px-8 text-center font-semibold transition-all hover:text-white">
                  Explore
                </h1>
              </Link>
            </div>
          </div>

          {/* <!-- Hero image --> */}
          <div className="col-span-6 xl:col-span-8">
            <div className="relative text-center md:pl-8 md:text-right">
              <img
                src="https://images01.nicepagecdn.com/page/94/17/website-template-preview-94175.jpg"
                alt=""
                className="hero-img mt-8 h-96 inline-block w-72 rotate-[8deg] sm:w-full lg:w-[24rem] xl:w-[35rem]"
              />
              <img
                src="/images/hero/3D_elements.png"
                alt=""
                className="animate-fly absolute top-0 md:-right-[10%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default hero;
