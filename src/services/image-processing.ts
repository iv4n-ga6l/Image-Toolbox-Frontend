import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import config from '../../config'

interface RequestOptions extends AxiosRequestConfig {
  responseType?: 'blob' | 'json' | 'text' | 'arraybuffer' | 'document' | 'stream'
}

class ImageProcessingService {
  private axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: config.baseURL,
    })
  }

  private async makeRequest<T>(
    method: string,
    url: string,
    data: any = null,
    options: RequestOptions = {}
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axios({
        method,
        url,
        data,
        ...options,
      })
      return response.data
    } catch (error: any) {
      if (error.response) {
        throw new Error(`Server error: ${error.response.status} - ${error.response.data.error}`)
      } else if (error.request) {
        throw new Error('Network error: No response received from server')
      } else {
        throw new Error(`Request error: ${error.message}`)
      }
    }
  }

  async uploadFileForObjectsDetection(file: File, model: string, confidenceThreshold: number): Promise<string> {
    const formData = new FormData()
    formData.append("file", file)

    const path = `/detect_objects?model=${model}&confidence_threshold=${confidenceThreshold}`
    
    const blob = await this.makeRequest<Blob>('post', path, formData, {
      responseType: 'blob'
    })

    return URL.createObjectURL(blob)
  }

  async uploadFileForObjectsSegmentation(file: File, model: string): Promise<string> {
    const formData = new FormData()
    formData.append("file", file)

    const path = `/segment_objects?model=${model}`
    
    const blob = await this.makeRequest<Blob>('post', path, formData, {
      responseType: 'blob'
    })

    return URL.createObjectURL(blob)
  }

  async uploadFileForResizing(file: File, width: number, height: number, aspectLocked: boolean): Promise<string> {
    const formData = new FormData()
    formData.append("file", file)

    const path = `/resize_image?width=${width}&height=${height}&isAspectRatioLocked=${aspectLocked}`
    
    const blob = await this.makeRequest<Blob>('post', path, formData, {
      responseType: 'blob'
    })

    return URL.createObjectURL(blob)
  }

  async uploadFileForFiltering(file: File, filter: string): Promise<string> {
    const formData = new FormData()
    formData.append("file", file)

    const path = `/apply_filter?filter=${filter}`
    
    const blob = await this.makeRequest<Blob>('post', path, formData, {
      responseType: 'blob'
    })

    return URL.createObjectURL(blob)
  }

  async uploadFileForTextExtract(file: File): Promise<{ text: string }> {
    const formData = new FormData()
    formData.append("file", file)
    
    return this.makeRequest<{ text: string }>('post', '/extract_text', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  async uploadFileForCompression(file: File, quality: number): Promise<string> {
    const formData = new FormData()
    formData.append("file", file)

    const path = `/compress_image?quality=${quality}`
    
    const blob = await this.makeRequest<Blob>('post', path, formData, {
      responseType: 'blob'
    })

    return URL.createObjectURL(blob)
  }

  async uploadFileForImageComparison(file1: File, file2: File): Promise<{ similarity_score: number }> {
    const formData = new FormData()
    formData.append("file1", file1)
    formData.append("file2", file2)
    
    return this.makeRequest<{ similarity_score: number }>('post', '/compare_images', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  async uploadFileForObjectsCounting(file: File, model: string): Promise<{ count: number }> {
    const formData = new FormData()
    formData.append("file", file)

    const path = `/count_objects?model=${model}`
    
    return this.makeRequest<{ count: number }>('post', path, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  async uploadFileForOpenPosesDetection(file: File, showSkeleton : boolean, showJointConfidence : boolean, confidenceThreshold : number): Promise<string> {
    const formData = new FormData()
    formData.append("file", file)

    const path = `/detect_open_poses?showSekeleton=${showSkeleton}&showJointConfidence=${showJointConfidence}&confidence_threshold=${confidenceThreshold}`
    
    const blob = await this.makeRequest<Blob>('post', path, formData, {
      responseType: 'blob'
    })

    return URL.createObjectURL(blob)
  }
}

export default new ImageProcessingService()