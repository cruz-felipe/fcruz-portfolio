import Page from "@/components/Page";
import { getHomepage } from "@/lib/content";

export default function Home() {
  const data = getHomepage();
  return <Page data={data} />;
}
