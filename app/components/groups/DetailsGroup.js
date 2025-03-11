'use client'

import dynamic from 'next/dynamic'
import DontGoComponent from '../DontGo'
import RecorridoSection from '../RecorridoSection'
import AsesoresSection from '../AsesoresComponent'

const TypologyFetcher = dynamic(
  () => import('@/app/components/TypologyFetcher'),
  { ssr: false }
)
const ProjectDetails = dynamic(
  () => import('@/app/components/ProjectDetails'),
  { ssr: false }
)
const GallerySectionClient = dynamic(
  () => import('@/app/components/GallerySection'),
  { ssr: false }
)

export default function DetailsGroup ({ project, images }) {
  return (
    <>
      <ProjectDetails project={project} />
      <GallerySectionClient images={images} />
      <RecorridoSection project={project} />
      <AsesoresSection project={project} />
      <TypologyFetcher projectId={project.id} />
      <DontGoComponent variant='alternate' />
    </>
  )
}
