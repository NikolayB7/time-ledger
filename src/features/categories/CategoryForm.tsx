import {useState} from "react";

interface CategoryFormProps {
    onAdd: (name:string) => void;
}

export function CategoryForm({onAdd}: CategoryFormProps) {
    const [name, setName] = useState('')

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        const trimmedName = name.trim()

        if (!trimmedName) return

        onAdd(trimmedName)
        setName('')
    }

    return (
        <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
            <input
                maxLength={35}
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Название категории"
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2"
            />

            <button
                type="submit"
                disabled={!name.trim()}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Добавить
            </button>
        </form>
    )
}