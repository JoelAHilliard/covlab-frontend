
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import "./index.css";

import singleLineGraph from "../../assets/images/line-graph.jpg";
import pieGraph from "../../assets/images/pieChart.jpg";
import usMap from "../../assets/images/usMap.jpg";
import symptomsimg from "../../assets/images/symptoms.png";
import { getLatestData } from "@/service";
import stateTrendsImg from "../../assets/images/statetrends.png";
import { useEffect, useState } from "preact/hooks";
function transform(number:number){
    if (isNaN(number)) return null; // will only work value is a number
    if (number === null) return null;
    if (number === 0) return null;
    let abs = Math.abs(number);
    const rounder = Math.pow(10, 1);
    const isNegative = number < 0; // will also work for Negetive numbers
    let key = '';

    const powers = [
        {key: 'Q', value: Math.pow(10, 15)},
        {key: 'T', value: Math.pow(10, 12)},
        {key: 'B', value: Math.pow(10, 9)},
        {key: 'M', value: Math.pow(10, 6)},
        {key: 'K', value: 1000}
    ];

    for (let i = 0; i < powers.length; i++) {
        let reduced = abs / powers[i].value;
        reduced = Math.round(reduced * rounder) / rounder;
        if (reduced >= 1) {
            abs = reduced;
            key = powers[i].key;
            break;
        }
    }
    return (isNegative ? '-' : '') + abs + key;
}
export default function Home() {
    const [data,setData] = useState<any>(null);
    const [loading,setloading] = useState(false);
    useEffect(()=>{
        const fetchData = async () => {
            setloading(true)
            setData(null);
    
            const relatedWordsURL = "https://labelling.covlab.tech/statistics"
    
            const body = new URLSearchParams();
    
            const response = await fetch(relatedWordsURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body.toString(),
              });
            const data = await response.json();
            setData(data);
            setloading(false)
    
        }
          fetchData();
    },[])
    return(
        <div>
            <div class="backgroundCss min-h-screen">
                <div class="background-overlay min-h-screen">
                    <div class="titleContainer">
                        <p class="Covlab" style="padding-top: 15px;">Covlab</p>
                        <p class="hook">Uncover the connection: Explore COVID-19 cases through tweets.</p>
                        {data &&
                            <div>
                                <div style="display: flex; flex-flow: row; width: 100%; justify-content: center; gap: 15px;">
                                    <div >
                                        <p class="dataTitle">Total Tweets</p>
                                        <h4 >{transform(data["total_related_tweets_count"])}</h4>
                                    </div >
                                    <div>
                                        <p class="dataTitle" >Model Positive Tweets</p>
                                        <h4 >{transform(data["model_positive_count"])}</h4>
                                    </div>
                                
                                </div>
                                <p class="lastUpdated">Last updated: Lorem ipsum</p>
                            </div>
                        }
                    </div>
                    </div>
            </div>
            <div class="bg-gradient-to-r from-primary/50 to-background py-4 px-1">
                <div name="previews" class="flex flex-col max-w-screen-xl max-w-container mx-auto gap-2 justify-start">
                    <Card name="graph1">
                        <CardHeader>
                            <CardTitle className='pl-1'>Preview</CardTitle>
                            <CardDescription className="text-left">Based on manual-labeled tweets, we trained a Natural Language Processing (NLP) model to select the description of the self-reported covid positive tweets. The comparison with real daily cases has shown in the graph.</CardDescription>
                        </CardHeader>
                        <CardContent>
                                <img class="max-h-[300px] mx-auto border border-red-600 rounded shadow-md" src={singleLineGraph}></img>
                        </CardContent>
                    </Card>
                    <Card name="graph1">
                        <CardHeader>
                            <CardTitle className='pl-1'>Preview</CardTitle>
                            <CardDescription className="text-left">Based on manual-labeled tweets, we trained a Natural Language Processing (NLP) model to select the description of the self-reported covid positive tweets. The comparison with real daily cases has shown in the graph.</CardDescription>
                        </CardHeader>
                        <CardContent>
                                <img class="max-h-[300px] mx-auto border border-red-600 rounded shadow-md" src={pieGraph}></img>
                        </CardContent>
                    </Card>
                    <Card name="graph1">
                        <CardHeader>
                            <CardTitle className='pl-1'>Preview</CardTitle>
                            <CardDescription className="text-left">Based on manual-labeled tweets, we trained a Natural Language Processing (NLP) model to select the description of the self-reported covid positive tweets. The comparison with real daily cases has shown in the graph.</CardDescription>
                        </CardHeader>
                        <CardContent>
                                <img class="max-h-[300px] mx-auto border border-red-600 rounded shadow-md" src={usMap}></img>
                        </CardContent>
                    </Card>
                    <Card name="graph1">
                        <CardHeader>
                            <CardTitle className='pl-1'>Preview</CardTitle>
                            <CardDescription className="text-left">Based on manual-labeled tweets, we trained a Natural Language Processing (NLP) model to select the description of the self-reported covid positive tweets. The comparison with real daily cases has shown in the graph.</CardDescription>
                        </CardHeader>
                        <CardContent>
                                <img class="max-h-[300px] mx-auto border border-red-600 rounded shadow-md" src={symptomsimg}></img>
                        </CardContent>
                    </Card>
                    <Card name="graph1">
                        <CardHeader>
                            <CardTitle className='pl-1'>Preview</CardTitle>
                            <CardDescription className="text-left">Based on manual-labeled tweets, we trained a Natural Language Processing (NLP) model to select the description of the self-reported covid positive tweets. The comparison with real daily cases has shown in the graph.</CardDescription>
                        </CardHeader>
                        <CardContent>
                                <img class="max-h-[300px] mx-auto border border-red-600 rounded shadow-md" src={stateTrendsImg}></img>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}