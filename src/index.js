import React from 'react';
import ReactDOM from 'react-dom';
import CountNew from "./Count";


const Context = React.createContext(null);

// let rerender = () => {
//     console.log('store')
// }
const createStore = (reducer, initialState) => {

    let currentState = initialState
    let listeners = []

    const getState = () => currentState
    const dispatch = action => {
        currentState = reducer(currentState, action)

        listeners.forEach(listener => listener())
    }

    const subscribe = listener => {
        listeners.push(listener)
        rerender = listener
    }

    return {getState, dispatch, subscribe}
}

const useSelector = selector => {
    const ctx = React.useContext(Context)
    if (!ctx) {
        return 0
    }

    return selector(ctx.store.getState())

}
const useDispatch = () => {
    const ctx = React.useContext(Context)

    if (!ctx) {
        return () => {
        }
    }

    return ctx.store.dispatch
}


const Provider = ({store, children}) => {

    // const [, updateState] = React.useState();
    // const forceUpdate = React.useCallback(() => updateState({}), []);   //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //
    // React.useEffect(() => {
    //     store.subscribe(rerender);
    //
    // }, []);

    return <Context.Provider value={{store}}>{children}</Context.Provider>

}

// APP

// actions
const UPDATE_COUNTER = 'UPDATE_COUNTER'
const CHANGE_STEP_SIZE = 'CHANGE_STEP_SIZE'

// action creators
const updateCounter = value => ({
    type: UPDATE_COUNTER,
    payload: value,
})

const changeStepSize = (value) => ({
    type: CHANGE_STEP_SIZE,
    payload: value,
})

// reducers
const defaultState = {
    counter: 0,
    stepSize: 0,
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_COUNTER:
            return {
                ...state,
                counter: state.counter + action.payload
            }
        case CHANGE_STEP_SIZE:

            return {
                ...state,
                stepSize: action.payload,

            }
        default:
            return state
    }
}

// ВНИМАНИЕ! Использование собственной реализации useSelector и dispatch обязательно
const Counter = () => {
    const counter = useSelector(state => state.counter)
    const stepSize = useSelector(state => state.stepSize, (current, prev) => current === prev)
    const dispatch = useDispatch()

    return (
        <div>
            <button onClick={() => dispatch(updateCounter(-parseInt(stepSize)))}>-</button>
            <span> {counter + parseInt(stepSize)} </span>
            <button onClick={() => dispatch(updateCounter(+parseInt(stepSize)))}>+</button>
        </div>
    )
}

const Step = () => {
    // const counter = useSelector(state => state.counter)
    const stepSize = useSelector(state => state.stepSize, (current, prev) => current === prev)
    const dispatch = useDispatch()

    return (
        <div>
            <div>Значение счётчика должно увеличиваться или уменьшаться на заданную величину шага</div>
            <div>Текущая величина шага: {stepSize}</div>
            <input
                type="range"
                min="1"
                max="5"
                value={stepSize}
                onChange={({target}) => dispatch(changeStepSize(target.value))}
            />
        </div>
    )
}

const store = createStore(reducer, defaultState);

let rerender = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Step/>
            <Counter/>
        </Provider>,
        document.getElementById('root'),
    )
}

rerender()
store.subscribe(rerender)

