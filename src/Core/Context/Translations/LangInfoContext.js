import React, { useContext, useReducer } from 'react'
import useLocalStorage,{clearStorage} from '../Utils/useLocalStorag'
import { useHistory } from "react-router-dom";

const LangInfoContext = React.createContext()
const UpdateLangInfoContext = React.createContext()

export const ACTIONS = {
    AR_LANG: 'Arabic',
    EN_LANG: 'English',
}

export function useLangInfo(){
    return useContext(LangInfoContext)
}

export function useUpdateLangInfo(){
    return useContext(UpdateLangInfoContext)
}
export function LangInfoProvider({ children }) {
    const [langStorage,setLangStorage] = useLocalStorage('lang','')
    const history = useHistory();


    function newLang(langInfo) {
        langStorage(langInfo)
        history.push("/")
        
        return { langInfo:langInfo, Lang:true, date:Date.now() }
    }

    function reducer(LangData, action) {
        switch (action.type) {
            case ACTIONS.SIGN_IN:
                return newLang(action.payload.userInfo,action.payload.authorization)
            case ACTIONS.SIGN_OUT:
                clearStorage()
                return ''
            default:
                return LangData
        }
    }

    const [LangData, dispatch] = useReducer(reducer, {userInfo:userStorage,authorization:authStorage,Lang:!!userStorage&&!!authStorage})

    return (
        <LangInfoContext.Provider value={LangData}>
            <UpdateLangInfoContext.Provider value={dispatch}>
                {children}
            </UpdateLangInfoContext.Provider>
        </LangInfoContext.Provider>)
}