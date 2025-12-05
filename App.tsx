import React, { useState, useRef } from 'react';
import ServerFileList from './components/ServerFileList';
import PasswordModal from './components/PasswordModal';
import { Icons, getFileIcon } from './components/ui/Icon';

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [filePassword, setFilePassword] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Handlers
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      // Reset states
      setIsPasswordProtected(false);
      setFilePassword(null);
      setUploadSuccess(false);
      setUploadProgress(0);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleTogglePassword = () => {
    if (isPasswordProtected) {
      // Turning off
      setIsPasswordProtected(false);
      setFilePassword(null);
    } else {
      // Turning on - open modal
      setIsModalOpen(true);
    }
  };

  const handlePasswordSet = (password: string) => {
    setFilePassword(password);
    setIsPasswordProtected(true);
    setIsModalOpen(false);
  };

  const handleCancelPassword = () => {
    setIsModalOpen(false);
    // Note: We don't change isPasswordProtected here because the user cancelled the action of *setting* it.
    // If it was already false, it stays false.
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setIsUploading(true);
    // Simulate upload
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadSuccess(true);
        setTimeout(() => {
          // Reset after success
          setSelectedFile(null);
          setUploadSuccess(false);
          setIsPasswordProtected(false);
          setFilePassword(null);
          setUploadProgress(0);
        }, 3000);
      }
    }, 100);
  };

  const getFileTypeString = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (['pdf'].includes(ext || '')) return 'pdf';
    if (['doc', 'docx', 'txt'].includes(ext || '')) return 'doc';
    if (['mp4', 'mov', 'avi'].includes(ext || '')) return 'video';
    if (['jpg', 'png', 'jpeg', 'webp'].includes(ext || '')) return 'image';
    if (['ppt', 'pptx'].includes(ext || '')) return 'presentation';
    return 'unknown';
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-accent selection:text-black">
      
      <main className="flex-1 p-4 md:p-8 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Column: Upload Area (Takes 2/3 on desktop) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Welcome Card */}
          <div className="bg-card border border-border rounded-3xl p-6 relative overflow-hidden group">
             {/* Decorative glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
             
             <div className="relative z-10">
               <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                 SENAI ZERBINI
               </h1>
               <p className="text-gray-400 text-lg">
                 Central de Upload para Apresentações
               </p>
             </div>
          </div>

          {/* Main Upload Card */}
          <div className="bg-[#111216] border border-border rounded-3xl p-6 md:p-8 flex-1 flex flex-col shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl text-white font-semibold flex items-center gap-2">
                <span className="w-2 h-6 bg-primary rounded-full"></span>
                Novo Arquivo
              </h2>
              {selectedFile && (
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <Icons.X />
                </button>
              )}
            </div>

            {/* Upload Zone */}
            <div className="flex-1 flex flex-col">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileSelect} 
                accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.png,.mp4"
              />

              {!selectedFile ? (
                <div 
                  onClick={triggerFileSelect}
                  className="flex-1 border-2 border-dashed border-[#2a2e37] hover:border-accent hover:bg-accent/5 rounded-2xl flex flex-col items-center justify-center p-8 cursor-pointer transition-all duration-300 group min-h-[300px]"
                >
                  <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <Icons.UploadCloud size={32} className="text-gray-400 group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">Toque para selecionar</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    Suporta PDF, DOCX, PPTX, Imagens e Vídeos. <br/>
                    Arquivos serão enviados para o servidor local da sala.
                  </p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-center gap-6">
                   {/* Selected File Preview */}
                   <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-6 animate-in fade-in slide-in-from-bottom-4">
                      <div className="p-5 bg-white/5 rounded-2xl">
                        {getFileIcon(getFileTypeString(selectedFile.name))}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-medium text-white truncate">{selectedFile.name}</h3>
                        <p className="text-gray-400 mt-1">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {getFileTypeString(selectedFile.name).toUpperCase()}
                        </p>
                      </div>
                   </div>

                   {/* Security Toggle */}
                   <div className="bg-card border border-border rounded-2xl p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl transition-colors ${isPasswordProtected ? 'bg-accent/20 text-accent' : 'bg-white/5 text-gray-400'}`}>
                          {isPasswordProtected ? <Icons.Lock size={24} /> : <Icons.Unlock size={24} />}
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-lg">Proteção por Senha</h4>
                          <p className="text-sm text-gray-500">
                            {isPasswordProtected 
                              ? 'Arquivo protegido. Senha necessária para abrir.' 
                              : 'Arquivo acessível publicamente na sala.'}
                          </p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={handleTogglePassword}
                        className={`w-16 h-8 rounded-full transition-colors relative ${isPasswordProtected ? 'bg-accent' : 'bg-gray-700'}`}
                      >
                        <span className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform shadow-md ${isPasswordProtected ? 'left-9' : 'left-1'}`}></span>
                      </button>
                   </div>

                   {/* Action Button */}
                   <div className="mt-auto pt-4">
                     {!isUploading && !uploadSuccess && (
                       <button 
                         onClick={handleUpload}
                         className="w-full py-5 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xl shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_4px_25px_rgba(99,102,241,0.6)] transition-all transform active:scale-98 flex items-center justify-center gap-3"
                       >
                         <span>Enviar para Tela</span>
                         <Icons.UploadCloud size={24} />
                       </button>
                     )}

                     {isUploading && (
                       <div className="bg-card border border-border rounded-2xl p-6">
                         <div className="flex justify-between text-sm text-white mb-2">
                           <span>Enviando...</span>
                           <span>{uploadProgress}%</span>
                         </div>
                         <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                           <div 
                              className="bg-accent h-full transition-all duration-300 ease-out"
                              style={{ width: `${uploadProgress}%` }}
                           ></div>
                         </div>
                       </div>
                     )}

                     {uploadSuccess && (
                       <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex items-center justify-center gap-3 text-green-400 animate-in zoom-in">
                         <Icons.Check size={24} />
                         <span className="font-bold text-lg">Arquivo enviado com sucesso!</span>
                       </div>
                     )}
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Server List (Sidebar on desktop, stacked on mobile) */}
        <div className="h-full min-h-[400px]">
          <ServerFileList />
        </div>

      </main>

      {/* Password Modal */}
      <PasswordModal 
        isOpen={isModalOpen}
        onClose={handleCancelPassword}
        onConfirm={handlePasswordSet}
      />
    </div>
  );
}

export default App;