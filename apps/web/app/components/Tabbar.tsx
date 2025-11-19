import Image from "next/image"
export function Tabbar(){
    return<div className="flex justify-normal bg-ntab fixed w-screen h-14">
        <div className="ml-2 mt-2 bg-transparent">
            <Image src="/images/finalLogo.png" alt="logo" width={180} height={80} className="w-[130px] h-auto -mt-3"/>
        </div>
        <div className="flex ml-auto">
            <button className="bg-floral/80 text-neutral-700 px-2 py-1 text-md rounded-md mt-3 mb-3 mr-2 ml-2 cursor-pointer">
                Save Workflow
            </button>
            <button className="bg-gradient-to-r from-red-400/75 to-violet-600   text-white px-2 py-1 text-md rounded-md mt-3 mb-3 mr-8 ml-2 cursor-pointer">
                Execute Workflow
            </button>

        </div>
    </div>
}
//bg-gradient-to-r from-indigo-950/75 to-violet-600 
//bg-gradient-to-r from-red-400/75 to-violet-600