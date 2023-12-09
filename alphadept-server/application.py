from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from site_bay import StockPredictor_bay
from site_sell import StockPredictor_sell
from site10 import StockSubsetGenerator
import json
import sys

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Получаем данные для графика время и цена
# Обращаемся так - python site10.py -ticker SBER
@app.route('/get_graph_data', methods=['GET'])
@cross_origin()
def get_graph_data():
    _ticker = request.args.get("ticker")
    _indicator = request.args.get('indicator')
    stock_predictor = StockSubsetGenerator(ticker=_ticker)
    #print('${_ticker}, ${_indicator}', file=sys.stdout)
    stock_predictor.ticker = _ticker
    stock_predictor.indicator = _indicator
    subset = stock_predictor.generate_subset()
    subset = json.loads(subset)

    return jsonify(subset)

@app.route('/get_info_data', methods=['GET'])
@cross_origin()
def get_info_data():
    _ticker = request.args.get("ticker")
    _indicator = request.args.get('indicator')
    stock_predictor = StockPredictor(ticker=_ticker, indicator=_indicator)
    # print('${_ticker}, ${_indicator}', file=sys.stdout)
    stock_predictor.ticker = _ticker
    stock_predictor.indicator = _indicator
    data, subset = stock_predictor.predict()
    data = json.dumps(data)
    subset = json.loads(subset)

    return jsonify(json.loads(data))

# Получаем данные для графика и True если есть сигнал о покупке
# Обращаемся так - python site10.py -ticker SBER -indicator rsi
@app.route('/get_bay_data', methods=['GET'])
@cross_origin()
def get_bay_data():
    _ticker = request.args.get("ticker")
    _indicator = request.args.get('indicator')
    stock_predictor = StockPredictor_bay(ticker=_ticker, indicator=_indicator)
    #print('${_ticker}, ${_indicator}', file=sys.stdout)
    stock_predictor.ticker = _ticker
    stock_predictor.indicator = _indicator
    data, subset = stock_predictor.predict()
    data = json.dumps(data)
    subset = json.loads(subset)

    return jsonify(json.loads(data))

@app.route('/get_bay_graph_data', methods=['GET'])
@cross_origin()
def get_bay_graph_data():
    _ticker = request.args.get("ticker")
    _indicator = request.args.get('indicator')
    stock_predictor = StockPredictor_bay(ticker=_ticker, indicator=_indicator)
    #print('${_ticker}, ${_indicator}', file=sys.stdout)
    stock_predictor.ticker = _ticker
    stock_predictor.indicator = _indicator
    data, subset = stock_predictor.predict()
    data = json.dumps(data)
    subset = json.loads(subset)

    return jsonify(subset)

# Получаем данные для графика и True если есть сигнал о продаже
# Обращаемся так - python site10.py -ticker SBER -indicator rsi
@app.route('/get_sell_data', methods=['GET'])
@cross_origin()
def get_sell_data():
    _ticker = request.args.get("ticker")
    _indicator = request.args.get('indicator')
    stock_predictor = StockPredictor_sell(ticker=_ticker, indicator=_indicator)
    #print('${_ticker}, ${_indicator}', file=sys.stdout)
    stock_predictor.ticker = _ticker
    stock_predictor.indicator = _indicator
    data, subset = stock_predictor.predict()
    data = json.dumps(data)
    subset = json.loads(subset)

    return jsonify(json.loads(data))

@app.route('/get_sell_graph_data', methods=['GET'])
@cross_origin()
def get_sell_graph_data():
    _ticker = request.args.get("ticker")
    _indicator = request.args.get('indicator')
    stock_predictor = StockPredictor_sell(ticker=_ticker, indicator=_indicator)
    #print('${_ticker}, ${_indicator}', file=sys.stdout)
    stock_predictor.ticker = _ticker
    stock_predictor.indicator = _indicator
    data, subset = stock_predictor.predict()
    data = json.dumps(data)
    subset = json.loads(subset)

    return jsonify(subset)

if __name__ == '__main__':
    app.run(debug=True)
    
