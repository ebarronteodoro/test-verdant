'use client'

import dynamic from 'next/dynamic'

const TypologyFetcher = dynamic(
  () => import('@/app/components/TypologyFetcher'),
  { ssr: false }
)
const InfoSection = dynamic(() => import('@/app/components/InfoSection'), {
  ssr: false
})
const ProjectDetails = dynamic(
  () => import('@/app/components/ProjectDetails'),
  { ssr: false }
)
// const GallerySectionClient = dynamic(
//   () => import('@/app/components/GallerySection'),
//   { ssr: false }
// )

export default function DetailsGroup ({ project }) {
  return (
    <>
      <InfoSection project={project} />
      <ProjectDetails project={project} />
      {/* <GallerySectionClient projectId={project.id} /> */}
      <TypologyFetcher projectId={project.id} />
    </>
  )
}
