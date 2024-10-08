"use client";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

interface VideoQuestionProps {
  id: number;
  onChange: (id: number, files: FileList | null) => void;
}

const VideoQuestion: React.FC<VideoQuestionProps> = ({ id, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, e.target.files);
  };

  return (
    <Input
      type="file"
      accept="video/*"
      onChange={handleChange}
    />
  );
};

export default VideoQuestion;
