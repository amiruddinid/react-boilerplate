import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useDeleteMaterial } from "../api/delete-material";
import { useNotifications } from "@/components/ui/notifications";

const MaterialDelete = ({id}: {id: string}) => {
    const { addNotification } = useNotifications();
    const deleteMaterial = useDeleteMaterial({
        mutationConfig: {
            onSuccess: () => {
                addNotification({
                    type: 'success',
                    title: 'Material is deleted!'
                })
            }
        }
    })
    return (
        <ConfirmationDialog
            icon="danger"
            title="Delete Material"
            body={`Are you sure you want to delete 
                this material with id ${id} ?`}
            triggerButton={
                <Button variant='link' className="p-0">
                    <Trash className="size-5 text-red-500 hover:underline"/>
                </Button>
            }
            confirmButton={
                <Button 
                    variant='destructive'
                    type='button'
                    isLoading={deleteMaterial.isPending}
                    onClick={() => {
                        deleteMaterial.mutate(id);
                    }}
                >
                    Delete Material
                </Button>
            }
        />
    )
}

export default MaterialDelete;