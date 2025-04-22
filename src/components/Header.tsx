
import React from 'react';
import { Link } from 'react-router-dom';
import { FileAudio, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="border-b sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <FileAudio className="h-6 w-6 text-app-purple-600" />
          <span className="font-bold text-xl">Anamnese</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <Home className="h-4 w-4 mr-2" />
            Início
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
