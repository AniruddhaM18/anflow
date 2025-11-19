import { useState } from "react"
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegWindowClose } from "react-icons/fa";


export function Sidepanel({onAddNode}: { onAddNode: (type: string) => void }) {

    const[open, setOpen] = useState(false);
    const trigger = [
        {label: "Webhook Trigger", type: "webhook"},
        {label: "Manual Trigger", type: "manual"}
    ]

    const nodes  = [
        {label: "Resend Node", type: "resend"},
        {label: "Telegram Node", type: "telegram"},
        {label: "Gemini Node", type: "gemini"}
    ]

    return (
        <div className={`bg-sdbar h-[calc(100vh-3.5rem)]  mt-14 duration-300 fixed right-0
        ${open ? "w-64" : "w-12"}`}>
            <div className="flex items-center justify-between h-10">
                <button onClick={() => setOpen(!open)}>
                    <FaRegSquarePlus className="size-6 m-3 text-floral/80" />
                </button>
                 {open &&(
                <button onClick={() => setOpen(false)}>
                    <FaRegWindowClose className="size-5 m-3 text-floral/80 "/>
                </button>
               )}
            </div>

            <div className={`p-3 space-y-4 ${open ? "block" : "hidden"}`}>

            {/* TRIGGER SECTION */}
            <div>
               <div className="shadow-amber-50 rounded-md p-2 mb-2 bg-eerie">
                 <h2 className="text-white text-2xl font-semibold p-2 mb-3 text-center">
                    Add Triggers
                </h2>
                    <div className="space-y-4">
                    {trigger.map((item) => (
                        <button
                        key={item.type}
                        onClick={() => onAddNode(item.type)} 
                        className="w-full p-3 rounded-md bg-linear-to-r from-purple-600/80 to-flame/75 text-center text-neutral-200">
                            {item.label}
                        </button>
                    ))}
                </div>
               </div>
            </div>

            {/* Nodes Section */}
            <div className="shadow-amber-50 rounded-md p-2 mb-2 bg-eerie">
                <h2 className="text-white text-2xl font-semibold p-2 mb-3 text-center">
                    Add Nodes
                </h2>
                <div className="space-y-4">
                    {nodes.map((item) => (
                        <button key={item.type}
                        onClick={() => onAddNode(item.type)}
                        className="w-full p-3 rounded-md bg-linear-to-r from-flame/75 to-purple-600/80 text-center text-neutral-200">
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
            </div>
        </div>
    )

}