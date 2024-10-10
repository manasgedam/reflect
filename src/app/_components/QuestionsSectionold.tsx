"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { StarIcon, TrashIcon } from "lucide-react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import Question from "./QuestionsSection/QuestionInterface";

interface FormData {
  [key: string]: any;
}

const initialQuestions: Question[] = [
  { id: 1, text: "Enter your name", description: "", type: "text", required: true },
];

const QuestionsSection: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [formData, setFormData] = useState<FormData>({});
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [hoverRating, setHoverRating] = useState<{ [key: number]: number }>({});
  const [selectedRating, setSelectedRating] = useState<{ [key: number]: number }>({});

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

  // Handle input changes in form data
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

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string); // Set the uploaded image
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  // Handle star hover
  const handleStarHover = (id: number, rating: number) => {
    setHoverRating((prevRatings) => ({
      ...prevRatings,
      [id]: rating,
    }));
  };

  // Reset hover when the mouse leaves the star rating section
  const handleStarHoverLeave = (id: number) => {
    setHoverRating((prevRatings) => ({
      ...prevRatings,
      [id]: 0,
    }));
  };

  const handleStarClick = (id: number, rating: number) => {
    setSelectedRating((prevRatings) => ({
      ...prevRatings,
      [id]: rating,
    }));
    handleInputChange(id, rating);
  };

  // Function to render the correct input for each question type
  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "text":
        return (
          <Input
            placeholder="Type your answer"
            onChange={(e) => handleInputChange(question.id, e.target.value)}
          />
        );
      case "video":
        return (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => handleInputChange(question.id, e.target.files)}
          />
        );
      case "radio":
        return (
          <RadioGroup onValueChange={(val) => handleInputChange(question.id, val)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Option 1" id={`option1-${question.id}`} />
              <label htmlFor={`option1-${question.id}`}>Option 1</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Option 2" id={`option2-${question.id}`} />
              <label htmlFor={`option2-${question.id}`}>Option 2</label>
            </div>
          </RadioGroup>
        );
      case "checkbox":
        return (
          <div>
            <div className="flex items-center space-x-2">
              <Checkbox id={`option1-${question.id}`} />
              <label htmlFor={`option1-${question.id}`}>Option 1</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id={`option2-${question.id}`} />
              <label htmlFor={`option2-${question.id}`}>Option 2</label>
            </div>
          </div>
        );
      case "star":
        return (
          <div
            className="flex gap-1"
            onMouseLeave={() => handleStarHoverLeave(question.id)} // Reset hover on mouse leave
          >
            {Array.from({ length: 10 }, (_, i) => (
              <StarIcon
                key={i}
                className={`h-6 w-6 cursor-pointer transition-colors duration-200 ${i < (hoverRating[question.id] || selectedRating[question.id] || 0)
                  ? "text-yellow-400"
                  : "text-gray-400"
                  }`}
                onMouseEnter={() => handleStarHover(question.id, i + 1)} // Set hover rating on hover
                onClick={() => handleStarClick(question.id, i + 1)} // Set final rating on click
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-3xl mx-auto">
      <div className="flex flex-col w-full mb-4">
        {uploadedImage ? (
          <div className="rounded-md overflow-hidden h-[200px] w-full relative">
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="object-contain h-full w-full"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className="border border-dashed border-gray-400 p-4 rounded-lg mb-2">
            <p className="text-gray-500">No image uploaded yet.</p>
          </div>
        )}
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-2 cursor-pointer"
        />
      </div>
      {questions.map((question, index) => (
        <div
          key={question.id}
          className="border p-4 rounded-lg mb-4 cursor-pointer w-full"
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={() => handleDrop(index)}
        >
          <div className="flex justify-between items-center">
            <div>
              <Input
                className="font-semibold"
                value={question.text}
                onChange={(e) => handleEditQuestion(question.id, e.target.value)}
              />
              <Input
                placeholder="Description"
                value={question.description}
                onChange={(e) =>
                  setQuestions((prev) =>
                    prev.map((q) =>
                      q.id === question.id
                        ? { ...q, description: e.target.value }
                        : q
                    )
                  )
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={question.required}
                onCheckedChange={(val) =>
                  setQuestions((prev) =>
                    prev.map((q) =>
                      q.id === question.id ? { ...q, required: val } : q
                    )
                  )
                }
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost">
                    <TrashIcon className="h-5 w-5 text-red-500 cursor-pointer" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <h3 className="text-lg font-bold">Confirm Delete</h3>
                    <p>Are you sure you want to delete this question?</p>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <div className="mt-4">{renderQuestion(question)}</div>
        </div>
      ))}

      <div className="flex gap-3 w-full">
        <Button className='flex-grow' onClick={() => addQuestion("text")}>Add Text</Button>
        <Button className='flex-grow' onClick={() => addQuestion("video")}>Add Video</Button>
        <Button className='flex-grow' onClick={() => addQuestion("radio")}>Add Select One</Button>
        <Button className='flex-grow' onClick={() => addQuestion("checkbox")}>Add Select Many</Button>
        <Button className='flex-grow' onClick={() => addQuestion("star")}>Add Star Rating</Button>
      </div>
    </div>
  );
};

export default QuestionsSection;
