"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Import RadioGroup and RadioGroupItem

// Sample responses
const responses = [
  {
    id: 1,
    email: "user1@example.com",
    responses: [
      { type: "text", question: "Name", answer: "User 1" },
      { type: "text", question: "PRN", answer: "23520011" },
      { type: "text", question: "What did you enjoy the most about the event?", answer: "The problem-solving challenges were great!" },
      { type: "star-rating", question: "Rate the overall organization of the event.", answer: 9 },
      { type: "mcq", question: "Which session did you find the most useful?", answer: "Session 2: Recursion and Dynamic Programming", options: ["Session 1: Introduction", "Session 2: Recursion and Dynamic Programming", "Session 3: Graph Theory"] }
    ]
  },
  {
    id: 2,
    email: "user2@example.com",
    responses: [
      { type: "text", question: "Name", answer: "User 2" },
      { type: "text", question: "PRN", answer: "23520012" },
      { type: "text", question: "Any suggestions for improvement?", answer: "The time management could be better." },
      { type: "star-rating", question: "Rate the quality of content delivered.", answer: 8 },
      { type: "mcq", question: "What was the most challenging aspect?", answer: "Dynamic Programming", options: ["Recursion", "Dynamic Programming", "Graph Theory"] }
    ]
  },
  {
    id: 3,
    email: "user3@example.com",
    responses: [
      { type: "text", question: "Name", answer: "User 3" },
      { type: "text", question: "PRN", answer: "23520013" },
      { type: "text", question: "What did you like about the event?", answer: "The interactive sessions were very helpful." },
      { type: "star-rating", question: "Rate the speaker's clarity.", answer: 7 },
      { type: "mcq", question: "Which concept was the easiest to understand?", answer: "Graph Theory", options: ["Recursion", "Graph Theory", "Sorting"] }
    ]
  },
  {
    id: 4,
    email: "user4@example.com",
    responses: [
      { type: "text", question: "Name", answer: "User 4" },
      { type: "text", question: "PRN", answer: "23520014" },
      { type: "text", question: "What did you find most valuable?", answer: "Learning advanced graph algorithms." },
      { type: "star-rating", question: "Rate the venue and facilities.", answer: 6 },
      { type: "mcq", question: "Which topic was the toughest?", answer: "Graph Theory", options: ["Sorting", "Graph Theory", "Recursion"] }
    ]
  },
  {
    id: 5,
    email: "user5@example.com",
    responses: [
      { type: "text", question: "Name", answer: "User 5" },
      { type: "text", question: "PRN", answer: "23520015" },
      { type: "text", question: "What could be improved?", answer: "More hands-on coding exercises." },
      { type: "star-rating", question: "Rate the quality of Q&A sessions.", answer: 8 },
      { type: "mcq", question: "Which topic needs more explanation?", answer: "Dynamic Programming", options: ["Graph Theory", "Dynamic Programming", "Sorting"] }
    ]
  },
];


export default function IndividualResponses() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState(responses[currentPage].id); // Sync selectedUser with currentPage
  const totalPages = responses.length;

  // Update the user when page is changed
  const userResponse = responses.find((r) => r.id === selectedUser);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
      setSelectedUser(responses[currentPage + 1].id); // Update selected user on page change
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      setSelectedUser(responses[currentPage - 1].id); // Update selected user on page change
    }
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let pageNumber = parseInt(e.target.value) - 1;
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
      setSelectedUser(responses[pageNumber].id); // Update selected user when page number changes
    }
  };

  const handleUserChange = (value: string) => {
    const selected = responses.find((r) => r.id === Number(value));
    if (selected) {
      setSelectedUser(selected.id);
      setCurrentPage(responses.indexOf(selected)); // Update currentPage when user changes
    }
  };

  return (
    <TooltipProvider>
      <div className="p-6 w-[70%] mx-auto my-3">
        {/* Header Dropdown */}
        <div className="flex justify-between mb-4">
          <Select
            value={selectedUser.toString()} // Ensure it's a string for comparison in Select
            onValueChange={handleUserChange} // Update selected user and current page
          >
            <SelectTrigger>
              {/* Show the currently selected user's email or a placeholder */}
              {selectedUser
                ? responses.find((res) => res.id === selectedUser)?.email // Show email of the selected user
                : "Select a User"}
            </SelectTrigger>
            <SelectContent>
              {responses.map((res) => (
                <SelectItem key={res.id} value={res.id.toString()}>
                  {res.email} {/* Display email */}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>


        {/* Pagination Controls */}
        <div className="flex justify-between items-center my-4">
          {/* Previous Arrow */}
          <ChevronLeft
            onClick={handlePrev}
            className={`cursor-pointer ${currentPage === 0 ? "text-gray-400 cursor-not-allowed" : "text-black"}`} // Disable when on first page
            size={24} // Size of the arrow
          />

          {/* Editable Page Number */}
          <div className="flex items-center space-x-2">
            <span>Page</span>
            <Input
              type="text"
              min="1"
              max={totalPages}
              value={currentPage + 1}
              onChange={handlePageChange}
              className="w-16 text-center"
            />
            <span>of {totalPages}</span>
          </div>

          {/* Next Arrow */}
          <ChevronRight
            onClick={handleNext}
            className={`cursor-pointer ${currentPage === totalPages - 1 ? "text-gray-400 cursor-not-allowed" : "text-black"}`} // Disable when on last page
            size={24} // Size of the arrow
          />
        </div>

        {/* Responses Section */}
        <div className="space-y-6">
          {userResponse?.responses.map((response, index) => (
            <Card key={index} className="border p-4">
              <CardHeader className="font-bold p-0 mb-3">{response.question}</CardHeader>
              <CardContent className="p-0">
                {/* Text Response */}
                {response.type === "text" && <Input value={response.answer} readOnly className="bg-gray-100" />}

                {/* MCQ Response */}
                {response.type === "mcq" && (
                  <RadioGroup value={response.answer.toString()} className="space-y-2">
                    {response.options?.map((option, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`option-${idx}`} />
                        <label htmlFor={`option-${idx}`}>{option}</label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {/* Star Rating Response */}
                {response.type === "star-rating" && (
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: 10 }).map((_, idx) => (
                      <Tooltip key={idx}>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Star
                              className={Number(response.answer) > idx ? "text-yellow-400" : "text-gray-400"}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {[
                              "Very Bad",
                              "Bad",
                              "Poor",
                              "Fair",
                              "Average",
                              "Good",
                              "Very Good",
                              "Great",
                              "Superb",
                              "Excellent",
                            ][idx]}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}