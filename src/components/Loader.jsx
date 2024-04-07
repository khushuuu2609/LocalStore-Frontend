import React from 'react'

function Loader() {
    return (
        <>
            <div className="w-full h-[500px]  top-0 left-0 z-20 bg-slate-800 bg-opacity-40 flex items-center justify-center backdrop-box">
                <div className="animate-spin ease-linear rounded-full size-28 border-t-8 border-b-8 border-themeColor-400 ml-3"></div>
            </div>
        </>
    )
}

export default Loader