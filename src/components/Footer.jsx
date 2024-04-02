import React from "react";

const Footer = () => {
    return <>
        <div className="w-full h-15 text-sm bg-slate-800 font-mono fixed bottom-0 flex justify-center items-center flex-col">
        <div className="logo font-mono px-20 font-bold text-white text-2xl"><span className="text-green-600">&lt;</span>Pass<span className="text-green-600">OP/&gt;</span></div>
        <p className="text-white">© 2021 Copyright: passop.com</p>
        </div>
    </>
}

export default Footer;