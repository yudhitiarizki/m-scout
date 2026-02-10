import { useState } from 'react';
import { Gift, Settings, Bell, TrendingUp, Calendar } from 'lucide-react';
import { Customer, PromoSetting } from '../../App';

type PromoTabProps = {
  customer: Customer;
};

export function PromoTab({ customer }: PromoTabProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [promoSettings, setPromoSettings] = useState<PromoSetting>({
    threshold1: 10,
    discount1: 50000,
    threshold2: 20,
    discount2: 100000,
    threshold3: 30,
    discount3: 150000
  });

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const currentDay = today.getDate();

  const totalTransactions = customer.livinTransactions.length + customer.livinMerchantTransactions.length;
  
  const getCurrentDiscount = () => {
    if (totalTransactions >= promoSettings.threshold3) return promoSettings.discount3;
    if (totalTransactions >= promoSettings.threshold2) return promoSettings.discount2;
    if (totalTransactions >= promoSettings.threshold1) return promoSettings.discount1;
    return 0;
  };

  const getNextTier = () => {
    if (totalTransactions < promoSettings.threshold1) {
      return { target: promoSettings.threshold1, discount: promoSettings.discount1 };
    }
    if (totalTransactions < promoSettings.threshold2) {
      return { target: promoSettings.threshold2, discount: promoSettings.discount2 };
    }
    if (totalTransactions < promoSettings.threshold3) {
      return { target: promoSettings.threshold3, discount: promoSettings.discount3 };
    }
    return null;
  };

  const currentDiscount = getCurrentDiscount();
  const nextTier = getNextTier();
  const progress = nextTier ? (totalTransactions / nextTier.target) * 100 : 100;

  const sendPromoNotification = () => {
    let message = `Halo ${customer.name}! 🎉\n\n`;
    
    if (currentDiscount > 0) {
      message += `Selamat! Anda mendapatkan potongan pembayaran sebesar Rp ${currentDiscount.toLocaleString('id-ID')} untuk tagihan bulan depan!\n\n`;
      message += `Anda telah melakukan ${totalTransactions} transaksi menggunakan Livin dan Livin Merchant bulan ini.\n\n`;
    }
    
    if (nextTier) {
      message += `Lakukan ${nextTier.target - totalTransactions} transaksi lagi untuk mendapatkan potongan Rp ${nextTier.discount.toLocaleString('id-ID')}!\n\n`;
    }
    
    message += `Terima kasih atas kepercayaan Anda. 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const phone = customer.phone.replace(/[^0-9]/g, '');
    const whatsappPhone = phone.startsWith('0') ? '62' + phone.substring(1) : phone;
    
    window.open(`https://wa.me/${whatsappPhone}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header with Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Program Promo Khusus</h2>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Pengaturan Promo
          </button>
        </div>

        {showSettings && (
          <div className="border-t pt-4 mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Atur Threshold dan Potongan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Tier 1</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={promoSettings.threshold1}
                    onChange={(e) => setPromoSettings({...promoSettings, threshold1: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Transaksi"
                  />
                  <input
                    type="number"
                    value={promoSettings.discount1}
                    onChange={(e) => setPromoSettings({...promoSettings, discount1: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Potongan (Rp)"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Tier 2</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={promoSettings.threshold2}
                    onChange={(e) => setPromoSettings({...promoSettings, threshold2: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Transaksi"
                  />
                  <input
                    type="number"
                    value={promoSettings.discount2}
                    onChange={(e) => setPromoSettings({...promoSettings, discount2: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Potongan (Rp)"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Tier 3</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={promoSettings.threshold3}
                    onChange={(e) => setPromoSettings({...promoSettings, threshold3: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Transaksi"
                  />
                  <input
                    type="number"
                    value={promoSettings.discount3}
                    onChange={(e) => setPromoSettings({...promoSettings, discount3: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Potongan (Rp)"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Current Status */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Gift className="w-8 h-8" />
          <div>
            <h3 className="text-lg font-semibold">Potongan Bulan Ini</h3>
            <p className="text-sm opacity-90">Berdasarkan transaksi Livin & Livin Merchant</p>
          </div>
        </div>
        <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-3xl font-bold">Rp {currentDiscount.toLocaleString('id-ID')}</p>
          <p className="text-sm opacity-90 mt-1">Potongan untuk tagihan bulan depan</p>
        </div>
        <button
          onClick={sendPromoNotification}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
        >
          <Bell className="w-5 h-5" />
          Kirim Notifikasi Promo ke WhatsApp
        </button>
      </div>

      {/* Progress Tracking */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Progress Pencapaian Promo</h3>
        </div>

        <div className="space-y-6">
          {/* Daily Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progress Bulan Ini</span>
              <span className="text-sm font-semibold text-gray-900">
                Hari {currentDay} dari {daysInMonth}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all"
                style={{ width: `${(currentDay / daysInMonth) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {daysInMonth - currentDay} hari tersisa untuk mencapai target
            </p>
          </div>

          {/* Transaction Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Total Transaksi Bulan Ini</span>
              <span className="text-sm font-semibold text-gray-900">
                {totalTransactions} {nextTier ? `/ ${nextTier.target}` : ''} transaksi
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-600 h-3 rounded-full transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            {nextTier && (
              <p className="text-xs text-gray-500 mt-1">
                {nextTier.target - totalTransactions} transaksi lagi untuk mendapatkan potongan Rp {nextTier.discount.toLocaleString('id-ID')}
              </p>
            )}
            {!nextTier && (
              <p className="text-xs text-green-600 mt-1 font-semibold">
                🎉 Selamat! Anda telah mencapai tier maksimal!
              </p>
            )}
          </div>

          {/* Tier Breakdown */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Detail Tier Promo</h4>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-3 rounded-lg ${totalTransactions >= promoSettings.threshold1 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${totalTransactions >= promoSettings.threshold1 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                    {totalTransactions >= promoSettings.threshold1 ? '✓' : '1'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Tier 1</p>
                    <p className="text-xs text-gray-600">{promoSettings.threshold1} transaksi</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  Rp {promoSettings.discount1.toLocaleString('id-ID')}
                </p>
              </div>

              <div className={`flex items-center justify-between p-3 rounded-lg ${totalTransactions >= promoSettings.threshold2 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${totalTransactions >= promoSettings.threshold2 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                    {totalTransactions >= promoSettings.threshold2 ? '✓' : '2'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Tier 2</p>
                    <p className="text-xs text-gray-600">{promoSettings.threshold2} transaksi</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  Rp {promoSettings.discount2.toLocaleString('id-ID')}
                </p>
              </div>

              <div className={`flex items-center justify-between p-3 rounded-lg ${totalTransactions >= promoSettings.threshold3 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${totalTransactions >= promoSettings.threshold3 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                    {totalTransactions >= promoSettings.threshold3 ? '✓' : '3'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Tier 3</p>
                    <p className="text-xs text-gray-600">{promoSettings.threshold3} transaksi</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  Rp {promoSettings.discount3.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Breakdown */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rincian Transaksi Bulan Ini</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Transaksi Livin</p>
            <p className="text-2xl font-bold text-blue-600">{customer.livinTransactions.length}x</p>
            <p className="text-xs text-gray-500 mt-1">
              Total: Rp {customer.livinTransactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString('id-ID')}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Transaksi Livin Merchant</p>
            <p className="text-2xl font-bold text-purple-600">{customer.livinMerchantTransactions.length}x</p>
            <p className="text-xs text-gray-500 mt-1">
              Total: Rp {customer.livinMerchantTransactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
