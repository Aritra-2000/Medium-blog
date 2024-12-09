"use client"

import { ChangeEvent, useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import {SingupInput} from "@aritra-paul/blog-common"
import axios from "axios"

export const Auth = ({type} : {type: "signup" | "signin"}) =>{

  const [isLoading, setIsLoading] = useState(false);

    const [postInputs, setPostInputs] = useState<SingupInput>({
        name: "",
        email: "",
        password:"",
    })

    const navigate = useNavigate();

    async function sendRequest(){ 
        
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        try {
            const response = await axios.post(`${backendUrl}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs); 
            const jwt = response.data.jwt;

          
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (error) {
            alert(type === "signup" ? "Error while signing up" : "Error while signing in")
        }
    }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-xl p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105">
        <div className="text-center">
        <div className="mx-auto h-14 w-14 bg-black rounded-full flex items-center justify-center shadow-lg">
            <svg
                className="h-10 w-10 text-yellow-500"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
            >
                <defs>
                    <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#FFA500", stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <path
                    d="M13 2L3 14h7v8l10-12h-7L13 2z"
                    fill="url(#gold-gradient)"
                    stroke="none"
                />
            </svg>
        </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">Create your account</h2>
          <div className="text-slate-400 pt-2">
              {type == "signin" ? "Don't have an account?" : "Already have an account?"} 
              <Link className="pl-2 underline" to={type == "signin"? "/signup" :"/signin"}>{type == "signin" ? "Sign up" : "Sign in"}</Link>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            {type === "signin"? null : <div>
                <LabelledInput label="Name" placeholder="Full Name" name="name" id="name" autoComplete="name" type="text" onChange={(e) =>{
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }}></LabelledInput>
            </div>}
            <div>
            <LabelledInput label="Email" placeholder="Email address" name="email" id="email" autoComplete="email" type="email" onChange={(e) =>{
                setPostInputs({
                    ...postInputs,
                    email: e.target.value
                })
            }}></LabelledInput>
            </div>
            <div>
            <LabelledInput label="Password" placeholder="Password" name="password" id="password" autoComplete="new-password" type="password" onChange={(e) =>{
                setPostInputs({
                    ...postInputs,
                    password: e.target.value
                })
            }}></LabelledInput>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 ease-in-out"
              disabled={isLoading}
              onClick={sendRequest}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {type === "signup" ? "Sign up" : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

interface LabelledInputType{
    label: string,
    placeholder: string,
    type: string,
    name: string,
    id: string,
    autoComplete: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) =>void
}


function LabelledInput({ label, placeholder, onChange, type, name, id, autoComplete} : LabelledInputType){
    return <div>
        <Label htmlFor="email-address" className="sr-only">
                {label}
              </Label>
              <Input
                id={id}
                name={name}
                type={type}
                autoComplete={autoComplete}
                onChange={onChange}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent dark:bg-gray-700 transition-all duration-300 ease-in-out"
                placeholder={placeholder}
              />
    </div>
}