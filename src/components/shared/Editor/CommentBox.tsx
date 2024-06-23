import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import useAuth from "@/hooks/useAuth";
import { useAddCommentMutation, useEditCommentMutation } from "@/lib/react-query/queries";

const CommentBox = ({ docId, commentBoxOpen, editMode, editData, closeCommentBox } : { docId: string, commentBoxOpen: boolean, editMode: boolean , editData: { comment_id: string, comment_msg: string } | null, closeCommentBox: () => void }) => {
	const { user } = useAuth();

	const [commentText, setCommentText] = useState('');
	const addCommentMutation = useAddCommentMutation(docId);
	const editCommentMutation = useEditCommentMutation(docId);

	const saveComment = () => {
		if(commentText === '') return;
		if(editMode && editData) {
			editCommentMutation.mutate({ CommentId: editData.comment_id, comment: commentText });
		} else {
			addCommentMutation.mutate(commentText);
		}
		setCommentText('');
		closeCommentBox();
	}

	useEffect(() => {
	  if(editMode && editData) {
		setCommentText(editData.comment_msg);
	  }
	}, [editMode])

	return (
		<Card className={`absolute top-32 shadow-lg right-10 w-72 transition-opacity duration-300 transform ${commentBoxOpen ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none'}`}>
			<CardHeader>
				<CardTitle>{user.username}</CardTitle>
			</CardHeader>
			<CardContent>
				<input className="w-full border-2 rounded-md p-1.5 border-violet-400 outline-none" placeholder="Write a comment" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
			</CardContent>
			<CardFooter className="flex gap-2 justify-end">
				<Button className="rounded-full bg-white text-violet-600 hover:bg-violet-200 duration-75 cursor-pointer" onClick={() => { setCommentText(''); closeCommentBox(); }}>Cancel</Button>
				<Button className={`rounded-full ${commentText === '' ? 'cursor-not-allowed bg-violet-300' : 'cursor-pointer bg-violet-600'}`} onClick={saveComment}>Comment</Button>
			</CardFooter>
		</Card>
	)
}

export default CommentBox