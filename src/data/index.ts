// Demo Data for Zahira Family
// All data below is placeholder/demo data for development

export interface FamilyMember {
  id: string;
  name: string;
  nickname?: string;
  photo: string;
  relationship: string;
  generation: number;
  branch: string;
  city: string;
  province?: string;
  country?: string;
  birthDate?: string;
  bio?: string;
  spouseId?: string;
  parentIds?: string[];
  childrenIds?: string[];
  siblingIds?: string[];
}

export interface Album {
  id: string;
  title: string;
  description: string;
  cover: string;
  category: string;
  photoCount: number;
  year: number;
  photos: Photo[];
}

export interface Photo {
  id: string;
  url: string;
  caption?: string;
  year?: number;
  location?: string;
  taggedMembers?: string[];
  albumId?: string;
}

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  cover: string;
  author: string;
  authorId: string;
  date: string;
  category: string;
  relatedMembers: string[];
  tags: string[];
}

export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  image?: string;
  category: string;
}

export interface FamilyEvent {
  id: string;
  name: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  category: string;
  rsvpCount?: number;
  cover?: string;
}

export interface FamilyMessage {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  content: string;
  image?: string;
  timestamp: string;
  reactions: { emoji: string; count: number }[];
  replies: { authorName: string; content: string; timestamp: string }[];
}

// =====================
// FAMILY MEMBERS
// =====================
export const familyMembers: FamilyMember[] = [
  {
    id: 'm1',
    name: 'H. Ahmad Zahir',
    nickname: 'Kakek Ahmad',
    photo: 'https://images.unsplash.com/photo-1559838534-68e9bf8d6bb5?w=400&h=400&fit=crop&crop=face',
    relationship: 'Kakek',
    generation: 1,
    branch: 'Zahir',
    city: 'Yogyakarta',
    province: 'DI Yogyakarta',
    country: 'Indonesia',
    birthDate: '1945-08-17',
    bio: 'Pendiri keluarga Zahira. Seorang guru dan pendidik yang mengabdikan hidupnya untuk pendidikan dan keluarga.',
    spouseId: 'm2',
  },
  {
    id: 'm2',
    name: 'Hj. Siti Aminah',
    nickname: 'Nenek Aminah',
    photo: 'https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?w=400&h=400&fit=crop&crop=face',
    relationship: 'Nenek',
    generation: 1,
    branch: 'Aminah',
    city: 'Yogyakarta',
    province: 'DI Yogyakarta',
    country: 'Indonesia',
    birthDate: '1948-03-22',
    bio: 'Ibu rumah tangga yang penuh kasih sayang. Sering dikenal sebagai pusat keluarga yang menghubungkan seluruh anggota.',
    spouseId: 'm1',
  },
  {
    id: 'm3',
    name: 'H. Rizal Fahmi',
    nickname: 'Pak Rizal',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    relationship: 'Anak',
    generation: 2,
    branch: 'Zahir',
    city: 'Jakarta',
    province: 'DKI Jakarta',
    country: 'Indonesia',
    birthDate: '1970-05-10',
    bio: 'Anak sulung. Pengusaha sukses di Jakarta yang tetap menjaga kekeluargaan.',
    spouseId: 'm4',
    parentIds: ['m1', 'm2'],
  },
  {
    id: 'm4',
    name: 'Hj. Dewi Lestari',
    nickname: 'Bu Dewi',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    relationship: 'Menantu',
    generation: 2,
    branch: 'Lestari',
    city: 'Jakarta',
    province: 'DKI Jakarta',
    country: 'Indonesia',
    birthDate: '1972-11-08',
    bio: 'Ibu dari dua anak perempuan cantik. Suka memasak dan mengumpulkan keluarga.',
    spouseId: 'm3',
  },
  {
    id: 'm5',
    name: 'H. Budi Santoso',
    nickname: 'Pak Budi',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    relationship: 'Anak',
    generation: 2,
    branch: 'Zahir',
    city: 'Bandung',
    province: 'Jawa Barat',
    country: 'Indonesia',
    birthDate: '1973-09-15',
    bio: 'Anak kedua. Arsitek terkenal di Bandung. Suka travelling bersama keluarga.',
    spouseId: 'm6',
    parentIds: ['m1', 'm2'],
  },
  {
    id: 'm6',
    name: 'Hj. Ratna Sari',
    nickname: 'Bu Ratna',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    relationship: 'Menantu',
    generation: 2,
    branch: 'Sari',
    city: 'Bandung',
    province: 'Jawa Barat',
    country: 'Indonesia',
    birthDate: '1975-02-20',
    bio: 'Dosen universitas yang juga aktif dalam kegiatan sosial.',
    spouseId: 'm5',
  },
  {
    id: 'm7',
    name: 'Aisyah Putri',
    nickname: 'Aisyah',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    relationship: 'Cucu',
    generation: 3,
    branch: 'Zahir',
    city: 'Jakarta',
    province: 'DKI Jakarta',
    country: 'Indonesia',
    birthDate: '1998-07-25',
    bio: 'Cucu sulung. Seorang dokter muda yang berdedikasi di rumah sakit Jakarta.',
    parentIds: ['m3', 'm4'],
  },
  {
    id: 'm8',
    name: 'Muhammad Farhan',
    nickname: 'Farhan',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    relationship: 'Cucu',
    generation: 3,
    branch: 'Zahir',
    city: 'Jakarta',
    province: 'DKI Jakarta',
    country: 'Indonesia',
    birthDate: '2000-12-03',
    bio: 'Cucu kedua. Software engineer yang bekerja di perusahaan teknologi.',
    parentIds: ['m3', 'm4'],
  },
  {
    id: 'm9',
    name: 'Zahra Kamila',
    nickname: 'Zahra',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    relationship: 'Cucu',
    generation: 3,
    branch: 'Zahir',
    city: 'Bandung',
    province: 'Jawa Barat',
    country: 'Indonesia',
    birthDate: '2001-04-18',
    bio: 'Cucu dari Pak Budi. Mahasiswa desain grafis yang kreatif.',
    parentIds: ['m5', 'm6'],
  },
  {
    id: 'm10',
    name: 'Ali Pratama',
    nickname: 'Ali',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    relationship: 'Cucu',
    generation: 3,
    branch: 'Zahir',
    city: 'Bandung',
    province: 'Jawa Barat',
    country: 'Indonesia',
    birthDate: '2003-08-12',
    bio: 'Cucu termuda. Siswa SMA yang berbakat di bidang musik.',
    parentIds: ['m5', 'm6'],
  },
];

// =====================
// ALBUMS
// =====================
export const albums: Album[] = [
  {
    id: 'a1',
    title: 'Lebaran Bersama 2024',
    description: 'Momen kebersamaan keluarga besar saat Lebaran.',
    cover: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7de?w=800&h=600&fit=crop',
    category: 'Lebaran',
    photoCount: 45,
    year: 2024,
    photos: [],
  },
  {
    id: 'a2',
    title: 'Liburan ke Bali',
    description: 'Perjalanan keluarga ke Pulau Dewata.',
    cover: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop',
    category: 'Liburan',
    photoCount: 78,
    year: 2023,
    photos: [],
  },
  {
    id: 'a3',
    title: 'Pernikahan Aisyah',
    description: 'Hari istimewa Aisyah.',
    cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
    category: 'Pernikahan',
    photoCount: 120,
    year: 2023,
    photos: [],
  },
  {
    id: 'a4',
    title: 'Masa Kecil Zahra',
    description: 'Kenangan masa kecil Zahra.',
    cover: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop',
    category: 'Masa Kecil',
    photoCount: 56,
    year: 2010,
    photos: [],
  },
  {
    id: 'a5',
    title: 'Keluarga Besar 2022',
    description: 'Kumpul keluarga besar tahun 2022.',
    cover: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop',
    category: 'Keluarga Besar',
    photoCount: 34,
    year: 2022,
    photos: [],
  },
  {
    id: 'a6',
    title: 'Foto Lama Keluarga',
    description: 'Arsip foto lama keluarga Zahira.',
    cover: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
    category: 'Foto Lama',
    photoCount: 25,
    year: 1990,
    photos: [],
  },
  {
    id: 'a7',
    title: 'Ulang Tahun Nenek',
    description: 'Perayaan ulang tahun Nenek Aminah yang ke-75.',
    cover: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop',
    category: 'Ulang Tahun',
    photoCount: 30,
    year: 2023,
    photos: [],
  },
  {
    id: 'a8',
    title: 'Wisuda Farhan',
    description: 'Momen wisuda Farhan di universitas.',
    cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    category: 'Acara Keluarga',
    photoCount: 20,
    year: 2022,
    photos: [],
  },
];

// =====================
// STORIES
// =====================
export const stories: Story[] = [
  {
    id: 's1',
    title: 'Kisah Cinta Kakek dan Nenek',
    excerpt: 'Perjalanan cinta yang dimulai dari kecil di desa...',
    content: `Kisah cinta Kakek Ahmad dan Nenek Aminah dimulai di sebuah desa kecil di Yogyakarta. Mereka bertemu saat masih muda, dalam sebuah acara pengajian. Kakek Ahmad yang saat itu masih menjadi guru muda, terpesona dengan kelembutan Nenek Aminah.

Perjalanan mereka tidak selalu mudah. Ada suka dan duka yang mereka lewati bersama. Tapi justru itulah yang membuat ikatan mereka semakin kuat. Mereka mengajarkan kami arti kesetiaan, kesabaran, dan cinta yang tak pernah padam.

Hari ini, kami seluruh cucu-cucu mereka mewarisi nilai-nilai luhur itu. Setiap kali kami berkumpul, kisah mereka selalu menjadi inspirasi bagi kami semua.`,
    cover: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=500&fit=crop',
    author: 'Aisyah Putri',
    authorId: 'm7',
    date: '2024-01-15',
    category: 'Kisah Kakek & Nenek',
    relatedMembers: ['m1', 'm2'],
    tags: ['cinta', 'keluarga', 'inspirasi'],
  },
  {
    id: 's2',
    title: 'Tradisi Keluarga Kami',
    excerpt: 'Setiap Lebaran, seluruh anggota keluarga berkumpul di rumah Kakek...',
    content: `Setiap tahun, saat Lebaran tiba, seluruh anggota keluarga Zahira berkumpul di rumah Kakek Ahmad dan Nenek Aminah di Yogyakarta. Ini adalah tradisi yang telah berlangsung selama puluhan tahun.

Bagi kami, ini bukan sekadar kumpul-kumpul. Ini adalah momen di mana generasi-generasi bertemu, berbagi cerita, dan mempererat ikatan. Anak-anak bermain bersama, orang tua masak-masak di dapur, dan kakek-nenek melihat dari sudut ruangan dengan senyum puas.

Kami percaya, tradisi ini adalah warisan berharga yang harus terus dijaga.`,
    cover: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7de?w=800&h=500&fit=crop',
    author: 'Muhammad Farhan',
    authorId: 'm8',
    date: '2024-02-20',
    category: 'Tradisi Keluarga',
    relatedMembers: ['m1', 'm2', 'm3', 'm5'],
    tags: ['lebaran', 'tradisi', 'keluarga'],
  },
  {
    id: 's3',
    title: 'Masa Kecil di Yogyakarta',
    excerpt: 'Kenangan masa kecil yang tak terlupakan di kota budaya...',
    content: `Yogyakarta. Kota yang penuh kenangan bagi keluarga kami. Masa kecil di sana adalah masa yang penuh kebahagiaan. Kakek dan Nenek tinggal di sebuah rumah tradisional jogja yang asri.

Setiap pagi, aku dibangunkan oleh kicauan burung dan suara adzan. Setiap sore, aku bermain di halaman rumah bersama saudara-saudara. Setiap malam, Kakek Ahmad bercerita tentang sejarah keluarga dan nenek-nenek moyang kami.

Masa-masa itu membentuk siapa kami hari ini.`,
    cover: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=500&fit=crop',
    author: 'Zahra Kamila',
    authorId: 'm9',
    date: '2024-03-10',
    category: 'Masa Kecil',
    relatedMembers: ['m1', 'm2'],
    tags: ['yogyakarta', 'masa kecil', 'kenangan'],
  },
  {
    id: 's4',
    title: 'Perjalanan Keluarga ke Bali',
    excerpt: 'Liburan keluarga pertama yang melibatkan tiga generasi...',
    content: `Tahun lalu, keluarga kami melakukan perjalanan ke Bali. Ini adalah momen spesial karena untuk pertama kalinya, tiga generasi keluarga Zahira pergi liburan bersama.

Kami menginap di sebuah villa yang indah di Ubud. Setiap hari penuh dengan kegiatan seru — dari men pantai, mengunjungi pura, sampai makan malam bersama di restoran tepi sawah.

Yang paling berharga adalah melihat Kakek dan Nenek tertawa bersama cucu-cucu mereka. Momen-momen seperti itulah yang kami simpan hati.`,
    cover: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=500&fit=crop',
    author: 'Ali Pratama',
    authorId: 'm10',
    date: '2024-04-05',
    category: 'Perjalanan Keluarga',
    relatedMembers: ['m1', 'm2', 'm3', 'm5', 'm7', 'm9'],
    tags: ['bali', 'liburan', 'keluarga'],
  },
  {
    id: 's5',
    title: 'Nasihat Orang Tua',
    excerpt: 'Pesan dan nasihat berharga dari orang tua untuk anak-anaknya...',
    content: `Ada satu nasihat dari Kakek Ahmad yang selalu kami ingat: "Harta yang paling berharga bukan emas atau tanah, tetapi keluarga yang rukun dan saling menyayangi."

Nenek Aminah pun pernah berkata, "Jangan pernah lupa daratan, apalagi lupa keluarga. Sejauh kalian pergi, inilah tempat kalian kembali."

Pesan-pesan sederhana ini menjadi kompas hidup bagi setiap anggota keluarga Zahira.`,
    cover: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=500&fit=crop',
    author: 'Aisyah Putri',
    authorId: 'm7',
    date: '2024-05-12',
    category: 'Nasihat Orang Tua',
    relatedMembers: ['m1', 'm2'],
    tags: ['nasihat', 'kebijaksanaan', 'keluarga'],
  },
  {
    id: 's6',
    title: 'Kenangan Pernikahan',
    excerpt: 'Momen-momen indah pernikahan yang menyatukan dua keluarga...',
    content: `Pernikahan anggota keluarga selalu menjadi momen penuh kebahagiaan. Dari pernikahan Kakek dan Nenek yang sederhana, hingga pernikahan Aisyah yang mewah.

Tapi satu hal yang selalu sama: air mata bahagia, tawa, dan doa dari seluruh keluarga. Setiap pernikahan bukan hanya menyatukan dua individu, tetapi juga dua keluarga besar.

Kami percaya, pernikahan dalam keluarga Zahira selalu diberkahi karena dibangun di atas cinta dan restu orang tua.`,
    cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=500&fit=crop',
    author: 'Muhammad Farhan',
    authorId: 'm8',
    date: '2024-06-18',
    category: 'Pernikahan',
    relatedMembers: ['m1', 'm2', 'm3', 'm7'],
    tags: ['pernikahan', 'cinta', 'keluarga'],
  },
];

// =====================
// TIMELINE EVENTS
// =====================
export const timelineEvents: TimelineEvent[] = [
  { id: 't1', year: 1945, title: 'Kelahiran Kakek Ahmad', description: 'Ahmad Zahir lahir di Yogyakarta, menjadi generasi pertama keluarga Zahira.', category: 'Kelahiran' },
  { id: 't2', year: 1948, title: 'Kelahiran Nenek Aminah', description: 'Siti Aminah lahir di sebuah desa dekat Yogyakarta.', category: 'Kelahiran' },
  { id: 't3', year: 1968, title: 'Pernikahan Pertama', description: 'Kakek Ahmad dan Nenek Aminah menikah dalam upacara sederhana.', category: 'Pernikahan' },
  { id: 't4', year: 1970, title: 'Lahirnya Pak Rizal', description: 'Anak sulung Rizal Fahmi lahir di Yogyakarta.', category: 'Kelahiran' },
  { id: 't5', year: 1973, title: 'Lahirnya Pak Budi', description: 'Anak kedua Budi Santoso lahir di Yogyakarta.', category: 'Kelahiran' },
  { id: 't6', year: 1995, title: 'Pindah ke Jakarta', description: 'Pak Rizal memulai usahanya di Jakarta.', category: 'Perpindahan' },
  { id: 't7', year: 1998, title: 'Lahirnya Aisyah', description: 'Cucu pertama Aisyah Putri lahir di Jakarta.', category: 'Kelahiran' },
  { id: 't8', year: 2000, title: 'Lahirnya Farhan', description: 'Muhammad Farhan lahir di Jakarta.', category: 'Kelahiran' },
  { id: 't9', year: 2001, title: 'Lahirnya Zahra', description: 'Zahra Kamila lahir di Bandung.', category: 'Kelahiran' },
  { id: 't10', year: 2003, title: 'Lahirnya Ali', description: 'Ali Pratama lahir, melengkapi generasi ketiga.', category: 'Kelahiran' },
  { id: 't11', year: 2020, title: 'Lebaran di Masa Pandemi', description: 'Pertama kalinya Lebaran tidak bisa berkumpul secara fisir, tapi tetap terhubung via video call.', category: 'Acara Keluarga' },
  { id: 't12', year: 2022, title: 'Reuni Keluarga', description: 'Pertemuan keluarga besar setelah pandemi, semua anggota hadir.', category: 'Reuni' },
  { id: 't13', year: 2023, title: 'Pernikahan Aisyah', description: 'Aisyah menikah dalam upacara yang meriah.', category: 'Pernikahan' },
  { id: 't14', year: 2024, title: 'HUT Nenek ke-76', description: 'Perayaan ulang tahun Nenek Aminah yang ke-76.', category: 'Ulang Tahun' },
];

// =====================
// FAMILY EVENTS
// =====================
export const familyEvents: FamilyEvent[] = [
  { id: 'e1', name: 'Lebaran Keluarga 2025', date: '2025-03-31', time: '09:00', location: 'Rumah Kakek, Yogyakarta', description: 'Silaturahmi dan kumpul keluarga besar.', category: 'Lebaran', rsvpCount: 25 },
  { id: 'e2', name: 'Gathering Keluarga', date: '2025-06-15', time: '10:00', location: 'Villa Lembang, Bandung', description: 'Liburan bersama keluarga.', category: 'Gathering', rsvpCount: 18 },
  { id: 'e3', name: 'Ulang Tahun Kakek Ahmad', date: '2025-08-17', time: '19:00', location: 'Rumah Kakek, Yogyakarta', description: 'Perayaan HUT Kakek yang ke-80.', category: 'Ulang Tahun', rsvpCount: 30 },
  { id: 'e4', name: 'Tahunan Keluarga', date: '2025-12-25', time: '11:00', location: 'Restoran, Jakarta', description: 'Makan malam tahunan.', category: 'Acara Keluarga', rsvpCount: 22 },
];

// =====================
// FAMILY MESSAGES
// =====================
export const familyMessages: FamilyMessage[] = [
  {
    id: 'msg1',
    authorId: 'm7',
    authorName: 'Aisyah Putri',
    authorPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    content: 'Selamat ulang tahun untuk Nenek Aminah! Semoga selalu diberikan kesehatan dan kebahagiaan. Kami semua sayang Nenek! ❤️',
    timestamp: '2024-03-22T10:30:00',
    reactions: [{ emoji: '❤️', count: 12 }, { emoji: '🎉', count: 8 }],
    replies: [
      { authorName: 'Muhammad Farhan', content: 'Selamat ya Nenek! 🎉', timestamp: '2024-03-22T11:00:00' },
      { authorName: 'Zahra Kamila', content: 'Nenek sayang! 💕', timestamp: '2024-03-22T11:30:00' },
    ],
  },
  {
    id: 'msg2',
    authorId: 'm8',
    authorName: 'Muhammad Farhan',
    authorPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    content: 'Baru saja menemukan foto ini di album lama. Kenangan masa kecil yang indah! Siapa yang masih ingat momen ini?',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop',
    timestamp: '2024-04-10T14:20:00',
    reactions: [{ emoji: '😍', count: 15 }, { emoji: '👍', count: 6 }],
    replies: [
      { authorName: 'Ali Pratama', content: 'Aku masih ingat! Itu saat liburan ke Bali kan?', timestamp: '2024-04-10T15:00:00' },
    ],
  },
  {
    id: 'msg3',
    authorId: 'm9',
    authorName: 'Zahra Kamila',
    authorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    content: 'Keluarga bukan hanya tempat kita berasal, tetapi tempat kita selalu kembali. Terima kasih untuk semua cinta dan dukungan kalian. 🤍',
    timestamp: '2024-05-01T09:15:00',
    reactions: [{ emoji: '❤️', count: 20 }, { emoji: '🤍', count: 14 }, { emoji: '😊', count: 9 }],
    replies: [],
  },
];

// =====================
// PHOTOS (for gallery)
// =====================
export const photos: Photo[] = [
  { id: 'p1', url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop', caption: 'Keluarga besar saat Lebaran', year: 2024, location: 'Yogyakarta', taggedMembers: ['m1', 'm2', 'm3', 'm5'] },
  { id: 'p2', url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=800&fit=crop', caption: 'Liburan ke Bali', year: 2023, location: 'Bali', taggedMembers: ['m1', 'm2', 'm3', 'm5', 'm7', 'm9'] },
  { id: 'p3', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop', caption: 'Pernikahan Aisyah', year: 2023, location: 'Jakarta', taggedMembers: ['m7'] },
  { id: 'p4', url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=600&fit=crop', caption: 'Masa kecil Zahra', year: 2010, location: 'Bandung', taggedMembers: ['m9'] },
  { id: 'p5', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop', caption: 'Foto lama keluarga', year: 1990, location: 'Yogyakarta', taggedMembers: ['m1', 'm2'] },
  { id: 'p6', url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop', caption: 'Ulang tahun Nenek', year: 2023, location: 'Yogyakarta', taggedMembers: ['m1', 'm2'] },
  { id: 'p7', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop', caption: 'Wisuda Farhan', year: 2022, location: 'Jakarta', taggedMembers: ['m8'] },
  { id: 'p8', url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop', caption: 'Kakek dan Nenek', year: 2022, location: 'Yogyakarta', taggedMembers: ['m1', 'm2'] },
  { id: 'p9', url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=800&fit=crop', caption: 'Rumah jogja', year: 2020, location: 'Yogyakarta', taggedMembers: ['m1', 'm2'] },
  { id: 'p10', url: 'https://images.unsplash.com/photo-1559838534-68e9bf8d6bb5?w=600&h=400&fit=crop', caption: 'Kakek Ahmad', year: 2023, location: 'Yogyakarta', taggedMembers: ['m1'] },
  { id: 'p11', url: 'https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?w=600&h=400&fit=crop', caption: 'Nenek Aminah', year: 2023, location: 'Yogyakarta', taggedMembers: ['m2'] },
  { id: 'p12', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop', caption: 'Pak Rizal', year: 2023, location: 'Jakarta', taggedMembers: ['m3'] },
];

// =====================
// STATISTICS
// =====================
export const stats = {
  totalMembers: 10,
  totalGenerations: 3,
  totalAlbums: 8,
  totalPhotos: 456,
  totalStories: 6,
  totalEvents: 4,
  upcomingBirthdays: 3,
};

// =====================
// FAMILY QUOTES
// =====================
export const familyQuotes = [
  { text: 'Keluarga adalah tempat di mana hidup dimulai dan cinta tidak pernah berakhir.', author: 'Unknown' },
  { text: 'Satu keluarga, banyak cerita, satu warisan indah.', author: 'Zahira Family' },
  { text: 'Harta yang paling berharga bukan emas, tetapi keluarga yang rukun.', author: 'Kakek Ahmad' },
  { text: 'Di mana pun kita pergi, keluarga adalah tempat kita kembali.', author: 'Nenek Aminah' },
];
