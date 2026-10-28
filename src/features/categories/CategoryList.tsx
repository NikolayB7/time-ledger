import type { Category } from './types'
import {CategoryItem} from "./CategoryItem.tsx";

interface CategoryListProps {
    categories: Category[],
    onRemove: (id: string) => void
    onUpdate: (id: string, name: string) => void
}

export function CategoryList({ categories,onRemove,onUpdate }: CategoryListProps) {
    return (
        <div className="mt-6 space-y-3">
            {categories.length === 0 ?
                <div>Категорий пока нет. Создайте первую категорию.</div>
                :
                categories.map((category) => (
                    <div
                        key={category.id}
                        className=" border border-slate-200 bg-white p-4">
                        <div className="flex items-center gap-3">
                            <span
                                className="h-4 w-4 rounded-full"
                                style={{ backgroundColor: category.color }}/>
                                <span className="font-medium text-slate-900">
                            </span>
                            <CategoryItem  category={category}
                                           onRemove={onRemove}
                                           onUpdate={onUpdate} />
                        </div>
                    </div>
                ))}

        </div>
    )
}