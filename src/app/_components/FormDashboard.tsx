"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { PlusCircle, Search, Filter, MoreVertical, FileText, Copy, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

// Mock data for existing forms here fetch data from database
const existingForms = [
  { id: 1, title: "Customer Feedback Survey", responses: 150, lastEdited: "2023-05-15" },
  { id: 2, title: "Event Registration", responses: 75, lastEdited: "2023-05-10" },
  { id: 3, title: "Employee Satisfaction Survey", responses: 50, lastEdited: "2023-05-05" },
  { id: 4, title: "Product Feedback", responses: 200, lastEdited: "2023-05-01" },
  { id: 5, title: "Website User Experience Survey", responses: 100, lastEdited: "2023-04-28" },
]

// Mock data for form templates
const formTemplates = [
  { id: 0, title: "Blank Form", description: "Start from scratch", image: "/placeholder.svg" },
  { id: 1, title: "Customer Feedback", description: "Gather insights from your customers", image: "/placeholder.svg" },
  { id: 2, title: "Event Registration", description: "Collect attendee information for your event", image: "/placeholder.svg" },
  { id: 3, title: "Job Application", description: "Streamline your hiring process", image: "/placeholder.svg" },
  { id: 4, title: "Quiz Template", description: "Create engaging quizzes for various purposes", image: "/placeholder.svg" },
]

export default function FormDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)

  const filteredForms = existingForms.filter(form =>
    form.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-7xl">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Forms Dashboard</h1>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {formTemplates.map((template) => (
            <Card 
              key={template.id} 
              className={`cursor-pointer transition-all duration-300 ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <CardHeader className="p-0">
                <Image
                  src={template.image}
                  alt={template.title}
                  width={100}
                  height={50}
                  className="w-full h-auto object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-sm mb-2">{template.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{template.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search forms"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => {}}>Sort by Name</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => {}}>Sort by Date</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => {}}>Sort by Responses</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
          <Link href="/edit-form" >
          <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Form
        </Button>
          </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Forms</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            {filteredForms.map((form, index) => (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between p-4 hover:bg-accent rounded-md transition-colors">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-6 w-6 text-blue-500" />
                    <div>
                      <h3 className="font-medium">{form.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {form.responses} responses · Last edited {form.lastEdited}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => {}}>
                        <Copy className="mr-2 h-4 w-4" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => {}} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {index < filteredForms.length - 1 && <Separator />}
              </motion.div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}