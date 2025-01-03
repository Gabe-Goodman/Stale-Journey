import Head from "next/head";
import Canvas from "./components/canvas";

export default function IndexPage() {
	return (
		<div>
			<Head>
				<title>{"Stale Journey (Jaws II)"}</title>
			</Head>
			<Canvas />
		</div>
	);
}
