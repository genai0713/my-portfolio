import type { Metadata } from "next";
import { PortfolioExperience } from "@/components/PortfolioExperience";
import { getPortfolioPage } from "@/lib/sanity/queries";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPortfolioPage();

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      type: "website"
    }
  };
}

export default async function Home() {
  const page = await getPortfolioPage();

  return <PortfolioExperience page={page} />;
}
