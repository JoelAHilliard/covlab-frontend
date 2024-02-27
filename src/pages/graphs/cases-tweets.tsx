import { useEffect, useState } from "preact/hooks";
import { getCasesTweetsGraphData } from "@/service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Graph from "./components/graph";
import GraphSkeleton from "./components/graph-skeleton";

export default function Home() {
  const [activeCasesTweetsFilter, setActiveCasesTweetsFilter] = useState("daily");
  const dropdownFilters = { "daily": "Daily", "cumulative": "Cumulative", "14_day_avg": "14 Day Avg", "7_day_avg": "7 Day Avg" };
  
  const [graphData, setGraphData] = useState(null);

  // Fetch data once on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCasesTweetsGraphData();
        setGraphData(data);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };
    fetchData();
  }, []);

  // Compute active graph data based on the current filter
  const currentGraphData = graphData ? graphData[activeCasesTweetsFilter] : null;

  return (
    !currentGraphData ? (
      <div class="max-w-screen-xl mx-auto w-full px-2">
        <Card graph-id="cases/tweets" className="bg-accent mb-2">
          <CardHeader className="flex justify-between">
            <CardTitle>Overview of the Collected Raw Tweets</CardTitle>
            <Select onValueChange={setActiveCasesTweetsFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Filter" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(dropdownFilters).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-0">
            <Graph data={currentGraphData} />
          </CardContent>
        </Card>
      </div>
    ) : (
      <GraphSkeleton />
    )
  );
}
