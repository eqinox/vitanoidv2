"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { OrderForm } from "@/components/OrderForm";

export default function OrderPage() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
    router.push("/");
  };

  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
  };

  // Trigger confetti when form is submitted
  useEffect(() => {
    if (isSubmitted) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: NodeJS.Timeout = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
    }
  }, [isSubmitted]);

  return (
    <div className="relative flex flex-col">
      <section className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
        <div className="sticky -top-5 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          <h2 className="text-sm font-bold tracking-widest text-slate-200 uppercase lg:sr-only">
            Поръчайте
          </h2>
        </div>
        <OrderForm
          onClose={handleClose}
          onSubmitSuccess={handleSubmitSuccess}
        />
      </section>
    </div>
  );
}
