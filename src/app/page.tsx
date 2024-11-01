import Link from 'next/link'
import Image from "next/image";
import { ArrowRight, Image as ImageIcon, Zap, Maximize, Search, Layers, Activity, Type } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    name: 'Image Comparison',
    description: 'Compare images side by side with a slider.',
    image: "/comparison-image.webp",
    icon: ImageIcon,
    href: '/comparison',
  },
  {
    name: 'Image Compression',
    description: 'Reduce file size while maintaining quality.',
    image: "/compression-image.png",
    icon: Zap,
    href: '/compression',
  },
  {
    name: 'Image Filtering',
    description: 'Apply various filters to enhance your images.',
    image: "/filter-image.png",
    icon: Layers,
    href: '/filtering',
  },
  {
    name: 'Image Resizing',
    description: 'Resize images while preserving aspect ratio.',
    image: "/resize-image.svg",
    icon: Maximize,
    href: '/resizing',
  },
  {
    name: 'Object Detection',
    description: 'Detect and locate objects within images.',
    image: "/obj_det.png",
    icon: Search,
    href: '/object-detection',
  },
  {
    name: 'Pose Detection',
    description: 'Identify human poses in images.',
    image: "/pose-detection.jpg",
    icon: Activity,
    href: '/pose-detection',
  },
  {
    name: 'Text Extract',
    description: 'Extract text from images using OCR.',
    image: "/text-extract.jpg",
    icon: Type,
    href: '/text-extract',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-background">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center sm:px-20">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          Welcome to <span className="text-primary">Image Toolbox</span>
        </h1>
        <p className="mt-3 text-xl sm:text-2xl">
          Your all-in-one AI-powered image processing suite
        </p>
        <div className="flex mt-8">
          <Button asChild>
            <Link href="/comparison">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Link
                key={feature.name}
                href={feature.href}
                className="border rounded-lg p-6 text-left hover:border-primary transition-colors duration-200 hover:shadow-md"
              >
                {/* <Image
                  className="dark:invert"
                  src="/next.svg"
                  alt="Next.js logo"
                  width={180}
                  height={38}
                  priority
                /> */}
                
                <img
                  className='object-cover w-full h-40'
                  src={feature.image}
                  alt="Feature image"
                />
                {/* <feature.icon className="h-8 w-8 mb-3 text-primary" /> */}
                <h3 className="text-xl font-bold mb-2">{feature.name}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}