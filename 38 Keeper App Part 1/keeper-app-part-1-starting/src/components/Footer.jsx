// 4. Create a Footer.jsx component that renders a <footer> element
// to show a copyright message in a <p> with a dynamically updated year.
import React from "react";

const year = new Date().getFullYear();

function Footer() {
	return (
		<footer>
			<p>Copyright ⓒ {year}</p>
		</footer>
	);
};

export default Footer;
