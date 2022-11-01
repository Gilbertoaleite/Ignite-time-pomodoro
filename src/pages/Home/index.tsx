import { HomeContainer, StartCountButton, StopCountButton } from "./styles";
import { HandPalm, Play } from "phosphor-react";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { NewCycleForm} from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";
import { CyclesContext } from "../../context/CyclesContext";

/**
 * Prop Drilling -> quando a gente passa uma propriedade de um componente pai para um componente filho
 * e depois esse componente filho passa essa propriedade para outro componente filho.
 * 
 * Context API -> a gente consegue passar uma propriedade de um componente pai para um componente filho
 * e esse componente filho pode passar essa propriedade para outro componente filho sem precisar passar
 * essa propriedade para o componente pai. // permite compartilhar informações entre vários componentes ao mesmo tempo
 * 
 */

export const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(1).max(60, 'O tempo deve ser entre 5 e 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
    const{createNewCycle, interruptCurrentCycle, activeCycle} = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const { handleSubmit,watch,reset } = newCycleForm;

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset();
    }
    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={ handleSubmit(handleCreateNewCycle) } action="">
                    <FormProvider {...newCycleForm}>
                    <NewCycleForm/> 
                    </FormProvider>
                    <Countdown />
                { activeCycle ? (
                    <StopCountButton onClick={ interruptCurrentCycle } type="button">
                        <HandPalm size={ 24 } />
                        Stop
                    </StopCountButton>
                ) : (
                    <StartCountButton disabled={ isSubmitDisabled } type="submit" >
                        <Play size={ 24 } />
                        Começar
                    </StartCountButton>
                ) }
            </form>
        </HomeContainer>
    )
}


