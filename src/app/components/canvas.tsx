"use client";
import { useEffect, useRef, useState } from "react";
import CanvasScrollClip from "canvas-scroll-clip"; // Assuming you are using CanvasScrollClip library

const Canvas = () => {
	const canvasContainerRef = useRef<HTMLDivElement | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [currentLyric, setCurrentLyric] = useState<string>(
		"Click to play/pause audio.\nScroll to browse images."
	);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const element = canvasContainerRef.current;
		if (element) {
			const options = {
				framePath: "/IMG_0001.jpg",
				frameCount: 35,
				scrollArea: 2000,
			};

			new CanvasScrollClip(element, options); // Initialize without assigning to `csc`

			const handleScroll = () => {
				// Scroll behavior logic if needed
			};

			window.addEventListener("scroll", handleScroll);

			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
		}
	}, []);

	useEffect(() => {
		const audio = audioRef.current;

		// Lyrics data with timestamps and corresponding text
		const lyricsData = [
			{ time: 0, text: "Stale Journey (Jaws II)" },
			{ time: 1, text: "Music/Images by Modern Painters" },
			{ time: 2, text: "" },
			{ time: 2.5, text: "Out, like way out," },
			{ time: 8, text: "All the way out" },
			{ time: 12, text: "" },
			{ time: 15, text: "Off, and into town," },
			{ time: 20.5, text: "After dark" },
			{ time: 24, text: "" },
			{ time: 28, text: "A stale journey," },
			{ time: 30, text: "A fresh start" },
			{ time: 33, text: "Horse Jumper of Love—" },
			{ time: 36.5, text: "" },
			{ time: 38, text: "Bad heart" },
			{ time: 41, text: "A pale morning," },
			{ time: 43, text: "Cool, gray sky" },
			{ time: 46, text: "Might I—" },
			{ time: 50, text: "" },
			{ time: 50.5, text: "Swim out" },
			{ time: 55, text: "" },
		];

		const handleTimeUpdate = () => {
			const currentTime = audio?.currentTime || 0;

			const lyric = lyricsData
				.slice()
				.reverse()
				.find((lyric) => currentTime >= lyric.time);

			if (lyric && lyric.text !== currentLyric) {
				setCurrentLyric(lyric.text);
			}
		};

		if (audio) {
			audio.addEventListener("timeupdate", handleTimeUpdate);
		}

		return () => {
			if (audio) {
				audio.removeEventListener("timeupdate", handleTimeUpdate);
			}
		};
	}, [currentLyric]); // Ensure dependencies are correct

	const toggleAudio = () => {
		const audio = audioRef.current;
		if (audio) {
			if (isPlaying) {
				audio.pause();
				setIsPlaying(false);
			} else {
				audio
					.play()
					.then(() => {
						setIsPlaying(true);
					})
					.catch((error) => {
						console.error("Audio playback failed:", error);
					});
			}
		}
	};

	return (
		<>
			<div className="container" onClick={toggleAudio}>
				<div className="canvas-container" ref={canvasContainerRef}></div>
				<div className="lyrics">{currentLyric}</div>
				<audio
					ref={audioRef}
					src="/audio/Stale Journey (Jaws II).wav"
					preload="auto"
				></audio>
				{/* <div className="audio-control">
					<Image
						src={"/icons/pause-play-button.png"}
						alt={isPlaying ? "Pause" : "Play"}
						width="512"
						height="512"
					/>
				</div> */}
			</div>

			<style jsx>{`
				.container {
					position: relative;
				}
				.canvas-container {
					top: 0;
					left: 0;
					width: 100vw;
					height: 100vh;
				}
				 {
					/* .audio-control {
					position: fixed;
					top: 20px;
					right: 20px;
					width: 60px;
					height: 60px;
					background-color: rgba(0, 0, 0, 0.7);
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					cursor: pointer;
					z-index: 10;
					transition: background-color 0.3s ease;
				} */
				}
				.audio-control img {
					width: 40px;
					height: 40px;
					filter: invert(1);
					pointer-events: none;
					transition: filter 0.3s ease; /* Smooth transition */
				}
				 {
					/* .audio-control:hover img {
					filter: invert(1) brightness(1.5);
				} */
				}
				.lyrics {
					position: fixed; /* Ensures it stays in the viewport */
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%); /* Centers the element */
					font-size: 2rem;
					color: white;
					text-align: center;
					animation: fadeIn 0.5s ease-in-out;
					z-index: 5; /* Ensures it appears above other elements */
					white-space: pre-line; /* Preserves newlines as line breaks */
				}
			`}</style>
		</>
	);
};

export default Canvas;
