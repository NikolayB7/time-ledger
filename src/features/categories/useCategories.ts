import { useState } from 'react'
import type { Category } from './types'

const initialCategories: Category[] = [
    {
        id: '1',
        name: 'Работа',
        color: '#3b82f6',
        createdAt: '2026-10-24',
        updatedAt: '2026-10-24',
    },
    {
        id: '2',
        name: 'Обучение',
        color: '#22c55e',
        createdAt: '2026-10-24',
        updatedAt: '2026-10-24',
    },
    {
        id: '3',
        name: 'Спорт',
        color: '#f97316',
        createdAt: '2026-10-24',
        updatedAt: '2026-10-24',
    },
    {
        id: '4',
        name: 'Отдых',
        color: '#a855f7',
        createdAt: '2026-10-24',
        updatedAt: '2026-10-24',
    },
]

export function useCategories() {
    const [categories, setCategories] =
        useState<Category[]>(initialCategories)

    function addCategory(name: string) {
        const now = new Date().toISOString()

        const newCategory: Category = {
            id: crypto.randomUUID(),
            name,
            color: '#64748b',
            createdAt: now,
            updatedAt: now,
        }

        setCategories(prev => [...prev, newCategory])
    }
    function removeCategory(id: string) {
        setCategories(prev =>
            prev.filter(category => category.id !== id)
        )
    }
    function updateCategory(id: string, newName: string) {
        const trimmedName = newName.trim()

        if (!trimmedName) return

        setCategories(prev =>
            prev.map(category => {
                if (category.id !== id || category.name === trimmedName) {
                    return category
                }

                return {
                    ...category,
                    name: trimmedName,
                    updatedAt: new Date().toISOString(),
                }
            })
        )
    }

    return {
        categories,
        addCategory,
        removeCategory,
        updateCategory
    }
}