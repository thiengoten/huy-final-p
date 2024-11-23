import { useState } from "react"

type ProductImageCarouselProps = {
  images: string[]
}
export default function ProductImageCarousel({
  images,
}: ProductImageCarouselProps) {
  const [selectedImage, setSelectedImage] = useState(images[0])
  console.log(images)
  return (
    <div className="flex flex-col items-center">
      {/* Main Image */}
      <div className="w-full max-w-lg mb-4">
        <img
          src={selectedImage}
          alt="Selected Product"
          className="w-full h-96 object-cover rounded-md"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`border rounded-md p-1 ${
              selectedImage === image ? "border-black" : "border-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-16 h-16 object-cover rounded"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
