export interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'doc' | 'video' | 'image' | 'presentation' | 'unknown';
  uploadedAt: string;
  isLocked: boolean;
}

export interface SystemStatus {
  temp: number;
  co2: number;
  network: string;
}

export type FileType = 'pdf' | 'doc' | 'video' | 'image' | 'presentation' | 'unknown';