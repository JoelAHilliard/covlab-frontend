
import CTLine from "./cases-tweets";
import TweetLine from "./tweet-line";
import Reinfection from "./reinfection";
import Rehabilitation from "./rehabilitation";
import Pearson from "./pearson";
import Kaplan from "./kaplan";
import Reinfection2 from "./reinfection2";
export default function Home() {

            
        return(

            <div class="p-2">
                <CTLine />
                <TweetLine />
                <Rehabilitation />
                <Reinfection />
                <Reinfection2/>
                <Pearson />
                <Kaplan />
            </div>

        )
}