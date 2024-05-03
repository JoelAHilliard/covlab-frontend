import { useLocation } from "preact-iso";
import { Button } from "./button";
import covlabLogo from "../../assets/images/covlabLogos/covlabLogoBW.png";
import covlabLogoBlack from "../../assets/images/covlabLogos/covlabBlack.png";
import { Link } from "preact-router/match";

import { useTheme } from "../theme-provider";
import { useState } from "preact/hooks";
import { Check } from "lucide-react";
export default function Home() {
    
    const { url } = useLocation();
    const { theme } = useTheme();
    const [menu, setMenu] = useState(false);
    const logo = theme === "dark" ? covlabLogo : covlabLogoBlack;
    const nav = (
        <header className="bg-[#020202] flex  flex items-center justify-between gap-2 px-2 relative">
            <nav className="max-w-screen-xl mx-auto w-full w-full flex items-center gap-2 justify-between py-2">
                <a href="/">
                    <Button variant="ghost" size="default" className={url === '/' ? 'bg-primary hover:bg-primary flex h-10 px-1 text-white hover:text-white' : 'bg-transparent flex h-10 px-1 hover:bg-primary/25'}>
                        <img className="h-[50px] w-[100px]" src={logo} alt="logo" />
                    </Button>
                </a>
                <div className="relative"> {/* Container for toggle and dropdown */}
                    {/* Toggle button for smaller screens */}
                    <div className="md:hidden">
                        <button onClick={() => setMenu(!menu)} className="px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white transform active:scale-95">
                            <svg viewBox="0 0 100 55" width="20" height="20">
                                <rect width="100" height="20" fill="#ffffff"></rect>
                                <rect y="40" width="100" height="20" fill="#ffffff"></rect>
                            </svg>
                        </button>
                    </div>
                    {/* Dropdown menu for smaller screens */}
                    <div className={`${menu ? 'flex' : 'hidden'} md:hidden flex-col w-fit mt-2 z-9999999 absolute transform -translate-y-full top-[130px] right-0 bg-muted rounded`} >
                        <Link onClick={() => setMenu(false)} href="/graphs" className="block hover:bg-primary px-2 py-1 p-3 rounded transform active:scale-95 font-bold whitespace-nowrap flex gap-4">Graphs {url === "/graphs" &&  <Check/>}</Link>
                        <Link onClick={() => setMenu(false)} href="/related-words" className="block hover:bg-primary px-2 py-1 p-10 rounded transform active:scale-95 font-bold whitespace-nowrap flex gap-4">Related Words {url === "/related-words" &&  <Check/>}</Link>
                        <Link onClick={() => setMenu(false)} href="/map" className="block hover:bg-primary px-2 py-1 rounded transform active:scale-95 font-bold whitespace-nowrap flex gap-4">Map {url === "/map" &&  <Check/>}</Link>
                    </div>
                </div>
                {/* Regular menu for larger screens */}
                <div className="hidden md:flex gap-2">
                    <Link href="/graphs">
                        <Button variant="ghost" size="lg" className={url === '/graphs' ? 'bg-primary hover:bg-primary text-white hover:text-white' : 'bg-transparent hover:bg-primary/25'}>
                            Graphs
                        </Button>
                    </Link>
                    <Link href="/related-words">
                        <Button variant="ghost" size="lg" className={url === '/related-words' ? 'bg-primary hover:bg-primary text-white hover:text-white' : 'bg-transparent hover:bg-primary/25'}>
                            Related Words
                        </Button>
                    </Link>
                    <Link href="/map">
                        <Button variant="ghost" size="lg" className={url === '/map' ? 'bg-primary hover:bg-primary  text-white hover:text-white' : 'bg-transparent hover:bg-primary/25'}>
                            Map
                        </Button>
                    </Link>
                </div>
            </nav>
        </header>
    );

    return (nav);
}
