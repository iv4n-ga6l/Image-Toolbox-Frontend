import Link from 'next/link'
import Image from "next/image";
import { ArrowRight, Image as ImageIcon, Zap, Maximize, Search, Layers, Activity, Type } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    name: 'Image Comparison',
    description: 'Compare images side by side with an interactive slider. Perfect for before/after showcases.',
    image: "/comparison-image.webp",
    icon: ImageIcon,
    href: '/comparison',
  },
  {
    name: 'Image Compression',
    description: 'Reduce file size while maintaining quality. Optimize your images for web and mobile.',
    image: "/compression-image.png",
    icon: Zap,
    href: '/compression',
  },
  {
    name: 'Image Filtering',
    description: 'Apply various filters to enhance your images. From vintage to modern effects.',
    image: "/filter-image.png",
    icon: Layers,
    href: '/filtering',
  },
  {
    name: 'Image Resizing',
    description: 'Resize images while preserving aspect ratio. Batch processing supported.',
    image: "/resize-image.svg",
    icon: Maximize,
    href: '/resizing',
  },
  {
    name: 'Object Detection',
    description: 'Detect and locate objects within images using advanced AI algorithms.',
    image: "/obj_det.png",
    icon: Search,
    href: '/object-detection',
  },
  {
    name: 'Pose Detection',
    description: 'Identify human poses in images. Great for fitness and sports analysis.',
    image: "/pose-detection.jpg",
    icon: Activity,
    href: '/pose-detection',
  },
  {
    name: 'Text Extract',
    description: 'Extract text from images using powerful OCR technology. Multiple languages supported.',
    image: "/text-extract.jpg",
    icon: Type,
    href: '/text-extract',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
            Work hands-free, with{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Image Toolbox
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The suite that handles all your image processing needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full">
              <Link href="/comparison">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section with Horizontal Scroll */}
      <section className="py-24 overflow-hidden">
        <div className="px-4 sm:px-8 lg:px-12 mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-4">
            What Image Toolbox does for you
          </h2>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 px-4 sm:px-8 lg:px-12 snap-x snap-mandatory scrollbar-hide">
            {features.map((feature, index) => (
              <Link
                key={feature.name}
                href={feature.href}
                className="flex-shrink-0 w-[380px] sm:w-[450px] group snap-start"
              >
                <div className="relative h-[500px] sm:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800 shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
                  {/* Feature Image Background */}
                  <div className="absolute inset-0 opacity-40">
                    <img
                      className="object-cover w-full h-full"
                      src={feature.image}
                      alt={feature.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-8 sm:p-10 text-white">
                    <div className="space-y-4">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                        <feature.icon className="h-7 w-7" />
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-bold leading-tight">
                        {feature.name}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <p className="text-lg sm:text-xl text-zinc-200 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-4 transition-all">
                        Try it now
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-8 text-muted-foreground">
          <p className="text-sm">← Scroll to explore all features →</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Ready to transform your images?
          </h2>
          <p className="text-xl text-muted-foreground">
            Start using these tools today.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full">
            <Link href="/comparison">
              Start Processing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}