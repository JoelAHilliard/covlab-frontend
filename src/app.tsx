import './app.css';
import { LocationProvider, Router, Route } from 'preact-iso';
import Home from "./pages/home";
import Graphs from "./pages/graphs";
import Map from "./pages/map";
import Header from "../src/components/ui/Header";
import Footer from "../src/components/ui/Footer";
import { ThemeProvider } from './components/theme-provider';
import RelatedWords from './pages/related-words';
import Team from "./pages/team";



export function App() {
  
  return (
   <div>
    {/* nav bar */}
    <LocationProvider >
      <ThemeProvider>
						<div class="bg-background min-h-screen flex flex-col h-full">
              <Header />
                <div class="flex flex-col flex-1 justify-between">
                <Router>
                  <Route default path="/" component={Home} />
                  <Route path="/graphs" component={Graphs} />
                  <Route path="/map" component={Map} />
                  <Route path="/related-words" component={RelatedWords} />
                  <Route path="/team" component={Team} />
                </Router>
                <Footer />
              </div>
						</div>
				
          </ThemeProvider>
      </LocationProvider>
   </div>
  )
}
