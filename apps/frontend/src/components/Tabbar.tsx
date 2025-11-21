import finalLogo from "../assets/finalLogo.png"
export function Tabbar(){
    return<div className="flex justify-normal bg-ntab fixed w-screen h-14">
        <div className="ml-2 mt-2 bg-transparent">
        <img src={finalLogo} alt="logo" width={180} height={80} className="w-[130px] h-auto -mt-3"></img>
        </div>
        <div className="flex ml-auto">
            <button className="bg-floral/80 text-neutral-700 px-2 py-1 text-md font-semibold rounded-md mt-3 mb-3 mr-2 ml-2 cursor-pointer shadow shadow-slate/75">
                Save Workflow
            </button>
            <button className="bg-gradient-to-r from-indigo-500 to-violet-500 rounded-md px-2 py-1 w-fit text-white font-semibold
                            hover:scale-98 transition-transform ease-in-out text-md  mt-3 mb-3 mr-8 ml-2 cursor-pointer shadow shadow-black/75">
                Execute Workflow
            </button>

        </div>
    </div>
}
//bg-gradient-to-r from-indigo-950/75 to-violet-600 
//bg-gradient-to-r from-red-400/75 to-violet-600