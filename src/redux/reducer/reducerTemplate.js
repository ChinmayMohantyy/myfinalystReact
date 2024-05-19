import * as actionTypes from '../actionTypes';
import * as constant from '../../helper/Notes'

const initialState = {
    selected:'',
    balanceSheet:'',
    pnl:'',
    note3:constant.NoteTemp3,
    note4:'',
    note5:'',
    note6AA:'',
    note6A:'',
    note6B:'',
    note6C:'',
    note6D:'',
    note6E:'',
    note7:'',
    note8:'',
    note9:'',
    note10:'',
    note11:'',
    note12A:'',
    note12B:'',
    note12C:'',
    note13A:'',
    note13B:'',
    note13C:'',
    note14:'',
    note15:'',
    note16:'',
    note17:'',
    note18:'',
    note19:'',
    note20:'',
    note22A:'',
    note23:'',
    note24:'',
    note25:'',
    }


const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.SET_SELECTED:
            // console.log(action.payload,'payload')
            return{
                ...state,
                selected: action.payload
            }
            case actionTypes.SET_NOTETEMP3:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note3: action.payload
                }
            case actionTypes.SET_NOTETEMP4:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note4: action.payload
                }
            case actionTypes.SET_NOTETEMP5:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note5: action.payload
                }
            case actionTypes.SET_NOTETEMP6AA:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note6AA: action.payload
                }
            case actionTypes.SET_NOTETEMP6A:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note6A: action.payload
                }
            case actionTypes.SET_NOTETEMP6B:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note6B: action.payload
                }
            case actionTypes.SET_NOTETEMP6C:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note6C: action.payload
                }
            case actionTypes.SET_NOTETEMP6D:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note6D: action.payload
                }
            case actionTypes.SET_NOTETEMP6E:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note6E: action.payload
                }
            case actionTypes.SET_NOTETEMP7:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note7: action.payload
                }
            case actionTypes.SET_NOTETEMP8:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note8: action.payload
                }
            case actionTypes.SET_NOTETEMP9:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note9: action.payload
                }
            case actionTypes.SET_NOTETEMP10:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note10: action.payload
                }
            case actionTypes.SET_NOTETEMP11:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note11: action.payload
                }
            case actionTypes.SET_NOTETEMP12A:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note12A: action.payload
                }
            case actionTypes.SET_NOTETEMP12B:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note12B: action.payload
                }
            case actionTypes.SET_NOTETEMP12C:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note12C: action.payload
                }
            case actionTypes.SET_NOTETEMP13A:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note13A: action.payload
                }
            case actionTypes.SET_NOTETEMP13B:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note13B: action.payload
                }
            case actionTypes.SET_NOTETEMP13C:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note13C: action.payload
                }
            case actionTypes.SET_NOTETEMP14:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note14: action.payload
                }
            case actionTypes.SET_NOTETEMP15:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note15: action.payload
                }
            case actionTypes.SET_NOTETEMP16:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note16: action.payload
                }
            case actionTypes.SET_NOTETEMP17:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note17: action.payload
                }
            case actionTypes.SET_NOTETEMP18:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note18: action.payload
                }
            case actionTypes.SET_NOTETEMP19:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note19: action.payload
                }
            case actionTypes.SET_NOTETEMP20:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note20: action.payload
                }
            case actionTypes.SET_NOTETEMP22A:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note22A: action.payload
                }
            case actionTypes.SET_NOTETEMP23:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note23: action.payload
                }
            case actionTypes.SET_NOTETEMP24:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note24: action.payload
                }
            case actionTypes.SET_NOTETEMP25:
                console.log(action.payload,'payload')
                return{
                    ...state,
                    note25: action.payload
                }
        

                 
        default: return state;
    }
}
export default reducer;


