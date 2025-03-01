import fs from 'fs'
import path from 'path'

export default function handler (req, res) {
  const { path: imagePath } = req.query

  if (!imagePath) {
    return res.status(400).json({ error: 'No se proporcionó una ruta válida' })
  }

  const imagesDirectory = path.join(process.cwd(), '/', imagePath)

  // Verifica si la carpeta existe
  if (!fs.existsSync(imagesDirectory)) {
    return res.status(404).json({ error: 'La carpeta no existe' })
  }

  // Obtiene las imágenes de la carpeta
  const files = fs.readdirSync(imagesDirectory)
  const images = files
    .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
    .map(file => `/${imagePath}/${file}`) // Retorna la ruta correcta

  res.status(200).json(images)
}
