
import React from 'react';
import { Link } from 'react-router-dom';
import { FileAudio, FileText, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="border-b sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <FileAudio className="h-6 w-6 text-app-purple-600" />
          <span className="font-bold text-xl">Resumo Rápido</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>Início</span>
          </Link>
          <Link to="/templates" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Templates</span>
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">Entrar</Button>
          <Button>Começar</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
