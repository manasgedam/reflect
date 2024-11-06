'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import Image from 'next/image'

export default function UserThanksPage() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Thank You, Name!</h1>
      
      <div className="w-40 h-40 mb-8 relative overflow-hidden rounded-full">
        <Image
          src="/images/1.jpg"
          alt=""
          layout="fill"
          objectFit="cover"
          className="shadow-md"
        />
      </div>
      
      <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl">
        We greatly appreciate your support and trust in our services. Your satisfaction is our top priority, and we're committed to continually improving your experience with us.
      </p>
      
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Rate Reflect</h2>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="focus:outline-none"
            >
              <Star
                size={40}
                fill={star <= (hover || rating) ? 'rgb(250 204 21)' : 'rgb(0 0 0)'}
                color={star <= (hover || rating) ? 'rgb(250 204 21)' : 'rgb(0 0 0)'}
                className="transition-colors duration-200"
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-center mt-4 text-gray-600">
            You rated us {rating} {rating === 1 ? 'star' : 'stars'}. Thank you for your feedback!
          </p>
        )}
      </div>
    </div>
  )
}

{/*
    req props - message,avatar, Name
    Output - Response  */}