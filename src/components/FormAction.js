import React from "react";

export default function FormAction({
    handleSubmit,
    type='Button',
    action='submit',
    text
}){
    return( 
        <>
        {
            type==='Button' ?
            <button
                type={action}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700  mt-6"
                onClick={handleSubmit}
            >

                {text}
            </button>
            :
            <></>
        }
        </>
    )
}