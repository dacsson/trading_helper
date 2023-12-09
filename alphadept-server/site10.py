#!/home/No2rmal/.virtualenvs/myenv/bin python3

import argparse
from moexalgo import Ticker
import pandas as pd
from datetime import datetime
import pandas_ta as ta

class StockSubsetGenerator:
    def __init__(self, ticker):
        self.ticker = ticker
        self.df = self._load_data()

    def _load_data(self):
        sber = Ticker(self.ticker)
        day = datetime.now()
        day_str = day.strftime("%Y-%m-%d")
        df = sber.candles(date='2000-01-01', till_date=day_str, period='1D')
        candles_list = list(df)
        df = pd.DataFrame(candles_list)
        df = df.rename(columns={'begin': 'time'})
        df['time'] = pd.to_datetime(df['time'], unit='s')
        df.set_index(pd.DatetimeIndex(df["time"]), inplace=True)
        df = df[['close', 'open', 'high', 'low', 'volume']]

        return df

    def generate_subset(self):
        subset = self.df.iloc[len(self.df) - 30:len(self.df) + 1]
        return subset[['close']].to_json()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Stock Subset Generator')
    parser.add_argument('-ticker', type=str, help='Stock ticker symbol')

    args = parser.parse_args()

    ticker = args.ticker

    if not ticker:
        print("Please provide the -ticker argument.")
    else:
        subset_generator = StockSubsetGenerator(ticker)
        subset = subset_generator.generate_subset()
        print(subset.to_json())
