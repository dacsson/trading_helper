import argparse
from moexalgo import Ticker
import pandas as pd
from datetime import datetime
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, mean_squared_error
from sklearn.linear_model import LinearRegression, LogisticRegression
import pandas_ta as ta
import numpy as np
import json

class StockPredictor_sell:
    def __init__(self, ticker, indicator):
        self.ticker = ticker
        self.indicator = indicator
        self.df = self._load_data()
        self.data = {}

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

        # Применение используемого индикатора
        if self.indicator == 'rsi':
            rsi = df.ta.rsi()
            df['rsi'] = rsi
        elif self.indicator == 'willr':
            willr = df.ta.willr()
            df['willr'] = willr
        elif self.indicator == 'stochrsi':
            stochrsi = df.ta.stochrsi()
            df = pd.merge(df, stochrsi, on='time', how='right')
        elif self.indicator == 'aroon':
            aroon = df.ta.aroon()
            df = pd.merge(df, aroon, on='time', how='right')
        elif self.indicator == 'ao':
            ao = df.ta.ao()
            df['ao'] = ao

        return df

    def train_model(self, i):
        df_copy = self.df.copy()
        subset = df_copy.iloc[len(df_copy) - 30:len(df_copy) + 1]
        df_copy = df_copy.drop(subset.index)

        df_copy['price'] = df_copy['close'].shift(-1 * i - 1)
        df_copy['Target'] = (df_copy['close'].shift(-1 * i - 1) < df_copy['close']).astype(int)
        drop = df_copy.dropna()

        if self.indicator == 'stochrsi':
            features = drop[['close', 'open', 'high', 'low', 'volume', 'STOCHRSIk_14_14_3_3', 'STOCHRSId_14_14_3_3']]
        elif self.indicator == 'aroon':
            features = drop[['close', 'open', 'high', 'low', 'volume', 'AROOND_14', 'AROONU_14', 'AROONOSC_14']]
        else:
            features = drop[['close', 'open', 'high', 'low', 'volume', self.indicator]]

        X_train, X_test, y_train, y_test = train_test_split(features, drop['price'], test_size=0.2, random_state=42)
        X_train1, X_test1, y_train1, y_test1 = train_test_split(features, drop['Target'], test_size=0.2, random_state=42)

        model = LinearRegression()
        model.fit(X_train, y_train)

        logistic_model = LogisticRegression()
        logistic_model.fit(X_train1, y_train1)

        predictions = model.predict(X_test)
        prob_predictions = logistic_model.predict_proba(X_test1)[:, 1]

        mse = mean_squared_error(y_test, predictions)
        rmse = np.sqrt(mse)
        accuracy = accuracy_score(y_test1, (prob_predictions > 0.5).astype(int))

        return accuracy, rmse, model, logistic_model

    def predict(self):
        for i in range(30):
            accuracy, rmse, _, _ = self.train_model(i)
            self.data[str(i)] = [accuracy, rmse, i]

        max_accuracy_key = max(self.data, key=lambda k: self.data[k][0])

        _, _, model, logistic_model = self.train_model(self.data[max_accuracy_key][2])

        subset = self.df.iloc[len(self.df) - 30:len(self.df) + 1]
        if self.indicator == 'stochrsi':
            subset = subset[['close', 'open', 'high', 'low', 'volume', 'STOCHRSIk_14_14_3_3', 'STOCHRSId_14_14_3_3']]
        elif self.indicator == 'aroon':
            subset = subset[['close', 'open', 'high', 'low', 'volume', 'AROOND_14', 'AROONU_14', 'AROONOSC_14']]
        else:
            subset = subset[['close', 'open', 'high', 'low', 'volume', self.indicator]]

        predictions = model.predict(subset)
        prob_predictions = logistic_model.predict_proba(subset)[:, 1]

        indices_above_threshold = np.where(prob_predictions > 0.49)[0]

        out = []
        subset['sell'] = False  # Создаем столбец 'sell' и инициализируем его значением False
        
        for index in indices_above_threshold:
            max_prediction = predictions[index]
            value = str(subset.index[index])  # Преобразуем Timestamp в строку
            procent = (list(subset['close'])[index] - max_prediction) / list(subset['close'])[index]
            if procent < 0:
                out.append([prob_predictions[index], procent, value, self.data[max_accuracy_key][2]])
                subset.loc[subset.index == subset.index[index], 'sell'] = True 
        
        return out, subset[['close', 'sell']].to_json()
        

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Stock Predictor')
    parser.add_argument('-ticker', type=str, help='Stock ticker symbol')
    parser.add_argument('-indicator', type=str, help='Indicator type')

    args = parser.parse_args()

    ticker = args.ticker
    indicator = args.indicator

    if not ticker or not indicator:
        print("Please provide both -ticker and -indicator arguments.")
    else:
        stock_predictor = StockPredictor_sell(ticker, indicator)
        result, bar = stock_predictor.predict()
        print(result)
        print(bar)
