import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { getTweetLineData } from "@/service";
import { useEffect, useState } from "preact/hooks";
import Graph from "./components/graph";
import GraphSkeleton from "./components/graph-skeleton"

export default function Home() {
    const [activeFilter,setActiveFilter] = useState("new_tweets_count")
    const tweetline_dropdown_filters = {"new_tweets_count":"New Tweets Count", "total_tweets_count":"Total Tweets Count","14_day_avg":"14 Day Avg","7_day_avg":"7 Day Avg"};
    
    const [graphData,setGraphData] = useState(null);
    const [activeGraphData,setActiveGraphData] = useState(null);
  
    useEffect(()=>{
        async function fetchData() {
            try {
              const data = await getTweetLineData();
              setGraphData(data);
              setActiveGraphData(data[activeFilter]);
              // Use the data to set state or do other actions
            } catch (error) {
              console.error("There was an error fetching the graph data:", error);
            }
          }
        fetchData();
      },[])

      useEffect(()=>{
        if(graphData) {
            let temp = graphData[activeFilter];
            setActiveGraphData(temp)
        };
        },[activeFilter])
    if(activeGraphData){
        return(
            <div class="max-w-screen-xl max-w-container mx-auto w-full px-2">
                <Card graph-id="cases/tweets" className="bg-accent">
                    <CardHeader className="flex flex-row justify-between">
                        <div class="flex items-center justify-center flex-col">
                            <CardTitle className="pl-1">Overview of the Collected Raw Tweets</CardTitle>
                            {/* <CardDescription className="text-left">Graph 1</CardDescription> */}
                        </div>
                        
                        <Select onValueChange={e => setActiveFilter(e)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={tweetline_dropdown_filters[activeFilter]} />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(tweetline_dropdown_filters).map((filter:any)=>{
                                    return (
                                        <SelectItem value={filter}>{tweetline_dropdown_filters[filter]}</SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>

                    </CardHeader>
                    <CardContent className="p-0">
                        <Graph data={activeGraphData}></Graph>
                    </CardContent>
                </Card>
            </div>
            )
    } else return <GraphSkeleton />
}