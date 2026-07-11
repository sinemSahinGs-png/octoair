import HeroScroll from "@/components/canvas/HeroScroll";
import EditorialIntro from "@/components/sections/EditorialIntro";
import FeaturedNews from "@/components/sections/FeaturedNews";
import Categories from "@/components/sections/Categories";
import LatestArticles from "@/components/sections/LatestArticles";
import PilotGuides from "@/components/sections/PilotGuides";
import WeeklyAnalysis from "@/components/sections/WeeklyAnalysis";
import Newsletter from "@/components/sections/Newsletter";
import SiteFooter from "@/components/sections/SiteFooter";
import {
  getArticles,
  getFeaturedArticles,
  getLatestArticles,
} from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const articles = await getArticles();
  const featured = getFeaturedArticles(articles);
  const latest = getLatestArticles(articles);

  return (
    <main className="page-shell bg-[#05070A]">
      <HeroScroll />
      <EditorialIntro />
      <FeaturedNews articles={featured} />
      <Categories />
      <LatestArticles articles={latest} />
      <PilotGuides />
      <WeeklyAnalysis />
      <Newsletter />
      <SiteFooter />
    </main>
  );
}
