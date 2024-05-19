import * as actionTypes from '../actionTypes';

const initialState = {
    note3:'',
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
        case actionTypes.SET_NOTERESTART:
            console.log(action.payload,'payload')
            return initialState
        case actionTypes.SET_NOTE3:
            console.log(action.payload,'payload')
            return{
                ...state,
                note3: action.payload
            }
        case actionTypes.SET_NOTE4:
            console.log(action.payload,'payload')
            return{
                ...state,
                note4: action.payload
            }
        case actionTypes.SET_NOTE5:
            console.log(action.payload,'payload')
            return{
                ...state,
                note5: action.payload
            }
        case actionTypes.SET_NOTE6AA:
            console.log(action.payload,'payload')
            return{
                ...state,
                note6AA: action.payload
            }
        case actionTypes.SET_NOTE6A:
            console.log(action.payload,'payload')
            return{
                ...state,
                note6A: action.payload
            }
        case actionTypes.SET_NOTE6B:
            console.log(action.payload,'payload')
            return{
                ...state,
                note6B: action.payload
            }
        case actionTypes.SET_NOTE6C:
            console.log(action.payload,'payload')
            return{
                ...state,
                note6C: action.payload
            }
        case actionTypes.SET_NOTE6D:
            console.log(action.payload,'payload')
            return{
                ...state,
                note6D: action.payload
            }
        case actionTypes.SET_NOTE6E:
            console.log(action.payload,'payload')
            return{
                ...state,
                note6E: action.payload
            }
        case actionTypes.SET_NOTE7:
            console.log(action.payload,'payload')
            return{
                ...state,
                note7: action.payload
            }
        case actionTypes.SET_NOTE8:
            console.log(action.payload,'payload')
            return{
                ...state,
                note8: action.payload
            }
        case actionTypes.SET_NOTE9:
            console.log(action.payload,'payload')
            return{
                ...state,
                note9: action.payload
            }
        case actionTypes.SET_NOTE10:
            console.log(action.payload,'payload')
            return{
                ...state,
                note10: action.payload
            }
        case actionTypes.SET_NOTE11:
            console.log(action.payload,'payload')
            return{
                ...state,
                note11: action.payload
            }
        case actionTypes.SET_NOTE12A:
            console.log(action.payload,'payload')
            return{
                ...state,
                note12A: action.payload
            }
        case actionTypes.SET_NOTE12B:
            console.log(action.payload,'payload')
            return{
                ...state,
                note12B: action.payload
            }
        case actionTypes.SET_NOTE12C:
            console.log(action.payload,'payload')
            return{
                ...state,
                note12C: action.payload
            }
        case actionTypes.SET_NOTE13A:
            console.log(action.payload,'payload')
            return{
                ...state,
                note13A: action.payload
            }
        case actionTypes.SET_NOTE13B:
            console.log(action.payload,'payload')
            return{
                ...state,
                note13B: action.payload
            }
        case actionTypes.SET_NOTE13C:
            console.log(action.payload,'payload')
            return{
                ...state,
                note13C: action.payload
            }
        case actionTypes.SET_NOTE14:
            console.log(action.payload,'payload')
            return{
                ...state,
                note14: action.payload
            }
        case actionTypes.SET_NOTE15:
            console.log(action.payload,'payload')
            return{
                ...state,
                note15: action.payload
            }
        case actionTypes.SET_NOTE16:
            console.log(action.payload,'payload')
            return{
                ...state,
                note16: action.payload
            }
        case actionTypes.SET_NOTE17:
            console.log(action.payload,'payload')
            return{
                ...state,
                note17: action.payload
            }
        case actionTypes.SET_NOTE18:
            console.log(action.payload,'payload')
            return{
                ...state,
                note18: action.payload
            }
        case actionTypes.SET_NOTE19:
            console.log(action.payload,'payload')
            return{
                ...state,
                note19: action.payload
            }
        case actionTypes.SET_NOTE20:
            console.log(action.payload,'payload')
            return{
                ...state,
                note20: action.payload
            }
        case actionTypes.SET_NOTE22A:
            console.log(action.payload,'payload')
            return{
                ...state,
                note22A: action.payload
            }
        case actionTypes.SET_NOTE23:
            console.log(action.payload,'payload')
            return{
                ...state,
                note23: action.payload
            }
        case actionTypes.SET_NOTE24:
            console.log(action.payload,'payload')
            return{
                ...state,
                note24: action.payload
            }
        case actionTypes.SET_NOTE25:
            console.log(action.payload,'payload')
            return{
                ...state,
                note25: action.payload
            }
        
        default: return state;
    }
}
export default reducer;


