import React, { useState, useEffect } from 'react';
import { Icons } from './ui/Icon';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (password.length < 4) {
      setError('A senha deve ter pelo menos 4 dígitos.');
      return;
    }
    onConfirm(password);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl transform transition-all scale-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-accent/10">
              <Icons.ShieldCheck className="text-accent" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Proteger Arquivo</h3>
              <p className="text-sm text-gray-400">Defina uma senha de acesso</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-400">
            <Icons.X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Senha de Acesso
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha..."
              className="w-full bg-[#0d0e12] border border-border rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-lg"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
            <p className="text-yellow-200 text-xs flex gap-2">
              <Icons.Lock size={14} className="mt-0.5" />
              O arquivo só poderá ser aberto no projetor mediante a inserção desta senha.
            </p>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-4 rounded-xl border border-border text-gray-300 hover:bg-white/5 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-4 rounded-xl bg-accent hover:bg-green-400 text-black font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)] transition-all transform active:scale-95"
            >
              Confirmar Proteção
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;