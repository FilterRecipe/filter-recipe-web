import { Metadata } from "next";
import { GOOGLE_ADSENSE, GOOGLE_SEARCH, NAVER_SEARCH } from "./env";

export const META_DATA: Metadata = {
  title: {
    default: `필터레시피`,
    template: `필터레시피 | %s`,
  },
  description:
    "사진 보정 레시피 모아보기, 인스타 감성 보정팁 나눔, 아이폰 보정법 모음",
  openGraph: {
    title: "필터레시피",
    description:
      "사진 보정 레시피 모아보기, 인스타 감성 보정팁 나눔, 아이폰 보정법 모음",
    images: ["/meta/og.png"],
  },
  icons: {
    icon: "/meta/favicon.ico",
    apple: "/meta/favicon.ico",
  },
  verification: {
    google: GOOGLE_SEARCH,
  },
  other: {
    "naver-site-verification": NAVER_SEARCH,
    "google-adsense-account": GOOGLE_ADSENSE,
  },
};
