"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useClipboard } from 'use-clipboard-copy'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { PlusCircle, Trash2, Image as ImageIcon, Video, Type, List, HelpCircle, Copy, Check, Link as LinkIcon } from 'lucide-react'

type QuestionType = 'mcq' | 'text' | 'video'

interface Question {
  id: string
  type: QuestionType
  text: string
  options?: string[]
  image?: string
}

export default function EnhancedFormBuilder() {
  const [formImage, setFormImage] = useState<string | null>(null)
  const [formTitle, setFormTitle] = useState('Untitled Form')
  const [formDescription, setFormDescription] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [isPublished, setIsPublished] = useState(false)
  const [formUrl, setFormUrl] = useState('')
  const clipboard = useClipboard()

  const handleFormImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      text: '',
      options: type === 'mcq' ? ['Option 1'] : undefined,
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q))
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options && q.options.length < 4) {
        return { ...q, options: [...q.options, `Option ${q.options.length + 1}`] }
      }
      return q
    }))
  }

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        const newOptions = [...q.options]
        newOptions[optionIndex] = value
        return { ...q, options: newOptions }
      }
      return q
    }))
  }

  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        const newOptions = q.options.filter((_, index) => index !== optionIndex)
        return { ...q, options: newOptions }
      }
      return q
    }))
  }

  const handleQuestionImageUpload = (questionId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateQuestion(questionId, { image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const generateFormUrl = () => {
    // In a real application, this would generate a unique URL
    const uniqueId = Math.random().toString(36).substring(2, 15)
    return `https://yourformapp.com/form/${uniqueId}`
  }

  const handlePublish = () => {
    setIsPublished(true)
    // handle calls your backend to publish the form
    setFormUrl(generateFormUrl())
  }

  const handleUnpublish = () => {
    setIsPublished(false)
    setFormUrl('')
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto p-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-7">
                <Input
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="text-3xl font-bold border-none focus:ring-0"
                  placeholder="Enter form title"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFormImageUpload}
                        className="hidden"
                        id="form-image-upload"
                      />
                      <label htmlFor="form-image-upload" className="cursor-pointer">
                        <Button variant="outline" size="sm">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          {formImage ? 'Change Form Image' : 'Add Form Image'}
                        </Button>
                      </label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Upload an image to represent your form</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
              <CardDescription>
                <Textarea
                  placeholder="Form description (optional)"
                  className="w-full mt-2 resize-none"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={3}
                />
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formImage && (
                <div className="mb-4">
                  <img src={formImage} alt="Form" className="max-w-full h-auto rounded-lg shadow-md" />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="mb-6 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Label className="text-lg font-semibold">Question {index + 1}</Label>
                  <Select
                    value={question.type}
                    onValueChange={(value: QuestionType) => updateQuestion(question.id, { type: value })}
                  >
                    <SelectTrigger className="w-[180px] ml-4">
                      <SelectValue placeholder="Question Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcq">Multiple Choice</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="ml-2">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Choose the type of question you want to ask</p>
                    </TooltipContent>
                  </Tooltip>
                  <Button variant="ghost" size="icon" onClick={() => removeQuestion(question.id)} className="ml-auto">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={question.text}
                  onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                  placeholder="Enter your question"
                  className="mb-4"
                />
                <div className="mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleQuestionImageUpload(question.id, e)}
                    className="hidden"
                    id={`question-image-upload-${question.id}`}
                  />
                  <label htmlFor={`question-image-upload-${question.id}`} className="cursor-pointer">
                    <Button variant="outline" size="sm">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      {question.image ? 'Change Question Image' : 'Add Question Image'}
                    </Button>
                  </label>
                </div>
                {question.image && (
                  <div className="mb-4">
                    <img src={question.image} alt="Question" className="max-w-full h-auto rounded-lg shadow-sm" />
                  </div>
                )}
                {question.type === 'mcq' && question.options && (
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center">
                        <Input
                          value={option}
                          onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                          placeholder={`Option ${optionIndex + 1}`}
                          className="mr-2"
                        />
                        <Button variant="ghost" size="icon" onClick={() => removeOption(question.id, optionIndex)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {question.options.length < 4 && (
                      <Button onClick={() => addOption(question.id)} variant="outline" size="sm">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Option
                      </Button>
                    )}
                  </div>
                )}
                {question.type === 'text' && (
                  <Textarea
                    placeholder="Respondents will enter their answer here"
                    className="w-full"
                    disabled
                  />
                )}
                {question.type === 'video' && (
                  <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg">
                    <Video className="h-8 w-8 text-gray-400" />
                    <span className="ml-2 text-gray-500">Video response option</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-between items-center mt-8 gap-4">
            <div className="flex space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => addQuestion('mcq')} variant="outline">
                    <List className="h-4 w-4 mr-2" />
                    Add MCQ
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add a multiple choice question</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => addQuestion('text')} variant="outline">
                    <Type className="h-4 w-4 mr-2" />
                    Add Text
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add a text response question</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => addQuestion('video')} variant="outline">
                    <Video className="h-4 w-4 mr-2" />
                    Add Video
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add a video response question</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex space-x-2">
              {!isPublished ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="default">
                      Publish Form
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to publish this form?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will make your form accessible to others. You can unpublish it later if needed.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handlePublish}>Publish</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <Button variant="destructive" onClick={handleUnpublish}>
                  Unpublish Form
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {isPublished && formUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mt-8 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Form URL</CardTitle>
                <CardDescription>Share this URL with others to allow them to fill out your form</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Input  value={formUrl} readOnly className="flex-grow" />
                  <Button
                    onClick={() => clipboard.copy(formUrl)}
                    variant="outline"
                    size="icon"
                  >
                    {clipboard.copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => window.open(formUrl, '_blank')}
                        variant="outline"
                        size="icon"
                      >
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Open form in new tab</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </TooltipProvider>
  )
}