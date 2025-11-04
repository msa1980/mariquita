import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { fetchCep } from '@/lib/api';
import { toast } from 'sonner';

export const useCep = (setValue: UseFormSetValue<any>) => {
    const [isCepLoading, setIsCepLoading] = useState(false);

    const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const cep = e.target.value.replace(/\D/g, '');
        if (cep.length !== 8) {
            return;
        }

        setIsCepLoading(true);
        toast.loading("Buscando CEP...");
        const data = await fetchCep(cep);
        toast.dismiss();
        setIsCepLoading(false);

        if (data) {
            toast.success("Endereço encontrado!");
            setValue('street', data.logradouro, { shouldValidate: true });
            setValue('neighborhood', data.bairro, { shouldValidate: true });
            setValue('city', data.localidade, { shouldValidate: true });
            setValue('state', data.uf, { shouldValidate: true });
        } else {
            toast.error("CEP não encontrado.");
        }
    };

    return { isCepLoading, handleCepBlur };
};
