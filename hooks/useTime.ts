// Custom hook that returns the current time
// Uses useEffect to run logic when the hook is first used

import { useEffect, useState } from "react";

export function useTime() {
    // Stores the current time value returned by the hook
    const [ time, setTime ] = useState(""); 
    
    // Runs once to set the initial time when the hook is used
    useEffect(() => {
        const now = new Date () ;
        setTime(now.toLocaleTimeString()) ;
    } , []) ;

    return time ; 
}