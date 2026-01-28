import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [currentTab, setCurrentTab] = useState<'login' | 'register' | 'forgot'>(defaultTab);

  const handleSuccess = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {currentTab === 'login' ? 'Accedi' : 'Registrati'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {currentTab === 'login' ? 'Inserisci le tue credenziali per accedere' : 'Crea un nuovo account'}
          </DialogDescription>
        </DialogHeader>
        
        {currentTab === 'login' ? (
          <LoginForm 
            onSuccess={handleSuccess}
            onSwitchToRegister={() => setCurrentTab('register')}
            onForgotPassword={() => setCurrentTab('forgot')}
          />
        ) : currentTab === 'register' ? (
          <RegisterForm 
            onSuccess={handleSuccess}
            onSwitchToLogin={() => setCurrentTab('login')}
          />
        ) : (
          <ForgotPasswordForm 
            onBackToLogin={() => setCurrentTab('login')}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}