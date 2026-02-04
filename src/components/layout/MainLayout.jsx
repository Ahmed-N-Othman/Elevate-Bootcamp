import React from "react";
import { Outlet } from "react-router-dom";
import bgImage from "../../assets/background.jpg";

const MainLayout = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center p-6 md:p-10"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <header className="w-full max-w-[1200px] mb-6">
        <div className="w-full h-[67px] bg-white/50 backdrop-blur-[16px] border border-white/20 rounded-[16px] px-[24px] py-[16px] flex justify-between items-center shadow-sm">
          <span className="text-white font-bold text-[15px] tracking-tight">
            Elevate
          </span>
          <h1 className="text-white font-medium text-[15px] absolute left-1/2 -translate-x-1/2 hidden md:block">
            Frontend Advanced Bootcamp Task
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="w-full max-w-[1200px]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
