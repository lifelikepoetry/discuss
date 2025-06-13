import { queryCommentList } from '@/db/query/query-comment-list'
import CommentShowComponent from './comment-show-component'

export default async function CommentShow({ postId }: { postId: string }) {
    const comments = await queryCommentList(postId)
    const rootComments = comments.filter((comment) => comment.parentId === null)
    return (
        <div className='space-y-4'>
            <p className='font-bold'>All {comments.length} comments</p>
            {rootComments.map((comment) => (
                <CommentShowComponent key={comment.id} comment={comment} postId={postId} childComments={comments}>
                </CommentShowComponent>
            ))}
        </div>
    )
}