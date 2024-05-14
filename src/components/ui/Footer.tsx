import Logo from "../../assets/images/mizzouLogoNoBg.png";

export default function Home() {
    return (
      <div class="w-full bg-accent">
        <div className="p-4 max-w-screen-xl max-w-container mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div class="flex flex-col gap-2">
              <span class="text-left text-lg font-bold">Covlab</span>
              <a href="/team"><span>Team</span></a>
              <span>About Us</span>
              <span>Contact</span>
              <a href="https://forms.gle/2TQaY7tWAi72Mjs78" target="_blank"><span>To be annotators</span></a>
              <span>Privacy Policy</span>
            </div>
            
            <div class="flex flex-col gap-2">
              <span class="text-left text-lg font-bold">Related Links</span>
              <a target="_blank" href="https://digbio.missouri.edu/"><span>Mizzou DBL</span></a>
              <a target="_blank" href="https://coronavirus.jhu.edu/map.html"><span>Johns Hopkins Global Cases</span></a>
            </div>
            
            <div className="flex justify-center items-start">
              <img src={Logo} alt="Logo" className="h-20"/> {/* Replace path_to_logo with your actual image path */}
            </div>
          </div>
          <h5 className="text-center text-grey mt-4">Copyright © 2023 by Digital Biology Lab. All rights reserved.</h5>
        </div>
        </div>
      )
      
}