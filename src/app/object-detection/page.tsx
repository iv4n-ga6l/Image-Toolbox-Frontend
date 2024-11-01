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
import imageProcessingService from '@/services/image-processing'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

const models = [
    { value: 'yolov8', label: 'YOLOv8 Medium - Anchor-free Detection' },
    { value: 'yolov10', label: 'YOLOv10 Medium - Higher accuracy, NMS-free Training' },
    { value: 'yolo11', label: 'YOLO11 Fast and more lightweight - Enhanced Efficiency' },
]

type ObjectCount = {
    [className: string]: number;
}

export default function ObjectDetection() {
    const [selectedModel, setSelectedModel] = useState<string>('yolov8')
    const [confidenceThreshold, setConfidenceThreshold] = useState(0.5)
    const [isProcessing, setIsProcessing] = useState(false)
    const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null)
    const [objectCounts, setObjectCounts] = useState<ObjectCount[]>([])
    const { toast } = useToast()

    const handleFileSelect = async (file: File) => {
        try {
            setIsProcessing(true)
            const [detectionResult, countResult] = await Promise.all([
                imageProcessingService.uploadFileForObjectsDetection(file, selectedModel, confidenceThreshold),
                imageProcessingService.uploadFileForObjectsCounting(file, selectedModel)
            ])
            setProcessedImageUrl(detectionResult)
            
            const countsArray = Object.entries(countResult).map(([className, count]) => ({
                [className]: count
            }))
            setObjectCounts(countsArray)
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
            link.download = 'detected-objects.jpg'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    const totalObjectCount = objectCounts.reduce((total, obj) => total + Object.values(obj)[0], 0)

    return (
        <>
            <div className="container max-w-4xl py-6 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Object Detection</h1>
                    <p className="text-muted-foreground">
                        Detect and locate objects in your images using state-of-the-art AI models.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                            <CardDescription>Configure detection parameters</CardDescription>
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
                                    Confidence Threshold: {(confidenceThreshold * 100).toFixed(0)}%
                                </label>
                                <Slider
                                    value={[confidenceThreshold]}
                                    onValueChange={([value]) => setConfidenceThreshold(value)}
                                    min={0.1}
                                    max={1}
                                    step={0.05}
                                    className="w-full"
                                />
                            </div>

                            <FileDropZone onFileSelect={handleFileSelect} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Detection Results</CardTitle>
                            <CardDescription>
                                {isProcessing
                                    ? "Processing..."
                                    : objectCounts.length > 0
                                        ? `Detected ${totalObjectCount} objects`
                                        : "Upload an image to detect objects"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {processedImageUrl && (
                                <>
                                    <img
                                        src={processedImageUrl}
                                        alt="Detected Objects"
                                        className="rounded-lg w-full"
                                    />
                                    <div className="mt-4">
                                        <h3 className="text-lg font-semibold mb-2">Object Counts:</h3>
                                        <ul className="list-disc pl-5">
                                            {objectCounts.map((obj, index) => {
                                                const [className, count] = Object.entries(obj)[0]
                                                return (
                                                    <li key={index}>
                                                        {className}: {count}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <Button onClick={handleDownload} className="w-full mt-4">
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