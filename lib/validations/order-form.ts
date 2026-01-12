import { z } from "zod";

export const orderFormSchema = z.object({
  // Step 1: Product Selection
  size: z.enum(["малък", "среден", "голям"], {
    required_error: "Моля, изберете размер",
    invalid_type_error: "Моля, изберете валиден размер",
  }),

  // Step 2: Personal Information
  name: z
    .string()
    .min(2, "Името трябва да бъде поне 2 символа")
    .max(50, "Името не може да бъде повече от 50 символа"),
  familyName: z
    .string()
    .min(2, "Фамилията трябва да бъде поне 2 символа")
    .max(50, "Фамилията не може да бъде повече от 50 символа"),
  phone: z
    .string()
    .regex(/^08\d{8}$/, "Телефонът трябва да бъде във формат 0888888888")
    .min(10, "Телефонът трябва да бъде 10 цифри")
    .max(10, "Телефонът трябва да бъде 10 цифри"),
  email: z.string().email("Моля, въведете валиден имейл адрес"),
  address: z
    .string()
    .min(5, "Адресът трябва да бъде поне 5 символа")
    .max(200, "Адресът не може да бъде повече от 200 символа"),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;
