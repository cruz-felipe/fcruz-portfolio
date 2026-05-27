import { getWork } from "@/lib/content";
import CaseStudyPage from "@/components/case-study/CaseStudyPage";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = getWork("dane-telecom");
  return {
    title: data.metaTitle,
    description: data.metaDescription,
  };
}

export default function Page() {
  const data = getWork("dane-telecom");
  return <CaseStudyPage data={data} slug="dane-telecom" />;
}
