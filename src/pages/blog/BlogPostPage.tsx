import * as React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { BLOG_POSTS, BlogPost } from './BlogData';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Check, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  useDocumentMeta({
    title: `${post.metaTitle} | HEMLO`,
    description: post.metaDescription,
    canonicalPath: `/blog/${post.slug}`,
  });

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'HEMLO',
      url: 'https://hemloai.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://hemloai.com/blog/${post.slug}`,
    },
  };

  const relatedPosts = (post.relatedSlugs || [])
    .map((s) => BLOG_POSTS.find((p) => p.slug === s))
    .filter((p): p is BlogPost => Boolean(p));

  // Parse lines into simple formatted blocks
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let tableBuffer: string[] = [];

    const flushTable = () => {
      if (tableBuffer.length > 0) {
        const rows = tableBuffer.map((line) =>
          line
            .split('|')
            .map((c) => c.trim())
            .filter((c, idx, arr) => idx > 0 && idx < arr.length - 1)
        );
        if (rows.length >= 2) {
          const header = rows[0];
          const body = rows.slice(2); // skip separator row
          elements.push(
            <div key={`table-${elements.length}`} className="my-6 overflow-x-auto rounded-2xl border border-[#E8EAEE]">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#F7F7F5] border-b border-[#E8EAEE]">
                    {header.map((h, i) => (
                      <th key={i} className="py-3 px-4 font-bold text-[#171B2B]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8EAEE]">
                  {body.map((r, ri) => (
                    <tr key={ri} className="bg-white hover:bg-[#FAFAFA]">
                      {r.map((cell, ci) => (
                        <td key={ci} className="py-3 px-4 text-[#646A7B]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        tableBuffer = [];
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('|')) {
        tableBuffer.push(trimmed);
        return;
      } else {
        flushTable();
      }

      if (trimmed.startsWith('## ')) {
        elements.push(
          <h2
            key={idx}
            className="text-2xl sm:text-3xl font-extrabold text-[#171B2B] font-display mt-10 mb-4 tracking-tight"
          >
            {trimmed.replace('## ', '')}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        elements.push(
          <h3
            key={idx}
            className="text-lg sm:text-xl font-bold text-[#171B2B] font-display mt-6 mb-2 tracking-tight"
          >
            {trimmed.replace('### ', '')}
          </h3>
        );
      } else if (trimmed.startsWith('- ')) {
        elements.push(
          <li key={idx} className="ml-5 list-disc text-sm sm:text-base text-[#646A7B] leading-relaxed my-1">
            {trimmed.replace('- ', '')}
          </li>
        );
      } else if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ')) {
        elements.push(
          <li key={idx} className="ml-5 list-decimal text-sm sm:text-base text-[#646A7B] leading-relaxed my-1">
            {trimmed.substring(3)}
          </li>
        );
      } else if (trimmed === '---') {
        elements.push(<hr key={idx} className="my-8 border-[#E8EAEE]" />);
      } else if (trimmed.length > 0) {
        elements.push(
          <p key={idx} className="text-sm sm:text-base text-[#646A7B] leading-relaxed my-4">
            {trimmed}
          </p>
        );
      }
    });

    flushTable();
    return elements;
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[900px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: post.category, href: '/blog' },
            { label: post.title },
          ]}
        />

        {/* ARTICLE HEADER */}
        <header className="pt-8 pb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#8C92A3]">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EEF4FF] text-[#155EEF] font-bold">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Published: {post.publishedDate}
            </span>
            <span>•</span>
            <span>Updated: {post.updatedDate}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author bar */}
          <div className="pt-4 flex items-center justify-between border-t border-[#E8EAEE]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#155EEF]/10 text-[#155EEF] font-bold flex items-center justify-center text-sm">
                AA
              </div>
              <div>
                <div className="text-sm font-bold text-[#171B2B]">{post.author.name}</div>
                <div className="text-xs text-[#8C92A3]">{post.author.role}</div>
              </div>
            </div>

            <Link to="/dashboard/create">
              <Button size="sm">
                <span>Try HEMLO Free</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </header>

        {/* ARTICLE BODY */}
        <article className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E8EAEE] shadow-sm my-6">
          <div className="prose max-w-none">{renderContent(post.content)}</div>

          {/* INLINE CONTEXTUAL CTA */}
          <div className="my-10 p-6 rounded-2xl bg-[#F0F5FF] border border-[#D0DDFE] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-bold text-base text-[#171B2B]">Ready to create your own clips?</h4>
              <p className="text-xs sm:text-sm text-[#646A7B]">
                Paste any YouTube link and get 3 vertical 1080p clips with animated subtitles for free.
              </p>
            </div>
            <Link to="/dashboard/create" className="shrink-0">
              <Button size="md">Start Clipping Now</Button>
            </Link>
          </div>
        </article>

        {/* RELATED ARTICLES */}
        {relatedPosts.length > 0 && (
          <section className="my-14">
            <h3 className="text-xl font-bold font-display text-[#171B2B] mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="p-5 rounded-2xl bg-white border border-[#E8EAEE] hover:border-[#155EEF] shadow-sm transition-all group"
                >
                  <span className="text-xs font-semibold text-[#155EEF]">{r.category}</span>
                  <h4 className="font-bold text-sm text-[#171B2B] group-hover:text-[#155EEF] transition-colors mt-1 line-clamp-2">
                    {r.title}
                  </h4>
                  <div className="text-xs text-[#8C92A3] mt-3 flex items-center justify-between">
                    <span>{r.readTime}</span>
                    <span className="font-bold text-[#155EEF]">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <SeoCtaBanner />
      </main>

      <MarketingFooter />
    </div>
  );
}
