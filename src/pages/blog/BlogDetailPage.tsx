import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { apiFetch } from '@/services/api';
import { ArrowLeft, Clock, Tag, Eye, AlertCircle, Calendar } from 'lucide-react';
import SEO from '@/components/SEO';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  readTime: number;
  views: number;
  featured: boolean;
  createdAt: string;
}

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    apiFetch(`/blogs/${id}`)
      .then(setBlog)
      .catch(() => setError('Blog post not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="animate-pulse space-y-4 w-full max-w-3xl px-4">
        <div className="h-8 bg-gray-800 rounded w-3/4" />
        <div className="h-64 bg-gray-800 rounded" />
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`h-4 bg-gray-800 rounded ${i % 3 === 2 ? 'w-4/5' : 'w-full'}`} />
          ))}
        </div>
      </div>
    </div>
  );

  if (error || !blog) return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white gap-4">
      <AlertCircle size={48} className="text-red-400" />
      <p className="text-xl">{error || 'Post not found'}</p>
      <button onClick={() => navigate('/blog')} className="text-primary underline">Browse All Posts</button>
    </div>
  );

  return (
    <>
      <SEO
        title={blog.title}
        description={blog.excerpt}
        image={blog.coverImage}
        url={`https://rohitbirdawade.vercel.app/blog/${blog.slug || blog._id}`}
        type="article"
        keywords={blog.tags?.join(', ')}
      />

      <div className="min-h-screen bg-gray-950 text-white">
        {/* Nav */}
        <div className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <button onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={16} /> Back
            </button>
            {blog.tags?.[0] && (
              <span className="text-xs text-primary font-medium flex items-center gap-1">
                <Tag size={11} /> {blog.tags[0]}
              </span>
            )}
          </div>
        </div>

        {/* Cover */}
        {blog.coverImage && (
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img src={blog.coverImage} alt={blog.title}
              className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />
          </div>
        )}

        <div className="container mx-auto px-4 py-10 max-w-3xl">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1"><Clock size={13} /> {blog.readTime} min read</span>
            <span className="flex items-center gap-1"><Eye size={13} /> {blog.views} views</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{blog.title}</h1>

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20 font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Markdown Content */}
          <article className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-primary prose-code:text-primary prose-code:bg-gray-800 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-blockquote:border-l-primary prose-blockquote:text-gray-400">
            <ReactMarkdown>{blog.content || '*No content yet.*'}</ReactMarkdown>
          </article>
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;
