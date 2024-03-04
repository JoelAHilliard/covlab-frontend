import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchPieChartData } from "@/service";
import { useEffect, useState } from "preact/hooks";
import GraphSkeleton from "../components/graph-skeleton";


import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function Home() {

    const [graphData,setGraphData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            let data = await fetchPieChartData();
            setGraphData(data);
        };
        fetchData();
    }, []);

    
    const options_1 = graphData ? {
        series: [{
            name: "Covlab Tweet Labelling",
            type: 'pie',
            data: [{
                    name: "Unlabelled Tweets",
                    y: ((graphData.total_related_tweets_count - graphData.labeled_count) / graphData.total_related_tweets_count) * 100,
                    color: '#EC6B56'
                },
                {
                    name: "Hand Labelled Tweets",
                    y: (graphData.labeled_count / graphData.total_related_tweets_count) * 100,
                    color: 'blue'
                },
            ]
        }],
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

    const options_2 = graphData ? {
        series: [{
            name: "Tweet Analysis",
            type: 'pie',
            data: [{
                    name: "Model Positive Tweets",
                    y: (graphData.model_positive_count / graphData.total_related_tweets_count) * 100,
                    color: 'blue'
                },
                {
                    name: "Model Irrelevant Tweets",
                    y: ((graphData.total_related_tweets_count - graphData.model_positive_count) / graphData.total_related_tweets_count) * 100,
                    color: 'darkred'
                }
            ]
        }],
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
        graphData ? 
            <div class="max-w-screen-xl mx-auto w-full">
                <Card className="bg-accent mt-2 mb-2">
                    <CardHeader>
                        <CardTitle>Total Tweet Data</CardTitle>
                    </CardHeader>
                    <CardContent className="flex mx-auto">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options_1}
                        />
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options_2}
                        />
                    </CardContent>
                </Card>
            </div>
        : <GraphSkeleton />
     )
}