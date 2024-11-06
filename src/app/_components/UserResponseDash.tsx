'use client';

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface VideoCaptureProps {
    onSubmit: (videoUrl: string) => void;
}

const VideoCapture: React.FC<VideoCaptureProps> = ({ onSubmit }) => {
    const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const videoref = useRef<HTMLVideoElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunks = useRef<Blob[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            (window as any).stream = null;
        }
    }, []);

    async function startRecording() {
        try {
            setRecordingUrl(null);
            recordedChunks.current = [];

            const recordStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            (window as any).stream = recordStream;
            if (videoref.current) {
                videoref.current.srcObject = recordStream;
            }

            const mediaRecorder = new MediaRecorder(recordStream, {
                mimeType: "video/webm",
            });
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.current.push(event.data);
                }
            };

            mediaRecorder.start();
        } catch (err) {
            if (err instanceof Error) {
                setError("Unable to access media devices: " + err.message);
            }
        }
    }

    function stopRecording() {
        if ((window as any).stream) {
            (window as any).stream.getTracks().forEach((track: MediaStreamTrack) =>
                track.stop()
            );
        }

        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(recordedChunks.current, { type: "video/webm" });
                const url = URL.createObjectURL(blob);
                setRecordingUrl(url);
            };
        }
    }

    function handleRecording(e: React.MouseEvent<HTMLButtonElement>) {
        const button = e.currentTarget;
        if (button.innerText.toLowerCase() === "start recording") {
            startRecording();
            setIsRecording(true);
            button.innerText = "Stop Recording";
        } else {
            button.innerText = "Start Recording";
            stopRecording();
        }
    }

    function playHandle() {
        if (recordingUrl && videoref.current) {
            videoref.current.pause();
            videoref.current.srcObject = null;
            videoref.current.src = recordingUrl;

            videoref.current.onloadedmetadata = () => {
                videoref.current?.play();
            };
        }
    }

    function submitRecording() {
        if (recordingUrl) {
            onSubmit(recordingUrl);
        }
    }

    return (
        <div className="relative w-full h-full">
            <div
                className={`transition duration-500 ease-in-out ${isRecording ? "blur-lg" : ""
                    }`}
            >
                <div className="flex flex-col items-center">
                    <Button onClick={handleRecording} className="mt-4">
                        Start Recording
                    </Button>
                </div>
            </div>

            {isRecording && (
                <div className="fixed inset-0 w-full h-full bg-white bg-opacity-80 z-20 flex flex-col justify-center items-center p-4 sm:p-8 md:p-10">
                    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg">
                        <video
                            ref={videoref}
                            controls
                            autoPlay
                            playsInline
                            className="w-full h-auto border rounded-md bg-gray-100 mb-4 sm:mb-6"
                        />
                        {error && <p className="text-red-500 mb-4">{error}</p>}

                        <div className="flex flex-col gap-4 w-full sm:flex-row sm:justify-between sm:gap-4">
                            <Button
                                onClick={handleRecording}
                                className="w-full sm:w-auto text-sm sm:text-base"
                            >
                                Stop Recording
                            </Button>
                            <Button
                                onClick={playHandle}
                                disabled={!recordingUrl}
                                className="w-full sm:w-auto text-sm sm:text-base"
                            >
                                Play Recording
                            </Button>
                            <Button
                                className="w-full sm:w-auto text-sm sm:text-base"
                                onClick={submitRecording}
                            >
                                Submit Recording
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function UserResponseDash() {
    const questions = [
        {
            question: "What is the capital of France?",
            type: "mcq",
            answers: ["Paris", "London", "Berlin", "Madrid"],
            image: "/images/1.jpg",
        },
        {
            question: "What is the largest ocean on Earth?",
            type: "description",
            answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            image: "/images/1.jpg",
        },
        {
            question: "What is 2 + 2?",
            type: "video",
            answers: ["3", "4", "5", "6"],
            image: "/images/1.jpg",
        },
        {
            question: "What is the largest ocean on Earth?",
            type: "description",
            answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            image: "/images/1.jpg",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [userResponses, setUserResponses] = useState<Array<{ type: string; response: string | null }>>([]);

    useEffect(() => {
        const savedData = localStorage.getItem("userResponseData");
        const savedTimestamp = localStorage.getItem("userResponseTimestamp");

        if (savedData && savedTimestamp) {
            const currentTime = new Date().getTime();
            const savedTime = parseInt(savedTimestamp, 10);

            if (currentTime - savedTime < 3600000) {
                setUserResponses(JSON.parse(savedData));
            } else {
                localStorage.removeItem("userResponseData");
                localStorage.removeItem("userResponseTimestamp");
            }
        }
    }, []);

    useEffect(() => {
        if (userResponses.length > 0) {
            localStorage.setItem("userResponseData", JSON.stringify(userResponses));
            localStorage.setItem("userResponseTimestamp", new Date().getTime().toString());
        }
    }, [userResponses]);

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleAnswerSelect = (answer: string) => {
        const updatedResponses = [...userResponses];
        updatedResponses[currentIndex] = { type: "mcq", response: answer };
        setUserResponses(updatedResponses);
        handleNext();
    };

    const handleTextInput = (value: string) => {
        const updatedResponses = [...userResponses];
        updatedResponses[currentIndex] = { type: "description", response: value };
        setUserResponses(updatedResponses);
    };

    const handleVideoSubmit = (videoUrl: string) => {
        const updatedResponses = [...userResponses];
        updatedResponses[currentIndex] = { type: "video", response: videoUrl };
        console.log(videoUrl);
        setUserResponses(updatedResponses);
        handleNext();
    };

    const progressValue = ((currentIndex + 1) / questions.length) * 100;

    const isNextDisabled = () => {
        const currentQuestionType = questions[currentIndex].type.toLowerCase();
        const response = userResponses[currentIndex]?.response;

        if (currentQuestionType === "mcq") {
            return response == null;
        }
        if (currentQuestionType === "description") {
            return !response?.trim();
        }
        if (currentQuestionType === "video") {
            return response == null;
        }

        return false;
    };

    return (
        <section className="w-screen h-screen overflow-x-hidden">
            <nav className="border-b flex justify-between items-center py-3 px-4 md:px-8">
                <Link href="/">
                    <Image src="/images/logo.png" width={60} height={60} alt="logo" />
                </Link>
                <div className="flex items-center">
                    <Avatar className="w-10 h-10 md:w-12 md:h-12">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </nav>

            <div className="flex flex-col gap-4 justify-center items-center w-full h-fill px-4 md:px-12 mt-8 mb-5">
                <div className="w-full max-w-3xl p-4 md:p-6 lg:p-20 mx-0 lg:mx-20 bg-white border-none rounded-lg shadow-[0_3px_16px_-2px_rgba(0,0,0,0.3)] flex flex-col items-center">
                    <div className="w-full text-center mb-4 mt-4 md:mb-12 sm:px-5 lg:px-24">
                        <Progress value={progressValue} className="w-full h-2 md:h-3 rounded bg-white border-none shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3)]" />
                        <p className="text-sm md:text-lg mt-5">
                            Step {currentIndex + 1} of {questions.length}
                        </p>
                    </div>

                    <div className="text-center mb-4">
                        <Image
                            src={questions[currentIndex].image}
                            width={300}
                            height={160}
                            alt={`Image for ${questions[currentIndex].question}`}
                            className="w-full h-auto object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-lg md:text-xl font-semibold my-8">
                            {questions[currentIndex].question}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-5">
                        {questions[currentIndex].type.toLowerCase() === "mcq" &&
                            questions[currentIndex].answers.map((answer, answerIndex) => (
                                <div
                                    key={answerIndex}
                                    onClick={() => handleAnswerSelect(answer)}
                                    className={`border px-4 py-3 text-center rounded-lg transition-all text-sm md:text-lg font-semibold cursor-pointer ${userResponses[currentIndex]?.response === answer
                                        ? "bg-gray-900 text-white"
                                        : "bg-white text-blue-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {answer}
                                </div>
                            ))}
                    </div>

                    {questions[currentIndex].type.toLowerCase() === "description" && (
                        <div className="w-full mb-5">
                            <Textarea
                                className="min-h-[100px] w-fill border px-4 py-3 rounded-lg text-lg"
                                id="message"
                                placeholder="Enter your message"
                                value={userResponses[currentIndex]?.response || ""}
                                onChange={(e) => handleTextInput(e.target.value)}
                            />
                        </div>
                    )}

                    {questions[currentIndex].type.toLowerCase() === "video" && (
                        <div className="w-full h-auto mb-5">
                            <VideoCapture onSubmit={handleVideoSubmit} />
                        </div>
                    )}

                    <Button
                        className={`w-1/2 ${currentIndex === questions.length - 1 && !isNextDisabled() ? "flex" : "hidden"
                            } py-3 font-bold text-md`}
                        type="submit"
                    >
                        Submit
                    </Button>

                    <div className="w-full flex flex-row justify-between pt-10">
                        <Button
                            onClick={handlePrevious}
                            className={`flex items-center justify-center w-14 h-8 md:w-20 md:h-10 sm:text-sm md:text-lg bg-black transition-all duration-200 ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100"
                                }`}
                        >
                            Prev
                        </Button>
                        <Button
                            onClick={handleNext}
                            className={`flex items-center justify-center w-14 h-8 md:w-20 md:h-10 sm:text-sm md:text-lg bg-black transition-all duration-200 ${currentIndex === questions.length - 1 || isNextDisabled()
                                ? "opacity-30 cursor-not-allowed"
                                : "opacity-100"
                                }`}
                            disabled={isNextDisabled()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}