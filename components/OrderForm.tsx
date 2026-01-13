"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  orderFormSchema,
  type OrderFormData,
} from "@/lib/validations/order-form";

interface OrderFormProps {
  onClose: () => void;
}

export const OrderForm = ({ onClose }: OrderFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const sizes = ["Малък", "Среден", "Голям"];

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      size: undefined,
      name: "",
      familyName: "",
      phone: "",
      email: "",
      address: "",
    },
    mode: "onChange",
  });

  const { watch, trigger, reset } = form;
  const selectedSize = watch("size");

  const handleNext = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger("size");
    } else if (currentStep === 2) {
      isValid = await trigger([
        "name",
        "familyName",
        "phone",
        "email",
        "address",
      ]);
    }

    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBreadcrumbClick = async (step: number) => {
    if (step === 1) {
      setCurrentStep(1);
      return;
    }

    if (step === 2) {
      const isValid = await trigger("size");
      if (isValid) {
        setCurrentStep(2);
      }
    } else if (step === 3) {
      const step1Valid = await trigger("size");
      const step2Valid = await trigger([
        "name",
        "familyName",
        "phone",
        "email",
        "address",
      ]);
      if (step1Valid && step2Valid) {
        setCurrentStep(3);
      }
    }
  };

  const onSubmit = (data: OrderFormData) => {
    console.log("Поръчка:", data);
    // Here you would typically send the data to your backend
    // Close the dialog after successful submission
    setTimeout(() => {
      onClose();
      form.reset();
      setCurrentStep(1);
    }, 500);
  };

  return (
    <div className="text-slate-200">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className={
                currentStep >= 1
                  ? "cursor-pointer text-slate-300 hover:text-slate-200"
                  : "cursor-not-allowed text-slate-500 opacity-50"
              }
              onClick={() => handleBreadcrumbClick(1)}
            >
              <span>Продукт</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {currentStep >= 2 ? (
              <BreadcrumbLink
                asChild
                className="cursor-pointer text-slate-300 hover:text-slate-200"
                onClick={() => handleBreadcrumbClick(2)}
              >
                <span>Информация</span>
              </BreadcrumbLink>
            ) : (
              <span className="text-slate-500">Информация</span>
            )}
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {currentStep >= 3 ? (
              <BreadcrumbLink
                asChild
                className="cursor-pointer text-slate-300 hover:text-slate-200"
                onClick={() => handleBreadcrumbClick(3)}
              >
                <span>Потвърждение</span>
              </BreadcrumbLink>
            ) : (
              <span className="text-slate-500">Потвърждение</span>
            )}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Product Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-200">
                  Изберете размер
                </h2>
                <div className="mb-6 flex w-1/5 justify-center">
                  <Image
                    src="/bottle-plus-filter.png"
                    alt="Продукт"
                    width={536}
                    height={1383}
                    className="aspect-536/1388 h-auto w-full max-w-[300px]"
                  />
                </div>
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-base">
                        Размер на продукта
                      </FormLabel>
                      <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                          <FormItem
                            key={size}
                            className="flex cursor-pointer items-center space-x-3 rounded-lg border border-slate-700 bg-slate-800/50 p-4 transition-colors hover:bg-slate-800"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value === size}
                                onCheckedChange={() => {
                                  console.log("size", size);
                                  field.onChange(size);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-md cursor-pointer font-normal capitalize md:text-lg">
                              {size}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </div>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={handleNext}
                  size="lg"
                  className="bg-teal-500 text-white hover:bg-teal-600"
                >
                  Напред
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Personal Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-200">
                  Лична информация
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Име</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Въведете вашето име"
                              className="border-slate-700 bg-slate-800 text-slate-200 placeholder:text-slate-500 focus:border-slate-600"
                              {...field}
                            />
                          </FormControl>
                          {/* <FormMessage /> */}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="familyName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Фамилия</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Въведете вашата фамилия"
                              className="border-slate-700 bg-slate-800 text-slate-200 placeholder:text-slate-500 focus:border-slate-600"
                              {...field}
                            />
                          </FormControl>
                          {/* <FormMessage /> */}
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Телефон</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="0888888888"
                            maxLength={10}
                            className="border-slate-700 bg-slate-800 text-slate-200 placeholder:text-slate-500 focus:border-slate-600"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");
                              if (value.length <= 10) {
                                field.onChange(value);
                              }
                            }}
                          />
                        </FormControl>
                        {/* <FormMessage /> */}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Имейл</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@email.com"
                            className="border-slate-700 bg-slate-800 text-slate-200 placeholder:text-slate-500 focus:border-slate-600"
                            {...field}
                          />
                        </FormControl>
                        {/* <FormMessage /> */}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Адрес</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Въведете вашия адрес"
                            className="border-slate-700 bg-slate-800 text-slate-200 placeholder:text-slate-500 focus:border-slate-600"
                            {...field}
                          />
                        </FormControl>
                        {/* <FormMessage /> */}
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  size="lg"
                  className="border-slate-700 text-slate-800 hover:bg-slate-800 hover:text-slate-200"
                >
                  Назад
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  size="lg"
                  className="bg-teal-500 text-white hover:bg-teal-600"
                >
                  Напред
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Order Confirmation */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-200">
                  Потвърждение на поръчката
                </h2>
                <div className="space-y-4 rounded-lg border border-slate-700 bg-slate-800/50 p-6">
                  <div>
                    <h3 className="mb-2 font-semibold text-slate-200">
                      Продукт
                    </h3>
                    <p className="text-slate-400">
                      Размер:{" "}
                      <span className="font-medium text-slate-200 capitalize">
                        {selectedSize}
                      </span>
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-slate-200">
                      Лична информация
                    </h3>
                    <div className="space-y-1 text-slate-400">
                      <p>
                        <span className="font-medium text-slate-200">Име:</span>{" "}
                        {form.watch("name")}
                      </p>
                      <p>
                        <span className="font-medium text-slate-200">
                          Фамилия:
                        </span>{" "}
                        {form.watch("familyName")}
                      </p>
                      <p>
                        <span className="font-medium text-slate-200">
                          Телефон:
                        </span>{" "}
                        {form.watch("phone")}
                      </p>
                      <p>
                        <span className="font-medium text-slate-200">
                          Имейл:
                        </span>{" "}
                        {form.watch("email")}
                      </p>
                      <p>
                        <span className="font-medium text-slate-200">
                          Адрес:
                        </span>{" "}
                        {form.watch("address")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  size="lg"
                  className="border-slate-700 text-slate-800 hover:bg-slate-800 hover:text-slate-200"
                >
                  Назад
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-teal-500 text-white hover:bg-teal-600"
                >
                  Поръчай
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};
