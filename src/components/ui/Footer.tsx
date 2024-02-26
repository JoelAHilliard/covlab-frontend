export default function Home() {
    return (
        <div className="p-4 max-w-screen-xl max-w-container mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div class="flex flex-col">
              <span class="text-left text-lg font-bold">Covlab</span>
              <span>Link 1</span>
              <span>Link 2</span>
              <span>Link 3</span>
            </div>
            
            <div class="flex flex-col">
              <span class="text-left text-lg font-bold">Related Links</span>
              <span>Link 1</span>
              <span>Link 2</span>
              <span>Link 3</span>
            </div>
            
            <div className="flex justify-center items-center">
              <img src="path_to_logo" alt="Logo" className="object-contain"/> {/* Replace path_to_logo with your actual image path */}
            </div>
          </div>
          <h5 className="text-center text-grey mt-4">Copyright © 2023 by Digital Biology Lab. All rights reserved.</h5>
        </div>
      )
      
}