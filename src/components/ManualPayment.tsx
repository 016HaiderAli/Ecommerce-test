import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'lucide-react'
import { pb } from '../lib/pocketbase'

const MAX_SIZE = 5 * 1024 * 1024
const ACCEPT = { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }

interface Props {
  compact?: boolean
}

type Status = 'idle' | 'uploading' | 'success' | 'error'

export default function ManualPayment({ compact }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [orderId, setOrderId] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const onDrop = useCallback((accepted: File[]) => {
    const f = accepted[0]
    if (!f) return
    if (f.size > MAX_SIZE) {
      setMessage('File exceeds 5MB limit')
      return
    }
    setFile(f)
    setMessage('')
    setStatus('idle')
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPT,
    maxFiles: 1,
    maxSize: MAX_SIZE,
  })

  const handleUpload = async () => {
    if (!file || !orderId.trim()) {
      setMessage('Select a file and enter an Order ID')
      return
    }
    setStatus('uploading')
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('screenshot', file)
      formData.append('orderId', orderId.trim())

      await pb.collection('payment_screenshots').create(formData)

      await pb.collection('orders').update(orderId.trim(), {
        payment_status: 'pending_verification',
      })

      setStatus('success')
      setMessage('Screenshot uploaded. Awaiting verification.')
      setFile(null)
      setOrderId('')
    } catch (err) {
      console.error(err)
      setStatus('error')
      setMessage('Upload failed. Check Order ID and server.')
    }
  }

  const fmtSize = (bytes: number) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)} MB`

  return (
    <div className={compact ? '' : ''}>
      {!compact && (
        <>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Upload Payment Receipt
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            JPG or PNG, max 5MB
          </p>
        </>
      )}

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
          isDragActive
            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 bg-gray-50 dark:bg-gray-800/50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload size={24} className="mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {isDragActive
            ? 'Drop your screenshot here'
            : compact
              ? 'Tap to upload receipt'
              : 'Drag & drop your payment screenshot, or click to browse'}
        </p>
      </div>

      {file && (
        <div className="flex items-center gap-3 mt-3 p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="w-11 h-11 rounded-lg object-cover bg-gray-200 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {file.name}
            </p>
            <p className="text-xs text-gray-400">{fmtSize(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => { setFile(null); setMessage('') }}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {!compact && (
        <input
          placeholder="Order ID (from placed order)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full mt-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      )}

      <button
        type="button"
        onClick={handleUpload}
        disabled={status === 'uploading'}
        className="w-full mt-3 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 transition"
      >
        {status === 'uploading' ? 'Uploading...' : 'Submit for Verification'}
      </button>

      {message && (
        <div
          className={`mt-3 px-4 py-2.5 rounded-xl text-xs font-medium ${
            status === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
              : status === 'error'
                ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300'
                : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  )
}
