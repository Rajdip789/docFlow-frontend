import { useState } from "react";
import { useParams } from "react-router-dom";

import dayjs from "dayjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import CommentBox from "./CommentBox";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { MdClose, MdDeleteForever, MdDriveFileRenameOutline, MdOutlineAddComment } from "react-icons/md"

import useAuth from "@/hooks/useAuth";
import { useDeleteCommentMutation, useGetCommentsQuery } from "@/lib/react-query/queries";

const CommentSection = ({ isCommentSectionOpen, setIsCommentSectionOpen } : { isCommentSectionOpen : boolean, setIsCommentSectionOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const { user } = useAuth();
	const { docId } = useParams<keyof IdType>() as IdType
	
	const [editMode, setEditMode] = useState(false);
	const [commentBoxOpen, setCommentBoxOpen] = useState(false);
	const [editData, setEditData] = useState<{ comment_id: string, comment_msg: string } | null>(null);

	const { isPending, data } = useGetCommentsQuery(docId);
	const deleteCommentMutaton = useDeleteCommentMutation(docId);

	return (
		<div className="mt-4 p-2.5 w-[22rem] bg-violet-200 rounded-lg overflow-hidden" style={ isCommentSectionOpen? { transition: "all 0.5s ease-in-out", marginLeft: "32px", marginRight: "8px", visibility: "visible" } : { transition: "all 0.5s ease-in-out", width: 0, padding: 0, marginLeft: 0, marginRight: 0, border: 0, visibility: "hidden" }}>
			<div className="flex justify-between items-center gap-2 h-8 w-full p-1 mb-3">
				<p className="text-xl font-medium font-sans text-slate-800">Comments</p>
				<div className="app-flex gap-2 p-1 mt-1">
					<div className="app-flex w-10 h-10 cursor-pointer rounded-full hover:bg-violet-100 duration-75">
						<MdOutlineAddComment color='#6403ff' size={25} onClick={() => setCommentBoxOpen(true)} />
					</div>
					<div 
						className="app-flex w-10 h-10 cursor-pointer rounded-full hover:bg-violet-100 duration-75"
						onClick={() => setIsCommentSectionOpen(prev => !prev)}
					>
						<MdClose cl size={25} />
					</div>
				</div>
			</div>

			<CommentBox docId={docId} commentBoxOpen={commentBoxOpen} editMode={editMode} editData={editData} closeCommentBox={() => { setEditMode(false); setEditData(null); setCommentBoxOpen(false) }}/>

			<div className="mx-1">
				{ 
					isPending &&
					<div className="flex items-center justify-center flex-col gap-1 w-full h-full" >
						<svg className="animate-spin h-7 w-7 text-violet-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
							<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						<p>Loading...</p>
					</div>
				}
				{
					data && data?.data.docComments.map((comment: commentType) => {
						return (
							<div key={comment._id} className="p-3 my-3 bg-violet-100 border-violet-400 rounded-md">
								<div className="flex justify-between items-center">
									<div className="flex flex-col gap-0">
										<div className="font-medium text-lg">{comment.username}</div>
										<span className="text-xs">{dayjs(comment.createdAt).format('h:mm A MMM D')}</span>
									</div>
									<DropdownMenu modal={false}>
										<DropdownMenuTrigger className="app-flex hover:bg-violet-200 h-8 w-8 rounded-full">
											<IoEllipsisVerticalOutline />
										</DropdownMenuTrigger>
										<DropdownMenuContent className="shadow-md bg-white rounded-sm border p-2">
											<DropdownMenuItem
												disabled={comment.user_id !== user.id}
												className="flex items-center py-1 px-2 rounded-sm hover:!bg-violet-200 cursor-pointer"
												onClick={() => { if(comment.user_id !== user.id) return; setCommentBoxOpen(true); setEditMode(true); setEditData({ comment_id: comment._id, comment_msg: comment.msg }) }}
											>
												<MdDriveFileRenameOutline className="mr-3" />
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem
												disabled={comment.user_id !== user.id}
												className="flex items-center py-1 px-2 rounded-sm hover:!bg-violet-200 cursor-pointer"
												onClick={() => { if(comment.user_id !== user.id) return; deleteCommentMutaton.mutate(comment._id) }}
											>
												<MdDeleteForever className="mr-3" />
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
								<div className="my-1 text-sm">{comment.msg}</div>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

export default CommentSection