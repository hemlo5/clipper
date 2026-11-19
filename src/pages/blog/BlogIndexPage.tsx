import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { BLOG_POSTS, BlogPost } from './BlogData';
import { ArrowRight, BookOpen, Calendar, Clock, Search, Sparkles } from 'lucide-react';

export default function BlogIndexPage() {
  useDocumentMeta({
    title: 'HEMLO Blog – AI Video Clipping Guides, Comparisons & Growth Tips',
    description:
      'Explore actionable guides, independent software comparisons, and tips on turning podcasts, interviews, and gameplay into viral Shorts with AI.',
    canonicalPath: '/blog',
  });

  const [activeCategory, setActiveCategory] = React.useState<string>('All');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const categories = ['All', 'Comparisons', 'Guides', 'Gaming', 'Podcasting', 'Industry'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs items={[{ label: 'Blog' }]} />

        {/* HERO */}
        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold border border-blue-200">
            <BookOpen className="h-3.5 w-3.5" />
            <span>HEMLO Growth & Video AI Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            AI Video Clipping Guides, Comparisons & Insights
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Practical tutorials, honest software reviews, and technical deep-dives on turning long videos into viral short-form content.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto pt-2 relative">
            <Search className="h-4 w-4 text-[#8C92A3] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, guides, comparisons..."
              className="w-full h-11 rounded-2xl bg-white border border-[#E8EAEE] pl-11 pr-4 text-sm text-[#171B2B] focus:border-[#155EEF] focus:outline-none shadow-sm"
            />
          </div>
        </section>

        {/* CATEGORY TABS */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#155EEF] text-white shadow-sm'
                  : 'bg-white border border-[#E8EAEE] text-[#646A7B] hover:text-[#171B2B] hover:bg-[#FAFAFA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FEATURED POST */}
        {activeCategory === 'All' && !searchQuery && featuredPost && (
          <section className="mb-12">
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="group block p-6 md:p-10 rounded-3xl bg-white border border-[#E8EAEE] hover:border-[#155EEF] shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#8C92A3] mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  Featured Article
                </span>
                <span className="font-semibold text-[#155EEF]">{featuredPost.category}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
                <span>•</span>
                <span>{featuredPost.updatedDate}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171B2B] font-display group-hover:text-[#155EEF] transition-colors leading-snug">
                {featuredPost.title}
              </h2>

              <p className="text-sm sm:text-base text-[#646A7B] mt-3 leading-relaxed max-w-3xl">
                {featuredPost.excerpt}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#155EEF]">
                <span>Read Full Article</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>
        )}

        {/* ARTICLES GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-3xl border border-[#E8EAEE] hover:border-[#155EEF] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
            >
              <Link to={`/blog/${post.slug}`} className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8C92A3] mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-[#EEF4FF] text-[#155EEF] font-semibold">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-[#171B2B] font-display group-hover:text-[#155EEF] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#646A7B] mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F4F5F7] flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#171B2B]">{post.author.name}</span>
                  <span className="text-[#8C92A3]">{post.publishedDate}</span>
                </div>
              </Link>
            </article>
          ))}
        </section>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E8EAEE]">
            <p className="text-sm font-semibold text-[#646A7B]">No articles found matching your criteria.</p>
          </div>
        )}

        <SeoCtaBanner
          heading="Start clipping your videos for free."
          subheading="Turn long videos into viral Shorts, Reels, and TikToks with unwatermarked 1080p exports."
        />
      </main>

      <MarketingFooter />
    </div>
  );
}
