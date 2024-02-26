
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import "./index.css";

import singleLineGraph from "../../assets/images/line-graph.jpg";
import pieGraph from "../../assets/images/pieChart.jpg";
import usMap from "../../assets/images/usMap.jpg";
import symptomsimg from "../../assets/images/symptoms.png";

import stateTrendsImg from "../../assets/images/statetrends.png";

export default function Home() {
    return(
        <div>
            <div class="backgroundCss min-h-screen">
                <div class="background-overlay min-h-screen">
                    <div class="titleContainer">
                        <p class="Covlab" style="padding-top: 15px;">Covlab</p>
                        <p class="hook">Uncover the connection: Explore COVID-19 cases through tweets.</p>
                        <div>
                            <div style="display: flex; flex-flow: row; width: 100%; justify-content: center; gap: 15px;">
                                <div >
                                    <p class="dataTitle">Total Tweets</p>
                                    <h4 >total</h4>
                                </div >
                                <div>
                                    <p class="dataTitle" >Model Positive Tweets</p>
                                    <h4 >total</h4>
                                </div>
                            
                            </div>
                            <p class="lastUpdated">Last updated: Lorem ipsum</p>
                        </div>
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