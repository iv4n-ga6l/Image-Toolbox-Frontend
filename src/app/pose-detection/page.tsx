"use client"

import { useState } from 'react'
import { FileDropZone } from '@/components/file-drop-zone'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import imageProcessingService from '@/services/image-processing'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

export default function PoseDetection() {
    const [showSkeleton, setShowSkeleton] = useState(true)
    const [showJointConfidence, setShowJointConfidence] = useState(true)
    const [confidenceThreshold, setConfidenceThreshold] = useState(0.5)
    const [isProcessing, setIsProcessing] = useState(false)
    const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null)
    const { toast } = useToast()

    const handleFileSelect = async (file: File) => {
        try {
            setIsProcessing(true)
            const result = await imageProcessingService.uploadFileForOpenPosesDetection(file, showSkeleton, showJointConfidence, confidenceThreshold)
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
            link.download = 'pose-detection.jpg'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    return (
        <>
            <div className="container max-w-4xl py-6 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Pose Detection</h1>
                    <p className="text-muted-foreground">
                        Detect human poses in images using advanced AI models. Visualize body keypoints and skeletons.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                            <CardDescription>Configure pose detection parameters</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Show Skeleton</label>
                                <Switch
                                    checked={showSkeleton}
                                    onCheckedChange={setShowSkeleton}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Show Joint Confidence</label>
                                <Switch
                                    checked={showJointConfidence}
                                    onCheckedChange={setShowJointConfidence}
                                />
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
                                {isProcessing ? "Processing..." : "Upload an image to detect poses"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">

                            {processedImageUrl && (
                                <>
                                    <img
                                        src={processedImageUrl}
                                        alt="Detected Poses"
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