
export const options = {
    chart: {
        type: 'candlestick',
        height: 350,
        foreColor: '#fff',
        toolbar: {
            tools: {
                download: false
            },
            autoSelected: 'pan'
        },
        zoom: {
            enabled: true,
            type: 'x',
            resetIcon: {
                offsetX: -10,
                offsetY: 0,
                fillColor: '#fff',
                strokeColor: '#37474F'
            },
            selection: {
                background: '#90CAF9',
                border: '#0D47A1'
            }
        },
        events: {
            // scrolled: function (chartContext, { xaxis }) {
            //     console.log(chartContext, xaxis)
            //     return;
            // }
        }
    },
    plotOptions: {
        candlestick: {
            wick: {
                useFillColor: true,
            }
        }
    },
    title: {
        text: 'CandleStick Chart',
        align: 'left'
    },
    xaxis: {
        type: 'datetime',
        labels: {
            datetimeUTC: false,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
            },
        }

    },
    yaxis: {
        tooltip: {
            enabled: true
        }
    },
    tooltip: {
        x: {
            show: true,
            format: 'HH:mm\ndd MMM',
            formatter: undefined,
        },
    }
}