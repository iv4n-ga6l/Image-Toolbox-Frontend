"use client"

import { useState } from 'react'
import { FileDropZone } from '@/components/file-drop-zone'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import imageProcessingService from '@/services/image-processing'

const languages = [
  { value: 'eng', label: 'English' },
  { value: 'fra', label: 'French' },
  { value: 'deu', label: 'German' },
  { value: 'spa', label: 'Spanish' },
  { value: 'ita', label: 'Italian' },
  { value: 'por', label: 'Portuguese' },
  { value: 'rus', label: 'Russian' },
  { value: 'jpn', label: 'Japanese' },
  { value: 'kor', label: 'Korean' },
  { value: 'chi_sim', label: 'Chinese Simplified' },
]

export default function TextExtract() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('eng')
  const [isProcessing, setIsProcessing] = useState(false)
  const [extractedText, setExtractedText] = useState<string>('')
  const { toast } = useToast()

  const handleFileSelect = async (file: File) => {
    try {
      setIsProcessing(true)
      const result = await imageProcessingService.uploadFileForTextExtract(file)
      setExtractedText(result.text)
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

  const handleCopyText = () => {
    navigator.clipboard.writeText(extractedText)
    toast({
      title: "Success",
      description: "Text copied to clipboard",
    })
  }

  return (
    <>
      <div className="container max-w-4xl py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Text Extract</h1>
          <p className="text-muted-foreground">
            Extract text from images using OCR (Optical Character Recognition) technology.
          </p>
        </div>

        <div className="grid  gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Configure text extraction parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language.value} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <FileDropZone onFileSelect={handleFileSelect} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Extracted Text</CardTitle>
              <CardDescription>
                {isProcessing ? "Processing..." : "The extracted text will appear here"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={extractedText}
                readOnly
                className="min-h-[200px] font-mono"
                placeholder="Upload an image to extract text..."
              />
              {extractedText && (
                <Button onClick={handleCopyText} className="w-full">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </>
  )
}