/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoNgNARATAdA7DKFIEY4FYrpekAGOATgGZ11iVDCVjCDM4i8UpipXsaaRkIBTAHbI8YYCjDjJYESgC6kKAA4iAEwBGKCLKA=
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	ClassicEditor,
	Autoformat,
	AutoImage,
	Autosave,
	BalloonToolbar,
	BlockToolbar,
	Bold,
	CloudServices,
	Code,
	Essentials,
	FindAndReplace,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	FullPage,
	Fullscreen,
	GeneralHtmlSupport,
	Highlight,
	HtmlComment,
	HtmlEmbed,
	ImageBlock,
	ImageCaption,
	ImageEditing,
	ImageInline,
	ImageInsert,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	ImageUtils,
	Italic,
	Link,
	List,
	ListProperties,
	PageBreak,
	Paragraph,
	PasteFromMarkdownExperimental,
	ShowBlocks,
	SimpleUploadAdapter,
	SourceEditing,
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersMathematical,
	SpecialCharactersText,
	Subscript,
	Superscript,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TextPartLanguage,
	TextTransformation,
	Title,
	TodoList,
	Underline,
	WordCount
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

// import './App.css';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

export default function Editor({ props }) {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const editorWordCountRef = useRef(null);
	const editorInstanceRef = useRef(null)
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	//new effect : update editor content
	useEffect(()=>{
		if(editorInstanceRef.current && props?.initialData){
			editorInstanceRef.current.setData(props.initialData)
		}
	},[props?.initialData])


	const { editorConfig } = useMemo(() => {
		if (!isLayoutReady) {
			return {};
		}

		const isMobile = window.innerWidth < 640; // Tailwind "sm"

		return {
			editorConfig: {
				toolbar: {
					items: isMobile
						? [
							'bold',
							'italic',
							'underline',
							'link',
							'bulletedList',
							'numberedList'
						]
						: [
							'|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'undo', 'redo',
							// 'undo',
							// 'redo',
							// '|',
							// 'sourceEditing',
							// 'showBlocks',
							// 'findAndReplace',
							// 'textPartLanguage',
							// 'fullscreen',
							// '|',
							'fontSize',
							// 'fontFamily',
							// 'fontColor',
							// 'fontBackgroundColor',
							// '|',
							// 'bold',
							// 'italic',
							// 'underline',
							// 'subscript',
							// 'superscript',
							// 'code',
							// '|',
							// 'specialCharacters',
							// 'pageBreak',
							// 'link',
							'insertImage',
							// 'insertTable',
							// 'highlight',
							// 'htmlEmbed',
							// '|',
							// 'bulletedList',
							// 'numberedList',
							// 'todoList'
						],
					shouldNotGroupWhenFull: false
				},
				plugins: [
					Autoformat,
					AutoImage,
					Autosave,
					BalloonToolbar,
					BlockToolbar,
					Bold,
					CloudServices,
					Code,
					Essentials,
					FindAndReplace,
					FontBackgroundColor,
					FontColor,
					FontFamily,
					FontSize,
					FullPage,
					Fullscreen,
					GeneralHtmlSupport,
					Highlight,
					HtmlComment,
					HtmlEmbed,
					ImageBlock,
					ImageCaption,
					ImageEditing,
					ImageInline,
					ImageInsert,
					ImageInsertViaUrl,
					ImageResize,
					ImageStyle,
					ImageToolbar,
					ImageUpload,
					ImageUtils,
					Italic,
					Link,
					List,
					ListProperties,
					PageBreak,
					Paragraph,
					PasteFromMarkdownExperimental,
					ShowBlocks,
					SimpleUploadAdapter,
					SourceEditing,
					SpecialCharacters,
					SpecialCharactersArrows,
					SpecialCharactersCurrency,
					SpecialCharactersEssentials,
					SpecialCharactersLatin,
					SpecialCharactersMathematical,
					SpecialCharactersText,
					Subscript,
					Superscript,
					Table,
					TableCaption,
					TableCellProperties,
					TableColumnResize,
					TableProperties,
					TableToolbar,
					TextPartLanguage,
					TextTransformation,
					Title,
					TodoList,
					Underline,
					WordCount
				],
				balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
				blockToolbar: [
					'fontSize',
					'fontColor',
					'fontBackgroundColor',
					'|',
					'bold',
					'italic',
					'|',
					'link',
					'insertImage',
					'insertTable',
					'|',
					'bulletedList',
					'numberedList'
				],
				fontFamily: {
					supportAllValues: true
				},
				fontSize: {
					options: [10, 12, 14, 'default', 18, 20, 22],
					supportAllValues: true
				},
				fullscreen: {
					onEnterCallback: container =>
						container.classList.add(
							'editor-container',
							'editor-container_classic-editor',
							'editor-container_include-block-toolbar',
							'editor-container_include-word-count',
							'editor-container_include-fullscreen',
							'main-container'
						)
				},
				htmlSupport: {
					allow: [
						{
							name: /^.*$/,
							styles: true,
							attributes: true,
							classes: true
						}
					]
				},
				image: {
					toolbar: ['toggleImageCaption', '|', 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|', 'resizeImage']
				},
				initialData: props?.initialData || '',
				licenseKey: LICENSE_KEY,
				link: {
					addTargetToExternalLinks: true,
					defaultProtocol: 'https://',
					decorators: {
						toggleDownloadable: {
							mode: 'manual',
							label: 'Downloadable',
							attributes: {
								download: 'file'
							}
						}
					}
				},
				list: {
					properties: {
						styles: true,
						startIndex: true,
						reversed: true
					}
				},
				placeholder: 'Type or paste your content here!',
				table: {
					contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
				}
			}
		};
	}, [isLayoutReady]);

	return (
		<div className="main-container">
			<div
				className="editor-container editor-container_classic-editor editor-container_include-block-toolbar editor-container_include-word-count editor-container_include-fullscreen"
				ref={editorContainerRef}
			>
				<div className="editor-container__editor">
					<div ref={editorRef}>
						{editorConfig && (
							<CKEditor
								data={props?.initialData || ''}
								onChange={props.onChange}
								onReady={editor => {
									editorInstanceRef.current = editor
									const wordCount = editor.plugins.get('WordCount');
									editorWordCountRef.current.appendChild(wordCount.wordCountContainer);
								}}
								onAfterDestroy={() => {
									if (editorWordCountRef.current) {
										Array.from(editorWordCountRef.current.children || []).forEach(child => child.remove());
										editorWordCountRef.current = null;
									}
									editorInstanceRef.current = null
								}}
								editor={ClassicEditor}
								config={editorConfig}
							/>
						)}
					</div>
				</div>
				<div className="editor_container__word-count" ref={editorWordCountRef}></div>
			</div>
		</div>
	);
}
