import { type FormEvent } from "react"
import {
  useClearFilters,
  useFilterPosts,
  usePostFilters,
  useUpdateFilters,
} from "../../contexts/post/hooks"
import { Button } from "../base/button"
import { DatePicker } from "../external/date-picker"

export function PostsFilter() {
  const filters = usePostFilters()
  const updateFilters = useUpdateFilters()
  const filterPosts = useFilterPosts()
  const clearFilters = useClearFilters()

  const areAllFiltersEmpty = Object.values(filters).every((value) => !value)

  function handleFilterPosts(event: FormEvent) {
    event.preventDefault()
    filterPosts()
  }

  function handleClearFilters() {
    clearFilters()
  }

  return (
    <form
      onSubmit={handleFilterPosts}
      className="bg-white border border-gray-default rounded-lg p-4"
    >
      <h4 className="text-xl font-bold mb-4">Posts Filters</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="username"
          className="border border-gray-default rounded-lg p-2"
          onChange={(e) =>
            updateFilters({ ...filters, username: e.target.value })
          }
          value={filters.username}
        />
        <input
          type="text"
          placeholder="title"
          className="border border-gray-default rounded-lg p-2"
          onChange={(e) => updateFilters({ ...filters, title: e.target.value })}
          value={filters.title}
        />
        <input
          type="text"
          placeholder="content"
          className="border border-gray-default rounded-lg p-2"
          onChange={(e) =>
            updateFilters({ ...filters, content: e.target.value })
          }
          value={filters.content}
        />
        <DatePicker
          className="border border-gray-default rounded-lg p-2"
          placeholder="start date"
          date={filters.startDate}
          onSelectDate={(newStartDate) => {
            updateFilters({ ...filters, startDate: newStartDate })
          }}
        />
        <DatePicker
          className="border border-gray-default rounded-lg p-2"
          placeholder="end date"
          date={filters.endDate}
          onSelectDate={(newEndDate) => {
            updateFilters({ ...filters, endDate: newEndDate })
          }}
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button
          color="#FF5151"
          textColor="#fff"
          type="button"
          onClick={handleClearFilters}
          className={areAllFiltersEmpty ? "cursor-not-allowed" : ""}
          disabled={areAllFiltersEmpty}
        >
          Clear
        </Button>
        <Button
          color="#7695EC"
          textColor="#fff"
          type="submit"
          className={areAllFiltersEmpty ? "cursor-not-allowed" : ""}
          disabled={areAllFiltersEmpty}
        >
          Filter
        </Button>
      </div>
    </form>
  )
}
