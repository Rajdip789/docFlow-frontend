import { useCallback, useEffect, useState } from 'react';
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import { useLocation, useParams } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';
import useSocket from '@/hooks/useSocket';
import EditorHeader from '@/components/shared/Editor/EditorHeader';
import { SAVE_INTERVAL_MS, templateStrings, toolbar } from '@/constants';

const DocumentEditor = () => {
	const { user } = useAuth();
	const { docId } = useParams();
	const location = useLocation();

	const socket = useSocket();
	const [quill, setQuill] = useState<Quill>()


	useEffect(() => {
		if (socket == null || quill == null) return

		socket.once("load-document", document => {
			quill.setContents(document)
			quill.enable()
		})

		socket.emit("get-document", docId, user.id, quill.getContents());
	}, [socket, quill, docId])

	useEffect(() => {
		if (socket == null || quill == null) return

		const interval = setInterval(() => {
			socket.emit("save-document", quill.getContents())
		}, SAVE_INTERVAL_MS)

		return () => {
			clearInterval(interval)
		}
	}, [socket, quill])

	const wrapperRef = useCallback((wrapper: { innerHTML: string; append: (arg0: HTMLDivElement) => void; } | null) => {
		if (wrapper == null) return;

		wrapper.innerHTML = ""
		const editor = document.createElement("div")
		wrapper.append(editor)

		const q = new Quill(editor, {
			theme: "snow",
			modules: { toolbar },
			placeholder: 'Start writing...',
		})

		if(typeof(docId) == 'string') q.clipboard.dangerouslyPasteHTML(0, templateStrings[Number(docId[8])]);
		setQuill(q)
	}, [])

	return (
		<div className='w-full bg-violet-100 !overflow-y-scroll'>
			<EditorHeader name = { location?.state?.Name || "Untitled Doc" }/>
			<div className='mt-[4.5rem] bg-violet-100'>
				<div className='container' ref={wrapperRef}></div>
			</div>
		</div >
	)
}

export default DocumentEditor
