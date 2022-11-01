import { createContext, useReducer, useState } from "react";

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date | null;
    finishedDate?: Date | null;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;

}

interface CyclesContextProviderProps {
    children: React.ReactNode; // ReactNode é um tipo que representa qualquer coisa que o React possa renderizar tipo html
}

interface CyclesState {
    cycles: Cycle[];
    activeCycleId: string | null;
}

export function CyclesContextProvider({ children,
}: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(
        (state: CyclesState, action: any) => {
            switch (action.type) {
                case "ADD_NEW_CYCLE":
                    return { 
                        ...state,
                        cycles: [...state.cycles, action.payload.newCycle],
                        activeCycleId: action.payload.newCycle.id,
                    }
                case "INTERRUPT_CURRENT_CYCLE":
                return {
                    ...state,
                    cycles: state.cycles.map((cycle) => {
                        if (cycle.id === state.activeCycleId) {
                            return {
                                ...cycle,
                                interruptedDate: new Date()}
                        }else {
    
                        return cycle;
                        }
                    }),
                    activeCycleId: null,
                }

                case "MARK_CURRENT_CYCLE_AS_FINISHED":
                return {
                    ...state,
                    cycles: state.cycles.map((cycle) => {
                        if (cycle.id === state.activeCycleId) {
                            return {
                                ...cycle,
                                finishedDate: new Date()}
                        }else {
    
                        return cycle;
                        }
                    }),
                    activeCycleId: null,
                }
                default:
                    return state;
                }
    }, {
        cycles:[],
        activeCycleId: null,
    });

    const [amountSecondPassed, setAmountSecondPassed] = useState(0);

    const {cycles, activeCycleId} = cyclesState;
    const activeCycle = cycles.find((Cycle) => Cycle.id === activeCycleId);

    // useReducer é um hook que permite que você tenha um estado e uma função que atualiza esse estado, o primeiro parâmetro é uma função que recebe o estado atual e retorna o novo estado, o segundo parâmetro é o estado inicial
    // const [cycles, setCycles] = useState<Cycle[]>([]);
    // const [activeCycleId, setActiveCycleId] = useState<string | null>(null);


    function setSecondsPassed(seconds: number) {
        setAmountSecondPassed(seconds);
    }

    function markCurrentCycleAsFinished() {
        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
            payload: {
                activeCycleId,
            }
        })
        // setCycles(state => state.map((cycle) => {
        //     if (cycle.id === activeCycleId) {
        //         return { ...cycle, finishedDate: new Date() }
        //     } else {
        //         return cycle
        //     }
        // }),
        // )
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
            // finishedDate: new Date(),
        }

        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload: {
                newCycle,
            }
        });

        // setCycles((state) => [...state, newCycle]);
        // setActiveCycleId(id);
        setAmountSecondPassed(0);
    }
    function interruptCurrentCycle() {
        dispatch({
            type: 'INTERRUPT_CURRENT_CYCLE',
            payload: {
                activeCycleId,
            },
            
        })
        // setCycles(state => state.map((cycle) => {
        //     if (cycle.id === activeCycleId) {
        //         return {
        //             ...cycle,
        //             interruptedDate: new Date()
        //         }
        //     } else {
        //         return cycle
        //     }
        // }),
        // )
        // setActiveCycleId(null);
    }

    return (
        <CyclesContext.Provider
            value={ {
                cycles,
                activeCycle,
                activeCycleId,
                markCurrentCycleAsFinished,
                amountSecondPassed,
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle,
            } }>
            { children }
        </CyclesContext.Provider>
    )
}