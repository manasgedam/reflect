"use client";
import { auth } from "@/auth"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import Header from "@/app/_components/Header"
import Sidebar from "@/app/_components/Sidebar"
import Questions from "@/app/_components/QuestionsSectionold"
import ResponseSummary from "@/app/_components/ResponseSummary";
import IndividualResponses from "@/app/_components/IndividualResponses";
import QuestionReports from "@/app/_components/QuestionReports";

export default function page({ params }: { params: { slug?: string } }) {
  // const session = await auth()
  // if (!session) return <div>Not authenticated</div>
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<number>(parseInt(params.slug || "0"));

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    if (!params.slug) {
      router.replace("/edit-form/0");
    }

    const slug = parseInt(params.slug || "0");
    if (slug !== activeSection) {
      setActiveSection(slug);
    }
  }, [params.slug, activeSection]);

  const svgTemplate = `
    <svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
      <defs>
        <filter id="blur1" x="-10%" y="-10%" width="120%" height="120%">
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
          <feGaussianBlur stdDeviation="161" result="effect1_foregroundBlur"></feGaussianBlur>
        </filter>
      </defs>
      <rect width="900" height="600" fill="COLOR1"></rect>
      <g filter="url(#blur1)">
        <circle cx="462" cy="474" fill="COLOR2" r="357"></circle>
        <circle cx="253" cy="110" fill="COLOR1" r="357"></circle>
        <circle cx="812" cy="325" fill="COLOR2" r="357"></circle>
        <circle cx="770" cy="66" fill="COLOR2" r="357"></circle>
        <circle cx="680" cy="512" fill="COLOR1" r="357"></circle>
        <circle cx="85" cy="353" fill="COLOR2" r="357"></circle>
      </g>
    </svg>
  `;

  const color1 = '#76c1ff';
  const color2 = '#cbfdff';
  const svgWithColors = svgTemplate
    .replace(/COLOR1/g, color1)
    .replace(/COLOR2/g, color2);

  const encodedSvg = `data:image/svg+xml,${encodeURIComponent(svgWithColors)}`;

  return (
    <div>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <div className="bg-paper flex flex-col">
        <Header onToggleSidebar={toggleSidebar} />
        <div className="flex flex-1">
          <Sidebar
            active={activeSection}
            isCollapsed={isSidebarCollapsed} />
          <div className="flex-1 rounded-md bg-white bg-cover bg-no-repeat m-3">
            {activeSection === 0 && <Questions />}
            {activeSection === 1 && <ResponseSummary />}
            {activeSection === 2 && <IndividualResponses />}
            {activeSection === 3 && <QuestionReports/>}
            {activeSection === 4 && <div>Actionable Insights Content</div>}
            {activeSection === 5 && <div>Form Settings Content</div>}
            {activeSection === 6 && <div>Settings Content</div>}
            {activeSection === 7 && <div>Notifications Content</div>}
            {activeSection === 8 && <div>Sign Out Content</div>}
          </div>
        </div>
      </div>
    </div>
  )
};