import { produce } from 'immer';

import { ActionType } from "./actions";

export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date | null;
    finishedDate?: Date | null;
}

interface CyclesState {
    cycles: Cycle[];
    activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
    switch (action.type) {
        case ActionType.ADD_NEW_CYCLE:
            return produce(state, draft => {
                draft.cycles.push(action.payload.newCycle);
                draft.activeCycleId = action.payload.newCycle.id;
            })
        case ActionType.INTERRUPT_CURRENT_CYCLE:
            return produce(state, draft => {
                const activeCycle = draft.cycles.find(cycle => cycle.id === draft.activeCycleId);
                if (activeCycle) {
                    activeCycle.interruptedDate = new Date();
                }
                draft.activeCycleId = null;
            })

        case ActionType.MARK_CURRENT_CYCLE_AS_FINISHED:
            // return { //sem a biblioteca immer
            //     ...state,
            //     cycles: state.cycles.map((cycle) => {
            //         if (cycle.id === state.activeCycleId) {
            //             return {
            //                 ...cycle,
            //                 finishedDate: new Date()
            //             }
            //         } else {

            //             return cycle;
            //         }
            //     }),
            //     activeCycleId: null,
            // }
            return produce(state, draft => {
                const activeCycle = draft.cycles.find(cycle => cycle.id === draft.activeCycleId);
                if (activeCycle) {
                    activeCycle.finishedDate = new Date();
                }
                draft.activeCycleId = null;
            })

        default:
            return state;
    }
}