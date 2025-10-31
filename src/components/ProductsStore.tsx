import * as Dialog from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";

function ProductsStore() {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tienda de Productos</h2>
                <Dialog.Root>
                    <Dialog.Trigger className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Abrir modal
                    </Dialog.Trigger>

                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
                        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-lg">
                            <Dialog.Title className="text-lg font-bold">Hola 👋</Dialog.Title>
                            <Dialog.Description className="text-gray-600 mt-2">
                                Este es un modal de Radix UI.
                            </Dialog.Description>

                            <Dialog.Close className="mt-4 bg-gray-200 px-3 py-2 rounded-md">
                                Cerrar
                            </Dialog.Close>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
        </div>
    )
}

export default ProductsStore