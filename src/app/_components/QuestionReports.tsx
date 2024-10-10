import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
const responses = [
  "The topics were covered thoroughly and in great detail.",
  "Some topics were rushed, but overall the coverage was good.",
  "The instructor balanced depth and breadth effectively.",
  "A few key topics could have been explained more clearly.",
  "The session was comprehensive, but a bit fast-paced.",
  "All topics were covered efficiently, with practical examples.",
  "Certain topics were skipped, leaving some gaps in understanding.",
  "The topics were covered well, but could have used more real-world applications.",
  "The pacing was perfect, and all topics were explained clearly.",
  "Some topics were glossed over, but overall the coverage was sufficient."
];

export default function QuestionReports() {
  return (
    <div className='flex flex-col gap-9 w-[60%] m-auto my-8 text-md'>
      <Select>
        <SelectTrigger className='w-full text-md h-12'>
          <SelectValue placeholder="Select a question" />
        </SelectTrigger>
        <SelectContent className='text-md'>
          <SelectGroup>
            <SelectItem value="Name">Name</SelectItem>
            <SelectItem value="PRN">PRN</SelectItem>
            <SelectItem value="question_1">Rate the technical skills of the teacher</SelectItem>
            <SelectItem value="question_2">How efficiently were the topics covered?</SelectItem>
            <SelectItem value="question_3">Were the contents apart from syllabus covered?</SelectItem>
            <SelectItem value="question_4">Any more suggestions</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className='flex flex-col gap-5'>
        <div className='flex gap-3 items-center'>
          <h2 className='font-bold text-xl flex-grow'>Responses</h2>
                <div className='flex items-center gap-1 justify-between rounded-md text-xl font-bold'>
                    <span>😃</span>
                    <span>60%</span>
                </div>
                <div className='flex items-center gap-1 justify-between rounded-md text-xl font-bold'>
                    <span>😔</span>
                    <span>14%</span>
                </div>
                <div className='flex items-center gap-1 justify-between rounded-md text-xl font-bold'>
                    <span>😃</span>
                    <span>60%</span>
                </div>
        </div>
        <ScrollArea className="h-[400px] w-full rounded-md border">
          <div className="p-4">
            {responses.map((text) => (
              <>
                <div key={text} className="text-md">
                  {text}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
        <div className="h-[300px] border border-gray-400 rounded-md flex items-center justify-center">Space for Charts</div>
      </div>
      <div className='flex flex-col gap-1'>
        <h2 className='font-bold text-xl'>Summary</h2>
        <p className='leading-6 text-justify text-md'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro mollitia iure tempora doloribus corporis, esse aliquid ab sapiente vel maxime veniam sequi earum ullam dolores eum obcaecati architecto unde iusto minus nostrum minima ut. Earum, tempore dolorum vel quisquam autem aut qui, suscipit aspernatur, sint odio modi consequuntur eaque neque numquam. Reiciendis, repellat sit! Libero illo delectus unde? Quidem dicta molestias consequatur, illum commodi facilis ipsa porro tempora voluptatibus vitae, impedit quam alias cum recusandae, incidunt tenetur. Voluptatum dolorum ipsam corrupti tenetur culpa perspiciatis tempora molestiae unde! Numquam, consequuntur. Suscipit totam corrupti voluptas! Tempora eaque vitae, iure saepe suscipit natus!
        </p>
      </div>
    </div>
  );
}