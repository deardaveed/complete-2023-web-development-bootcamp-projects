// 2. Create a App.jsx component.
import React from "react";
import ReactDom from "react-dom";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

function App() {
	return (
		<>
			<Header />
			<Note />
			<Footer />
		</>
	);
};

export default App;
