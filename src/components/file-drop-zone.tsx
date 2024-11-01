"use client"

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface FileDropZoneProps {
  onFileSelect: (file: File) => void
  accept?: Record<string, string[]>
  maxSize?: number
  className?: string
  preview?: boolean
}

export function FileDropZone({
  onFileSelect,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
  },
  maxSize = 5242880, // 5MB
  className,
  preview = true
}: FileDropZoneProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      onFileSelect(file)
      if (preview) {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      }
    }
  }, [onFileSelect, preview])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false
  })

  const clearPreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25",
          className
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          Drag & drop an image here, or click to select
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Maximum file size: {Math.round(maxSize / 1024 / 1024)}MB
        </p>
      </div>
      {preview && previewUrl && (
        <div className="relative mt-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
            onClick={clearPreview}
          >
            <X className="h-4 w-4" />
          </Button>
          <img
            src={previewUrl}
            alt="Preview"
            className="rounded-lg max-h-[300px] w-full object-contain"
          />
        </div>
      )}
    </div>
  )
}