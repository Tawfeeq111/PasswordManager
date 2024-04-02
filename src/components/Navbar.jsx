import React from "react";

const Navbar = () => {
    return (
        <>
            <nav className="flex bg-slate-800 text-white justify-between items-center h-12">
                <div className="logo font-mono px-20 font-bold text-2xl"><span className="text-green-600">&lt;</span>Pass<span className="text-green-600">OP/&gt;</span></div>
                <ul className="flex px-20 gap-7">
                    <li><a className="hover:font-bold" href="/">Home</a></li>
                    <li><a className="hover:font-bold" href="#">About</a></li>
                    <li><a className="hover:font-bold" href="#">Contact</a></li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;