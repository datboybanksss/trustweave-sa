import type { LanguageCode } from "@/lib/i18n";
import { publicEnglish, type PublicDictionary, type PublicTranslationKey } from "./en";
import { af } from "./af";
import { zu } from "./zu";
import { xh } from "./xh";
import { nr } from "./nr";
import { ss } from "./ss";
import { nso } from "./nso";
import { st } from "./st";
import { tn } from "./tn";
import { ve } from "./ve";
import { ts } from "./ts";

export const publicDictionaries: Record<LanguageCode, PublicDictionary> = {
  en: publicEnglish,
  af,
  zu,
  xh,
  nr,
  ss,
  nso,
  st,
  tn,
  ve,
  ts,
};

export { publicEnglish };
export type { PublicDictionary, PublicTranslationKey };
