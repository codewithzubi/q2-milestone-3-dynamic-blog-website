import { BlogPost, Comment } from './types'

// This is a temporary in-memory store. In a real application, you'd use a database.
let blogPosts: BlogPost[] = []

export async function getBlogPosts(): Promise<BlogPost[]> {
  return blogPosts
}

export async function getBlogPost(id: string): Promise<BlogPost | undefined> {
  return blogPosts.find(post => post.id === id)
}

export async function addBlogPost(newPost: BlogPost): Promise<void> {
  blogPosts.unshift(newPost)
  console.log('New colorful blog post added:', newPost)
}

export async function deleteBlogPost(id: string): Promise<void> {
  blogPosts = blogPosts.filter(post => post.id !== id)
  console.log('Blog post deleted:', id)
}

export async function addComment(postId: string, comment: Comment): Promise<void> {
  const post = blogPosts.find(post => post.id === postId)
  if (post) {
    post.comments.push(comment)
  }
}

export async function updateComment(postId: string, commentId: string, updatedContent: string): Promise<void> {
  const post = blogPosts.find(post => post.id === postId)
  if (post) {
    const comment = post.comments.find(comment => comment.id === commentId)
    if (comment) {
      comment.content = updatedContent
    }
  }
}

export async function deleteComment(postId: string, commentId: string): Promise<void> {
  const post = blogPosts.find(post => post.id === postId)
  if (post) {
    post.comments = post.comments.filter(comment => comment.id !== commentId)
  }
}

