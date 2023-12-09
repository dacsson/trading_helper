import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import IconButton from '@mui/material/IconButton';
import TelegramIcon from '@mui/icons-material/Telegram';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import Image from 'next/image';

export const metadata = {
  title: 'Biblioff',
  description: 'Safonoffs antique books',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2000, flex: 1 }}>
            <Toolbar sx={{ backgroundColor: 'background.paper' }}>
              <Image src="/Logo.png" alt="logo" width="160" height="30"/>
            </Toolbar>
          </AppBar>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: '#f3f4f6',
              mt: ['48px', '56px', '64px'],
              p: 3,
              pb: 7
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
