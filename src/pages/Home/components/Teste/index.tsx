import { useEffect, useState } from "react";

function avisaApi() {
console.log("Lista salva");
}

export function Teste() {
    const [list, setList] = useState<string[]>([]);
    const [filteredList, setFilteredList] = useState<string[]>([]);
    const [filter, setFilter] = useState('')

    useEffect(() => {
        avisaApi();
    }, [list])

    useEffect(() => {
        fetch("https://api.github.com/users/gilbertoaleite/repos")
        .then(response => response.json())
        .then(data => {
            setList(data.map((item: any) => item.full_name));
        })
    }, [])

    useEffect(() => {
        setFilteredList(list.filter(item => item.includes(filter)))
    }, [filter])


    function addToList(){
        setList(state => [...state, 'Novo item']);
    }



    return (
        <div>
            <input 
            type="text"
            onChange={e => setFilter(e.target.value)} 
                value={filter}
                />
            <ul>
            {list.map((item) => <li>{item}</li>)}
            </ul>

            <ul>
            {filteredList.map((item) => <li>{item}</li>)}
            </ul>

        <button onClick={addToList}>Adicionar</button>
        </div>
    )
}