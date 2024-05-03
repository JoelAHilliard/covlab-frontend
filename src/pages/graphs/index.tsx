
import CTLine from "./individual-graphs/cases-tweets";
import TweetLine from "./individual-graphs/tweet-line";
import Reinfection from "./individual-graphs/reinfection";
import Rehabilitation from "./individual-graphs/rehabilitation";
import Pearson from "./individual-graphs/pearson";
import Kaplan from "./individual-graphs/kaplan";
import Reinfection2 from "./individual-graphs/reinfection2";
import WC from "./individual-graphs/word-cloud";
import Pie from "./individual-graphs/pie-charts";

import TB from "./individual-graphs/state-trends-table";
export default function Home() {

            
        return(

            <div class="p-2">
                <TweetLine />
                <CTLine />
                <TB />
                <Pie />
                <WC />
                <Rehabilitation />
                <Reinfection />
                <Reinfection2/>
                <Pearson />
                <Kaplan />
            </div>

        )
}