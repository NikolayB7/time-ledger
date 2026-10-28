import {AppLayout} from "./AppLayout.tsx";
import {CategoryList} from "../features/categories/CategoryList.tsx";
import {CategoryForm} from "../features/categories/CategoryForm.tsx";
import { useCategories } from '../features/categories/useCategories'

function App() {
    const {
        categories,
        addCategory,
        removeCategory,
        updateCategory
    } = useCategories()

  return (
      <AppLayout>
          <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">
                  Категории ({categories.length})
              </h2>

          </div>

          <CategoryForm onAdd={addCategory} />
          <CategoryList categories={categories} onRemove={removeCategory} onUpdate={updateCategory} />

      </AppLayout>
  )
}

export default App
