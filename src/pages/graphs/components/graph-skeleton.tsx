import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
    return (
        <div class="px-2 mb-2">
                    <Card>
                        <CardHeader className="flex flex-row justify-between">
                            <div class="flex items-center justify-center flex-col">
                                <Skeleton className="pl-1 w-[80px] h-[40px]"></Skeleton>
                            </div>
                          
        
                        </CardHeader>
                        <div class="px-6 mb-4">
                            <Skeleton className="w-full h-[370px] px-4"></Skeleton>
                        </div>

                    </Card>
                </div>
    )
}