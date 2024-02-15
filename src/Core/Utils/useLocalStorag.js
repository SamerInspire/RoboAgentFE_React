import { useState, useEffect } from 'react'

function getSavedValue(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key))
    console.log('getSavedValue', savedValue)
    if (savedValue) return savedValue

    //if the intial state value maybe it was a function ()=>{}
    if (initialValue instanceof Function) return initialValue()
    return initialValue
}
export function clearStorage() {
    localStorage.clear()
}

export default function useLocalStorage(key, initialValue = localStorage.getItem(key)) {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue)
    })
    let newValue = ''
    try {
        newValue = JSON.stringify(value)
    } catch {
        newValue = value
    }
    useEffect(() => {
        localStorage.setItem(key, newValue)
    }, [key, value, newValue])

    return [value, setValue]
}