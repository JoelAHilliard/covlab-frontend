import { useEffect, useState } from "preact/hooks";
import { getCasesTweetsGraphData } from "@/service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Graph from "./components/graph";
import GraphSkeleton from "./components/graph-skeleton"

export default function Home() {
    const [activeCasesTweetsFilter,setActiveCasesTweetsFilter] = useState("daily")
    const tweetline_dropdown_filters = {"new_tweets_count":"New Tweets Count", "total_tweets_count":"Total Tweets Count","14_day_avg":"14 Day Avg","7_day_avg":"7 Day Avg"};
    
    const [graphCasesTweetsData,setCasesTweetsGraphData] = useState(null);
    const [activeCasesTweetsGraphData,setActiveCasesTweetsGraphData] = useState(null);
    const dropdown_filters = {"daily":"Daily", "cumulative":"Cumulative","14_day_avg":"14 Day Avg","7_day_avg":"7 Day Avg"};
  
    useEffect(()=>{
        async function fetchData() {
            try {
              const data = await getCasesTweetsGraphData();
              setCasesTweetsGraphData(data);
              setActiveCasesTweetsGraphData(data[activeCasesTweetsFilter]);
              // Use the data to set state or do other actions
            } catch (error) {
              console.error("There was an error fetching the graph data:", error);
            }
          }
        fetchData();
      },[])

      useEffect(()=>{
        if(graphCasesTweetsData) {
            let temp = graphCasesTweetsData[activeCasesTweetsFilter];
            console.log(temp,graphCasesTweetsData,activeCasesTweetsFilter)
            setActiveCasesTweetsGraphData(temp)
        };
        },[activeCasesTweetsFilter])

       

        if(activeCasesTweetsGraphData){
            return(
                <div class="max-w-screen-xl max-w-container mx-auto w-full px-2">
                    <Card graph-id="cases/tweets" className="bg-accent mb-2">
                        <CardHeader className="flex flex-row justify-between">
                            <div class="flex items-center justify-center flex-col">
                                <CardTitle className="pl-1">Overview of the Collected Raw Tweets</CardTitle>
                                {/* <CardDescription className="text-left">Graph 1</CardDescription> */}
                            </div>
                          
                            <Select onValueChange={e => setActiveCasesTweetsFilter(e)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={dropdown_filters[activeCasesTweetsFilter]} />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(dropdown_filters).map((filter:any)=>{
                                        return (
                                            <SelectItem value={filter}>{dropdown_filters[filter]}</SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
        
                        </CardHeader>
                        <CardContent className="p-0">
                            <Graph data={activeCasesTweetsGraphData}></Graph>
                            
                        </CardContent>
                    </Card>
                </div>
            )
        } else {
            return(
                <GraphSkeleton />
            )
        }
}