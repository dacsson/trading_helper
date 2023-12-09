"use client"
import { useState, useRef } from 'react';
import Typography  from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ArrowDropDownIconSharp from '@mui/icons-material/ArrowDropDownSharp';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindToggle, bindMenu, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import { motion } from 'framer-motion';

interface InputSelector 
{
    ticker: string;
    setTicker: Function;
    indic: string;
    setIndic: Function;
    onStartAnalysis: Function;
    onAnalyseData: Function;
}

const tickers = ['POLY', 'FIVE', 'GAZP', 'GMKN', 'LKOH', 'MGNT', 'MTSS', 'NLMK', 'NVTK', 'PLZL', 'ROSN', 'SBER', 'SNGS', 'TATN', 'YNDX'];
const indics = ['rsi', 'willr', 'stochrsi', 'aroon', 'ao'];

export default function InputSelector({ticker, setTicker, indic, setIndic, onStartAnalysis, onAnalyseData} : InputSelector)
{

    const [open, setOpen] = useState<boolean>(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedTickerIndex, setSelectedTickerIndex] = useState<number>(0);
    const [selectedIndicIndex, setSelectedIndicIndex] = useState<number>(0);

    const handleTickerItemClick = (
        event: React.MouseEvent<HTMLElement, MouseEvent>,
        index: number,
        popupState: any
    ) => {
        setSelectedTickerIndex(index);
        setTicker(tickers[index]);
        setOpen(false);
        popupState.close();
    }

    const handleIndicItemClick = (
        event: React.MouseEvent<HTMLElement, MouseEvent>,
        index: number,
        popupState: any
    ) => {
        setSelectedIndicIndex(index);
        setIndic(indics[index]);
        setOpen(false);
        popupState.close();
    }

    const handleClose = (event: Event) => {
        if (
          anchorRef.current &&
          anchorRef.current.contains(event.target as HTMLElement)
        ) {
          return;
        }
    
        setOpen(false);
    }

    const handleStart = () => {
        onStartAnalysis()
        onAnalyseData()
    }

    return(
        <Paper elevation={0} sx={{ pb: 3, pt: 3}} style={{ position: "relative", borderRadius: 25}}>
              <Typography align='center' gutterBottom variant="h6" >
                <b>Выберите акции и индикатор</b>
              </Typography>
              <Typography align='center' variant="body2" color="text.secondary" fontSize={16}>
                Сервис автоматически построит для вас подходящее торговое решение 
              </Typography>
              
              <ButtonGroup sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                {/* Акции */}
                <ButtonGroup variant="text">
                    <Typography 
                        align='center' 
                        sx={{ pl: 7, pr: 7, pt: 0.5, backgroundColor: "#f3f4f6", borderTopLeftRadius: 5, borderBottomLeftRadius: 5}}
                    >
                        <b>{ticker}</b>
                    </Typography>
                    <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                        <div>
                        <Button
                            sx={{ backgroundColor: "#f3f4f6"}}
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            {...bindToggle(popupState)}
                        >
                            <ArrowDropDownIconSharp />
                        </Button>
                        <Popper {...bindPopper(popupState)} transition>
                            {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper color='#f3f4f6'>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList {...bindMenu(popupState)} id="split-button-menu" autoFocusItem>
                                    {tickers.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedTickerIndex}
                                            onClick={(event) => { handleTickerItemClick(event, index, popupState) }}

                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                    </MenuList>
                                </ClickAwayListener>
                                </Paper>
                            </Fade>
                            )}
                        </Popper>
                        </div>
                    )}
                    </PopupState>
                </ButtonGroup>
                <div style={{marginLeft: 30, marginRight: 30, display: "inline-block", height: 2, width: 30, backgroundColor: "silver", marginTop: 15}}></div>
                {/* <HorizontalRuleIcon sx={{ ml: 5, mr: 5, color: "gray" }} fontSize='large' height={150} width={150}/> */}

                {/* Индикатор */}
                <ButtonGroup variant="text">
                    <Typography 
                        align='center' 
                        sx={{ pl: 7, pr: 7, pt: 0.5, backgroundColor: "#f3f4f6", borderTopLeftRadius: 5, borderBottomLeftRadius: 5}}
                    >
                        <b>{indic.toUpperCase()}</b>
                    </Typography>
                    <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                        <div>
                        <Button
                            sx={{ backgroundColor: "#f3f4f6"}}
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            {...bindToggle(popupState)}
                        >
                            <ArrowDropDownIconSharp />
                        </Button>
                        <Popper {...bindPopper(popupState)} transition>
                            {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper color='#f3f4f6'>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList {...bindMenu(popupState)} id="split-button-menu" autoFocusItem>
                                    {indics.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndicIndex}
                                            onClick={(event) => { handleIndicItemClick(event, index, popupState) }}
                                        >
                                            {option.toUpperCase()}
                                        </MenuItem>
                                    ))}
                                    </MenuList>
                                </ClickAwayListener>
                                </Paper>
                            </Fade>
                            )}
                        </Popper>
                        </div>
                    )}
                    </PopupState>
                </ButtonGroup>
              </ButtonGroup>
              
              <ButtonGroup sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <motion.div
                    whileHover={{
                        scale: 1.05,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                <Button variant="contained" color="primary" onClick={() => handleStart()}>Запустить анализ</Button>
                </motion.div>
              </ButtonGroup>

            </Paper>
    )
}