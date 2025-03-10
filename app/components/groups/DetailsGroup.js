"use client";

import dynamic from "next/dynamic";
import DontGoComponent from "../DontGo";

const TypologyFetcher = dynamic(
  () => import("@/app/components/TypologyFetcher"),
  { ssr: false }
);
const InfoSection = dynamic(() => import("@/app/components/InfoSection"), {
  ssr: false,
});
const ProjectDetails = dynamic(
  () => import("@/app/components/ProjectDetails"),
  { ssr: false }
);
const GallerySectionClient = dynamic(
  () => import("@/app/components/GallerySection"),
  { ssr: false }
);

export default function DetailsGroup({ project, images }) {
  return (
    <>
      <InfoSection project={project} />
      <ProjectDetails project={project} />
      <GallerySectionClient images={images} />
      <TypologyFetcher projectId={project.id} />
      <DontGoComponent variant="alternate" />
    </>
  );
}
