"use client"

import { useState } from 'react'
import { FileDropZone } from '@/components/file-drop-zone'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import imageProcessingService from '@/services/image-processing'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const filters = [
    { value: 'grayscale', label: 'Grayscale' },
    { value: 'sepia', label: 'Sepia' },
    { value: 'blur', label: 'Blur' },
    { value: 'sharpen', label: 'Sharpen' },
    { value: 'edge_enhance', label: 'Edge Enhance' },
    { value: 'emboss', label: 'Emboss' },
]

export default function ImageFiltering() {
    const [selectedFilter, setSelectedFilter] = useState<string>('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null)
    const { toast } = useToast()

    const handleFileSelect = async (file: File) => {
        if (!selectedFilter) {
            toast({
                title: "Error",
                description: "Please select a filter first",
                variant: "destructive",
            })
            return
        }

        try {
            setIsProcessing(true)
            const result = await imageProcessingService.uploadFileForFiltering(file, selectedFilter)
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
            link.download = `filtered-image-${selectedFilter}.jpg`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    return (
        <>
            <div className="container max-w-4xl py-6 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Image Filtering</h1>
                    <p className="text-muted-foreground">
                        Apply various filters to your images. Select a filter and upload your image to see the result.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Original Image</CardTitle>
                            <CardDescription>Upload your image here</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Select onValueChange={setSelectedFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a filter" />
                                </SelectTrigger>
                                <SelectContent>
                                    {filters.map((filter) => (
                                        <SelectItem key={filter.value} value={filter.value}>
                                            {filter.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FileDropZone onFileSelect={handleFileSelect} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Filtered Image</CardTitle>
                            <CardDescription>
                                {isProcessing ? "Processing..." : "Your filtered image will appear here"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {processedImageUrl && (
                                <>
                                    <img
                                        src={processedImageUrl}
                                        alt="Filtered"
                                        className="rounded-lg w-full"
                                    />
                                    <Button onClick={handleDownload} className="w-full">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Filtered Image
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