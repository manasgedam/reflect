"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

interface RadioQuestionProps {
  id: number;
  onChange: (id: number, value: string) => void;
}

const RadioQuestion: React.FC<RadioQuestionProps> = ({ id, onChange }) => {
  const [options, setOptions] = useState<string[]>(["Option 1", "Mango"]);

  useEffect(() => {
    onChange(id, options.join(", "));
  }, [options]);

  const addOption = () => {
    setOptions((prevOptions) => [...prevOptions, `Option ${prevOptions.length + 1}`]);
  };

  const removeOption = (index: number) => {
    setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  return (
    <div>
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <Input
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
          <Button variant="ghost" size="sm" onClick={() => removeOption(index)}>
            <TrashIcon className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ))}
      <Button variant="secondary" size="sm" onClick={addOption}>
        Add Option
      </Button>
    </div>
  );
};

export default RadioQuestion;
