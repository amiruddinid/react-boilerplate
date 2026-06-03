import { Table } from '@/components/ui/table';

const MaterialTable = () => {
    return (
        <Table
            data={[{
                id: '1',
                name: 'Material 1',
                description: 'Description for Material 1',
                quantity: 100,
            }]}
            columns={[
                {
                    title: 'Material Name',
                    field: 'name',
                },
                {
                    title: 'Description',
                    field: 'description',
                },
                {
                    title: 'Quantity',
                    field: 'quantity',
                },
            ]}
        />
    );
}

export default MaterialTable;