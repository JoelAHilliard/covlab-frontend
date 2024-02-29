import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_usaLow from "@amcharts/amcharts5-geodata/usaLow";
import { useEffect, useState } from "preact/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
    const [mapData, setMapData] = useState<any[]>([]);

    useEffect(() => {
        async function grabMapData() {
            let res = await fetch("https://covlab-backend-production.up.railway.app/mapData");
            let data = await res.json();

            let temp = fillCovidData(data);
            setMapData(temp);
        }
        grabMapData();
    }, []);

    function fillCovidData(mapData: any): any[] {
        let data: any[] = [];
        mapData.forEach((element: any) => {
            data.push({
                id: "US-" + element.state,
                value: element.positive
            });
        });
    return data;
    }

    const USHeatMap = () => {
        useEffect(() => {
          let root = am5.Root.new("chartdiv");
  
          let chart = root.container.children.push(am5map.MapChart.new(root, {
            panX: "rotateX",
            panY: "none",
            projection: am5map.geoAlbersUsa(),
            layout: root.horizontalLayout,
            maxZoomLevel: 1, 
            minZoomLevel: 1  
          }));
  
          let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_usaLow,
            valueField: "value",
            calculateAggregates: true
          }));
  
          polygonSeries.mapPolygons.template.setAll({
            tooltipText: "{name}: {value}",
          });
  
          polygonSeries.set("heatRules", [{
            target: polygonSeries.mapPolygons.template,
            dataField: "value",
            min: am5.color(0xffd000),
            max: am5.color(0xff0000),
            key: "fill"
          }])[0];
          
          polygonSeries.mapPolygons.template.events.on("pointerover", function(ev) {
            // Check if the target and dataItem are defined to satisfy type safety
            if (ev.target && ev.target.dataItem && ev.target.dataItem.dataContext) {
              // Assuming 'value' is a property in your dataContext and your dataContext is typed appropriately
              const value = (ev.target.dataItem?.dataContext as any)['value'];

              if (value !== undefined) {
                heatLegend.showValue(value);
              }
            }
          });
          

          let data = mapData;

          polygonSeries.data.setAll(data);

          let heatLegend = chart.children.push(am5.HeatLegend.new(root, {
            orientation: "vertical",
            startColor: am5.color(0xffd000),
            endColor: am5.color(0xff0000),
            startText: "Lowest",
            endText: "Highest",
            stepCount: 5,
            // x:825
          }));

          heatLegend.startLabel.setAll({
            fontSize: 12,
            fill: heatLegend.get("startColor")
          });
      
          heatLegend.endLabel.setAll({
            fontSize: 12,
            fill: heatLegend.get("endColor")
          });
          
  
          polygonSeries.events.on("datavalidated", function () {
            heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
            heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
          });

          return () => {
            root.dispose();
          };
        }, []);
  
        return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
    };

    return(
        <div class="max-w-screen-xl mx-auto w-full py-4">
            {mapData.length > 0 ? 
            <Card>
                <CardHeader>
                    <CardTitle>Cases by States</CardTitle>
                </CardHeader>
                <CardContent>
                    <USHeatMap />
                </CardContent>
            </Card> : <Skeleton className="w-full h-[600px] rounded" />}
        </div>
    )
}