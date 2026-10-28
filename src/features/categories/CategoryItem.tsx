import {useEffect, useRef, useState} from 'react'
import type { Category } from './types'
import {Trash} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";

interface CategoryItemProps {
    category: Category
    onRemove: (id: string) => void
    onUpdate: (id: string, name: string) => void
}

export function CategoryItem({
                                 category,
                                 onRemove,
                                 onUpdate,
                             }: CategoryItemProps) {
    const [editedName, setEditedName] = useState<string | null>(null)
    const [openPopOver, setOpenPopOver] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const isEditing = editedName !== null
    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus()
        }
    }, [isEditing])

    function handleSave(){
        if (editedName === null) return
        const trimmedName = editedName.trim()
        if (!trimmedName.length) return;
        onUpdate(category.id,trimmedName)
        setEditedName(null)
    }

    return (
        <>
            <input
                ref={inputRef}
                type="text"
                value={editedName ?? category.name}
                readOnly={editedName === null}
                onChange={(event) => setEditedName(event.target.value)}
            />
            <button
                type="button"
                onClick={() => setEditedName(category.name)}
                className="rounded-lg px-3 py-1 text-blue-600 hover:bg-blue-50 ml-auto"
            >
                Изменить
            </button>
            {isEditing &&
                <>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="rounded-lg px-3 py-1 text-blue-600 hover:bg-blue-50"
                    >
                        Сохранить
                    </button>
                    <button
                        type="button"
                        onClick={()=>setEditedName(null)}
                        className="rounded-lg px-3 py-1 text-blue-600 hover:bg-blue-50"
                    >
                        Отменить
                    </button>
                </>
            }

            <Popover open={openPopOver} onOpenChange={setOpenPopOver}>
                <PopoverTrigger
                    render={
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Удалить категорию"
                            className="cursor-pointer"
                        />
                    }
                >
                    <Trash className="size-4 text-destructive" />
                </PopoverTrigger>

                <PopoverContent
                    side="top"
                    sideOffset={8}
                    align="end"
                    className="w-64 p-3">
                    <div className="text-sm text-center font-medium">
                        Удалить категорию?
                    </div>
                    <div
                    className="flex justify-between items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="lg"
                        aria-label="Удалить задачу"
                        className="rounded-lg px-3 py-1 text-blue-600 hover:bg-blue-50 cursor-pointer"
                        onClick={()=>onRemove(category.id)}
                    >
                        Удалить
                    </Button>
                    <Button
                        variant="ghost"
                        size="lg"
                        aria-label="Удалить задачу"
                        className="rounded-lg px-3 py-1 text-blue-600 hover:bg-blue-50 cursor-pointer"
                        onClick={()=>setOpenPopOver(false)}
                    >
                       Отменить
                    </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}