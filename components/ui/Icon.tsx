import React from 'react';
import { 
  Wifi, 
  Thermometer, 
  Wind, 
  Lock, 
  Unlock, 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  Film, 
  Presentation, 
  X, 
  Check, 
  ShieldCheck, 
  File
} from 'lucide-react';

export const Icons = {
  Wifi,
  Thermometer,
  Wind,
  Lock,
  Unlock,
  UploadCloud,
  FileText,
  Image: ImageIcon,
  Film,
  Presentation,
  X,
  Check,
  ShieldCheck,
  File
};

// Helper to get icon by file type
export const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf': return <Icons.FileText className="text-red-400" />;
    case 'doc': return <Icons.FileText className="text-blue-400" />;
    case 'video': return <Icons.Film className="text-purple-400" />;
    case 'image': return <Icons.Image className="text-yellow-400" />;
    case 'presentation': return <Icons.Presentation className="text-orange-400" />;
    default: return <Icons.File className="text-gray-400" />;
  }
};