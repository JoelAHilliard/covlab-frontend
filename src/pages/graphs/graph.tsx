import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function Home(props:any) {
    const graph_data = props.data;

    function setDateData(startDate: Date, endDate: Date){
        var days = []
        let tempStartDate = new Date(startDate);
        for (let d = tempStartDate; d <= endDate; d.setDate(d.getDate() + 1)) {
          days.push(d.toLocaleDateString());
        }
        return days;
    }

    const xVals = setDateData(new Date(graph_data[0].data[0][0]),new Date(graph_data[0].data[graph_data[0].data.length-1][0]));
    
    const series = graph_data.map((dataset: any,index:number) => {
        const yVals = dataset.data.map((item: any) => {
            return item[1] < 0 ? 0 : item[1];
        });
        return {
            data: yVals,
            color: index == 0 ? "rgba(133, 0, 0, 1)" : "rgba(0, 21, 138, 1)",
            borderColor: "transparent",
            fillColor: index == 0 ? "rgba(133, 0, 0, 0.15)" : "rgba(0, 21, 138, 0.15)",
            marker: {
                enabled: false
            },
            yAxis:index,
            name: dataset.label // Assuming each dataset might have a label
        };
    });
    
    const options = {
        series: series,
        credits: {
            enabled: false
        },
        chart: {
            opacity:0.5,
            backgroundColor: "transparent",
            type: 'area',
            height:400
        },
        
        xAxis:{
            type:"",
            categories: xVals,
        },
        yAxis: [{
            title: {text:graph_data[0].label},
            gridLineColor: 'transparent',
            labels:{
                style:{
                    color:"gray"
                }
            },
            min:0,
            crosshair:{
                width:2,
                color:"white",
              }
        },
        { // Primary yAxis
          gridLineWidth:0,

          labels:{
            style:{
                color:"gray"
            }
        },
          title: {
              text: graph_data.length == 1 ? "" : graph_data[1].label,
          },
          min:0,
          opposite:true,
          crosshair:{
            width:2,
            color:"white",
          }
          
        }],
        title:{
            text:undefined
        },
        legend: {
            y:-6,
            x:100,
            layout: 'vertical',
            align:'left',
            verticalAlign: 'top',
            floating: true,
            color:'blue',
            itemStyle:{
                color:"lightgray"
            },
                      crosshair:{
            width:2,
            color:"white",
            dashStyle:"Dash"
          }
        },
    
        // Title is omitted to ensure there's no title displayed
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}