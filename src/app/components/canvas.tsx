"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CanvasScrollClip from "canvas-scroll-clip"; // Assuming you are using CanvasScrollClip library

const Canvas = () => {
	const canvasContainerRef = useRef<HTMLDivElement | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);
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
			<div className="container">
				<div className="canvas-container" ref={canvasContainerRef}></div>
				<audio
					ref={audioRef}
					src="/audio/Stale Journey (Jaws II).wav"
					preload="auto"
				></audio>
				<div className="audio-control" onClick={toggleAudio}>
					<Image
						src={"/icons/pause-play-button.png"}
						alt={isPlaying ? "Pause" : "Play"}
						width="512"
						height="512"
					/>
				</div>
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
				.audio-control {
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
				}
				.audio-control img {
					width: 40px;
					height: 40px;
					filter: invert(1);
					pointer-events: none;
					transition: filter 0.3s ease; /* Smooth transition */
				}
				.audio-control:hover img {
					filter: invert(1) brightness(1.5);
				}
			`}</style>
		</>
	);
};

export default Canvas;
