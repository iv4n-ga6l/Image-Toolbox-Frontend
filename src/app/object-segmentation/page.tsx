"use client"

import { useState } from 'react'
import { FileDropZone } from '@/components/file-drop-zone'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import imageProcessingService from '@/services/image-processing'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

const models = [
    //   { value: 'segment-anything', label: 'Segment Anything - General purpose' },
    //   { value: 'maskrcnn', label: 'Mask R-CNN - Instance segmentation' },
    //   { value: 'deeplabv3', label: 'DeepLabV3+ - Semantic segmentation' },
    { value: 'yolov8_seg', label: 'Segment Anything with Yolov8' },
    { value: 'yolo11_seg', label: 'Segment Anything with Yolo11' },
]

export default function ObjectSegmentation() {
    const [selectedModel, setSelectedModel] = useState<string>('yolov8_seg')
    const [maskOpacity, setMaskOpacity] = useState(0.5)
    const [maskColor, setMaskColor] = useState('#FF0000')
    const [isProcessing, setIsProcessing] = useState(false)
    const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null)
    const { toast } = useToast()

    const handleFileSelect = async (file: File) => {
        try {
            setIsProcessing(true)
            const result = await imageProcessingService.uploadFileForObjectsSegmentation(file, selectedModel)
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
            link.download = 'segmented-objects.png'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    return (
        <>
            <div className="container max-w-4xl py-6 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Object Segmentation</h1>
                    <p className="text-muted-foreground">
                        Segment objects in your images with pixel-perfect precision using advanced AI models.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                            <CardDescription>Configure segmentation parameters</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Model</label>
                                <Select
                                    value={selectedModel}
                                    onValueChange={setSelectedModel}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {models.map((model) => (
                                            <SelectItem key={model.value} value={model.value}>
                                                {model.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Mask Opacity: {(maskOpacity * 100).toFixed(0)}%
                                </label>
                                <Slider
                                    value={[maskOpacity]}
                                    onValueChange={([value]) => setMaskOpacity(value)}
                                    min={0.1}
                                    max={1}
                                    step={0.05}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Mask Color</label>
                                <div className="flex gap-2">
                                    <Input
                                        type="color"
                                        value={maskColor}
                                        onChange={(e) => setMaskColor(e.target.value)}
                                        className="w-16 h-10 p-1"
                                    />
                                    <Input
                                        type="text"
                                        value={maskColor}
                                        onChange={(e) => setMaskColor(e.target.value)}
                                        className="flex-1"
                                    />
                                </div>
                            </div>

                            <FileDropZone onFileSelect={handleFileSelect} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Segmentation Results</CardTitle>
                            <CardDescription>
                                {isProcessing ? "Processing..." : "Upload an image to segment objects"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {processedImageUrl && (
                                <>
                                    <img
                                        src={processedImageUrl}
                                        alt="Segmented Objects"
                                        className="rounded-lg w-full"
                                    />
                                    <Button onClick={handleDownload} className="w-full">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Result
                                    </Button>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Toaster />
        </>
    )
}