import { createContext, useReducer, useState } from "react";
import { ActionType, addNewCycleAction, interruptCurrentCycleAsdAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";

interface CreateCycleData {
    task: string;
    minutesAmount: number;
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
    children: React.ReactNode;
}

export function CyclesContextProvider({ children,
}: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer,
        {
            cycles: [],
            activeCycleId: null,
        });

    const [amountSecondPassed, setAmountSecondPassed] = useState(0);
    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((Cycle) => Cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number) {
        setAmountSecondPassed(seconds);
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
    }
    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        dispatch(addNewCycleAction(newCycle));

        setAmountSecondPassed(0);
    }
    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAsdAction())
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