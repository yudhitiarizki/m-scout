import { useState } from 'react';
import { ArrowLeft, Phone, DollarSign } from 'lucide-react';
import { Customer, User } from '../App';
import { BiodataTab } from './tabs/BiodataTab';
import { DocumentsTab } from './tabs/DocumentsTab';
import { VisitTab } from './tabs/VisitTab';
import { FinancialTab } from './tabs/FinancialTab';
import { LoanDetailTab } from './tabs/LoanDetailTab';
import { PromoTab } from './tabs/PromoTab';
import { ApplyLoanModal } from './modals/ApplyLoanModal';

type CustomerDetailProps = {
  customer: Customer;
  currentUser: User;
  onBack: () => void;
};

export function CustomerDetail({ customer, currentUser, onBack }: CustomerDetailProps) {
  const [activeTab, setActiveTab] = useState<'biodata' | 'documents' | 'visit' | 'financial' | 'loan' | 'promo'>('biodata');
  const [showApplyLoanModal, setShowApplyLoanModal] = useState(false);

  const handleWhatsAppNotification = () => {
    if (!customer.activeLoan) {
      alert('Nasabah tidak memiliki kredit aktif');
      return;
    }

    const message = encodeURIComponent(
      `Halo ${customer.name},\n\n` +
      `Kami ingin mengingatkan bahwa pembayaran kredit Anda sebesar Rp ${customer.activeLoan.monthlyPayment.toLocaleString('id-ID')} ` +
      `akan jatuh tempo pada ${new Date(customer.activeLoan.nextPaymentDate).toLocaleDateString('id-ID')}.\n\n` +
      `Mohon segera lakukan pembayaran agar terhindar dari denda keterlambatan.\n\n` +
      `Terima kasih.`
    );

    const phone = customer.phone.replace(/[^0-9]/g, '');
    const whatsappPhone = phone.startsWith('0') ? '62' + phone.substring(1) : phone;
    
    window.open(`https://wa.me/${whatsappPhone}?text=${message}`, '_blank');
  };

  const handleApplyLoan = (loanData: any) => {
    console.log('Applying loan:', loanData);
    alert(`Pengajuan kredit ${loanData.type} sebesar Rp ${loanData.amount.toLocaleString('id-ID')} berhasil!`);
    setShowApplyLoanModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
                <p className="text-sm text-gray-500 mt-1">{customer.email} • {customer.phone}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {!customer.activeLoan && (
                <button
                  onClick={() => setShowApplyLoanModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <DollarSign className="w-4 h-4" />
                  Ajukan Kredit
                </button>
              )}
              {customer.activeLoan && (
                <button
                  onClick={handleWhatsAppNotification}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Kirim Notifikasi WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('biodata')}
              className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'biodata'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Biodata
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'documents'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dokumen
            </button>
            <button
              onClick={() => setActiveTab('visit')}
              className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'visit'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dokumentasi Kunjungan
            </button>
            <button
              onClick={() => setActiveTab('financial')}
              className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'financial'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Financial
            </button>
            {customer.activeLoan && (
              <button
                onClick={() => setActiveTab('loan')}
                className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'loan'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Detail Kredit
              </button>
            )}
            {customer.activeLoan && (
              <button
                onClick={() => setActiveTab('promo')}
                className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'promo'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Promo Nasabah
              </button>
            )}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6 pb-12">
          {activeTab === 'biodata' && <BiodataTab customer={customer} />}
          {activeTab === 'documents' && <DocumentsTab customer={customer} />}
          {activeTab === 'visit' && <VisitTab customer={customer} currentUser={currentUser} />}
          {activeTab === 'financial' && <FinancialTab customer={customer} />}
          {activeTab === 'loan' && customer.activeLoan && <LoanDetailTab customer={customer} />}
          {activeTab === 'promo' && customer.activeLoan && <PromoTab customer={customer} />}
        </div>
      </div>

      {/* Apply Loan Modal */}
      {showApplyLoanModal && (
        <ApplyLoanModal
          customerName={customer.name}
          onClose={() => setShowApplyLoanModal(false)}
          onSubmit={handleApplyLoan}
        />
      )}
    </div>
  );
}
