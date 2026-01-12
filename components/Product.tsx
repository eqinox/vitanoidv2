"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageModal } from "./ImageModal";

export const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Image
        src="/product3.png"
        alt="Product"
        width={676}
        height={1388}
        className="aspect-[676/1388] h-auto w-full max-w-full cursor-pointer transition-opacity hover:opacity-90"
        onClick={() => setIsModalOpen(true)}
      />
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc="/original-product.jpg"
        alt="Product - Full Size"
      />
    </>
  );
};
