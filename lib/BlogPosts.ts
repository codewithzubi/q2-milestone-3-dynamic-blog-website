import { BlogPost, Comment } from './types'

const STORAGE_KEY = 'ai-blog-posts'

// Fixed blog posts
const fixedBlogPosts: BlogPost[] = [
  {
    id: 'fixed-1',
    title: 'The Future of AI in Healthcare',
    author: 'Dr. Jane Smith',
    date: '01.05.2024',
    excerpt: 'Exploring how artificial intelligence is revolutionizing the healthcare industry...',
    content: 'Artificial intelligence is making significant strides in the healthcare sector. From diagnosis to treatment planning, AI is enhancing the capabilities of healthcare professionals and improving patient outcomes...',
    image: '/img1.jpg',
    comments: []
  },
  {
    id: 'fixed-2',
    title: 'Ethics in AI: Navigating the Gray Areas',
    author: 'Prof.Ameen Alam',
    date: '01-02-2025',
    excerpt: 'Discussing the ethical considerations in AI development and deployment...',
    content: 'As AI becomes more prevalent in our daily lives, it\'s crucial to address the ethical implications. This post explores topics such as bias in AI algorithms, privacy concerns, and the responsible development of AI technologies...',
    image: '/img2.jpg',
    comments: []
  },
  {
    id: 'fixed-3',
    title: 'AI in Education: Personalizing Learning',
    author: 'Sir Zia Khan',
    date: '01-01-2025',
    excerpt: 'How AI is transforming education through personalized learning experiences...',
    content: 'Artificial intelligence is revolutionizing education by enabling personalized learning experiences. This post examines how AI-powered educational tools can adapt to individual student needs, provide instant feedback, and enhance the overall learning process...',
    image: '/img3.jpg',
    comments: []
  }
]

// Function to get blog posts from local storage
function getStoredBlogPosts(): BlogPost[] {
  if (typeof window === 'undefined') return []
  const storedPosts = localStorage.getItem(STORAGE_KEY)
  return storedPosts ? JSON.parse(storedPosts) : []
}

// Function to save blog posts to local storage
function saveBlogPosts(posts: BlogPost[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const storedPosts = getStoredBlogPosts()
  return [...fixedBlogPosts, ...storedPosts]
}

export async function getBlogPost(id: string): Promise<BlogPost | undefined> {
  const allPosts = await getBlogPosts()
  return allPosts.find(post => post.id === id)
}

export async function addBlogPost(newPost: BlogPost): Promise<void> {
  const storedPosts = getStoredBlogPosts()
  storedPosts.unshift(newPost)
  saveBlogPosts(storedPosts)
  console.log('New colorful blog post added:', newPost)
}

export async function deleteBlogPost(id: string): Promise<void> {
  const storedPosts = getStoredBlogPosts()
  const updatedPosts = storedPosts.filter(post => post.id !== id)
  saveBlogPosts(updatedPosts)
  console.log('Blog post deleted:', id)
}

export async function addComment(postId: string, comment: Comment): Promise<void> {
  const allPosts = await getBlogPosts()
  const postIndex = allPosts.findIndex(post => post.id === postId)
  if (postIndex !== -1) {
    allPosts[postIndex].comments.push(comment)
    if (!fixedBlogPosts.some(post => post.id === postId)) {
      saveBlogPosts(allPosts.slice(fixedBlogPosts.length))
    }
  }
}

export async function updateComment(postId: string, commentId: string, updatedContent: string): Promise<void> {
  const allPosts = await getBlogPosts()
  const postIndex = allPosts.findIndex(post => post.id === postId)
  if (postIndex !== -1) {
    const commentIndex = allPosts[postIndex].comments.findIndex(comment => comment.id === commentId)
    if (commentIndex !== -1) {
      allPosts[postIndex].comments[commentIndex].content = updatedContent
      if (!fixedBlogPosts.some(post => post.id === postId)) {
        saveBlogPosts(allPosts.slice(fixedBlogPosts.length))
      }
    }
  }
}

export async function deleteComment(postId: string, commentId: string): Promise<void> {
  const allPosts = await getBlogPosts()
  const postIndex = allPosts.findIndex(post => post.id === postId)
  if (postIndex !== -1) {
    allPosts[postIndex].comments = allPosts[postIndex].comments.filter(comment => comment.id !== commentId)
    if (!fixedBlogPosts.some(post => post.id === postId)) {
      saveBlogPosts(allPosts.slice(fixedBlogPosts.length))
    }
  }
}

