export type { Article } from "@/lib/store";

export const CATEGORIES = [
  { name: "Havacılık Haberleri", href: "#haberler", count: "128" },
  { name: "Pilot Adayları", href: "#egitim", count: "64" },
  { name: "Uçak Teknolojileri", href: "#kategoriler", count: "42" },
  { name: "Emniyet & Kaza Analizleri", href: "#kategoriler", count: "37" },
  { name: "Hava Yolları", href: "#kategoriler", count: "55" },
  { name: "Simülasyon", href: "#egitim", count: "29" },
  { name: "Kariyer", href: "#egitim", count: "33" },
  { name: "Eğitim", href: "#egitim", count: "71" },
] as const;

export const PILOT_GUIDES = [
  {
    title: "CRM Hazırlığı",
    text: "Ekip kaynak yönetimi, iletişim protokolü ve karar alma senaryoları.",
    href: "#egitim",
  },
  {
    title: "Teknik Mülakat",
    text: "Sistem bilgisi, sınır durumlar ve operatör özel soru setleri.",
    href: "#egitim",
  },
  {
    title: "İngilizce",
    text: "Radyotelefoni, standart dışı durum dili ve Level 4–6 stratejisi.",
    href: "#egitim",
  },
  {
    title: "Simülatör",
    text: "PF/PM rolleri, checklist disiplini ve debrief kültürü.",
    href: "#egitim",
  },
  {
    title: "Class 1 Medical",
    text: "Başvuru süreci, sık görülen red nedenleri ve hazırlık takvimi.",
    href: "#egitim",
  },
] as const;

export const INTRO_FEATURES = [
  {
    title: "Güncel Haberler",
    text: "Operatörler, regülasyonlar ve sektörden seçilmiş gelişmeler.",
  },
  {
    title: "Derin Analizler",
    text: "Olaylar, teknoloji ve insan faktörünü editoryal derinlikle ele alırız.",
  },
  {
    title: "Eğitim Rehberleri",
    text: "Pilot adayları için adım adım, saha odaklı hazırlık içerikleri.",
  },
] as const;
