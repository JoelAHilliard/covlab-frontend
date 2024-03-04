import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";

import GraphSkeleton from "../components/graph-skeleton";
import { useEffect, useState } from "preact/hooks";
import { getTableData } from "@/service";
export default function Home(){

    const[startIndex,setStartIndex] = useState(0);
    const[endIndex,setEndIndex] = useState(10);
    const [tableData,setTableData] = useState<any>(null);

    useEffect(()=> {
        async function start(){
            let data = await getTableData();
            setTableData(data);
        }
        start();
    },[]);

    const handleNext = () => {
        const remainingItems = tableData.length - endIndex - 1;
        if (remainingItems <= 0) {
            return;
        }
        if (remainingItems < 10) {
            setStartIndex(endIndex + 1);
            setEndIndex(tableData.length - 1);
        } else {
            setEndIndex(endIndex + 10);
            setStartIndex(startIndex + 10);
        }
    }

    const handlePrev = () => {
        if (startIndex - 10 < 0) {
            setStartIndex(0);
            setEndIndex(Math.min(9, tableData.length - 1));
        } else {
            setEndIndex(endIndex - 10);
            setStartIndex(startIndex - 10);
        }
    }

    return (
        tableData ? 
        <div class="max-w-screen-xl mx-auto w-full mb-2">
            <Card className="bg-accent">
                <CardHeader>
                    <CardTitle>State Trends</CardTitle>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="whitespace-nowrap">State</TableHead>
                            <TableHead className="whitespace-nowrap">Weekly Average</TableHead>
                            <TableHead className="whitespace-nowrap">Weekly Cases Per 10m</TableHead>
                            <TableHead className="whitespace-nowrap">Two Week Change %</TableHead>
                            <TableHead className="whitespace-nowrap">Test Positivity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData.slice(startIndex,endIndex).map((row:any)=>{
                            return (
                                <TableRow className={`${row.state == "US" && "text-red-700"}`}>
                                    <TableCell className="font-medium">{row.state}</TableCell>
                                    <TableCell>{row.cases_7_sum}</TableCell>
                                    <TableCell>{!isNaN(Number(row.weekly_new_cases_per10m)) ? Number(row.weekly_new_cases_per10m).toFixed(2) : "N/A"}</TableCell>
                                    <TableCell className="">{row.cases_14_days_change.percentage ? Number(row.cases_14_days_change.percentage).toFixed(2) + "%" : "N/A"}</TableCell>
                                    <TableCell className="">{!isNaN(Number(row.positivity)) ? Number(row.positivity).toFixed(2) : "N/A" }</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                <div class="flex gap-2 justify-center">
                    <Button disabled={startIndex === 0} onClick={handlePrev}>Prev Page</Button>
                    <Button disabled={endIndex === tableData.length -1} onClick={handleNext}>Next Page</Button>
                </div>
                </CardContent>
            </Card>
        </div> : <GraphSkeleton />
    )
}