import HeroScroll from "@/components/canvas/HeroScroll";
import EditorialIntro from "@/components/sections/EditorialIntro";
import Categories from "@/components/sections/Categories";
import FeaturedGuides from "@/components/sections/FeaturedGuides";
import TopicsDashboard from "@/components/sections/TopicsDashboard";
import LatestContent from "@/components/sections/LatestContent";
import NewsDigest from "@/components/sections/NewsDigest";
import Newsletter from "@/components/sections/Newsletter";
import SiteFooter from "@/components/sections/SiteFooter";
import {
  getArticles,
  getArticlesByCategory,
  getArticlesByType,
  getFeaturedArticles,
  getLatestArticles,
  getNewsDigest,
} from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const articles = await getArticles();
  const featured = getFeaturedArticles(articles);
  const latest = getLatestArticles(articles);
  const cockpit = getArticlesByCategory(articles, "Kokpit ve Sistemler", 6);
  const safety = getArticlesByCategory(articles, "Emniyet & İnsan Faktörü", 6);
  const cases = getArticlesByType(articles, "case-study", 4);
  const news = getNewsDigest(articles, 9);

  return (
    <main className="page-shell bg-[#05070A]">
      <HeroScroll />
      <EditorialIntro />
      <Categories />
      <FeaturedGuides articles={featured} />
      <NewsDigest articles={news} />
      <TopicsDashboard cockpit={cockpit} safety={safety} cases={cases} />
      <LatestContent articles={latest} />
      <Newsletter />
      <SiteFooter />
    </main>
  );
}
