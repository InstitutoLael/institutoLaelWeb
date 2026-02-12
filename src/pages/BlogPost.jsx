import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { BLOG_POSTS } from '../data/blog';
import ArticleLayout from '../components/ArticleLayout';

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  const formattedDate = format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: es });

  return (
    <ArticleLayout
       title={post.title}
       description={post.excerpt}
       image={post.image}
       category={post.category}
       date={formattedDate}
       author={post.author}
    >
       <Markdown 
         remarkPlugins={[remarkGfm]}
         components={{
            // Custom renderer overrides if needed
            h1: ({node, ...props}) => <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8 mt-12" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6 mt-12 flex items-center gap-3 after:h-px after:flex-1 after:bg-white/10" {...props} />,
            p: ({node, ...props}) => <p className="mb-6 text-slate-300 leading-relaxed font-light text-lg md:text-xl" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-300" {...props} />,
            li: ({node, ...props}) => <li className="pl-2" {...props} />,
            blockquote: ({node, ...props}) => (
               <blockquote className="border-l-4 border-indigo-500 pl-6 italic text-xl text-slate-400 my-10 bg-white/5 p-8 rounded-r-2xl" {...props} />
            )
         }}
       >
          {post.content}
       </Markdown>
    </ArticleLayout>
  );
}
