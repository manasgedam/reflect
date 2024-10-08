"use client";

import React, { useState } from "react";

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-2 cursor-pointer"
      />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded Header"
          className="rounded-md object-cover h-32 w-full mb-2"
        />
      )}
    </div>
  );
};

export default ImageUploader;
