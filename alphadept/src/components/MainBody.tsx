"use client"
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography  from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Graph from '@/components/Graph';
import { motion } from 'framer-motion';
import InputSelector from './InputSelector';
import InfoCard from './InfoCard';
import { CircularProgress } from '@mui/material';

export default function MainBody() 
{
    const [ticker, setTicker] = useState<string>("SBER")
    const [indic, setIndic] = useState<string>("rsi")
    const [tickerData, setTickerData] = useState<Array<number>>([1, 5, 4, 3, 2])
    const [labelDates, setLabelDates] = useState<Array<string>>(["1.00.0000", "2.00.0000", "3.00.0000", "4.00.0000", "5.00.0000"])
    const [indicData, setIndicData] = useState<Array<number>>([1, 2, 3, 4, 5])
    const [pSuccess, setPSuccesss] = useState<Array<number>>([0, 0])
    const [pProfit, setPProfit] = useState<Array<number>>([0, 0])
    const [date, setDate] = useState<Array<Date>>([new Date("2.5.2003"), new Date("2.5.2003")])
    const [days, setDays] = useState<Array<number>>([0, 0])
    const [sellData, setSellData] = useState<Array<number>>([0, 0, 0, 0, 0])
    const [buyData, setBuyData] = useState<Array<number>>([0, 0, 0, 0, 0])
    const [loading, setLoading] = useState<boolean>(false)

    const handleLoading = () =>
    {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 5500)
    }

    const get_graph_data = () =>
    {
        fetch(`http://127.0.0.1:5000/get_graph_data?ticker=${ticker}`)
        .then(res => res.json())
        .then(data => {
            console.log(JSON.stringify(data.close))
            var arr = new Array
            var dates = new Array
            Object.keys(data.close).forEach(function(key) {
                arr.push(data.close[key])
                var date = new Date(parseInt(key))
                var str_date = date.getDate() + "." + date.getMonth() + "." + date.getFullYear()
                dates.push(str_date)
                console.log(data.close[key], key)
            })
            setTickerData(arr)
            setLabelDates(dates)
            console.log(tickerData)
        })
    }

    const get_info_data = () =>
    {
        fetch(`http://127.0.0.1:5000/get_bay_data?ticker=${ticker}&indicator=${indic}`)
        .then(res => res.json())
        .then(data => {
            console.log(JSON.stringify("data b info: ", data))
            if(data.length > 0)
            {
                console.log(JSON.stringify("data info: ", data[0]))
                var arr = new Array
                setPSuccesss([data[0][0], pSuccess[1]])
                setPProfit([data[0][1], pProfit[1]])
                setDate([data[0][2], date[1]])
                setDays([data[0][3], days[1]])
                console.log("vars data buy: ", pSuccess, pProfit, date, days)
            }
            else {
                setPSuccesss([0, pSuccess[1]])
                setPProfit([0, pProfit[1]])
                setDate([new Date("0.0.0000"), date[1]])
                setDays([0, days[1]])
            }
        })

        fetch(`http://127.0.0.1:5000/get_sell_data?ticker=${ticker}&indicator=${indic}`)
        .then(res => res.json())
        .then(data => {
            console.log(JSON.stringify("data s info: ", data[0]))
            if(data.length > 0)
            {
                console.log(JSON.stringify("data info: ", data))
                var arr = new Array
                setPSuccesss([pSuccess[0], data[0][0]])
                setPProfit([pProfit[0], data[0][1]])
                setDate([date[0], data[0][2]])
                setDays([days[0], data[0][3]])
                console.log("vars data sell: ", pSuccess, pProfit, date, days)
            }
            else {
                setPSuccesss([pSuccess[0],0])
                setPProfit([pProfit[0], 0])
                setDate([date[0], new Date("0.0.0000")])
                setDays([days[0], 0])
            }
        })

        fetch(`http://127.0.0.1:5000/get_bay_graph_data?ticker=${ticker}&indicator=${indic}`)
        .then(res => res.json())
        .then(data => {
            console.log(JSON.stringify(data.buy))
            var arr = new Array
            Object.keys(data.buy).forEach(function(key) {
                arr.push(data.buy[key] == true ? 1 : 0)
                console.log(data.buy[key])
            })
            setBuyData(arr)
            console.log(buyData)
        })

        
        fetch(`http://127.0.0.1:5000/get_sell_graph_data?ticker=${ticker}&indicator=${indic}`)
        .then(res => res.json())
        .then(data => {
            console.log(JSON.stringify(data.sell))
            var arr = new Array
            Object.keys(data.sell).forEach(function(key) {
                arr.push(data.sell[key] == true ? 1 : 0)
                console.log(data.sell[key])
            })
            setSellData(arr)
            console.log(sellData)
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    return(
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 15, staggerChildren: 0.5 }}
        >
        <Grid container rowSpacing={6} columnSpacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid xl={5}>
            <motion.div>
                <Typography align='center' gutterBottom variant="h4">
                <b>Сервис по построению торговых решений на основе данных <a style={{ color: "#05B958" }}>AlgoPack</a></b>
                </Typography>
                <Typography align='center' variant="body1" color="text.secondary"  fontSize={20}>
                Инновационные решения для инвесторов — эффективный анализ данных, уверенные решения, успешные результаты
                </Typography>
            </motion.div>
          </Grid>
          <Grid xl={8}>
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
                <InputSelector ticker={ticker} setTicker={setTicker} indic={indic} setIndic={setIndic} onStartAnalysis={get_graph_data} onAnalyseData={get_info_data} onLoading={handleLoading}/>
            </motion.div>
          </Grid>
          <Grid xl={6}>
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
                <Typography align='left' variant="h5" sx={{ mb: 2 }}>
                    <b>Анализ акций {ticker} за период 30 дней</b>
                </Typography>
                <Paper elevation={0} sx={{ pb: 3, pt: 3}} style={{ position: "relative", borderRadius: 25, border: "1px solid #ADADAD00" }}>
                    {
                        loading
                        ?
                        <Paper elevation={0} sx={{ pb: 3, pt: 3, height: "350px"}} style={{ position: "relative", borderRadius: 25, border: "1px solid #ADADAD00", marginTop: "48px", display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress sx={{ mt: 15 }}/>
                        </Paper>
                        :
                        <Graph pData={tickerData} uData={tickerData} labelDates={labelDates} buyData={buyData} sellData={sellData}/>
                    }
                </Paper>
            </motion.div>
          </Grid>
          <Grid xl={2}>
            <motion.div
                initial={{ x: "300%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
                    {
                        loading
                        ?
                        <Paper elevation={0} sx={{ pb: 3, pt: 3, height: "450px"}} style={{ position: "relative", borderRadius: 25, border: "1px solid #ADADAD00", marginTop: "48px", display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress sx={{ mt: 20 }}/>
                        </Paper>
                        :
                        <InfoCard ticker={ticker} indic={indic.toUpperCase()} pProfit={pProfit} pSuccess={pSuccess} date={date} days={days}/>
                    }
               
            </motion.div>
          </Grid>
        </Grid>
        </motion.div>
    )
}