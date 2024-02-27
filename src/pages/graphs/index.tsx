import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import Graph from "./graph";
import { useEffect, useState } from "preact/hooks";
import { getGraphData } from "@/service";

export default function Home() {

    const [activeFilter,setActiveFilter] = useState("daily")
    const [graphData,setGraphData] = useState(null);
    const [activeGraphData,setActiveGraphData] = useState(null);

    useEffect(()=>{
        async function fetchData() {
            try {
              const data = await getGraphData();
              setGraphData(data);
              setActiveGraphData(data[activeFilter]);
              // Use the data to set state or do other actions
            } catch (error) {
              console.error("There was an error fetching the graph data:", error);
            }
          }
        fetchData();
      },[])

    const dropdown_filters = {"daily":"Daily", "cumulative":"Cumulative","14_day_avg":"14 Day Avg","7_day_avg":"7 Day Avg"};
  

    useEffect(()=>{
        if(graphData) {
            let temp = graphData[activeFilter];
            console.log(temp,graphData,activeFilter)
            setActiveGraphData(temp)
        };
    },[activeFilter])
    if(activeGraphData){
        return(
            <div class="max-w-screen-xl max-w-container mx-auto w-full px-2">
                <Card>
                    <CardHeader className="flex flex-row justify-between">
                        <div class="flex items-start flex-col">
                            <CardTitle className="pl-1">Graph</CardTitle>
                            <CardDescription className="text-left">Graph 1</CardDescription>
                        </div>
                      
                        <Select onValueChange={e => setActiveFilter(e)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={dropdown_filters[activeFilter]} />
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
                    <CardContent>
                        <Graph data={activeGraphData}></Graph>
                    </CardContent>
                </Card>
    
                {/* <Card>
                    <CardHeader className="flex flex-row justify-between">
                        <div class="flex items-start flex-col">
                            <CardTitle className="pl-1">Graph</CardTitle>
                            <CardDescription className="text-left">Graph 2</CardDescription>
                        </div>
                      
                        {/* <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Filter" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(dropdown_filters).map((filter:any)=>{
                                    return (
                                        <SelectItem value={filter}>{dropdown_filters[filter]}</SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select> */}
    
                    {/* </CardHeader>
                    <CardContent>
                        {/* <Graph name="cases" data={[1, 2, 3]}></Graph>
                        <Graph name="tweets" data={[1, 2, 3]}></Graph> */}
                    {/* </CardContent> */}
                {/* </Card> */}
            </div>
        )
    } else {
        return(
            <div>loading</div>
        )
    }
   
}