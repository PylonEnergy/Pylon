import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Clock, User, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Solar News & Educational Blog | Pylon Energy",
  description: "Read the latest updates, solar rebate guides, battery evaluations, and EV charger reviews from the Pylon Energy clean energy team.",
};

async function getBlogs() {
  try {
    const res = await fetch("http://localhost:4000/api/blogs", { next: { revalidate: 10 } });
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.blogs || [];
  } catch {
    return [];
  }
}

export default async function BlogIndexPage() {
  const blogs = await getBlogs();

  return (
    <>
      <PageHero
        title="Pylon Energy Blog"
        subtitle="Stay informed with energy tips, technical updates, and guide books to help you transition to clean power."
        breadcrumbs={[{ label: "Blog" }]}
      />

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogs.length === 0 ? (
            <div className="text-center py-20 text-pe-gray-400">
              <p className="text-lg">No blog posts published yet.</p>
              <p className="text-sm mt-1">Check back later or visit our admin panel to publish a draft.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post: any) => (
                <div key={post._id} className="card flex flex-col justify-between group">
                  <div className="p-6">
                    {/* Metadata strip */}
                    <div className="flex items-center gap-4 text-xs text-pe-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <User size={13} /> {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} /> {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-pe-navy mb-3 group-hover:text-pe-cyan transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    
                    <p className="text-pe-gray-500 text-sm leading-relaxed line-clamp-3">
                      {post.content}
                    </p>
                  </div>

                  <div className="px-6 pb-6 pt-0 border-t border-pe-gray-100 mt-4 flex items-center justify-between">
                    <span className="text-xs text-pe-gray-400">
                      {new Date(post.createdAt).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-pe-cyan font-semibold text-xs hover:gap-2 transition-all"
                    >
                      Read Article <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
