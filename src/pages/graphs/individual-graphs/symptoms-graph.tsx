import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchPieChartData } from "@/service";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { options } from "preact";
import { useState, useEffect } from "preact/hooks";


export default function Home(){

    const [graphData,setGraphData] = useState<any>(null);

    useEffect(() => {
        let symptom_data = {
            "Fever": 0.477612,
            "Headache": 0.343284,
            "Cough": 0.328358,
            "Shortness of breath": 0.253731,
            "Generalised body aches": 0.253731,
            "Difficulty breathing": 0.238806,
            "Fatigue": 0.238806,
            "Sensory disorder of smell and/or taste": 0.223881,
            "Sore throat": 0.208955,
            "Pain": 0.19403,
            "Chill": 0.149254,
            "Personal care assessment": 0.149254,
            "Emotional state": 0.134328,
            "Muscle pain": 0.119403,
            "Drug therapy": 0.119403,
            "Dry cough": 0.104478,
            "Eye pain": 0.104478,
            "Sweating": 0.089552,
            "Nose running": 0.089552
          }
        
        
          let chartData = Object.entries(symptom_data).map(([name, y]) => ({ name, y: y * 100 }));
          setGraphData(chartData)
        
    }, []);

    const options = graphData ? {
        series: [
            {
              name: "Covlab Tweet Labelling",
              borderRadius: 10,
              type: "pie",
              data: graphData,
            },
          ],
        credits: {
            enabled: false,
        },
        chart: {
            backgroundColor: "transparent",
            type: 'pie',
            height: 400,
            animation: false
        },
        title: {
            text: undefined
        },
    } : null;
    return (
        <div class="max-w-screen-2xl mx-auto w-full">
            <Card className={"bg-accent"}>
                <CardHeader>
                    <CardTitle>Top 10 Symptoms</CardTitle>
                </CardHeader>
                <CardContent>
                    <HighchartsReact 
                         highcharts={Highcharts}
                         options={options}
                    />
                </CardContent>
            </Card>
        </div>
    )
}