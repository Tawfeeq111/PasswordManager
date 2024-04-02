import React, { useEffect, useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const refPass = useRef()
    const [form, setFrom] = useState({ site: "", username: "", password: ""})
    const [passArray, setPassArray] = useState([]);

    useEffect(() => {
        let arr = localStorage.getItem("password");
        if (arr) {
            setPassArray(JSON.parse(arr));
        }
    }, [])

    const handelSave = () => {
        if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
            setPassArray([...passArray, {...form, id: uuidv4()}]);
            localStorage.setItem("password", JSON.stringify([...passArray, {...form, id: uuidv4()}]));
            document.getElementsByClassName('urlT')[0].value = null;
            document.getElementsByClassName('usernameT')[0].value = null;
            document.getElementsByClassName('passwordT')[0].value = null;
        }
    }

    const handelDelete = (id) => {
        let newArr = passArray.filter((item)=>{
            return item.id != id;
        })
        localStorage.setItem("password", JSON.stringify(newArr));
        setPassArray(newArr);

    }

    const handelEdit = (id) => {
        let obj;
        let newArr = passArray.filter((item)=>{
            if(item.id == id) obj = item;
            return item.id != id;
        })
        document.getElementsByClassName('urlT')[0].value = obj.site;
        document.getElementsByClassName('usernameT')[0].value = obj.username;
        document.getElementsByClassName('passwordT')[0].value = obj.password;
        localStorage.setItem("password", JSON.stringify(newArr));
        setPassArray(newArr);
    }


    const handelChange = (e) => {
        setFrom({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = async (text) => {
        toast('Copied to chipboard', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
            });
        await navigator.clipboard.writeText(text);
    }
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
            <div className="logo flex flex-col items-center my-4"><h1 className="text-4xl font-bold"><span className="text-green-600">&lt;</span>Pass<span className="text-green-600">OP/&gt;</span></h1>
                <div className="font-mono max-w-5xl mx-auto flex flex-col items-center my-5">
                    <p className="fff text-gray-500">Your own Password Manager</p>
                </div>
                <div className="w-2/3">
                    <input name={"site"} onChange={handelChange} className="urlT w-full border-solid border-2 border-green-200 h-7 rounded-full my-2 px-4 " placeholder={"Enter website URL"} type="text" />
                    <div className="flex my-2 justify-between w-full">
                        <input name={"username"} onChange={handelChange} className="usernameT rounded-full border-solid border-2 border-green-200 h-7 w-3/4 px-4" placeholder={"Enter Username"} type="text" />
                        <div className="relative " id="eyeP">
                            <input name={"password"} onChange={handelChange} className="passwordT rounded-full border-solid border-2 border-green-200 h-7 w-full px-4" placeholder={"Enter Password"} type="password" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <button onClick={handelSave} className="flex gap-2 bg-green-400 p-1 px-3 rounded-full hover:bg-green-500 border border-green-800">
                    <lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover">
                    </lord-icon>
                    <p className="poss font-mono">Save Password</p>
                </button>
            </div>
            {passArray.length != 0 &&
                <div className="my-4 w-2/3 mx-auto pb-20">
                    <h2 className="font-bold text-xl py-2  font-mono">Your Passwords</h2>
                    <table className="table-auto w-full rounded-lg">
                        <thead className="bg-green-700 ">
                            <tr className="font-mono">
                                <th className="px-2 w-1/3 py-1 text-white font-mono">Site</th>
                                <th className="px-2 w-1/3 py-1 text-white font-mono">Username</th>
                                <th className="px-2 w-1/3 py-1 text-white font-mono">Password</th>
                                <th className="px-2 pad w-1/3 py-1 mx-6 text-white font-mono">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-green-100 font-light">
                            {passArray.map((ele, idx) => {
                                return <tr key={idx}>
                                    <td className="text-center py-2" >
                                        <div className="flex justify-center items-center gap-2">
                                            <a href={ele.site} target="_blank">{ele.site}</a>
                                            <FaCopy className="cursor-pointer iconcopy" onClick={() => { copyText(ele.site) }} />
                                        </div>
                                    </td>
                                    <td className="text-center py-2" >
                                        <div className="flex justify-center items-center gap-2">
                                            {ele.username}
                                            <FaCopy className="cursor-pointer iconcopy" onClick={() => { copyText(ele.username) }} />
                                        </div>
                                    </td>
                                    <td className="text-center py-2">
                                        <div className="flex justify-center items-center gap-2">
                                            {ele.password}
                                            <FaCopy className="cursor-pointer iconcopy" onClick={() => { copyText(ele.password) }} />
                                        </div>
                                    </td>
                                    <td className="flex justify-center align-center p-3 pr-5 cursor-pointer gap-1 text-lg">
                                    <FaEdit onClick={()=>{handelEdit(ele.id)}} /> <MdDelete onClick={()=>{handelDelete(ele.id)}} />
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table >
                </div >
            }
        </>
    );
}

export default Manager;