import { Form, Input } from '@/components/ui/form';

const CreateMaterial = () => {
    return (
        <Form>
            <Input type="text" label="Material Name"/>
            <Input type="text" label="Part Number"/>
            <Input type="text" label="Unit"/>
            <Input type="text" label="Category"/>
            <Input type="text" label="Supplier ID"/>
        </Form>
    )
}

export default CreateMaterial;