import { useState } from 'react';
import { X, DollarSign } from 'lucide-react';
import { LoanType } from '../../App';

type ApplyLoanModalProps = {
  customerName: string;
  onClose: () => void;
  onSubmit: (loanData: {
    amount: number;
    type: LoanType;
    tenor: number;
    interestRate: number;
  }) => void;
};

export function ApplyLoanModal({ customerName, onClose, onSubmit }: ApplyLoanModalProps) {
  const [amount, setAmount] = useState('');
  const [loanType, setLoanType] = useState<LoanType>('KUR');
  const [tenor, setTenor] = useState('12');
  const [interestRate, setInterestRate] = useState('12');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      alert('Masukkan jumlah pinjaman yang valid');
      return;
    }

    onSubmit({
      amount: parseFloat(amount),
      type: loanType,
      tenor: parseInt(tenor),
      interestRate: parseFloat(interestRate)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">Ajukan Kredit</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nasabah
            </label>
            <input
              type="text"
              value={customerName}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Kredit
            </label>
            <select
              value={loanType}
              onChange={(e) => setLoanType(e.target.value as LoanType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="KUR">KUR (Kredit Usaha Rakyat)</option>
              <option value="KUM">KUM (Kredit Usaha Mikro)</option>
              <option value="KSM">KSM (Kredit Serbaguna Mandiri)</option>
              <option value="Konsumtif">Konsumtif</option>
              <option value="Multiguna">Multiguna</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jumlah Pinjaman (Rp)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="50000000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tenor (Bulan)
            </label>
            <select
              value={tenor}
              onChange={(e) => setTenor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="6">6 Bulan</option>
              <option value="12">12 Bulan</option>
              <option value="24">24 Bulan</option>
              <option value="36">36 Bulan</option>
              <option value="48">48 Bulan</option>
              <option value="60">60 Bulan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suku Bunga (% per tahun)
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="12"
              required
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Estimasi Cicilan:</span>
              {amount && tenor && interestRate ? (
                <span className="ml-2">
                  Rp {Math.round((parseFloat(amount) / parseInt(tenor)) * (1 + parseFloat(interestRate) / 100 / 12)).toLocaleString('id-ID')} / bulan
                </span>
              ) : (
                <span className="ml-2 text-gray-500">-</span>
              )}
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Ajukan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
