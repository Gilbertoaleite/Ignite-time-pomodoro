import { createContext, useContext } from 'react';
import { string } from 'zod';

const CyclesContext = createContext({
    activeCycle: 2,
    name: " Gilberto"
});


function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext);
    return <h1>NewCycleForm { activeCycle }</h1>
}

function Countdown() {
    const { activeCycle, name } = useContext(CyclesContext);
    return <h1>Coutdown { activeCycle }{ name }</h1>
}


export function Home() {
    return (
        <div>
            <NewCycleForm />
            <Countdown />
        </div>
    );
}