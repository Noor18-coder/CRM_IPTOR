import { registerLocale, setDefaultLocale, getDefaultLocale } from 'react-datepicker';
import { has } from 'lodash';
import * as locales from 'date-fns/locale';
import { Locale } from 'date-fns';

export interface DateFnsLocales {
  [key: string]: Locale;
}

export const DATE_FNS_LOCALES: DateFnsLocales = {
  af: locales.af,
  // ar: locales.ar,
  arDZ: locales.arDZ,
  arMA: locales.arMA,
  az: locales.az,
  be: locales.be,
  bg: locales.bg,
  bn: locales.bn,
  bs: locales.bs,
  ca: locales.ca,
  cs: locales.cs,
  cy: locales.cy,
  da: locales.da,
  de: locales.de,
  deAT: locales.deAT,
  el: locales.el,
  en: locales.enUS,
  enAU: locales.enAU,
  enCA: locales.enCA,
  enGB: locales.enGB,
  enIN: locales.enIN,
  enNZ: locales.enNZ,
  enUS: locales.enUS,
  enZA: locales.enZA,
  eo: locales.eo,
  es: locales.es,
  et: locales.et,
  eu: locales.eu,
  faIR: locales.faIR,
  fi: locales.fi,
  // fil: locales.fil,
  fr: locales.fr,
  frCA: locales.frCA,
  frCH: locales.frCH,
  gd: locales.gd,
  gl: locales.gl,
  gu: locales.gu,
  he: locales.he,
  hi: locales.hi,
  hr: locales.hr,
  ht: locales.ht,
  hu: locales.hu,
  hy: locales.hy,
  id: locales.id,
  is: locales.is,
  it: locales.it,
  ja: locales.ja,
  ka: locales.ka,
  kk: locales.kk,
  kn: locales.kn,
  ko: locales.ko,
  lb: locales.lb,
  lt: locales.lt,
  lv: locales.lv,
  mk: locales.mk,
  mn: locales.mn,
  ms: locales.ms,
  mt: locales.mt,
  nb: locales.nb,
  nl: locales.nl,
  nlBE: locales.nlBE,
  nn: locales.nn,
  pl: locales.pl,
  pt: locales.pt,
  ptBR: locales.ptBR,
  ro: locales.ro,
  ru: locales.ru,
  sk: locales.sk,
  sl: locales.sl,
  sq: locales.sq,
  sr: locales.sr,
  srLatn: locales.srLatn,
  sv: locales.sv,
  ta: locales.ta,
  te: locales.te,
  th: locales.th,
  tr: locales.tr,
  ug: locales.ug,
  uk: locales.uk,
  uz: locales.uz,
  vi: locales.vi,
  zhCN: locales.zhCN,
  zhTW: locales.zhTW,
};

export function registerAndSetLocale(lang: string): void {
  const locale = lang.includes('-') ? lang.replace('-', '') : lang;
  const defaultLocale = 'enUS';

  if (getDefaultLocale() !== locale) {
    if (has(DATE_FNS_LOCALES, locale)) {
      registerLocale(locale, DATE_FNS_LOCALES[locale]);
      setDefaultLocale(locale);
    } else {
      registerLocale(defaultLocale, DATE_FNS_LOCALES[defaultLocale]);
      setDefaultLocale(defaultLocale);
    }
  }
}

export const getLocaleDateFormat = () => {
  const language = navigator.language.includes('-') ? navigator.language.replace('-', '') : navigator.language;
  const lo = DATE_FNS_LOCALES[language];
  if (lo && lo.formatLong) {
    const formatString = lo.formatLong.date({ width: 'short' });
    return formatString;
  } else {
    const loConst = DATE_FNS_LOCALES.en;
    const formatString = loConst && loConst.formatLong && loConst.formatLong.date({ width: 'short' });
    return formatString;
  }
};
