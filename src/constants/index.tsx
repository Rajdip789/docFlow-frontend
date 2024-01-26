export const toolbarModules = {
	toolbar: [
		["bold", "italic", "underline", "strike"],
		["blockquote", "code-block"],

		[{ header: 1 }],
		[{ list: "ordered" }, { list: "bullet" }],
		[{ script: "sub" }, { script: "super" }],
		[{ indent: "-1" }, { indent: "+1" }],
		[{ size: ["small", false, "large", "huge"] }],
		[{ header: [1, 2, 3, 4, 5, 6, false] }],

		[{ color: [] }, { background: [] }],
		[{ font: [] }],
		[{ align: [] }],
		["link", "image", "video"],
		['clean']
	],
};

export const templateStrings = [
	`
	<body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; color: #333; text-align: center;">
  
	  <header style="background-color: #3498db; color: #fff; padding: 10px;">
		<h1 style="margin: 0;">Inline Styles Demo</h1>
	  </header>
	  
	  <section style="padding: 20px;">
		<p style="font-size: 18px; line-height: 1.6;">Welcome to the inline styles demo. This is a simple HTML page with some inline styles applied to demonstrate how to use them directly within HTML elements.</p>
		<p style="font-style: italic;">Feel free to customize and experiment with the styles!</p>
	  </section>
	  
	  <footer style="background-color: #3498db; color: #fff; padding: 10px; position: fixed; bottom: 0; width: 100%;">
		<p style="margin: 0;">© 2024 Inline Styles Demo</p>
	  </footer>
	  
	</body>
  `,
  `<h1>Rajdip Pal</h1>`,
  `<h1>Rajdip Pal</h1>`,
  `<h1>Rajdip Pal</h1>`,
  `<h1>Rajdip Pal</h1>`,
  `<h1>Rajdip Pal</h1>`,
  `<h1>Rajdip Pal</h1>`
]