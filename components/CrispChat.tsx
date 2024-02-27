"use client"
import { useEffect } from 'react'
import {Crisp} from 'crisp-sdk-web'



const CrispChat = () => {
    useEffect(() => {
      Crisp.configure("7fccad2e-0554-4aff-8cd2-426240b56fbd")
    
     
    }, [])
    
  return null
}

export default CrispChat