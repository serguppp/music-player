'use client'

import Button from "./Button"
import { Heart, ListPlus, Share } from "lucide-react"
export default function MediaControls(){
    return(
        <div className="flex flex-row gap-2 ">
            <Button raw variant="play" onClick={()=>{}}/>
            <Button raw variant="bar" onClick={()=>{}} Icon = {Heart}/>
            <Button raw variant="bar" onClick={()=>{}} Icon = {ListPlus}/>
            <Button raw variant="bar" onClick={()=>{}} Icon = {Share}/>
        </div>
    )
}