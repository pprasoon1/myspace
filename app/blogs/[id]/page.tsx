import { dbConnect } from "@/lib/dbConnect";
import { Blog } from "@/models/Blog";
import Link from "next/link";
import { FaCalendarAlt, FaArrowLeft } from "react-icons/fa";
import BlogNav from "@/components/BlogNav";

export const revalidate = 0;

interface Params {
  params: {
    id: string;
  };
}

export default async function BlogDetailPage({ params }: Params) {
  try {
    await dbConnect();
    const blog = await Blog.findById(params.id).lean() as { published?: boolean; title: string; createdAt: string; content: string } | null;

    if (!blog || !blog.published) {
      return (
        <>
          <BlogNav />
          <section className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-[#1a232a] via-[#222e23] to-[#183a2c]">
            <div className="relative z-10 max-w-xl w-full mx-auto bg-[#181e1a]/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 px-8 py-16 text-center">
              <h1 className="text-3xl font-bold text-green-400 mb-4">Post Not Found</h1>
              <p className="text-gray-300 mb-6">This post does not exist or is not published.</p>
              <Link href="/blogs" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition shadow">
                <FaArrowLeft /> Back to Blogs
              </Link>
            </div>
          </section>
        </>
      );
    }

    return (
      <>
        <BlogNav />
        <section className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-[#1a232a] via-[#222e23] to-[#183a2c] py-20 px-4 relative overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500 rounded-full filter blur-3xl opacity-20 pointer-events-none animate-pulse" />
          <article className="relative z-10 max-w-4xl w-full mx-auto bg-[#181e1a]/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 px-8 py-14">
            <Link href="/blogs" className="inline-flex items-center gap-2 mb-8 text-green-400 hover:text-green-300 transition font-semibold">
              <FaArrowLeft /> Back to Blogs
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent drop-shadow-lg">
              {blog.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-10">
              <FaCalendarAlt className="text-green-400" />
              {new Date(blog.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="prose prose-invert prose-lg max-w-none text-gray-200 prose-headings:text-green-400 prose-a:text-green-400 prose-strong:text-green-300">
              {blog.content}
            </div>
          </article>
        </section>
      </>
    );
  } catch (error) {
    console.error('Database connection error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a232a] via-[#222e23] to-[#183a2c]">
        <div className="bg-[#181e1a]/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 text-center">
          <h2 className="text-2xl text-red-400 mb-4">Unable to load blog</h2>
          <p className="text-gray-300">Please try again later</p>
          <Link href="/blogs" className="inline-flex items-center gap-2 px-6 py-3 mt-6 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition shadow">
            <FaArrowLeft /> Back to Blogs
          </Link>
        </div>
      </div>
    );
  }
}
