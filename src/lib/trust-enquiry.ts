import { z } from "zod";

export const PRIMARY_GOALS = [
  { value: "family_planning", translationKey: "options.goal.familyPlanning" },
  { value: "business_succession", translationKey: "options.goal.businessSuccession" },
  { value: "property_investments", translationKey: "options.goal.propertyInvestments" },
  { value: "review_existing_trust", translationKey: "options.goal.reviewExistingTrust" },
  { value: "guidance", translationKey: "options.goal.guidance" },
] as const;

export const CONTACT_METHODS = [
  { value: "email", translationKey: "options.contact.email" },
  { value: "phone", translationKey: "options.contact.phone" },
  { value: "whatsapp", translationKey: "options.contact.whatsapp" },
] as const;

export const TIMEFRAMES = [
  { value: "asap", translationKey: "options.timeframe.asap" },
  { value: "within_3_months", translationKey: "options.timeframe.within3Months" },
  { value: "exploring", translationKey: "options.timeframe.exploring" },
] as const;

export const PROVINCES = [
  { value: "eastern_cape", translationKey: "options.province.easternCape" },
  { value: "free_state", translationKey: "options.province.freeState" },
  { value: "gauteng", translationKey: "options.province.gauteng" },
  { value: "kwazulu_natal", translationKey: "options.province.kwazuluNatal" },
  { value: "limpopo", translationKey: "options.province.limpopo" },
  { value: "mpumalanga", translationKey: "options.province.mpumalanga" },
  { value: "northern_cape", translationKey: "options.province.northernCape" },
  { value: "north_west", translationKey: "options.province.northWest" },
  { value: "western_cape", translationKey: "options.province.westernCape" },
  { value: "outside_south_africa", translationKey: "options.province.outsideSouthAfrica" },
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

export const preferredLanguageSchema = z.enum(["en", "af", "zu", "xh", "nr", "ss", "nso", "st", "tn", "ve", "ts"]).default("en");

export const trustEnquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120, "Please use 120 characters or fewer."),
  email: z.string().trim().email("Please enter a valid email address.").max(254, "Please use 254 characters or fewer."),
  phone: z
    .string()
    .trim()
    .max(40, "Please use 40 characters or fewer.")
    .regex(/^\+?[0-9\s().-]+$/, "Use digits, spaces, and an optional international + prefix.")
    .refine((value) => {
      const digitCount = value.replace(/\D/g, "").length;
      return digitCount >= 7 && digitCount <= 15;
    }, "Enter a valid phone number with 7 to 15 digits."),
  primaryGoal: z.enum(primaryGoalValues, { errorMap: () => ({ message: "Please choose your primary goal." }) }),
  preferredContact: z.enum(contactMethodValues, {
    required_error: "Please choose how you would like us to contact you.",
    invalid_type_error: "Please choose how you would like us to contact you.",
  }),
  province: z.string().trim().max(100, "Please use 100 characters or fewer.").optional(),
  intendedTimeframe: z.union([
    z.enum(timeframeValues, { errorMap: () => ({ message: "Please choose a valid timeframe." }) }),
    z.literal(""),
  ]).optional(),
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
