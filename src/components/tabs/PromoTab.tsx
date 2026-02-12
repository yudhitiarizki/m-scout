import { useState } from 'react';
import { Gift, Settings, Bell, TrendingUp, Power } from 'lucide-react';
import { Customer, PromoSetting, User } from '../../App';

type PromoTabProps = {
  customer: Customer;
  currentUser: User;
};

export function PromoTab({ customer, currentUser }: PromoTabProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [promoSettings, setPromoSettings] = useState<PromoSetting>({
    threshold1: 10,
    cashback1: 50000,
    threshold2: 20,
    cashback2: 100000,
    threshold3: 30,
    cashback3: 150000,
    type: 'count' // 'count' = jumlah transaksi, 'value' = nilai transaksi dalam rupiah
  });

  const [isPromoActive, setIsPromoActive] = useState(customer.promoActive ?? true);

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const currentDay = today.getDate();

  const totalTransactionCount = customer.livinTransactions.length + customer.livinMerchantTransactions.length;
  const totalTransactionValue = 
    customer.livinTransactions.reduce((sum, t) => sum + t.amount, 0) + 
    customer.livinMerchantTransactions.reduce((sum, t) => sum + t.amount, 0);
  
  const currentMetric = promoSettings.type === 'count' ? totalTransactionCount : totalTransactionValue;
  
  const getCurrentCashback = () => {
    if (!isPromoActive) return 0;
    if (currentMetric >= promoSettings.threshold3) return promoSettings.cashback3;
    if (currentMetric >= promoSettings.threshold2) return promoSettings.cashback2;
    if (currentMetric >= promoSettings.threshold1) return promoSettings.cashback1;
    return 0;
  };

  const getNextTier = () => {
    if (!isPromoActive) return null;
    if (currentMetric < promoSettings.threshold1) {
      return { target: promoSettings.threshold1, cashback: promoSettings.cashback1 };
    }
    if (currentMetric < promoSettings.threshold2) {
      return { target: promoSettings.threshold2, cashback: promoSettings.cashback2 };
    }
    if (currentMetric < promoSettings.threshold3) {
      return { target: promoSettings.threshold3, cashback: promoSettings.cashback3 };
    }
    return null;
  };

  const currentCashback = getCurrentCashback();
  const nextTier = getNextTier();
  const progress = nextTier ? (currentMetric / nextTier.target) * 100 : 100;

  const sendPromoNotification = () => {
    let message = `Halo ${customer.name}! 🎉\n\n`;
    
    if (!isPromoActive) {
      message += `Maaf, program cashback sedang tidak aktif untuk akun Anda.\n\n`;
    } else if (currentCashback > 0) {
      message += `Selamat! Anda mendapatkan cashback sebesar Rp ${currentCashback.toLocaleString('id-ID')} untuk bulan ini!\n\n`;
      
      if (promoSettings.type === 'count') {
        message += `Anda telah melakukan ${totalTransactionCount} transaksi menggunakan Livin dan Livin Merchant bulan ini.\n\n`;
      } else {
        message += `Total nilai transaksi Anda mencapai Rp ${totalTransactionValue.toLocaleString('id-ID')} bulan ini.\n\n`;
      }
    }
    
    if (nextTier && isPromoActive) {
      const remaining = nextTier.target - currentMetric;
      if (promoSettings.type === 'count') {
        message += `Lakukan ${remaining} transaksi lagi untuk mendapatkan cashback Rp ${nextTier.cashback.toLocaleString('id-ID')}!\n\n`;
      } else {
        message += `Transaksi senilai Rp ${remaining.toLocaleString('id-ID')} lagi untuk mendapatkan cashback Rp ${nextTier.cashback.toLocaleString('id-ID')}!\n\n`;
      }
    }
    
    message += `Terima kasih atas kepercayaan Anda. 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const phone = customer.phone.replace(/[^0-9]/g, '');
    const whatsappPhone = phone.startsWith('0') ? '62' + phone.substring(1) : phone;
    
    window.open(`https://wa.me/${whatsappPhone}?text=${encodedMessage}`, '_blank');
  };

  const handleTogglePromo = () => {
    if (currentUser.role !== 'manager') {
      alert('Hanya manager yang dapat mengaktifkan/menonaktifkan promo');
      return;
    }
    setIsPromoActive(!isPromoActive);
    alert(`Promo berhasil ${!isPromoActive ? 'diaktifkan' : 'dinonaktifkan'}`);
  };

  return (
    <div className="space-y-6">
      {/* Header with Settings and Toggle */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Program Cashback Nasabah</h2>
          <div className="flex gap-2">
            {currentUser.role === 'manager' && (
              <>
                <button
                  onClick={handleTogglePromo}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                    isPromoActive 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  <Power className="w-4 h-4" />
                  {isPromoActive ? 'Aktif' : 'Nonaktif'}
                </button>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Pengaturan Promo
                </button>
              </>
            )}
          </div>
        </div>

        {currentUser.role === 'manager' && showSettings && (
          <div className="border-t pt-4 mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Atur Threshold dan Cashback</h3>
            
            {/* Type Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipe Promo
              </label>
              <select
                value={promoSettings.type}
                onChange={(e) => setPromoSettings({...promoSettings, type: e.target.value as 'count' | 'value'})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="count">Berdasarkan Jumlah Transaksi</option>
                <option value="value">Berdasarkan Nilai Transaksi</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Tier 1</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={promoSettings.threshold1}
                    onChange={(e) => setPromoSettings({...promoSettings, threshold1: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder={promoSettings.type === 'count' ? 'Jumlah transaksi' : 'Nilai (Rp)'}
                  />
                  <input
                    type="number"
                    value={promoSettings.cashback1}
                    onChange={(e) => setPromoSettings({...promoSettings, cashback1: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Cashback (Rp)"
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
                    placeholder={promoSettings.type === 'count' ? 'Jumlah transaksi' : 'Nilai (Rp)'}
                  />
                  <input
                    type="number"
                    value={promoSettings.cashback2}
                    onChange={(e) => setPromoSettings({...promoSettings, cashback2: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Cashback (Rp)"
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
                    placeholder={promoSettings.type === 'count' ? 'Jumlah transaksi' : 'Nilai (Rp)'}
                  />
                  <input
                    type="number"
                    value={promoSettings.cashback3}
                    onChange={(e) => setPromoSettings({...promoSettings, cashback3: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Cashback (Rp)"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Current Status */}
      {!isPromoActive ? (
        <div className="bg-gray-100 rounded-lg shadow p-8 text-center">
          <Power className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Program Cashback Tidak Aktif</h3>
          <p className="text-sm text-gray-500">
            {currentUser.role === 'manager' 
              ? 'Aktifkan program cashback untuk nasabah ini dari pengaturan di atas.'
              : 'Program cashback saat ini sedang tidak aktif untuk akun Anda.'}
          </p>
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-semibold">Cashback Bulan Ini</h3>
                <p className="text-sm opacity-90">Berdasarkan transaksi Livin & Livin Merchant</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-3xl font-bold">Rp {currentCashback.toLocaleString('id-ID')}</p>
              <p className="text-sm opacity-90 mt-1">Cashback yang akan diterima</p>
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
              <h3 className="text-lg font-semibold text-gray-900">Progress Pencapaian Cashback</h3>
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
                  <span className="text-sm text-gray-600">
                    {promoSettings.type === 'count' 
                      ? 'Total Transaksi Bulan Ini' 
                      : 'Total Nilai Transaksi Bulan Ini'}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {promoSettings.type === 'count' 
                      ? `${currentMetric} ${nextTier ? `/ ${nextTier.target}` : ''} transaksi`
                      : `Rp ${currentMetric.toLocaleString('id-ID')} ${nextTier ? `/ Rp ${nextTier.target.toLocaleString('id-ID')}` : ''}`}
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
                    {promoSettings.type === 'count'
                      ? `${nextTier.target - currentMetric} transaksi lagi untuk mendapatkan cashback Rp ${nextTier.cashback.toLocaleString('id-ID')}`
                      : `Rp ${(nextTier.target - currentMetric).toLocaleString('id-ID')} lagi untuk mendapatkan cashback Rp ${nextTier.cashback.toLocaleString('id-ID')}`}
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
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Detail Tier Cashback</h4>
                <div className="space-y-3">
                  <div className={`flex items-center justify-between p-3 rounded-lg ${currentMetric >= promoSettings.threshold1 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentMetric >= promoSettings.threshold1 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                        {currentMetric >= promoSettings.threshold1 ? '✓' : '1'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Tier 1</p>
                        <p className="text-xs text-gray-600">
                          {promoSettings.type === 'count' 
                            ? `${promoSettings.threshold1} transaksi` 
                            : `Rp ${promoSettings.threshold1.toLocaleString('id-ID')}`}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      Rp {promoSettings.cashback1.toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div className={`flex items-center justify-between p-3 rounded-lg ${currentMetric >= promoSettings.threshold2 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentMetric >= promoSettings.threshold2 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                        {currentMetric >= promoSettings.threshold2 ? '✓' : '2'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Tier 2</p>
                        <p className="text-xs text-gray-600">
                          {promoSettings.type === 'count' 
                            ? `${promoSettings.threshold2} transaksi` 
                            : `Rp ${promoSettings.threshold2.toLocaleString('id-ID')}`}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      Rp {promoSettings.cashback2.toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div className={`flex items-center justify-between p-3 rounded-lg ${currentMetric >= promoSettings.threshold3 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentMetric >= promoSettings.threshold3 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                        {currentMetric >= promoSettings.threshold3 ? '✓' : '3'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Tier 3</p>
                        <p className="text-xs text-gray-600">
                          {promoSettings.type === 'count' 
                            ? `${promoSettings.threshold3} transaksi` 
                            : `Rp ${promoSettings.threshold3.toLocaleString('id-ID')}`}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      Rp {promoSettings.cashback3.toLocaleString('id-ID')}
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
        </>
      )}
    </div>
  );
}
