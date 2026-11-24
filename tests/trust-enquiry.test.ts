// @ts-expect-error Bun supplies this module when running the test file with `bun test`.
import { describe, expect, it } from "bun:test";
import { trustEnquiryDefaults, trustEnquirySchema } from "../src/lib/trust-enquiry";

const validEnquiry = {
  ...trustEnquiryDefaults,
  fullName: "TEST Thandi Example",
  email: "test@example.com",
  phone: "+27 82 123 4567",
  primaryGoal: "family_planning" as const,
  preferredContact: "whatsapp" as const,
  intendedTimeframe: "within_3_months" as const,
  consent: true,
};

describe("trust enquiry validation", () => {
  it("accepts South African and international phone formats with spaces", () => {
    expect(trustEnquirySchema.safeParse(validEnquiry).success).toBe(true);
    expect(
      trustEnquirySchema.safeParse({ ...validEnquiry, phone: "+44 20 7946 0958" }).success,
    ).toBe(true);
    expect(
      trustEnquirySchema.safeParse({ ...validEnquiry, phone: "082 123 4567" }).success,
    ).toBe(true);
  });

  it("rejects a missing primary goal and preferred contact method", () => {
    const result = trustEnquirySchema.safeParse({
      ...validEnquiry,
      primaryGoal: "",
      preferredContact: "",
    });
    expect(result.success).toBe(false);
  });

  it("requires explicit consent", () => {
    const result = trustEnquirySchema.safeParse({ ...validEnquiry, consent: false });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email or phone number", () => {
    expect(trustEnquirySchema.safeParse({ ...validEnquiry, email: "not-an-email" }).success).toBe(false);
    expect(trustEnquirySchema.safeParse({ ...validEnquiry, phone: "123" }).success).toBe(false);
  });

  it("allows exactly 2,000 message characters and rejects 2,001", () => {
    expect(trustEnquirySchema.safeParse({ ...validEnquiry, message: "a".repeat(2000) }).success).toBe(true);
    expect(trustEnquirySchema.safeParse({ ...validEnquiry, message: "a".repeat(2001) }).success).toBe(false);
  });
});
