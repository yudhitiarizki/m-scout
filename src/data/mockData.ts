import { Customer, User } from '../App';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Manager Cabang',
    email: 'manager@bank.com',
    role: 'manager'
  },
  {
    id: 'u2',
    name: 'Andi Wijaya',
    email: 'andi@bank.com',
    role: 'user'
  },
  {
    id: 'u3',
    name: 'Budi Raharjo',
    email: 'budi@bank.com',
    role: 'user'
  },
  {
    id: 'u4',
    name: 'Citra Dewi',
    email: 'citra@bank.com',
    role: 'user'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    phone: '+62 812-3456-7890',
    email: 'budi.santoso@email.com',
    nik: '3174012801850001',
    address: 'Jl. Merdeka No. 45, Jakarta Pusat, DKI Jakarta',
    occupation: 'Pengusaha',
    monthlyIncome: 25000000,
    hasLoan: true,
    savings: 150000000,
    assignedTo: 'u2',
    loanHistory: [
      {
        id: 'loan1',
        amount: 100000000,
        date: '2023-01-15',
        status: 'paid',
        type: 'KUR'
      },
      {
        id: 'loan2',
        amount: 200000000,
        date: '2024-06-20',
        status: 'active',
        type: 'KUM'
      }
    ],
    livinTransactions: [
      { date: '2025-02-08', amount: 500000, description: 'Transfer ke Supplier' },
      { date: '2025-02-07', amount: 250000, description: 'Pembayaran Listrik' },
      { date: '2025-02-06', amount: 1200000, description: 'Transfer Gaji Karyawan' },
      { date: '2025-02-05', amount: 350000, description: 'Top Up E-Wallet' },
      { date: '2025-02-04', amount: 800000, description: 'Pembayaran Internet' },
      { date: '2025-02-03', amount: 600000, description: 'Transfer ke Rekening Lain' },
      { date: '2025-02-02', amount: 450000, description: 'Pembayaran Kartu Kredit' },
      { date: '2025-02-01', amount: 900000, description: 'Transfer ke Vendor' },
      { date: '2025-01-31', amount: 300000, description: 'Pembayaran BPJS' },
      { date: '2025-01-30', amount: 1500000, description: 'Transfer Operasional' },
      { date: '2025-01-29', amount: 700000, description: 'Bayar Tagihan Air' },
      { date: '2025-01-28', amount: 550000, description: 'Transfer Bank Lain' }
    ],
    livinMerchantTransactions: [
      { date: '2025-02-09', amount: 450000, description: 'Alfamart - Belanja Bulanan' },
      { date: '2025-02-08', amount: 275000, description: 'Indomaret - Groceries' },
      { date: '2025-02-07', amount: 850000, description: 'Matahari Dept Store' },
      { date: '2025-02-06', amount: 320000, description: 'KFC - Makan Keluarga' },
      { date: '2025-02-05', amount: 180000, description: 'Starbucks' },
      { date: '2025-02-04', amount: 520000, description: 'Transmart' },
      { date: '2025-02-03', amount: 290000, description: 'Pizza Hut' },
      { date: '2025-02-02', amount: 650000, description: 'Hypermart' },
      { date: '2025-02-01', amount: 380000, description: 'Ace Hardware' },
      { date: '2025-01-31', amount: 420000, description: 'Guardian Pharmacy' },
      { date: '2025-01-30', amount: 750000, description: 'IKEA' },
      { date: '2025-01-29', amount: 310000, description: 'McDonalds' },
      { date: '2025-01-28', amount: 890000, description: 'Electronic City' },
      { date: '2025-01-27', amount: 260000, description: 'Bakmi GM' }
    ],
    documents: [
      {
        id: 'doc1',
        name: 'KTP',
        type: 'PDF',
        uploadDate: '2024-06-15',
        url: '#'
      },
      {
        id: 'doc2',
        name: 'NPWP',
        type: 'PDF',
        uploadDate: '2024-06-15',
        url: '#'
      },
      {
        id: 'doc3',
        name: 'Kartu Keluarga',
        type: 'PDF',
        uploadDate: '2024-06-15',
        url: '#'
      },
      {
        id: 'doc4',
        name: 'Slip Gaji',
        type: 'PDF',
        uploadDate: '2024-06-15',
        url: '#'
      },
      {
        id: 'doc5',
        name: 'Rekening Koran',
        type: 'PDF',
        uploadDate: '2024-06-15',
        url: '#'
      },
      {
        id: 'doc6',
        name: 'SIUP',
        type: 'PDF',
        uploadDate: '2024-06-15',
        url: '#'
      }
    ],
    visitDocumentation: [
      {
        id: 'visit1',
        date: '2024-12-10',
        purpose: 'Survey Lokasi Usaha',
        notes: 'Lokasi usaha strategis, berada di area komersial dengan traffic tinggi. Kondisi bangunan baik dan terawat. Usaha berjalan lancar dengan omset stabil.',
        visitedBy: 'Andi Wijaya',
        location: {
          address: 'Jl. Merdeka No. 45, Jakarta Pusat',
          coordinates: '-6.2088,106.8456'
        },
        photos: [
          'https://images.unsplash.com/photo-1612819052456-2feb4c6f81ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wJTIwc3RvcmVmcm9udHxlbnwxfHx8fDE3NzA2OTUwNDl8MA&ixlib=rb-4.1.0&q=80&w=400',
          'https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzcwNjQ3MzMxfDA&ixlib=rb-4.1.0&q=80&w=400'
        ]
      },
      {
        id: 'visit2',
        date: '2025-01-15',
        purpose: 'Verifikasi Data dan Interview',
        notes: 'Nasabah kooperatif dan memberikan data yang lengkap. Kondisi finansial stabil dengan cash flow yang sehat. Rekomendasi untuk approval.',
        visitedBy: 'Andi Wijaya',
        location: {
          address: 'Kantor Nasabah di Jl. Sudirman No. 123',
          coordinates: '-6.2088,106.8456'
        },
        photos: [
          'https://images.unsplash.com/photo-1758519289967-3f64f17fec1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHNlcnZpY2UlMjBtZWV0aW5nfGVufDF8fHx8MTc3MDY5NTA0OXww&ixlib=rb-4.1.0&q=80&w=400'
        ]
      }
    ],
    activeLoan: {
      id: 'active1',
      amount: 200000000,
      type: 'KUM',
      interestRate: 12,
      monthlyPayment: 17770000,
      startDate: '2024-06-20',
      dueDate: '2025-06-20',
      tenor: 12,
      paidPrincipal: 133100000,
      paidInterest: 9080000,
      remainingPrincipal: 66900000,
      nextPaymentDate: '2025-02-20',
      paymentHistory: [
        {
          date: '2024-07-20',
          principal: 16770000,
          interest: 1000000,
          total: 17770000,
          status: 'paid'
        },
        {
          date: '2024-08-20',
          principal: 16770000,
          interest: 1000000,
          total: 17770000,
          status: 'paid'
        },
        {
          date: '2024-09-20',
          principal: 16770000,
          interest: 1000000,
          total: 17770000,
          status: 'paid'
        },
        {
          date: '2024-10-20',
          principal: 16770000,
          interest: 1000000,
          total: 17770000,
          status: 'paid'
        },
        {
          date: '2024-11-20',
          principal: 16770000,
          interest: 1000000,
          total: 17770000,
          status: 'paid'
        },
        {
          date: '2024-12-20',
          principal: 16770000,
          interest: 1000000,
          total: 17770000,
          status: 'paid'
        },
        {
          date: '2025-01-20',
          principal: 16770000,
          interest: 1000000,
          total: 17770000,
          status: 'paid'
        },
        {
          date: '2025-02-20',
          principal: 16770000,
          interest: 1000000,
          total: 17770000,
          status: 'pending'
        }
      ]
    }
  },
  {
    id: '2',
    name: 'Siti Nurhaliza',
    phone: '+62 813-9876-5432',
    email: 'siti.nurhaliza@email.com',
    nik: '3275024505900002',
    address: 'Jl. Sudirman No. 123, Bandung, Jawa Barat',
    occupation: 'Dokter',
    monthlyIncome: 35000000,
    hasLoan: true,
    savings: 280000000,
    assignedTo: 'u2',
    loanHistory: [
      {
        id: 'loan3',
        amount: 150000000,
        date: '2024-03-10',
        status: 'active',
        type: 'KSM'
      }
    ],
    livinTransactions: [
      { date: '2025-02-09', amount: 2500000, description: 'Transfer Investasi' },
      { date: '2025-02-08', amount: 450000, description: 'Bayar Asuransi' },
      { date: '2025-02-06', amount: 800000, description: 'Transfer ke Orang Tua' },
      { date: '2025-02-04', amount: 1200000, description: 'Bayar Sekolah Anak' },
      { date: '2025-02-02', amount: 650000, description: 'Top Up Investasi' }
    ],
    livinMerchantTransactions: [
      { date: '2025-02-09', amount: 850000, description: 'Ranch Market' },
      { date: '2025-02-08', amount: 320000, description: 'Sushi Tei' },
      { date: '2025-02-07', amount: 1200000, description: 'Sogo Department Store' },
      { date: '2025-02-05', amount: 450000, description: 'The Body Shop' },
      { date: '2025-02-03', amount: 680000, description: 'Sephora' }
    ],
    documents: [
      {
        id: 'doc7',
        name: 'KTP',
        type: 'PDF',
        uploadDate: '2024-03-05',
        url: '#'
      },
      {
        id: 'doc8',
        name: 'STR Dokter',
        type: 'PDF',
        uploadDate: '2024-03-05',
        url: '#'
      },
      {
        id: 'doc9',
        name: 'Surat Keterangan Kerja',
        type: 'PDF',
        uploadDate: '2024-03-05',
        url: '#'
      }
    ],
    visitDocumentation: [
      {
        id: 'visit3',
        date: '2024-03-01',
        purpose: 'Survey Rumah',
        notes: 'Rumah dalam kondisi sangat baik, lokasi elite dengan akses mudah. Lingkungan aman dan nyaman.',
        visitedBy: 'Budi Raharjo',
        location: {
          address: 'Jl. Sudirman No. 123, Bandung',
          coordinates: '-6.9147,107.6098'
        },
        photos: [
          'https://images.unsplash.com/photo-1641373504396-3c2dcfa28854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGV4dGVyaW9yJTIwaW5kb25lc2lhfGVufDF8fHx8MTc3MDY5NTA0OXww&ixlib=rb-4.1.0&q=80&w=400'
        ]
      }
    ],
    activeLoan: {
      id: 'active2',
      amount: 150000000,
      type: 'KSM',
      interestRate: 10,
      monthlyPayment: 13187500,
      startDate: '2024-03-10',
      dueDate: '2025-03-10',
      tenor: 12,
      paidPrincipal: 120000000,
      paidInterest: 25062500,
      remainingPrincipal: 30000000,
      nextPaymentDate: '2025-03-10',
      paymentHistory: [
        {
          date: '2024-04-10',
          principal: 12187500,
          interest: 1000000,
          total: 13187500,
          status: 'paid'
        },
        {
          date: '2024-05-10',
          principal: 12187500,
          interest: 1000000,
          total: 13187500,
          status: 'paid'
        }
      ]
    }
  },
  {
    id: '3',
    name: 'Ahmad Hidayat',
    phone: '+62 815-2468-1357',
    email: 'ahmad.hidayat@email.com',
    nik: '3578031212880003',
    address: 'Jl. Basuki Rahmat No. 67, Surabaya, Jawa Timur',
    occupation: 'Wiraswasta',
    monthlyIncome: 18000000,
    hasLoan: false,
    savings: 85000000,
    assignedTo: 'u3',
    loanHistory: [
      {
        id: 'loan4',
        amount: 50000000,
        date: '2022-06-15',
        status: 'paid',
        type: 'KUR'
      }
    ],
    livinTransactions: [
      { date: '2025-02-08', amount: 350000, description: 'Bayar Listrik' },
      { date: '2025-02-05', amount: 500000, description: 'Transfer Modal Usaha' },
      { date: '2025-02-03', amount: 250000, description: 'Top Up OVO' }
    ],
    livinMerchantTransactions: [
      { date: '2025-02-09', amount: 280000, description: 'Carrefour' },
      { date: '2025-02-07', amount: 150000, description: 'Hokben' },
      { date: '2025-02-05', amount: 420000, description: 'Giant Supermarket' }
    ],
    documents: [
      {
        id: 'doc10',
        name: 'KTP',
        type: 'PDF',
        uploadDate: '2022-06-01',
        url: '#'
      }
    ],
    visitDocumentation: []
  },
  {
    id: '4',
    name: 'Dewi Lestari',
    phone: '+62 816-5432-9876',
    email: 'dewi.lestari@email.com',
    nik: '3371025006920004',
    address: 'Jl. Pemuda No. 89, Semarang, Jawa Tengah',
    occupation: 'PNS',
    monthlyIncome: 12000000,
    hasLoan: true,
    savings: 95000000,
    assignedTo: 'u3',
    loanHistory: [
      {
        id: 'loan5',
        amount: 75000000,
        date: '2024-09-01',
        status: 'active',
        type: 'Konsumtif'
      }
    ],
    livinTransactions: [
      { date: '2025-02-09', amount: 400000, description: 'Transfer Tabungan' },
      { date: '2025-02-07', amount: 300000, description: 'Bayar PDAM' },
      { date: '2025-02-04', amount: 550000, description: 'Bayar Arisan' }
    ],
    livinMerchantTransactions: [
      { date: '2025-02-08', amount: 250000, description: 'Alfamidi' },
      { date: '2025-02-06', amount: 380000, description: 'Solaria' },
      { date: '2025-02-03', amount: 190000, description: 'BreadTalk' }
    ],
    documents: [
      {
        id: 'doc11',
        name: 'KTP',
        type: 'PDF',
        uploadDate: '2024-08-25',
        url: '#'
      },
      {
        id: 'doc12',
        name: 'SK Pengangkatan PNS',
        type: 'PDF',
        uploadDate: '2024-08-25',
        url: '#'
      }
    ],
    visitDocumentation: [],
    activeLoan: {
      id: 'active3',
      amount: 75000000,
      type: 'Konsumtif',
      interestRate: 11,
      monthlyPayment: 6593750,
      startDate: '2024-09-01',
      dueDate: '2025-09-01',
      tenor: 12,
      paidPrincipal: 31250000,
      paidInterest: 1718750,
      remainingPrincipal: 43750000,
      nextPaymentDate: '2025-02-01',
      paymentHistory: [
        {
          date: '2024-10-01',
          principal: 6250000,
          interest: 343750,
          total: 6593750,
          status: 'paid'
        }
      ]
    }
  },
  {
    id: '5',
    name: 'Rizki Firmansyah',
    phone: '+62 817-7654-3210',
    email: 'rizki.firmansyah@email.com',
    nik: '3573041808950005',
    address: 'Jl. Veteran No. 234, Malang, Jawa Timur',
    occupation: 'Karyawan Swasta',
    monthlyIncome: 15000000,
    hasLoan: false,
    savings: 45000000,
    loanHistory: [],
    livinTransactions: [
      { date: '2025-02-08', amount: 200000, description: 'Transfer Saudara' }
    ],
    livinMerchantTransactions: [
      { date: '2025-02-09', amount: 150000, description: 'Circle K' }
    ],
    documents: [],
    visitDocumentation: []
  },
  {
    id: '6',
    name: 'Rina Wulandari',
    phone: '+62 818-1122-3344',
    email: 'rina.wulandari@email.com',
    nik: '3174025512880006',
    address: 'Jl. Gatot Subroto No. 56, Jakarta Selatan, DKI Jakarta',
    occupation: 'Manager',
    monthlyIncome: 28000000,
    hasLoan: true,
    savings: 175000000,
    assignedTo: 'u4',
    loanHistory: [
      {
        id: 'loan6',
        amount: 180000000,
        date: '2024-01-15',
        status: 'active',
        type: 'Multiguna'
      }
    ],
    livinTransactions: [
      { date: '2025-02-09', amount: 1500000, description: 'Transfer Investasi Saham' },
      { date: '2025-02-08', amount: 650000, description: 'Bayar Gym Membership' },
      { date: '2025-02-07', amount: 850000, description: 'Transfer ke Deposito' },
      { date: '2025-02-06', amount: 420000, description: 'Bayar Netflix Premium' },
      { date: '2025-02-05', amount: 950000, description: 'Top Up Reksadana' },
      { date: '2025-02-04', amount: 380000, description: 'Bayar Spotify Family' }
    ],
    livinMerchantTransactions: [
      { date: '2025-02-09', amount: 780000, description: 'H&M Fashion' },
      { date: '2025-02-08', amount: 520000, description: 'Zara' },
      { date: '2025-02-07', amount: 1100000, description: 'Sephora Beauty' },
      { date: '2025-02-06', amount: 650000, description: 'Uniqlo' },
      { date: '2025-02-05', amount: 890000, description: 'Miniso Lifestyle' },
      { date: '2025-02-04', amount: 430000, description: 'Starbucks Reserve' }
    ],
    documents: [
      {
        id: 'doc13',
        name: 'KTP',
        type: 'PDF',
        uploadDate: '2024-01-10',
        url: '#'
      },
      {
        id: 'doc14',
        name: 'NPWP',
        type: 'PDF',
        uploadDate: '2024-01-10',
        url: '#'
      },
      {
        id: 'doc15',
        name: 'Slip Gaji 3 Bulan',
        type: 'PDF',
        uploadDate: '2024-01-10',
        url: '#'
      }
    ],
    visitDocumentation: [
      {
        id: 'visit4',
        date: '2024-01-08',
        purpose: 'Survey Apartemen',
        notes: 'Unit apartemen dalam kondisi sangat baik, tower baru dengan fasilitas lengkap. Lokasi strategis dekat MRT.',
        visitedBy: 'Citra Dewi',
        location: {
          address: 'Apartemen Green Bay Tower C Lt. 25',
          coordinates: '-6.2088,106.8456'
        },
        photos: [
          'https://images.unsplash.com/photo-1641373504396-3c2dcfa28854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGV4dGVyaW9yJTIwaW5kb25lc2lhfGVufDF8fHx8MTc3MDY5NTA0OXww&ixlib=rb-4.1.0&q=80&w=400'
        ]
      }
    ],
    activeLoan: {
      id: 'active4',
      amount: 180000000,
      type: 'Multiguna',
      interestRate: 11.5,
      monthlyPayment: 15900000,
      startDate: '2024-01-15',
      dueDate: '2025-01-15',
      tenor: 12,
      paidPrincipal: 165000000,
      paidInterest: 9900000,
      remainingPrincipal: 15000000,
      nextPaymentDate: '2025-02-15',
      paymentHistory: [
        {
          date: '2024-02-15',
          principal: 15000000,
          interest: 900000,
          total: 15900000,
          status: 'paid'
        },
        {
          date: '2024-03-15',
          principal: 15000000,
          interest: 900000,
          total: 15900000,
          status: 'paid'
        },
        {
          date: '2024-04-15',
          principal: 15000000,
          interest: 900000,
          total: 15900000,
          status: 'paid'
        }
      ]
    }
  },
  // More customers to reach 25+
  {
    id: '7',
    name: 'Joko Susilo',
    phone: '+62 819-2233-4455',
    email: 'joko.susilo@email.com',
    nik: '3578051205880007',
    address: 'Jl. Raya Darmo No. 88, Surabaya, Jawa Timur',
    occupation: 'Pengusaha Resto',
    monthlyIncome: 32000000,
    hasLoan: true,
    savings: 120000000,
    assignedTo: 'u2',
    loanHistory: [
      {
        id: 'loan7',
        amount: 250000000,
        date: '2024-07-10',
        status: 'active',
        type: 'KUR'
      }
    ],
    livinTransactions: [
      { date: '2025-02-09', amount: 2000000, description: 'Belanja Bahan Baku' },
      { date: '2025-02-07', amount: 1500000, description: 'Gaji Karyawan' },
      { date: '2025-02-05', amount: 800000, description: 'Bayar Utilitas' }
    ],
    livinMerchantTransactions: [
      { date: '2025-02-08', amount: 1200000, description: 'Makro Wholesale' },
      { date: '2025-02-06', amount: 950000, description: 'Lotte Mart' }
    ],
    documents: [
      { id: 'doc16', name: 'KTP', type: 'PDF', uploadDate: '2024-07-05', url: '#' },
      { id: 'doc17', name: 'SIUP', type: 'PDF', uploadDate: '2024-07-05', url: '#' }
    ],
    visitDocumentation: [],
    activeLoan: {
      id: 'active7',
      amount: 250000000,
      type: 'KUR',
      interestRate: 9.5,
      monthlyPayment: 21875000,
      startDate: '2024-07-10',
      dueDate: '2025-07-10',
      tenor: 12,
      paidPrincipal: 140625000,
      paidInterest: 10937500,
      remainingPrincipal: 109375000,
      nextPaymentDate: '2025-02-10',
      paymentHistory: []
    }
  },
  {
    id: '8',
    name: 'Lina Kartika',
    phone: '+62 820-3344-5566',
    email: 'lina.kartika@email.com',
    nik: '3275036712920008',
    address: 'Jl. Dago No. 145, Bandung, Jawa Barat',
    occupation: 'Desainer',
    monthlyIncome: 22000000,
    hasLoan: false,
    savings: 98000000,
    assignedTo: 'u3',
    loanHistory: [],
    livinTransactions: [
      { date: '2025-02-08', amount: 1200000, description: 'Beli Material Design' }
    ],
    livinMerchantTransactions: [
      { date: '2025-02-09', amount: 650000, description: 'Art Store' }
    ],
    documents: [],
    visitDocumentation: []
  },
  {
    id: '9',
    name: 'Hendra Gunawan',
    phone: '+62 821-4455-6677',
    email: 'hendra.gunawan@email.com',
    nik: '3371037823850009',
    address: 'Jl. Pandanaran No. 56, Semarang, Jawa Tengah',
    occupation: 'Kontraktor',
    monthlyIncome: 45000000,
    hasLoan: true,
    savings: 200000000,
    assignedTo: 'u4',
    loanHistory: [
      {
        id: 'loan9',
        amount: 350000000,
        date: '2024-05-20',
        status: 'active',
        type: 'KUM'
      }
    ],
    livinTransactions: [
      { date: '2025-02-09', amount: 5000000, description: 'Bayar Supplier Material' },
      { date: '2025-02-07', amount: 3500000, description: 'Gaji Tukang' }
    ],
    livinMerchantTransactions: [
      { date: '2025-02-08', amount: 2500000, description: 'Depo Bangunan' }
    ],
    documents: [
      { id: 'doc18', name: 'KTP', type: 'PDF', uploadDate: '2024-05-15', url: '#' },
      { id: 'doc19', name: 'NPWP', type: 'PDF', uploadDate: '2024-05-15', url: '#' }
    ],
    visitDocumentation: [],
    activeLoan: {
      id: 'active9',
      amount: 350000000,
      type: 'KUM',
      interestRate: 10.5,
      monthlyPayment: 30625000,
      startDate: '2024-05-20',
      dueDate: '2025-05-20',
      tenor: 12,
      paidPrincipal: 245000000,
      paidInterest: 15312500,
      remainingPrincipal: 105000000,
      nextPaymentDate: '2025-02-20',
      paymentHistory: []
    }
  },
  {
    id: '10',
    name: 'Maya Puspita',
    phone: '+62 822-5566-7788',
    email: 'maya.puspita@email.com',
    nik: '3174048934920010',
    address: 'Jl. Thamrin No. 78, Jakarta Pusat, DKI Jakarta',
    occupation: 'Konsultan',
    monthlyIncome: 38000000,
    hasLoan: false,
    savings: 185000000,
    loanHistory: [
      {
        id: 'loan10',
        amount: 120000000,
        date: '2023-08-15',
        status: 'paid',
        type: 'Konsumtif'
      }
    ],
    livinTransactions: [
      { date: '2025-02-09', amount: 2500000, description: 'Konsultasi Fee' }
    ],
    livinMerchantTransactions: [
      { date: '2025-02-08', amount: 850000, description: 'Hotel Booking' }
    ],
    documents: [],
    visitDocumentation: []
  }
];
