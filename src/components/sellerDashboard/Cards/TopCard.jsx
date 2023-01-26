import React from "react";

import InfoCard from "./InfoCard";
import {HiUserGroup} from "react-icons/hi";
import {BsGraphUp} from "react-icons/bs";

const TopCard=()=> {
  return (
    <>
      {/* Header */}
      <div className="relative  opacity-100 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-6/12 lg:w-6/12 xl:w-3/12 px-4">
                <InfoCard
                  statSubtitle="TRAFFIC"
                  statTitle="350,897"
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName={<BsGraphUp className="text-2xl" />}
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <InfoCard
                  statSubtitle="NEW USERS"
                  statTitle="2,356"
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName={<HiUserGroup className="text-2xl"/>}
                  statIconColor="bg-orange-500"
                />
              </div>
              
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TopCard;
