//ts-nocheck

import { useLocation } from "preact-iso";
import { ModeToggle } from "../mode-toggle";
import { Button } from "./button";
import covlabLogo from "../../assets/images/covlabLogos/covlabLogoBW.png";
import covlabLogoBlack from "../../assets/images/covlabLogos/covlabBlack.png";

import { useTheme } from "../theme-provider";

export default function Home(){
    
    const { url } = useLocation();
    const { theme } = useTheme(); 

    const logo = theme === "dark" ? covlabLogo : covlabLogoBlack;

    const nav = <header class="bg-background flex max-w-screen-xl max-w-container mx-auto w-full flex items-center justify-between gap-2 px-2">
        <nav class="flex items-center gap-2 justify-center py-2 ">
                <>
                    <a href="/">
                        <Button variant="outline" size="default" className={url == '/' ? 'bg-primary hover:bg-primary flex h-10 px-1' : "bg-background flex h-10 px-1"}>
                            <img class="h-[50px] w-[100px]" src={logo} />
                        </Button>
                    </a>
                    <a href="/graphs">
                        <Button variant="outline" size="lg" className={url == '/graphs' ? 'bg-primary hover:bg-primary' : "bg-background "}>
                            Graphs
                        </Button>
                    </a>
                    <a href="/related-words">
                        <Button variant="outline" size="lg" className={url == '/related-words' ? 'bg-primary hover:bg-primary' : "bg-background "}>
                            Related Words
                        </Button>
                    </a>
                    <a href="/map">
                        <Button variant="outline" size="lg" className={url == '/map' ? 'bg-primary hover:bg-primary' : "bg-background "}>
                            Map
                        </Button>
                    </a>
                </>
        </nav>
        <ModeToggle />

    </header>

    return (nav)
}