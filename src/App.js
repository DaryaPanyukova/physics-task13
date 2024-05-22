import './App.css';
import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';
import {calculate} from './Calculations';

const DrawPlot = ({data}) => {
    const layout = {
        title: 'Зависимость интенсивности от синуса угла дифракции',
        xaxis: {title: 'Интенсивность, Лм'},
        yaxis: {title: 'Cинус угла дифракции'},
    };

    return (
        <Plot
            data={[
                {
                    x: data.map((item) => item.r),
                    y: data.map((item) => item.I),
                    type: 'scatter',
                    mode: 'lines',
                    line: {color: {r: 235, g: 127, b: 194}}
                },
            ]}
            layout={layout}
        />
    );
};

const App = () => {
    const [data, setData] = useState([]);

    const [gapNumber, setGapNumber] = useState(0);
    const [gapSize, setGapSize] = useState(0);
    const [period, setPeriod] = useState(0);
    const [wavelength, setWavelength] = useState(0);

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const calculatedData = calculate(gapNumber, gapSize, period, wavelength);
        setData(calculatedData);

        if (gapNumber <= 0 || gapSize <= 0 || period <= 0 || wavelength <= 0) {
            setErrorMessage('Введенные значения некорректны');
        } else {
            setErrorMessage('Введенные значения корректны');
        }
    }, [gapNumber, gapSize, period, wavelength]);

    return (
        <div className="App">
            <h3>Визуализация дифракционной картины от решетки</h3>
            <form>
                <label>
                    Количество щелей:
                    <input type="number" name="gapNumber" step="1" value={gapNumber}
                           onChange={(e) => setGapNumber(Math.floor(e.target.value))}/>
                </label>
                <br/>
                <label>
                    Размер щели (м):
                    <input type="number" name="gapSize" step="0.01" value={gapSize}
                           onChange={(e) => setGapSize(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Период решетки (м):
                    <input type="number" name="period" step="0.01" value={period}
                           onChange={(e) => setPeriod(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Длина волны (нм):
                    <input type="number" name="wavelength" step="0.1" value={wavelength * 1e9}
                           onChange={(e) => setWavelength(e.target.value * 1e-9)}/>
                </label>
                <br/>
            </form>
            <br/>
            {data.length > 0 && <DrawPlot data={data}/>}
            <div style={{
                position: 'absolute',
                top: '50px',
                right: '50px',
                backgroundColor: errorMessage === 'Введенные значения некорректны' ? 'red' : 'green',
                padding: '5px 10px',
                color: 'white',
                borderRadius: '5px'
            }}>
                {errorMessage}
            </div>
        </div>
    );
};

export default App;