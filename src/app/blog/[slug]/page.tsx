import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Clock, User, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getBlog(slug: string) {
  try {
    const res = await fetch(`http://localhost:4000/api/blogs/${slug}`, { next: { revalidate: 5 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.blog;
  } catch {
    return null;
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlog(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageHero
        title={post.title}
        subtitle={`Written by ${post.author} · ${post.readTime}`}
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
      />

      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-pe-navy hover:text-pe-orange font-semibold text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          {/* Metadata */}
          <div className="flex items-center gap-6 text-sm text-pe-gray-500 mb-6 border-b border-pe-gray-200 pb-4">
            <span className="flex items-center gap-1.5">
              <User size={16} /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={16} /> {post.readTime}
            </span>
            <span>
              {new Date(post.createdAt).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Article content */}
          <article className="prose prose-lg prose-slate max-w-none text-pe-gray-700 leading-relaxed space-y-6">
            {post.content.split("\n\n").map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
