import { Banknote, Building2 } from 'lucide-react'

interface Props {
  value: 'cod' | 'bank'
  onChange: (v: 'cod' | 'bank') => void
}

export default function PaymentSplitter({ value, onChange }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
        Payment Method
      </h3>

      <label
        className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${
          value === 'cod'
            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
        }`}
      >
        <input
          type="radio"
          name="payment"
          value="cod"
          checked={value === 'cod'}
          onChange={() => onChange('cod')}
          className="mt-1 accent-purple-600"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100">
            <Banknote size={18} className="text-green-600" />
            Cash on Delivery (COD)
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Pay when your order arrives. A flat <strong>Rs. 200</strong> COD fee
            will be added to your total.
          </p>
        </div>
      </label>

      <label
        className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${
          value === 'bank'
            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
        }`}
      >
        <input
          type="radio"
          name="payment"
          value="bank"
          checked={value === 'bank'}
          onChange={() => onChange('bank')}
          className="mt-1 accent-purple-600"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100">
            <Building2 size={18} className="text-blue-600" />
            Bank Transfer
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Transfer the amount to our bank account and upload the receipt.
            No COD fee applies.
          </p>
        </div>
      </label>

      {value === 'bank' && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700 space-y-2 text-sm">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Bank Account Details
          </h4>
          <div className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-2 text-gray-700 dark:text-gray-300">
            <span className="text-gray-500">Account Title:</span>
            <span className="font-medium">ShopFlow Private Limited</span>
            <span className="text-gray-500">Bank:</span>
            <span className="font-medium">Habib Bank Limited (HBL)</span>
            <span className="text-gray-500">IBAN:</span>
            <span className="font-medium text-purple-700 dark:text-purple-300 select-all">
              PK36 HABB 0024 1234 5678 9001
            </span>
            <span className="text-gray-500">Account #:</span>
            <span className="font-medium">0024 1234 5678 90</span>
            <span className="text-gray-500">Branch:</span>
            <span className="font-medium">Gulberg III, Lahore</span>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            After transferring, upload your payment receipt screenshot below.
          </p>
        </div>
      )}
    </div>
  )
}
