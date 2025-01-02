import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '../../../lib/types'
import { Calendar, MessageCircle } from 'lucide-react'

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <Image 
        src={post.image || "/placeholder.svg?height=200&width=400"} 
        alt={post.title} 
        width={400} 
        height={200} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">
          <Link href={`/blog/${post.id}`} className="text-black hover:text-indigo-800 transition-colors">
            {post.title}
          </Link>
        </h2>
        <div className="flex items-center text-gray-600 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{post.date}</span>
          <MessageCircle className="w-4 h-4 ml-4 mr-2" />
          <span>{post.comments.length} comments</span>
        </div>
        <p className="text-gray-700 mb-4">{post.excerpt}</p>
        <Link href={`/blog/${post.id}`} className="inline-block bg-black text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Read more
        </Link>
      </div>
    </article>
  )
}

