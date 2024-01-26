import { useState } from 'react';
import ReactQuill from 'react-quill';
import { Delta as TypeDelta, Sources } from 'quill';
import 'react-quill/dist/quill.snow.css';

import { useParams } from 'react-router-dom';

import EditorHeader from '@/components/shared/Editor/EditorHeader';
import { templateStrings, toolbarModules } from '@/constants';

const DocumentEditor = () => {
	const { docId } = useParams();
	const [content, setContent] = useState(templateStrings[0]);

	console.log(docId);

	const handleChange = (value: string, delta: TypeDelta, source: Sources, editor: ReactQuill.UnprivilegedEditor) => {
		setContent(value);
		if (source != 'user') return;

		console.log(delta)
		console.log(editor.getContents());
	};

	return (
		<div className='w-full bg-violet-100'>
			<EditorHeader />
			<div className='container mt-[4.5rem] mx-auto bg-violet-100'>
				<ReactQuill
					theme="snow"
					value={content}
					placeholder='Start writing ...'
					onChange={handleChange}
					modules={toolbarModules}
					className="quill-editor"
				/>
			</div>
		</div>
	)
}

export default DocumentEditor
