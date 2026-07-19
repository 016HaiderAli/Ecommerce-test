import { useState, type FormEvent } from 'react'
import { Star } from 'lucide-react'

interface Props {
  onAddReview: (r: { rating: number; text: string; image: File | null }) => void
}

export default function ReviewSection({ onAddReview }: Props) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [text, setText] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f && f.size <= 5 * 1024 * 1024) {
      setImage(f)
      setPreview(URL.createObjectURL(f))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (rating === 0 || !text.trim()) return
    onAddReview({ rating, text: text.trim(), image })
    setRating(0)
    setText('')
    setImage(null)
    setPreview(null)
  }

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
      <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 space-y-4">
        <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Write a Review
        </h5>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              onMouseEnter={() => setHover(i + 1)}
              onMouseLeave={() => setHover(0)}
              className="p-0.5"
            >
              <Star
                size={20}
                className={
                  i < (hover || rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-300 dark:text-gray-600'
                }
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="text-xs text-gray-500 ml-2">
              {rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : rating === 3 ? 'Good' : rating === 4 ? 'Very Good' : 'Excellent'}
            </span>
          )}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience with this product..."
          rows={3}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <div className="flex items-center gap-3">
          <label className="cursor-pointer text-xs font-medium text-purple-600 dark:text-purple-400 hover:underline">
            Attach image (optional, max 5MB)
            <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
          </label>
          {preview && (
            <div className="relative">
              <img src={preview} alt="preview" className="w-14 h-14 rounded-lg object-cover border" />
              <button
                type="button"
                onClick={() => { setImage(null); setPreview(null) }}
                className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] leading-none"
              >
                &times;
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={rating === 0 || !text.trim()}
          className="px-5 py-2 text-sm font-semibold rounded-lg bg-purple-600 text-white disabled:opacity-40 hover:bg-purple-700 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  )
}
