
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NavbarProfileMenu = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userName = localStorage.getItem('userName') || 'User';
  const userEmail = localStorage.getItem('userEmail') || '';
  const userAvatar = localStorage.getItem('userAvatar') || '';

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
  };

  const handleProfileSettings = () => {
    navigate('/profile-settings');
  };

  if (!isLoggedIn) {
    return (
      <button 
        onClick={() => navigate('/login')}
        className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors"
      >
        <User className="h-5 w-5" />
        <span>Login</span>
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-9 w-9 rounded-full overflow-hidden border bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          {userAvatar ? (
            <Avatar>
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{getInitials(userName)}</AvatarFallback>
            </Avatar>
          ) : (
            <Avatar>
              <AvatarFallback>{getInitials(userName)}</AvatarFallback>
            </Avatar>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfileSettings} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Profile Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 hover:text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarProfileMenu;
