import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
	ClassicEditor,
	AccessibilityHelp,
	Alignment,
	AutoLink,
	Autosave,
	Bold,
	CloudServices,
	Essentials,
	Heading,
	Italic,
	Link,
	List,
	Mention,
	Paragraph,
	SelectAll,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	Undo
} from 'ckeditor5';
import { ExportPdf, MergeFields, MultiLevelList, Template, SlashCommand } from 'ckeditor5-premium-features';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

import './App.css';

/**
 * Please update the following values with your actual tokens.
 * Instructions on how to obtain them: https://ckeditor.com/docs/trial/latest/guides/real-time/quick-start.html
 */
const LICENSE_KEY = '';

export default function App() {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const editorConfig = {
		toolbar: {
			items: [
				'undo',
				'redo',
				'|',
				'insertMergeField',
				'previewMergeFields',
				'|',
				'exportPdf',
				'|',
				'heading',
				'|',
				'bold',
				'italic',
				'|',
				'link',
				'insertTable',
				'insertTemplate',
				'|',
				'alignment',
				'|',
				'bulletedList',
				'numberedList',
				'multiLevelList'
			],
			shouldNotGroupWhenFull: false
		},
		plugins: [
			AccessibilityHelp,
			Alignment,
			AutoLink,
			Autosave,
			Bold,
			CloudServices,
			Essentials,
			ExportPdf,
			Heading,
			Italic,
			Link,
			List,
			Mention,
			MergeFields,
			MultiLevelList,
			Paragraph,
			SelectAll,
			Table,
			TableCaption,
			TableCellProperties,
			TableColumnResize,
			TableProperties,
			TableToolbar,
			Template,
			Undo, 
			SlashCommand
		],
		slashCommand: {
			removeCommands: [ 'heading', 'paragraph', 'bulletedList', 'numberedList', 'insertTable' ]
		},
		exportPdf: {
			stylesheets: [
				/* This path should point to application stylesheets. */
				/* See: https://ckeditor.com/docs/ckeditor5/latest/features/converters/export-pdf.html */
				'./App.css',
				/* Export PDF needs access to stylesheets that style the content. */
				'https://cdn.ckeditor.com/ckeditor5/43.3.1/ckeditor5.css',
				'https://cdn.ckeditor.com/ckeditor5-premium-features/43.3.1/ckeditor5-premium-features.css'
			],
			fileName: 'export-pdf-demo.pdf',
			converterOptions: {
				format: 'Tabloid',
				margin_top: '20mm',
				margin_bottom: '20mm',
				margin_right: '24mm',
				margin_left: '24mm',
				page_orientation: 'portrait'
			}
		},
		heading: {
			options: [
				{
					model: 'paragraph',
					title: 'Paragraph',
					class: 'ck-heading_paragraph'
				},
				{
					model: 'heading1',
					view: 'h1',
					title: 'Heading 1',
					class: 'ck-heading_heading1'
				},
				{
					model: 'heading2',
					view: 'h2',
					title: 'Heading 2',
					class: 'ck-heading_heading2'
				},
				{
					model: 'heading3',
					view: 'h3',
					title: 'Heading 3',
					class: 'ck-heading_heading3'
				},
				{
					model: 'heading4',
					view: 'h4',
					title: 'Heading 4',
					class: 'ck-heading_heading4'
				},
				{
					model: 'heading5',
					view: 'h5',
					title: 'Heading 5',
					class: 'ck-heading_heading5'
				},
				{
					model: 'heading6',
					view: 'h6',
					title: 'Heading 6',
					class: 'ck-heading_heading6'
				}
			]
		},
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
		mention: {
			feeds: [
				{
					marker: '@',
					feed: [
						/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
					]
				}
			]
		},
		mergeFields: {
			definitions: [
				{
					id: 'myName',
					label: 'My Name',
					defaultValue: 'John Doe'
				},
				{
					id: 'invoiceDate',
					label: 'Invoice Date',
					defaultValue: '2024-06-01'
				},
			]
		},
		placeholder: 'Type or paste your content here!',
		table: {
			contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
			defaultHeadings: { rows: 1 }
		},
		template: {
			definitions: [
				{
					title: 'Invoice',
					description: 'Simple and clean invoice',
					data: `<h1 style="text-align:center;">
								Invoice #1
							</h1>
							<figure class="table" style="width:100%;">
								<table style="border-style:none;">
									<thead>
										<tr>
											<th style="border-style:none;">
												Sender
											</th>
											<th style="border-style:none;">
												Bill To
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td style="border-style:none;">
												<p>
													<strong>{{myName}}</strong><br>
													1234 Street Name<br>
													City, State, 56789<br>
													<strong>Email</strong>: sender@example.com 
												</p>
												<p>
													<strong>Phone</strong>: (123) 456-7890
												</p>
											</td>
											<td style="border-style:none;">
												<p>
													<strong>Client Name</strong><br>
													5678 Client Street<br>
													Client City, Client State, 98765 
												</p>
												<p>
													<strong>Email</strong>: client@example.com 
												</p>
												<p>
													<strong>Phone</strong>: (987) 654-3210
												</p>
											</td>
										</tr>
									</tbody>
								</table>
							</figure>
							<figure class="table" style="width:100%;">
								<table style="border-style:none;">
									<tbody>
										<tr>
											<td style="border-style:none;">
												<strong>Invoice Date:</strong>
											</td>
											<td style="border-style:none;">
												<strong>Due Date:</strong>
											</td>
											<td style="border-style:none;">
												<strong>Payment Method:</strong>
											</td>
										</tr>
										<tr>
											<td style="border-style:none;">
												{{invoiceDate}}
											</td>
											<td style="border-style:none;">
												2024-06-01
											</td>
											<td style="border-style:none;">
												Bank Transfer
											</td>
										</tr>
									</tbody>
								</table>
							</figure>
							<figure class="table" style="width:100%;">
								<table>
									<thead>
										<tr>
											<th>
												Description
											</th>
											<th>
												Quantity
											</th>
											<th>
												Unit Price
											</th>
											<th>
												Amount
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												Website Design & Development
											</td>
											<td>
												1
											</td>
											<td>
												$1000.00
											</td>
											<td>
												$1000.00
											</td>
										</tr>
										<tr>
											<td>
												SEO Optimization
											</td>
											<td>
												1
											</td>
											<td>
												$300.00
											</td>
											<td>
												$300.00
											</td>
										</tr>
									</tbody>
								</table>
							</figure>
							<p style="text-align:right;">
								<strong>Subtotal: $1300.00</strong>
							</p>
							<p style="text-align:right;">
								<strong>Tax (10%): $130.00</strong>
							</p>
							<p style="text-align:right;">
								<strong>Total: $1439.00</strong>
							</p>
							<h2>
								<strong>Bank Acoount Details</strong>
							</h2>
							<ul>
								<li>
									<strong>Bank Name: </strong>XYZ Bank
								</li>
								<li>
									<strong>Account Number: </strong>123456789
								</li>
								<li>
									<strong>SWIFT Code: </strong>XYZBANK123
								</li>
							</ul>
							<p style="text-align:center;">
								 
							</p>
							<p style="text-align:center;">
								Thank you for your business!
							</p>
							<p style="text-align:center;">
								If you have any questions about this invoice, please contact us at sender@example.com or (123) 456-7890
							</p>`
				},
			]
		},
	};


	return (
		<div>
			<div className="main-container">
				<div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
					<div className="editor-container__editor">
						<div ref={editorRef}>{isLayoutReady && <CKEditor editor={ClassicEditor} config={editorConfig} />}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
