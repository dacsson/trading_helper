import Box from '@mui/material/Box';
import BackgroundImages from '@/components/BackgroundImages';
import MainBody from '@/components/MainBody';
export default async function HomePage() {



  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <div>
        {/* Cool figures */}
        <BackgroundImages />        

        {/* Main content */}
        <MainBody />
      </div>
    </Box>
  );
}
