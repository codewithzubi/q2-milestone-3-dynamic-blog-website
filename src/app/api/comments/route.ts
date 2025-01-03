import { NextResponse } from 'next/server'
import { addComment, updateComment, deleteComment } from '../../../../lib/BlogPosts'
import { Comment } from '../../../../lib/types'

export async function POST(request: Request) {
  const { postId, comment } = await request.json()
  await addComment(postId, comment as Comment)
  return NextResponse.json({ message: 'Comment added successfully' })
}

export async function PUT(request: Request) {
  const { postId, commentId, content } = await request.json()
  await updateComment(postId, commentId, content)
  return NextResponse.json({ message: 'Comment updated successfully' })
}

export async function DELETE(request: Request) {
  const { postId, commentId } = await request.json()
  await deleteComment(postId, commentId)
  return NextResponse.json({ message: 'Comment deleted successfully' })
}

