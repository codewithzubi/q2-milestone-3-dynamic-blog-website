// File: src/lib/BlogPosts.ts
import { BlogPost } from '../lib/types'

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Colorful World of AI',
    author: 'Alice Johnson',
    date: '2023-07-01',
    excerpt: 'Exploring how AI is bringing vibrant changes to various industries...',
    content: `<p>Artificial Intelligence is not just about algorithms and data...</p>`,
    image: '/img1.jpg',
    comments: []
  },
  {
    id: '2',
    title: 'The Vibrant Palette of Machine Learning',
    author: 'Bob Smith',
    date: '2023-07-15',
    excerpt: 'Discover how machine learning algorithms are creating a spectrum of possibilities...',
    content: `<p>Machine Learning, a subset of AI, is like a box of colorful crayons...</p>`,
    image: '/img2.jpg',
    comments: []
  }
]

export async function getBlogPosts(): Promise<BlogPost[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(blogPosts), 100)
  })
}

export async function getBlogPost(id: string): Promise<BlogPost | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(blogPosts.find(post => post.id === id)), 100)
  })
}

export async function addBlogPost(newPost: BlogPost): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      blogPosts.unshift(newPost)
      console.log('New colorful blog post added:', newPost)
      resolve()
    } catch (error) {
      console.error('Error adding new colorful blog post:', error)
      reject(new Error('Failed to add new colorful blog post'))
    }
  })
}
