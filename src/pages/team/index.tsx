import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import "./styles.css"

export default function Home() {
    return (
        <div class="max-w-screen-xl mx-auto w-full p-2">
            <Card className="container">
                <CardHeader>
                    <CardTitle>Team</CardTitle>
                </CardHeader>
                <CardContent>
                        <div class="gridgrid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div class="shadow-lg rounded-lg py-4">
                                <h2 class="text-xl font-bold mb-2">Supervisor</h2>
                                <ul>
                                    <li>Dong Xu</li>
                                </ul>
                            </div>
                        
                            <div class=" shadow-lg rounded-lg py-4">
                                <h2 class="text-xl font-bold mb-2">Team Manager</h2>
                                <ul>
                                    <li>Jiacheng Xie</li>
                                </ul>
                            </div>

                            <div class=" shadow-lg rounded-lg py-4">
                                <h2 class="text-xl font-bold mb-2">API Support</h2>
                                <ul>
                                    <li>Li Su</li>
                                    <li>Lei Jiang</li>
                                    <li>Weinan Zhang</li>
                                    <li>Chunhui Xu</li>
                                    <li>Congyo Guo</li> 
                                </ul>
                            </div>

                            <div class=" shadow-lg rounded-lg py-4">
                                <h2 class="text-xl font-bold mb-2">Developers</h2>
                                <ul>
                                    <li>Ziyang Zhang</li>
                                    <li>Joel Hilliard</li>
                                </ul>
                            </div>

                            <div class=" shadow-lg rounded-lg py-4">
                                <h2 class="text-xl font-bold mb-2">Annotators</h2>
                                <ul>
                                    <li>Kent Studer</li>
                                    <li>James Tipton</li>
                        
                                    <li>Thadeus Meneses</li>
                        
                                    <li>Noah Berry</li>
                        
                                    <li>Guanghui An</li>
                                    <li>Xiaoting Tang</li>
                                    <li>Yijie Ren</li>
                                </ul>
                            </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        
    )
}