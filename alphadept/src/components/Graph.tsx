"use client"
import { LineChart } from '@mui/x-charts/LineChart';

interface GraphProps
{
    uData: Array<number>;
    pData: Array<number>;
    labelDates: Array<string>;
    buyData: Array<number>;
    sellData: Array<number>;
}

export default function Graph({uData, pData,  labelDates, buyData, sellData} : GraphProps) 
{
//     const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
//   const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = labelDates

    return(
        <LineChart
            sx={{
                '& .MuiLineElement-root': {
                    strokeWidth: 3,
                },
                '& .MuiAreaElement-series-company': {
                    fill: "url('#myGradient1')",
                },
                '& .MuiAreaElement-series-indic': {
                    fill: "url('#myGradient2')",
                },
            }}
            width={900}
            height={420}
            series={[
                { id: "company", data: pData, area: true, stack: 'total', label: 'Акция', color: "#4DADF3CC", showMark: false },
                { id: "buy", data: buyData, stack: 'total', label: 'Стоит покупать', color: "#75E9B2", showMark: false },
                { id: "sell", data: sellData, stack: 'total', label: 'Стоит продавать', color: "#CF2626", showMark: false }
            ]}
            xAxis={[{ id: "cost", scaleType: 'point', data: xLabels }]}
            leftAxis={{
                disableLine: true,
            }}
            bottomAxis={{
                axisId: "cost",
                disableLine: true,
                disableTicks: true
            }}
            slotProps={{
                legend: {
                    direction: 'row',
                    position: { vertical: 'top', horizontal: 'right' },
                    padding: 0,
                    markGap: 5,
                    itemGap: 25
                }
            }}
        >
            <defs>
                <linearGradient id="myGradient1" gradientTransform="rotate(90)">
                    <stop offset="5%" stopColor="#4DADF3" />
                    <stop offset="100%" stopColor="#ADADAD00" />
                </linearGradient>
                <linearGradient id="myGradient2" gradientTransform="rotate(90)">
                    <stop offset="45%" stopColor="#75E9B2" />
                    <stop offset="100%" stopColor="#D9D9D900" />
                </linearGradient>
            </defs>
        </LineChart>
    )
}