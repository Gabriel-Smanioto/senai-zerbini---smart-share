import React from 'react';
import { UploadedFile } from '../types';
import { Icons, getFileIcon } from './ui/Icon';

const MOCK_FILES: UploadedFile[] = [
  { id: '1', name: 'Apresentação_Institucional.pdf', size: '4.2 MB', type: 'pdf', uploadedAt: '10:00', isLocked: false },
  { id: '2', name: 'Template_Ata_Reuniao.docx', size: '1.1 MB', type: 'doc', uploadedAt: '11:30', isLocked: false },
  { id: '3', name: 'Video_Seguranca_Trimestre.mp4', size: '120 MB', type: 'video', uploadedAt: '13:15', isLocked: true },
];

const ServerFileList: React.FC = () => {
  return (
    <div className="bg-card border border-border rounded-3xl p-6 h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-gray-400 text-sm font-bold tracking-widest uppercase">Servidor da Sala</h2>
        <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-500">3 Arquivos</span>
      </div>

      <div className="space-y-3 overflow-y-auto flex-1 pr-2">
        {MOCK_FILES.map((file) => (
          <div key={file.id} className="group flex items-center justify-between p-4 bg-[#111216] border border-border rounded-xl hover:border-gray-600 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-lg text-gray-300 group-hover:text-white transition-colors relative">
                {getFileIcon(file.type)}
                {file.isLocked && (
                  <div className="absolute -top-1 -right-1 bg-card rounded-full p-0.5 border border-border">
                    <Icons.Lock size={10} className="text-yellow-500" />
                  </div>
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-200 group-hover:text-white truncate max-w-[150px] md:max-w-[200px]">
                  {file.name}
                </h4>
                <p className="text-xs text-gray-500">{file.size}</p>
              </div>
            </div>
            <button className="text-gray-500 hover:text-accent transition-colors">
               <Icons.UploadCloud className="rotate-180" size={20} />
            </button>
          </div>
        ))}
        
        {/* Placeholder for empty space visual balance */}
        <div className="border border-dashed border-white/5 rounded-xl p-4 flex items-center justify-center text-gray-600 text-xs mt-4">
          Espaço disponível: 450 GB
        </div>
      </div>
    </div>
  );
};

export default ServerFileList;