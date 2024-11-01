"use client"

import { useState } from 'react'
import { Download } from 'lucide-react'
import { FileDropZone } from '@/components/file-drop-zone'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import imageProcessingService from '@/services/image-processing'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

export default function ImageCompression() {
    const [quality, setQuality] = useState(80)
    const [isProcessing, setIsProcessing] = useState(false)
    const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null)
    const { toast } = useToast()

    const handleFileSelect = async (file: File) => {
        try {
            setIsProcessing(true)
            const result = await imageProcessingService.uploadFileForCompression(file, quality)
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

    const handleDownload = () => {
        if (processedImageUrl) {
            const link = document.createElement('a')
            link.href = processedImageUrl
            link.download = 'compressed-image.jpg'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    return (
        <>
            <div className="container max-w-4xl py-6 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Image Compression</h1>
                    <p className="text-muted-foreground">
                        Compress your images while maintaining quality. Adjust the quality slider to find the perfect balance between file
                        size and image quality.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Original Image</CardTitle>
                            <CardDescription>Upload your image here</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FileDropZone onFileSelect={handleFileSelect} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Compression Settings</CardTitle>
                            <CardDescription>Adjust the compression quality</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <label className="text-sm font-medium">
                                    Quality: {quality}%
                                </label>
                                <Slider
                                    value={[quality]}
                                    onValueChange={([value]) => setQuality(value)}
                                    min={1}
                                    max={100}
                                    step={1}
                                    className="w-full"
                                />
                            </div>

                            {processedImageUrl && (
                                <div className="space-y-4">
                                    <img
                                        src={processedImageUrl}
                                        alt="Compressed"
                                        className="rounded-lg w-full"
                                    />
                                    <Button onClick={handleDownload} className="w-full">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Compressed Image
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