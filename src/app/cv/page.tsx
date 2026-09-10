import React from "react";
import { Metadata } from "next";
import { profileData } from "@/data/profile";
import { experienceData } from "@/data/experience";
import { educationData } from "@/data/education";
import { skillsData } from "@/data/skills";
import { projectsData } from "@/data/projects";
import { CvClientView } from "@/components/cv/cv-client-view";

export const metadata: Metadata = {
  title: `Curriculum Vitae — ${profileData.name}, S.Kom.`,
  description: `Curriculum Vitae resmi ${profileData.name}, S.Kom. — Software Engineer (Web, Mobile, AI Developer).`,
};

export default function CvPage() {
  return (
    <CvClientView
      profile={profileData}
      experiences={experienceData}
      education={educationData}
      skills={skillsData}
      projects={projectsData}
    />
  );
}
