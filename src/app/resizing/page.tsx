"use client"

import { useState } from 'react'
import { FileDropZone } from '@/components/file-drop-zone'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, Lock, Unlock } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import imageProcessingService from '@/services/image-processing'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

const presetSizes = [
    { name: 'HD (1280x720)', width: 1280, height: 720 },
    { name: 'Full HD (1920x1080)', width: 1920, height: 1080 },
    { name: '4K (3840x2160)', width: 3840, height: 2160 },
]

export default function ImageResizing() {
    const [width, setWidth] = useState<number>(1280)
    const [height, setHeight] = useState<number>(720)
    const [aspectLocked, setAspectLocked] = useState(true)
    const [originalAspectRatio, setOriginalAspectRatio] = useState<number | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null)
    const { toast } = useToast()

    const handleFileSelect = async (file: File) => {
        const img = new Image()
        img.onload = () => {
            const ratio = img.width / img.height
            setOriginalAspectRatio(ratio)
            setWidth(img.width)
            setHeight(img.height)
        }
        img.src = URL.createObjectURL(file)

        try {
            setIsProcessing(true)
            const result = await imageProcessingService.uploadFileForResizing(file, width, height, aspectLocked)
            setProcessedImageUrl(result)
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            })
        } finally {
            setIsProcessing(false)
        }
    }

    const handleWidthChange = (newWidth: number) => {
        setWidth(newWidth)
        if (aspectLocked && originalAspectRatio) {
            setHeight(Math.round(newWidth / originalAspectRatio))
        }
    }

    const handleHeightChange = (newHeight: number) => {
        setHeight(newHeight)
        if (aspectLocked && originalAspectRatio) {
            setWidth(Math.round(newHeight * originalAspectRatio))
        }
    }

    const handleDownload = () => {
        if (processedImageUrl) {
            const link = document.createElement('a')
            link.href = processedImageUrl
            link.download = `resized-image-${width}x${height}.jpg`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    return (
        <>
            <div className="container max-w-4xl py-6 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Image Resizing</h1>
                    <p className="text-muted-foreground">
                        Resize your images while maintaining aspect ratio. Choose from preset sizes or enter custom dimensions.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Original Image</CardTitle>
                            <CardDescription>Upload your image here</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FileDropZone onFileSelect={handleFileSelect} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Resize Settings</CardTitle>
                            <CardDescription>Adjust the dimensions of your image</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    checked={aspectLocked}
                                    onCheckedChange={setAspectLocked}
                                />
                                <span className="text-sm font-medium">
                                    Lock aspect ratio
                                    {aspectLocked ? (
                                        <Lock className="inline-block ml-2 h-4 w-4" />
                                    ) : (
                                        <Unlock className="inline-block ml-2 h-4 w-4" />
                                    )}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Width (px)</label>
                                    <Input
                                        type="number"
                                        value={width}
                                        onChange={(e) => handleWidthChange(parseInt(e.target.value))}
                                        min={1}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Height (px)</label>
                                    <Input
                                        type="number"
                                        value={height}
                                        onChange={(e) => handleHeightChange(parseInt(e.target.value))}
                                        min={1}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Preset Sizes</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {presetSizes.map((size) => (
                                        <Button
                                            key={size.name}
                                            variant="outline"
                                            onClick={() => {
                                                setWidth(size.width)
                                                setHeight(size.height)
                                            }}
                                            className="w-full"
                                        >
                                            {size.name}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {processedImageUrl && (
                                <div className="space-y-4">
                                    <img
                                        src={processedImageUrl}
                                        alt="Resized"
                                        className="rounded-lg w-full"
                                    />
                                    <Button onClick={handleDownload} className="w-full">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Resized Image
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Toaster />
        </>
    )
}