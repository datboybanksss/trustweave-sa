import { z } from "zod";

export const PRIMARY_GOALS = [
  { value: "family_planning", label: "Family planning" },
  { value: "business_succession", label: "Business succession" },
  { value: "property_investments", label: "Property or investments" },
  { value: "review_existing_trust", label: "Review an existing trust" },
  { value: "guidance", label: "Not sure, I need guidance" },
] as const;

export const CONTACT_METHODS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

export const TIMEFRAMES = [
  { value: "asap", label: "As soon as possible" },
  { value: "within_3_months", label: "Within 3 months" },
  { value: "exploring", label: "Still exploring" },
] as const;

const primaryGoalValues = PRIMARY_GOALS.map((goal) => goal.value) as [
  (typeof PRIMARY_GOALS)[number]["value"],
  ...Array<(typeof PRIMARY_GOALS)[number]["value"]>,
];
const contactMethodValues = CONTACT_METHODS.map((method) => method.value) as [
  (typeof CONTACT_METHODS)[number]["value"],
  ...Array<(typeof CONTACT_METHODS)[number]["value"]>,
];
const timeframeValues = TIMEFRAMES.map((timeframe) => timeframe.value) as [
  (typeof TIMEFRAMES)[number]["value"],
  ...Array<(typeof TIMEFRAMES)[number]["value"]>,
];

export const trustEnquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Please use 120 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254, "Please use 254 characters or fewer."),
  phone: z
    .string()
    .trim()
    .max(40, "Please use 40 characters or fewer.")
    .regex(/^\+?[0-9\s().-]+$/, "Use digits, spaces, and an optional international + prefix.")
    .refine((value) => {
      const digitCount = value.replace(/\D/g, "").length;
      return digitCount >= 7 && digitCount <= 15;
    }, "Enter a valid phone number with 7 to 15 digits."),
  primaryGoal: z.enum(primaryGoalValues, {
    errorMap: () => ({ message: "Please choose your primary goal." }),
  }),
  preferredContact: z.enum(contactMethodValues, {
    required_error: "Please choose how you would like us to contact you.",
    invalid_type_error: "Please choose how you would like us to contact you.",
  }),
  province: z.string().trim().max(100, "Please use 100 characters or fewer.").optional(),
  intendedTimeframe: z.union([z.enum(timeframeValues), z.literal("")]).optional(),
  message: z.string().trim().max(2000, "Please use 2,000 characters or fewer.").optional(),
  consent: z.boolean().refine((value) => value, {
    message: "Please agree so that LegacyBuilder can respond to your enquiry.",
  }),
  website: z.string().max(200).optional(),
});

export type TrustEnquiryFormValues = z.infer<typeof trustEnquirySchema>;

export const trustEnquiryDefaults: TrustEnquiryFormValues = {
  fullName: "",
  email: "",
  phone: "",
  primaryGoal: undefined as unknown as TrustEnquiryFormValues["primaryGoal"],
  preferredContact: undefined as unknown as TrustEnquiryFormValues["preferredContact"],
  province: "",
  intendedTimeframe: "",
  message: "",
  consent: false,
  website: "",
};

export const WILL_URL = "https://legacybuilder.smartwill.io/system/portal/mbw/signup.php";
export const CALCULATOR_URL = "https://legacybuilder.smartwill.io/system/portal/calculator/index.php";
