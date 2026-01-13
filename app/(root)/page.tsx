"use client";

import { useState } from "react";
import About from "@/components/About";
import { Product } from "@/components/Product";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrderForm } from "@/components/OrderForm";

export default function Home() {
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  return (
    <div className="relative flex flex-col">
      <section
        id="about"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      >
        <div className="sticky -top-5 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          <h2 className="text-sm font-bold tracking-widest text-slate-200 uppercase lg:sr-only">
            За нас
          </h2>
        </div>
        <About />
      </section>

      <section
        id="experience"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      >
        <div className="sticky -top-5 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          <h2 className="text-sm font-bold tracking-widest text-slate-200 uppercase lg:sr-only">
            Какво предлагаме
          </h2>
        </div>
        <ol className="group/list flex justify-center">
          <div className="group relative mb-12 cursor-pointer items-center justify-center gap-4 text-center transition-all sm:gap-8 md:gap-4 lg:max-w-[60%] lg:group-hover/list:opacity-50 lg:hover:opacity-100!">
            <Product />
          </div>
        </ol>
      </section>

      <section id="projects">
        <div className="sticky -top-5 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          <h2 className="text-sm font-bold tracking-widest text-slate-200 uppercase lg:sr-only">
            Поръчайте
          </h2>
        </div>
        <ul className="group/list flex justify-center">
          <Button
            size="xl"
            className="cursor-pointer bg-teal-500 text-white hover:bg-teal-600"
            onClick={() => {
              setIsOrderDialogOpen(true);
              setFormKey((prev) => prev + 1);
            }}
          >
            Направете поръчка
          </Button>
        </ul>
      </section>

      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent className="overflow-y-auto border-slate-700 bg-slate-900 text-slate-200">
          <DialogHeader>
            <DialogTitle className="text-slate-200">Поръчка</DialogTitle>
          </DialogHeader>
          <OrderForm
            key={formKey}
            onClose={() => setIsOrderDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
