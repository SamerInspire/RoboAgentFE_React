
import { ACTIONS } from '../Context/LoginInfoContext'

export function HitHandle(result) {

    console.log("result ===> ", result)
    const code = result.data.result
    switch (code.toString()) {
        case '0':
            return { success: true, result: 'success', description: result.data.resultDescription, data: result.data, authorization: result.headers['authorization'] }
        case '101':
            return { success: false, result: 'error', description: 'The email is not registered' }
        case '102':
            return { success: false, result: 'error', description: 'User/Password dose not match' }
        case '103':
            return { success: false, result: 'error', description: result.data.resultDescription }
        case ('106' || '107' || '108' || '109'):
            return { success: false, result: 'error', description: 'Session Expired', redirectTo: "/", clearStorage: true }
        default:
            return { success: false, result: 'error', description: result.data.result + ' - ' + result.data.resultDescription }
    }
}
export function HandelRegularHit({ hitResult, setAlertInfo, loginUpdate, values }) {
    console.log('hitResult', hitResult)
    if (!!loginUpdate) {
        if (!hitResult.success) {

            if (values) values.password = '' //for sign in and sign up pages

            if (hitResult.clearStorage) {
                loginUpdate('', ACTIONS.SIGN_OUT)
            }
        } else {
            if (!!hitResult.data.user && !!hitResult.authorization)
                loginUpdate({ type: ACTIONS.SIGN_IN, payload: { userInfo: hitResult.data.user, authorization: hitResult.authorization } })
        }
    }
    console.log("hitResult ===> ", hitResult)
    setAlertInfo({ alertType: hitResult.result, alertMsg: hitResult.description, redirectTo: hitResult.redirectTo })

}
