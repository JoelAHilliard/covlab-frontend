//ts-nocheck

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "preact/hooks";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function Home() {
    const [keyword,setKeyword] = useState("");

    const [loading,setLoading] = useState(false);

    const [data,setData] = useState([]);

    useEffect(()=>{

    },[])

    const fetchData = async () => {

        setData([]);

        if(keyword === "") return

        setLoading(true);

        const relatedWordsURL = "https://labelling.covlab.tech/word"

        const body = new URLSearchParams();

        body.set('word', keyword)

        const response = await fetch(relatedWordsURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body.toString(),
        });

        const data = await response.json();

        setData(data);

        setLoading(false);
    }

    return(
        <div class="p-2 max-w-screen-xl mx-auto w-full">
            <Card className="px-12">
                <CardHeader>
                    <CardTitle className="pl-1">Please input a keyword to find related words</CardTitle>
                    <CardDescription className="text-left">Cough, headache, etc.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="flex min-w-[300px] w-[100%] mx-auto items-center">
                        <SearchIcon className="absolute pl-2" />
                        <Input 
                            type="text" 
                            className="px-8" 
                            placeholder="Search..." 
                            value={keyword}
                            onChange={(e:any) => setKeyword(e.target.value)}
                        />
                        <Button className={`ml-2`} disabled={loading || keyword === ""} onClick={fetchData}>Submit</Button>
                    </div>
                    {loading && <Skeleton className="mt-3 h-[300px] w-full"></Skeleton>}
                    
                    { data.length > 0 && 
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No.</TableHead>
                                    <TableHead>Words</TableHead>
                                    <TableHead>Confidence</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {data.map((word:any,index:any) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{index}</TableCell>
                                            <TableCell>{word[1]}</TableCell>
                                            <TableCell>{word[0].toFixed(2)}</TableCell>
                                        </TableRow>
                                    )
                                })}
                               
                            </TableBody>
                      </Table>
                      
                    }
                </CardContent>

            </Card>
        </div>
    )
}