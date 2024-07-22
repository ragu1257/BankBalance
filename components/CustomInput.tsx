import { FormField, FormLabel, FormMessage } from "./ui/form"
import { Input } from "@/components/ui/input"
import { authFormSchema } from "@/lib/utils"
import { Control, Field, FieldPath } from 'react-hook-form'
import { z } from "zod"

const formSchema = authFormSchema('Sign Up')
const CustomInput = ({ control, name, label, placeholder }: {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string
}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel className='form-label'>
                        {label}
                    </FormLabel>
                    <div className='flex w-full flex-col'>
                        <Input
                            {...field}
                            placeholder={placeholder}
                            className='input-class'
                            type={name === 'password' ? 'password' : 'text'}
                        />
                        <FormMessage {...field} className='form-message mt-2' />
                    </div>
                </div>
            )}
        />
    )
}

export default CustomInput