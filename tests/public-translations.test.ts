// @ts-expect-error Bun supplies this module when running the test file with `bun test`.
import { describe, expect, it } from "bun:test";
import { LANGUAGES, readStoredLanguage, saveStoredLanguage } from "../src/lib/i18n";
import { publicDictionaries, publicEnglish } from "../src/lib/public-translations";

const englishKeys = Object.keys(publicEnglish).sort();
const expectedCodes = ["en", "af", "zu", "xh", "nr", "ss", "nso", "st", "tn", "ve", "ts"];
const placeholders = (value: string) => (value.match(/\{\w+\}/g) ?? []).sort();

describe("public translations", () => {
  it("provides exactly the eleven supported written-language dictionaries", () => {
    expect([...LANGUAGES.map((language) => language.code)].sort()).toEqual([...expectedCodes].sort());
    expect(Object.keys(publicDictionaries).sort()).toEqual([...expectedCodes].sort());
  });

  it("has every current public key, nonempty values, and matching interpolation in every locale", () => {
    for (const language of LANGUAGES) {
      const dictionary = publicDictionaries[language.code];
      expect(Object.keys(dictionary).sort(), language.code).toEqual(englishKeys);
      for (const key of englishKeys) {
        const typedKey = key as keyof typeof publicEnglish;
        expect(dictionary[typedKey].trim().length, `${language.code}:${key}`).toBeGreaterThan(0);
        expect(placeholders(dictionary[typedKey]), `${language.code}:${key}`).toEqual(placeholders(publicEnglish[typedKey]));
        expect(dictionary[typedKey], `${language.code}:${key}`).not.toBe(key);
      }
    }
  });

  it("contains real localized hero and form content rather than duplicated English dictionaries", () => {
    const dictionaries = new Set<string>();
    for (const language of LANGUAGES) {
      const dictionary = publicDictionaries[language.code];
      dictionaries.add(JSON.stringify(dictionary));
      if (language.code === "en") continue;
      expect(dictionary["hero.titleToday"], language.code).not.toBe(publicEnglish["hero.titleToday"]);
      expect(dictionary["form.fullName"], language.code).not.toBe(publicEnglish["form.fullName"]);
      expect(dictionary["form.consent"], language.code).not.toBe(publicEnglish["form.consent"]);
      const values = Object.values(dictionary);
      const identical = values.filter((value, index) => value === Object.values(publicEnglish)[index]).length;
      expect(identical / values.length, language.code).toBeLessThan(0.25);
    }
    expect(dictionaries.size).toBe(expectedCodes.length);
  });

  it("defaults invalid or unavailable saved language choices to English without throwing", () => {
    expect(readStoredLanguage({ getItem: () => "not-supported" })).toBe("en");
    expect(readStoredLanguage({ getItem: () => "tn" })).toBe("tn");
    expect(readStoredLanguage({ getItem: () => { throw new Error("Storage unavailable"); } })).toBe("en");
    expect(() => saveStoredLanguage({ setItem: () => { throw new Error("Storage unavailable"); } }, "af")).not.toThrow();
  });
});
