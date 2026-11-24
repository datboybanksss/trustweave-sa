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

  it("uses the reviewed estate-will and trust terminology in navigation", () => {
    const terms: Record<string, [string, string]> = {
      af: ["testament", "trust"],
      zu: ["incwadi yefa", "thrasti"],
      xh: ["umyolelo", "thrasti"],
      nr: ["incwadi yelifa", "thrasti"],
      ss: ["incwadzi yelifa", "thrasti"],
      nso: ["wili", "therasete"],
      st: ["wili", "traste"],
      tn: ["lokwalokaboboswa", "trasete"],
      ve: ["wiḽi", "vhufareli"],
      ts: ["papilandzhaka", "thirasiti"],
    };
    for (const [code, [will, trust]] of Object.entries(terms)) {
      const dictionary = publicDictionaries[code as keyof typeof publicDictionaries];
      expect(dictionary["common.createMyWill"].toLocaleLowerCase(), code).toContain(will);
      expect(dictionary["nav.trustEnquiry"].toLocaleLowerCase(), code).toContain(trust);
    }
  });

  it("keeps the family goal about planning for the family's future", () => {
    const expected: Record<string, string> = {
      en: "Planning for my family",
      af: "Beplanning vir my gesin",
      zu: "Ukuhlela ikusasa lomndeni wami",
      xh: "Ukucwangcisa ikamva losapho lwam",
      nr: "Ukuhlela ikusasa lomndeni wami",
      ss: "Kuhlela ikusasa lomndeni wami",
      nso: "Peakanyo ya bokamoso bja lapa la ka",
      st: "Ho rera bokamoso ba lelapa la ka",
      tn: "Thulaganyo ya isago ya lelapa la me",
      ve: "U pulana vhudzisa ha muṱa wanga",
      ts: "Ku pulana nkarhi lowu taka wa ndyangu wa mina",
    };
    for (const [code, value] of Object.entries(expected)) {
      expect(publicDictionaries[code as keyof typeof publicDictionaries]["options.goal.familyPlanning"], code).toBe(value);
    }
  });

  it("uses uncertainty and guidance rather than payment, pain, or broken certainty wording", () => {
    const expected: Record<string, string> = {
      en: "Not sure, I need guidance",
      af: "Onseker, ek het leiding nodig",
      zu: "Angiqinisekanga, ngidinga isiqondiso",
      xh: "Andiqinisekanga, ndifuna isikhokelo",
      nr: "Angiqinisekanga, ngidinga isiqondiso",
      ss: "Angiqinisekanga, ngidzinga sikhombisi",
      nso: "Ga ke na bonnete, ke hloka tlhahlo",
      st: "Ha ke na bonnete, ke hloka tataiso",
      tn: "Ga ke na bonnete, ke tlhoka kaelo",
      ve: "A thi na vhutendeli, ndi ṱoḓa thusedzo",
      ts: "A ndzi tiyisisi, ndzi lava nkongomiso",
    };
    for (const [code, value] of Object.entries(expected)) {
      expect(publicDictionaries[code as keyof typeof publicDictionaries]["options.goal.guidance"], code).toBe(value);
    }
  });

  it("confirms receipt rather than saying or finding the enquiry in Nguni locales", () => {
    for (const code of ["zu", "nr"] as const) {
      expect(publicDictionaries[code]["status.successTitle"], code).toBe("Umbuzo wakho wamukelwe");
      expect(publicDictionaries[code]["status.successBody"], code).toContain("umbuzo wakho wamukelwe");
      expect(publicDictionaries[code]["services.educationBody"], code).toContain("onolwazi ngazo");
    }
    expect(publicDictionaries.ss["status.successTitle"]).toBe("Umbuzo wakho wemukelwe");
    expect(publicDictionaries.ss["status.successBody"]).toContain("umbuzo wakho wemukelwe");
    expect(publicDictionaries.xh["status.successTitle"]).toBe("Umbuzo wakho wamkelwe");
  });

  it("uses coherent password wording in Setswana and Sepedi privacy guidance", () => {
    for (const code of ["tn", "nso"] as const) {
      expect(publicDictionaries[code]["form.messageGuidance"], code).toContain("mafoko a sephiri");
      expect(publicDictionaries[code]["privacy.body2"], code).toContain("mafoko a sephiri");
    }
  });

  it("defaults invalid or unavailable saved language choices to English without throwing", () => {
    expect(readStoredLanguage({ getItem: () => "not-supported" })).toBe("en");
    expect(readStoredLanguage({ getItem: () => "tn" })).toBe("tn");
    expect(readStoredLanguage({ getItem: () => { throw new Error("Storage unavailable"); } })).toBe("en");
    expect(() => saveStoredLanguage({ setItem: () => { throw new Error("Storage unavailable"); } }, "af")).not.toThrow();
  });
});
