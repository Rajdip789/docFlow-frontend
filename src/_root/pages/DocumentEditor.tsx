import Quill from 'quill'
import "quill/dist/quill.snow.css"
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import useSocket from '@/hooks/useSocket';
import LoadingUi from '@/components/shared/LoadingUi';
import EditorHeader from '@/components/shared/Editor/EditorHeader';

import { MdErrorOutline } from 'react-icons/md';
import { useGetDocumentQuery } from '@/lib/react-query/queries';
import { SAVE_INTERVAL_MS, templateStrings, toolbar } from '@/constants';

interface IdType {
	docId: string
}

const DocumentEditor = () => {
	const location = useLocation();
	const { docId } = useParams<keyof IdType>() as IdType
	const { isPending, isError, data } = useGetDocumentQuery(docId);

	const socket = useSocket();
	const [quill, setQuill] = useState<Quill>()

	useEffect(() => {
		if (socket == null || quill == null || !data) return;

		const content = data?.data?.doc?.content;

		if (location?.state?.index) quill.clipboard.dangerouslyPasteHTML(0, templateStrings[location?.state?.index]);
		else quill.setContents(content);
		quill.enable()

	}, [socket, quill, data])

	useEffect(() => {
		if (socket == null || quill == null) return;

		const interval = setInterval(() => {
			socket.emit("save-document", docId, quill.getContents())
		}, SAVE_INTERVAL_MS)

		return () => {
			clearInterval(interval)
		}
	}, [socket, quill])

	const wrapperRef = useCallback((wrapper: { innerHTML: string; append: (arg0: HTMLDivElement) => void; } | null) => {
		if (wrapper == null) return;

		wrapper.innerHTML = ""
		const editor = document.createElement("div")
		wrapper.append(editor);

		const q = new Quill(editor, {
			theme: "snow",
			modules: { toolbar },
			placeholder: 'Start writing...',
		})

		setQuill(q);
	}, [])

	if (isPending) return <LoadingUi />

	if (isError) {
		return (
			<div className="flex justify-center w-full">
				<div className="m-10 h-40 w-1/2 p-5 border shadow-lg flex flex-col justify-center items-center">
					<p className="flex font-bold md:text-lg items-center text-red-500 text-center"><MdErrorOutline className="h-8 w-8 mr-2" /> Access Required</p>
					<p className="pt-3 text-center">
						You have not sufficient privileges to view this document...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='w-full min-w-[768px] bg-violet-100 !overflow-y-scroll'>
			<EditorHeader name={location?.state?.Name} DocId={docId} />
			<div className='mt-[4.5rem] bg-violet-100'>
				<div className='container' ref={wrapperRef}></div>
			</div>

		</div>
	)
}

export default DocumentEditor
