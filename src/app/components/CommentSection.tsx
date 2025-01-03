'use client'

import { useState } from 'react'
import { Comment } from '../../../lib/types'
import { User, Edit2, Check, Trash2, X } from 'lucide-react'

export default function CommentSection({ postId, initialComments }: { postId: string, initialComments: Comment[] }) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [editedContent, setEditedContent] = useState('')
  const [error, setError] = useState<string | null>(null)

  const MAX_COMMENT_LENGTH = 500

  const handleAddComment = async () => {
    if (newComment.trim()) {
      if (newComment.length > MAX_COMMENT_LENGTH) {
        setError(`Comment must be ${MAX_COMMENT_LENGTH} characters or less`)
        return
      }
      const comment: Comment = {
        id: Date.now().toString(),
        content: newComment,
        author: 'Anonymous',
        date: new Date().toISOString(),
      }
      try {
        const response = await fetch('/api/comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId, comment }),
        })
        if (response.ok) {
          setComments([...comments, comment])
          setNewComment('')
          setError(null)
        } else {
          throw new Error('Failed to add comment')
        }
      } catch (err) {
        console.error('Error:', err) // Logs error for debugging
        setError('Failed to add comment. Please try again.')
      }
    } else {
      setError('Comment cannot be empty')
    }
  }

  const handleStartEditing = (comment: Comment) => {
    setEditingCommentId(comment.id)
    setEditedContent(comment.content)
  }

  const handleSaveEdit = async (commentId: string) => {
    if (editedContent.trim()) {
      if (editedContent.length > MAX_COMMENT_LENGTH) {
        setError(`Comment must be ${MAX_COMMENT_LENGTH} characters or less`)
        return
      }
      try {
        const response = await fetch('/api/comments', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId, commentId, content: editedContent }),
        })
        if (response.ok) {
          setComments(comments.map(comment => 
            comment.id === commentId ? { ...comment, content: editedContent } : comment
          ))
          setEditingCommentId(null)
          setError(null)
        } else {
          throw new Error('Failed to update comment')
        }
      } catch (err) {
        console.error('Error:', err) // Logs error for debugging
        setError('Failed to update comment. Please try again.')
      }
    } else {
      setError('Comment cannot be empty')
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        const response = await fetch('/api/comments', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId, commentId }),
        })
        if (response.ok) {
          setComments(comments.filter(comment => comment.id !== commentId))
        } else {
          throw new Error('Failed to delete comment')
        }
      } catch (err) {
        console.error('Error:', err) // Logs error for debugging
        setError('Failed to delete comment. Please try again.')
      }
    }
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6 text-black">Comments</h3>
      <div className="space-y-6 mb-8">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-6 rounded-lg shadow-md">
            {editingCommentId === comment.id ? (
              <div className="space-y-4">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={3}
                />
                <div className="flex justify-between">
                  <button
                    onClick={() => handleSaveEdit(comment.id)}
                    className="text-orange-600 hover:text-orange-800 transition-colors flex items-center"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCommentId(null)}
                    className="text-gray-600 hover:text-gray-800 transition-colors flex items-center"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-800 mb-4">{comment.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>{comment.author}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(comment.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleStartEditing(comment)}
                      className="text-orange-600 hover:text-orange-800 transition-colors flex items-center"
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-600 hover:text-red-800 transition-colors flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <textarea
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value)
            setError(null)
          }}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          rows={4}
          placeholder="Add a comment..."
          maxLength={MAX_COMMENT_LENGTH}
        ></textarea>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-500">
            {newComment.length}/{MAX_COMMENT_LENGTH} characters
          </span>
          <button
            onClick={handleAddComment}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Add Comment
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  )
}
