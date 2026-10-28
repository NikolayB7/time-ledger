import {useState} from 'react'
import type { Category } from './types'
import {PencilSparkles, Trash} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Field, FieldDescription, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer.tsx";

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
    const [editedName, setEditedName] = useState(category.name)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [openPopOver, setOpenPopOver] = useState(false)

    function handleOpenDrawer(open: boolean) {
        if (open) {
            setEditedName(category.name)
        }
        setOpenDrawer(open)
    }

    function handleSave() {
        const trimmedName = editedName.trim()

        if (!trimmedName) return

        onUpdate(category.id, trimmedName)

        setOpenDrawer(false)
    }

    return (
        <>
            <div className="mr-auto">{category.name}</div>

            <Drawer
                open={openDrawer}
                onOpenChange={handleOpenDrawer}
                swipeDirection="right">
                <DrawerTrigger render={<Button variant="outline" />}>
                    <PencilSparkles className="size-4"/>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Изменить категорию?</DrawerTitle>
                        <DrawerDescription>Какое-то описание</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="fieldgroup-name">Введите имя</FieldLabel>
                                <Input
                                    id="fieldgroup-name"
                                    placeholder="Введите новое имя категории"
                                    value={editedName}
                                    onChange={(event) => setEditedName(event.target.value)}/>
                                <FieldDescription>
                                    Обновите имя категории
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </div>
                    <DrawerFooter>
                        <Button onClick={handleSave}>Save</Button>
                        <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>


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