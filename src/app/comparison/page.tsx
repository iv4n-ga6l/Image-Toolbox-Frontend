"use client"

import { useState } from 'react'
import { FileDropZone } from '@/components/file-drop-zone'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import imageProcessingService from '@/services/image-processing'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { Progress } from '@/components/ui/progress'

export default function ImageComparison() {
    const [file1, setFile1] = useState<File | null>(null)
    const [file2, setFile2] = useState<File | null>(null)
    const [similarity, setSimilarity] = useState<number | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const { toast } = useToast()

    const handleCompare = async () => {
        if (!file1 || !file2) {
            toast({
                title: "Error",
                description: "Please upload both images to compare",
                variant: "destructive",
            })
            return
        }

        try {
            setIsProcessing(true)
            const result = await imageProcessingService.uploadFileForImageComparison(file1, file2)
            setSimilarity(result.similarity_score)
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

    return (
        <>
            <div className="container max-w-4xl py-6 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Image Comparison</h1>
                    <p className="text-muted-foreground">
                        Compare two images and see how similar they are. Upload two images to get started.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>First Image</CardTitle>
                            <CardDescription>Upload your first image here</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FileDropZone
                                onFileSelect={(file) => setFile1(file)}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Second Image</CardTitle>
                            <CardDescription>Upload your second image here</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FileDropZone
                                onFileSelect={(file) => setFile2(file)} 
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-center">
                    <Button 
                        onClick={handleCompare}
                        disabled={!file1 || !file2 || isProcessing}
                        className="w-48"
                    >
                        {isProcessing ? "Comparing..." : "Compare Images"}
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Comparison Results</CardTitle>
                        <CardDescription>
                            {similarity !== null
                                ? `The images are ${(Number(similarity) * 100).toFixed(2)}% similar`
                                : "Upload two images and click compare to see their similarity score"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {similarity !== null && (
                            <Progress value={similarity * 100} className="w-full h-4" />
                        )}
                        {isProcessing && (
                            <div className="text-center text-sm text-muted-foreground">
                                Comparing images...
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            <Toaster />
        </>
    )
}