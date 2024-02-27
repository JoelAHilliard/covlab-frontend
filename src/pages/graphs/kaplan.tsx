import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
    return(
        <div class="max-w-screen-xl mx-auto w-full">
        <Card graph-id="cases/tweets" className="bg-accent mb-2">
          <CardHeader className="flex justify-between">
            <CardTitle className="text-center">Kaplan-Meier estimates of cumulative recoveries</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex justify-center p-3">
            <img src="src/assets/images/kaplan.png" width='600' class="rounded"/>
          </CardContent>
        </Card>
      </div>
    )
}