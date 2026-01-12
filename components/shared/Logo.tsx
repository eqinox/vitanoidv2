"use client";

import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex gap-5 max-lg:mt-5">
      <Image src="/logo.png" alt="Logo" width={70} height={70} className="w-[60px] h-[60px] lg:w-[80px] lg:h-[80px]" />
    </div>
  );
};

export default Logo;
