"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ImageUploader from "./ImageUploader";
import TextQuestion from "./TextQuestion";
import VideoQuestion from "./VideoQuestion";
import RadioQuestion from "./RadioQuestion";
import CheckboxQuestion from "./CheckboxQuestion";
import StarRatingQuestion from "./StarRatingQuestion";

// Type definitions for the questions
interface Question {
  id: number;
  text: string;
  description: string;
  type: "text" | "video" | "radio" | "checkbox" | "star";
  required: boolean;
}

// Sample initial questions
const initialQuestions: Question[] = [
  { id: 1, text: "Enter your name", description: "", type: "text", required: true },
  { id: 2, text: "Select your favorite color", description: "", type: "radio", required: false },
  { id: 3, text: "Rate your experience", description: "", type: "star", required: false },
];

const QuestionsSection: React.FC = () => {
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ [key: number]: any }>({});
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<string | null>(null);

  // Function to add a new question
  const addQuestion = (type: Question["type"]) => {
    const newQuestion: Question = {
      id: questions.length + 1,
      text: `New ${type} Question`,
      description: "",
      type,
      required: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  // Handle image upload
  const handleImageUpload = (imageUrl: string) => {
    setHeaderImage(imageUrl);
  };

  // Handle input change
  const handleInputChange = (id: number, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle editing question text
  const handleEditQuestion = (id: number, text: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, text } : q))
    );
  };

  // Handle drag start
  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault(); // Prevent the default to allow dropping
  };

  // Handle drop
  const handleDrop = (index: number) => {
    if (draggedItemIndex === null) return;

    const updatedQuestions = [...questions];
    const [draggedQuestion] = updatedQuestions.splice(draggedItemIndex, 1); // Remove the dragged item
    updatedQuestions.splice(index, 0, draggedQuestion); // Insert it at the new position

    setQuestions(updatedQuestions); // Update the questions with reordered list
    setDraggedItemIndex(null); // Reset the dragged item index
  };

  // Handle deleting a question with confirmation dialog
  const handleDeleteQuestion = (id: number) => {
    setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
  };

  // Handle star rating selection (click)
  const handleRatingChange = (newRating: string) => {
    setSelectedRating(newRating);
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "text":
        return (
          <TextQuestion
            key={question.id}
            id={question.id}
            value={formData[question.id] || ""}
            onChange={handleInputChange}
          />
        );
      case "video":
        return (
          <VideoQuestion
            key={question.id}
            id={question.id}
            onChange={handleInputChange}
          />
        );
      case "radio":
        return (
          <RadioQuestion
            key={question.id}
            id={question.id}
            onChange={handleInputChange}
          />
        );
      case "checkbox":
        return (
          <CheckboxQuestion
            key={question.id}
            id={question.id}
            onChange={handleInputChange}
          />
        );
      case "star":
        return (
          <StarRatingQuestion
            key={question.id}
            id={question.id}
            onChange={handleInputChange}
            onRatingChange={handleRatingChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-3xl mx-auto">
      {/* Header Image Uploader */}
      <ImageUploader onImageUpload={handleImageUpload} />
      {headerImage && (
        <img src={headerImage} alt="Header" className="rounded-md mb-4" />
      )}
      {questions.map(renderQuestion)}
      <Button variant="secondary" onClick={() => addQuestion("text")}>
        Add Text Question
      </Button>
      <Button variant="secondary" onClick={() => addQuestion("video")}>
        Add Video Question
      </Button>
      <Button variant="secondary" onClick={() => addQuestion("radio")}>
        Add Radio Question
      </Button>
      <Button variant="secondary" onClick={() => addQuestion("checkbox")}>
        Add Checkbox Question
      </Button>
      <Button variant="secondary" onClick={() => addQuestion("star")}>
        Add Star Rating Question
      </Button>
    </div>
  );
};

export default QuestionsSection;
