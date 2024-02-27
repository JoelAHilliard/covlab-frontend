import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "preact/hooks";
import MultiRangeSlider from "multi-range-slider-react";

export default function Home(props) {
    const graph_data = props.data;
    const [width, setWidth] = useState(window.innerWidth);
    const initialSeries = createSeries(graph_data, 0, graph_data[0].data.length - 1);
    const [series, setSeries] = useState(initialSeries);

   

    const xVals = setDateData(new Date(graph_data[0].data[0][0]), new Date(graph_data[0].data[graph_data[0].data.length - 1][0]));

    const [minValue, set_minValue] = useState(0);
    const [maxValue, set_maxValue] = useState(xVals.length-1);
    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
        const startSlice = e.minValue
        const endSlice = e.maxValue;
        const updatedSeries = createSeries(graph_data, startSlice, endSlice);
        setSeries(updatedSeries);

    };

    function setDateData(startDate, endDate) {
        var days = [];
        let tempStartDate = new Date(startDate);
        for (let d = new Date(tempStartDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            days.push(new Date(d).toLocaleDateString());
        }
        return days;
    }


    
    function createSeries(data, startSlice, endSlice) {
        return data.map((dataset, index) => {
            let yVals = dataset.data.slice(startSlice, endSlice + 1).map((item) => {
                return item[1] < 0 ? 0 : item[1];
            });

            return {
                data: yVals,
                color: index === 0 ? "rgba(133, 0, 0, 1)" : "rgba(0, 21, 138, 1)",
                borderColor: "transparent",
                fillColor: index === 0 ? "rgba(133, 0, 0, 0.15)" : "rgba(0, 21, 138, 0.15)",
                marker: {
                    enabled: false
                },
                yAxis: index,
                name: dataset.label
            };
        });
    }


    const options = {
        series: series,
        credits: {
            enabled: false,
        },
        chart: {
            opacity: 0.5,
            backgroundColor: "transparent",
            type: 'area',
            height: 400,
            animation:false

        },
        xAxis: {
            categories: xVals.slice(minValue,maxValue),
            labels: {
                style: {
                    color: "white"
                }
            }
        },
        yAxis: [{
            title: {
                style: { "color": "white" },
                text: width < 500 ? "" : graph_data[0].label
            },
            gridLineColor: 'transparent',
            labels: {
                style: {
                    color: "white"
                },
                x: width < 500 ? 10 : -10,
            },
            min: 0,
            crosshair: {
                width: 2,
                color: "white",
            }
        },
        {
            gridLineWidth: 0,
            labels: {
                style: {
                    color: "white"
                },
                x: width > 500 ? 10 : -10,
            },
            title: {
                style: { "color": "white" },
                text: graph_data.length === 1 ? "" : (width < 500 ? "" : graph_data[1].label),
            },
            min: 0,
            opposite: true,
            crosshair: {
                width: 2,
                color: "white",
            }
        }],
        title: {
            text: undefined
        },
        legend: {
            y: -6,
            x: 100,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            floating: true,
            itemStyle: {
                color: "white"
            },
            crosshair: {
                width: 2,
                color: "white",
                dashStyle: "Dash"
            }
        },
    };
    console.log("rendered")
    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
            <div class="px-6 mb-4">
                <MultiRangeSlider
                    min={0}
                    max={xVals.length}
                    step={5}
                    minValue={minValue}
                    maxValue={maxValue}
                    onChange={(e) => {
                        handleInput(e);
                    }}
                    ruler={false}
                    barInnerColor="red"
                    style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
                />
            </div>
            
        </div>
    )
}
