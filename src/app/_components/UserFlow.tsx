"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

function UserDashboard({ onNext, userData, setUserData }) {
  const [flag, setFlag] = useState(userData.flag ?? true)
  const [selectAvatar, setSelectAvatar] = useState(userData.avatar ?? '')
  const [name, setName] = useState(userData.name ?? '')
  const [email, setEmail] = useState(userData.email ?? '')

  const avatars = [
    "/images/Avatar1.png",
    "/images/Avatar2.png",
   "/images/Avatar3.png",
   "/images/Avatar4.png",
   "/images/Avatar5.png",
    "/images/Avatar6.png",
  ]

  const handleClick = (index: number) => {
    setSelectAvatar(avatars[index])
    console.log(selectAvatar);
  }

  const handleSubmit = () => {
    if(flag === false && selectAvatar !== null){
        setUserData({ ...userData, flag, avatar: selectAvatar, name, email })
        onNext();
    }
    else if (name && email && selectAvatar !== null) {
      setUserData({ ...userData, flag, avatar: selectAvatar, name, email })
      onNext()
    } else {
      alert("Please fill in all fields.")
    }
  }

  return (
    <section className="w-full min-h-screen flex flex-col overflow-x-hidden">
      <nav className="border-b flex justify-center sm:py-0 px-2">
        <div className="container flex items-center justify-between py-1">
          <Link href="/">
            <Image
              src="/images/logo.png"
              width={60}
              height={60}
              alt="logo"
            />
          </Link>
        </div>
      </nav>

      <div className="flex justify-center items-center flex-1 px-4 sm:px-6 lg:px-8 my-8">
        <div className="border border-none shadow-[0_3px_16px_-2px_rgba(0,0,0,0.3)] rounded-lg text-center space-y-6 max-w-2xl w-full text-wrap bg-white p-8">
          <h1 className="text-2xl font-bold md:text-4xl">Let's Craft your Identity</h1>
          <p className="text-gray-600 text-sm md:text-lg hidden md:block">
            "Customize your profile with an avatar and optional<br/> details for a personalized experience."
          </p>

          <p className="text-lg">Choose the level of privacy that suits you best</p>

          <div className="flex flex-row justify-center gap-8">
            <button type="button" onClick={() => setFlag(true)}>
              <Image src="/images/Person.png" width={128} height={128} alt="normal" className="w-16 h-16 md:w-32 md:h-32 rounded-md" />
            </button>
            <button type="button" onClick={() => setFlag(false)}>
              <Image src="/images/miscellaneousPerson.png" width={128} height={128} alt="miscellaneous" className="w-16 h-16 md:w-32 md:h-32 rounded-md" />
            </button>
          </div>

          <div className="w-full flex justify-center">
            <Card className="w-full max-w-lg border-none shadow-none">
              <CardContent>
                <form className="w-full">
                  {flag && (
                    <div className="grid gap-4">
                      <div className="flex flex-col space-y-1.5 text-left">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          placeholder="e.g. John Doe" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5 text-left">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          placeholder="e.g. john@example.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  <div className="mt-6">
                    <p className="text-left text-lg">Choose your Avatar:</p>
                    <div className="grid grid-cols-3 md:grid-cols-6 mt-3 gap-x-4 gap-y-4">
                      {avatars.map((image, index) => (
                        <div key={index} className="flex justify-center items-center">
                          <button type="button" onClick={() => handleClick(index)}>
                            <Avatar className={`w-12 h-12 md:w-16 md:h-16 ${selectAvatar === avatars[index] ? "ring-2 ring-primary" : ""}`}>
                              <AvatarImage src={image} />
                              <AvatarFallback>Avatar</AvatarFallback>
                            </Avatar> 
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="mt-6">
                <div className="w-full">
                  <Button className="w-full" onClick={handleSubmit}>Next</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

interface UserResponseDashProps {
    onNext: () => void;
    userData: { name: string; avatar: string; responses?: Array<{ type: string; response: string | null }> };
    setUserData: (data: any) => void;
  }
  
 function UserResponseDash({ onNext, userData, setUserData }: UserResponseDashProps) {
    const questions = [
      {
        question: "What is your favorite color?",
        type: "mcq",
        answers: ["Red", "Blue", "Green", "Yellow"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        question: "Describe your ideal vacation.",
        type: "description",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        question: "What's your preferred mode of transportation?",
        type: "mcq",
        answers: ["Car", "Bicycle", "Public Transit", "Walking"],
        image: "/placeholder.svg?height=200&width=300",
      },
    ];
  
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userResponses, setUserResponses] = useState<Array<{ type: string; response: string | null }>>(
      userData.responses ?? questions.map(() => ({ type: "", response: null }))
    );
  
    useEffect(() => {
      setUserData({ ...userData, responses: userResponses });
    }, [userResponses, setUserData, userData]);
  
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
  
      return false;
    };
  
    return (
      <div className="w-full min-h-screen overflow-x-hidden">
        <nav className="border-b flex justify-between items-center py-3 px-4 md:px-8">
          <Link href="/">
            <Image src="/images/logo.png" width={60} height={60} alt="logo" />
          </Link>
          <div className="flex items-center">
            <Avatar className="w-10 h-10 md:w-12 md:h-12">
              <AvatarImage src={userData.avatar} />
              <AvatarFallback>{userData.name?.charAt(0) || "U"}</AvatarFallback>
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
  
            {questions[currentIndex].type.toLowerCase() === "mcq" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-5">
                {questions[currentIndex].answers.map((answer, answerIndex) => (
                  <div
                    key={answerIndex}
                    onClick={() => handleAnswerSelect(answer)}
                    className={`border px-4 py-3 text-center rounded-lg transition-all text-sm md:text-lg font-semibold cursor-pointer ${
                      userResponses[currentIndex]?.response === answer
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-foreground hover:bg-secondary"
                    }`}
                  >
                    {answer}
                  </div>
                ))}
              </div>
            )}
  
            {questions[currentIndex].type.toLowerCase() === "description" && (
              <div className="w-full mb-5">
                <Textarea
                  className="min-h-[100px] w-full border px-4 py-3 rounded-lg text-lg"
                  id="message"
                  placeholder="Enter your response"
                  value={userResponses[currentIndex]?.response || ""}
                  onChange={(e) => handleTextInput(e.target.value)}
                />
              </div>
            )}
  
            <Button
              className={`w-1/2 ${
                currentIndex === questions.length - 1 && !isNextDisabled() ? "flex" : "hidden"
              } py-3 font-bold text-md`}
              onClick={onNext}
            >
              Submit
            </Button>
  
            <div className="w-full flex flex-row justify-between pt-10">
              <Button
                onClick={handlePrevious}
                className={`flex items-center justify-center w-14 h-8 md:w-20 md:h-10 sm:text-sm md:text-lg bg-primary transition-all duration-200 ${
                  currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100"
                }`}
                disabled={currentIndex === 0}
              >
                Prev
              </Button>
              <Button
                onClick={handleNext}
                className={`flex items-center justify-center w-14 h-8 md:w-20 md:h-10 sm:text-sm md:text-lg bg-primary transition-all duration-200 ${
                  currentIndex === questions.length - 1 || isNextDisabled()
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
      </div>
    );
  }
  

function UserThanksPage({ userData }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <h1 className="text-4xl font-bold text-foreground mb-6">Thank You, {userData.name === '' ? 'John' : userData.name}!</h1>
      
      <div className="w-40 h-40 mb-8 relative overflow-hidden rounded-full">
        <Image
          src={userData.avatar}
          alt="User Avatar"
          layout="fill"
          objectFit="cover"
          className="shadow-md"
        />
      </div>
      
      <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl">
        We greatly appreciate your support and trust in our services. Your satisfaction is our top priority, and we're committed to continually improving your experience with us.
      </p>
      
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold text-foreground mb-4 text-center">Rate Reflect</h2>
        <div className="flex justify-center space-x-2">
          {[1, 2,3,4,5].map((star) => (
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
          <p className="text-center mt-4 text-muted-foreground">
            You rated us {rating} {rating === 1 ? 'star' : 'stars'}. Thank you for your feedback!
          </p>
        )}
      </div>
    </div>
  )
}

export default function UserFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const savedStep = localStorage.getItem('currentStep');
    const savedUserData = localStorage.getItem('userData');
    
    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }
    
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currentStep', currentStep.toString());
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [currentStep, userData]);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const submitToAdmin = async () => {
    try {
      // Simulating an API call to submit data to admin
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Data submitted to admin:', userData);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  useEffect(() => {
    if (currentStep === 3) {
      submitToAdmin();
    }
  }, [currentStep]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (currentStep > 1 && currentStep < 3) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentStep]);

  return (
    <div>
      {currentStep === 1 && <UserDashboard onNext={handleNext} userData={userData} setUserData={setUserData} />}
      {currentStep === 2 && <UserResponseDash onNext={handleNext} userData={userData} setUserData={setUserData} />}
      {currentStep === 3 && <UserThanksPage userData={userData} />}
    </div>
  );
}