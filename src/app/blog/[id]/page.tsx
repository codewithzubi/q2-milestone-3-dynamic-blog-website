import Image from 'next/image';
import { getBlogPost, getBlogPosts } from '../../../../lib/BlogPosts';
import CommentSection from '../../components/CommentSection';
import { Calendar, User } from 'lucide-react';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

// Ensure params matches Next.js type expectations
type PageProps = {
  params: Promise<{ id: string }>; // Wrap params in Promise
};

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params; // Resolve the promise
  const post = await getBlogPost(resolvedParams.id);

  if (!post) {
    return (
      <div className="text-center text-2xl mt-12 text-text">
        Post not found
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      <Image
        src={post.image || '/placeholder.svg?height=400&width=800'}
        alt={post.title}
        width={800}
        height={400}
        className="w-full h-64 object-cover rounded-lg shadow-lg mb-8"
      />
      <h1 className="text-4xl font-bold mb-4 text-heading">{post.title}</h1>
      <div className="flex items-center text-gray-600 mb-8">
        <User className="w-5 h-5 mr-2" />
        <span className="mr-4">By {post.author}</span>
        <Calendar className="w-5 h-5 mr-2" />
        <span>{post.date}</span>
      </div>
      <div
        className="prose max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <CommentSection postId={resolvedParams.id} initialComments={post.comments} />
    </article>
  );
}
