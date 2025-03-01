import fs from 'fs'
import path from 'path'

export function getImages (folderPath) {
  const imagesDirectory = path.join('public', folderPath) // Ruta dentro de `public/`

  if (!fs.existsSync(imagesDirectory)) {
    console.log(`🚨 La carpeta no existe: ${imagesDirectory}`)
    return []
  }

  // Obtener archivos de imagen
  const files = fs.readdirSync(imagesDirectory)
  const images = files
    .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
    .map(file => `/${folderPath}/${file}`) // Ruta relativa desde `public/`

  console.log('📂 Carpeta de imágenes:', folderPath)
  console.log('🔗 Rutas generadas:', images)

  return images
}
