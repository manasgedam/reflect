"use client";
import { auth } from "@/auth"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import Header from "@/app/_components/Header"
import Sidebar from "@/app/_components/Sidebar"
import Questions from "@/app/_components/Questions"
import ResponseSummary from "../../_components/ResponseSummary";

export default function page({ params }: { params: { slug?: string } }) {
  // const session = await auth()
  // if (!session) return <div>Not authenticated</div>
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<number>(parseInt(params.slug || "0"));

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSectionChange = (section: number) => {
    setActiveSection(section);
    if (section !== activeSection) {
      router.push(`/edit-form/${section}`);
    }
  }

  useEffect(() => {
    if (!params.slug) {
      router.replace("/edit-form/0");
    }
  }, [params.slug, router]);

  return (
    <div>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <div className="bg-paper h-screen flex flex-col">
        <Header onToggleSidebar={toggleSidebar} />
        <div className="flex flex-1">
          <Sidebar
            active={activeSection}
            isCollapsed={isSidebarCollapsed}
            onSectionChange={handleSectionChange} />
          <div className="flex-1 rounded-md bg-white m-3">
            {activeSection === 0 && <Questions />}
            {activeSection === 1 && <ResponseSummary />}
            {activeSection === 2 && <div>Individual Responses Content</div>}
            {activeSection === 3 && <div>Question-Based Reports Content</div>}
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