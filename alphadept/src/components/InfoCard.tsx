"use client"
import {useState} from 'react';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import EastIcon from '@mui/icons-material/East';
import Button from '@mui/material/Button';
import WarningIcon from '@mui/icons-material/Warning';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

interface InfoCardProps
{
    ticker: string;
    indic: string;
    pSuccess: Array<number>;
    pProfit: Array<number>;
    date: Array<Date>;
    days: Array<number>;
}

const variants = {
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeOut',
        duration: 0.3
      }
    },
    hide: {
      y: -20,
      opacity: 0
    }
};

export default function InfoCard({ticker, indic, pSuccess, pProfit, date, days} : InfoCardProps)
{
    const [currentPS, setCurrentPS] = useState<number>(pSuccess[0])
    const [currentPP, setCurrentPP] = useState<number>(pProfit[0])
    const [currentDate, setCurrentDate] = useState<Date>(date[0])
    const [currentDays, setCurrentDays] = useState<number>(days[0])
    const [state, setState] = useState(1);
    // true - sell ; false - but
    const [selectedMode, setSelectedMode] = useState<boolean>(true)
    const modes = ["покупка", "продажа"]

    const checkData = () =>
    {
        if(selectedMode)
        {
            if(pSuccess[0] == 0 && pProfit[0] == 0 && days[0] == 0) return false
            return true
        }
        else if(!selectedMode)
        {
            if(pSuccess[1] == 0 && pProfit[1] == 0 && days[1] == 0) return false
            return true
        }
    }

    const handleNext = () =>
    {
        setState(Math.random());
        setSelectedMode(!selectedMode)
    }

    return (
            <Paper elevation={0} sx={{ pb: 3, pt: 3}} style={{ position: "relative", borderRadius: 25, border: "1px solid #ADADAD00", marginTop: "48px" }}>
                {/* Header */}
                <Typography align='left' gutterBottom variant="h6" sx={{ ml: 5 }}>
                    <b>{ticker} - {indic}</b> <i>{selectedMode == true ? modes[0] : modes[1]}</i>
                </Typography>
                <motion.div 
                    key={state}
                    variants={variants} 
                    animate={'show'} 
                    initial="hide"
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }} 
                >  
                {
                    checkData()
                    ?
                    <>
                    <Typography align='left' gutterBottom variant="body1" sx={{ ml: 5, mt: 4 }}>
                        Процент срабатывания
                    </Typography> 
                    <Typography align='left' gutterBottom variant="body1" sx={{ ml: 5 }}>
                        <a style={{ color: "#05B958"}}>{selectedMode == true ?  (pSuccess[0]* 100).toPrecision(3) : (pSuccess[1]* 100).toPrecision(3) }%</a>
                    </Typography> 
                    
                    <Typography align='left' gutterBottom variant="body1" sx={{ ml: 5, mt: 4 }}>
                        Процент прибыли
                    </Typography> 
                    <Typography align='left' gutterBottom variant="body1" sx={{ ml: 5 }}>
                        <a style={{ color: "#05B958"}}>{selectedMode == true ? (pProfit[0]* 100).toPrecision(3) : (pProfit[1]* 100).toPrecision(3) }%</a>
                    </Typography> 
                    
                    <Typography align='left' gutterBottom variant="body1" sx={{ ml: 5, mt: 4  }}>
                        Дата сигнала
                    </Typography> 
                    <Typography align='left' gutterBottom variant="body1" sx={{ ml: 5 }}>
                        {selectedMode == true ? date[0].toString() : date[1].toString()}
                    </Typography> 
                    
                    <Typography align='left' gutterBottom variant="body1" sx={{ ml: 5, mt: 4  }}>
                        Прогноз на
                    </Typography> 
                    <Typography align='left' gutterBottom variant="body1" sx={{ ml: 5 }}>
                        <b>{selectedMode == true ? days[0] : days[1]} дня</b>
                    </Typography> 
                    </>
                    :
                    <>
                        <Box sx={{ ml: 5, mt: 10, mb: 8, mr: 5, backgroundColor: "#CF2626", borderRadius: 5, p: 3 }}>
                            <WarningIcon color="warning" fontSize='medium' sx={{ marginLeft: "40%" }}/> 
                            <Typography align='center' gutterBottom variant="body1">
                                <a style={{ color: "white" }}><b>Необходимый сигнал не найден</b></a>
                            </Typography>
                            <Typography align='center' variant='body2'>
                                <a style={{ color: "white" }}>Выберите другой индикатор / акцию или сигнал: <i>{selectedMode == true ? modes[1] : modes[0]}</i> по стрелке далее</a>
                            </Typography>
                        </Box>
                    </>
                }
                </motion.div>

                <Typography align='right' variant="body1" sx={{ ml: 5, mr: 2, mt: 2}}>
                    <Button variant="text" size="small" sx={{ backgroundColor: "#F3F4F6", borderRadius: 2, padding: "5px"}} onClick={() => handleNext()}>
                        <EastIcon fontSize="small"/>
                    </Button>
                </Typography> 
            </Paper>
    )
}