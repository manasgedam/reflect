// Type definitions for the questions and form data
export default interface Question {
    id: number;
    text: string;
    description: string;
    type: "text" | "video" | "radio" | "checkbox" | "star";
    required: boolean;
    options?: string[];
}