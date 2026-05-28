import { getWork } from "@/lib/content";
import CaseStudyPage from "@/components/case-study/CaseStudyPage";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = getWork("taekwondo-learning-app");
  return { title: data.metaTitle, description: data.metaDescription };
}

export default function Page() {
  const data = getWork("taekwondo-learning-app");
  return <CaseStudyPage data={data} slug="taekwondo-learning-app" />;
}
