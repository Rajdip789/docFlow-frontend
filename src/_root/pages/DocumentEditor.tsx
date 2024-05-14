import Quill, { Sources, TextChangeHandler } from 'quill'
import "quill/dist/quill.snow.css"
import { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import useSocket from '@/hooks/useSocket';
import LoadingUi from '@/components/shared/LoadingUi';
import EditorHeader from '@/components/shared/Editor/EditorHeader';

import { MdErrorOutline } from 'react-icons/md';
import { useGetDocumentQuery } from '@/lib/react-query/queries';
import { SAVE_INTERVAL_MS, templateStrings, toolbar } from '@/constants';
import Delta from 'quill-delta';
import { AppDataContext } from '@/context/AppDataProvider';

import { saveAs } from 'file-saver';
import * as quillToWord from 'quill-to-word';

interface IdType {
	docId: string
}

const DocumentEditor = () => {
	const location = useLocation();
	const { doc, setDoc } = useContext(AppDataContext);
	const { docId } = useParams<keyof IdType>() as IdType
	const { isPending, isError, data } = useGetDocumentQuery(docId);

	const [isSaved, setIsSaved] = useState(true);
	const [socketReady, setSocketReady] = useState(false);

	const socket = useSocket();
	const [quill, setQuill] = useState<Quill>()

	useEffect(() => {
		if (!socket || !quill || !data) return;
		setSocketReady(true);
	}, [socket, quill, data])

	//Load document
	useEffect(() => {

		if (socketReady && socket && quill && data) {

			const docs = data?.data?.doc;

			setDoc({
				id: docs._id,
				title: docs.title,
				owner_id: docs.owner_id,
				email_access: docs.email_access,
				updatedAt: docs.updatedAt,
				linkIsActive: docs.link_access.is_active
			})

			socket.emit('ready', docId);

			if (location?.state?.index) quill.clipboard.dangerouslyPasteHTML(0, templateStrings[location?.state?.index]);
			else quill.setContents(docs.content);
			quill.enable()
		}

	}, [socketReady])

	//Auto save
	useEffect(() => {
		if (socket == null || quill == null) return;

		const interval = setInterval(() => {
			socket.emit("save-document", docId, quill.getContents());
		}, SAVE_INTERVAL_MS)

		return () => {
			clearInterval(interval)
		}
	}, [socket, quill])

	useEffect(() => {
		if (socket == null) return

		const handler = () => {
			setIsSaved(true);
		}
		socket.on("save-document-success", handler)

		return () => {
			socket.off("save-document-success", handler)
		}
	}, [socket])


	/* Send and receive changes */
	useEffect(() => {
		if (socket == null || quill == null) return

		const handler = (delta: Delta) => {
			quill.updateContents(delta)
		}
		socket.on("receive-changes", handler)

		return () => {
			socket.off("receive-changes", handler)
		}
	}, [socket, quill])

	useEffect(() => {
		if (socket == null || quill == null) return

		const handler: TextChangeHandler = (delta: Delta, _oldDelta: Delta, source: Sources) => {
			if (source !== "user") return;
			setIsSaved(false);

			socket.emit("send-changes", delta)
		}
		quill.on("text-change", handler)

		return () => {
			quill.off("text-change", handler)
		}
	}, [socket, quill])

	const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
		if (wrapper == null) return;

		wrapper.innerHTML = ""
		const editor = document.createElement("div");
		wrapper.append(editor);

		const q = new Quill(editor, {
			theme: "snow",
			modules: { toolbar },
			placeholder: 'Start writing...',
		})

		setQuill(q);
	}, [])

	const handleDownload = async () => {
		const quillDelta = quill!.getContents();
		const docAsBlob = await quillToWord.generateWord(quillDelta, { exportAs: 'blob' }) as Blob;
		saveAs(docAsBlob, `${doc.title}.docx`);
	}

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
			<EditorHeader DocId={docId} saveState={isSaved} handleDownload={handleDownload} quill={quill as Quill} />
			<div className='mt-[4.5rem] bg-violet-100'>
				<div className='container' ref={wrapperRef}>
					{/* <div ref={wrapperRef}></div> */}
				</div>
			</div>
		</div>
	)
}

export default DocumentEditor
