"use client";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

interface TextQuestionProps {
  id: number;
  value: string;
  onChange: (id: number, value: string) => void;
}

const TextQuestion: React.FC<TextQuestionProps> = ({ id, value, onChange }) => {
  useEffect(() => {
    onChange(id, value); // Ensure the onChange function is called when the component mounts
  }, []);

  return (
    <Input
      placeholder="Type your answer"
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
    />
  );
};

export default TextQuestion;
