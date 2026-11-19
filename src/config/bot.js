import { logger } from '../utils/logger.js';

export const botConfig = {
  // =========================
  // KEHADIRAN / STATUS BOT (yang dilihat pengguna di bawah nama bot)
  // =========================
  // Opsi `status`:
  // - "online"    = titik hijau
  // - "idle"      = bulan kuning
  // - "dnd"       = merah jangan ganggu (do-not-disturb)
  // - "invisible" = terlihat offline
  presence: {
    // Status online saat ini yang ditampilkan di Discord.
    status: "online",

    // Baris aktivitas yang ditampilkan di bawah nama bot.
    // Pemetaan angka `type` dari Discord:
    // 0 = Playing (Bermain)
    // 1 = Streaming
    // 2 = Listening (Mendengarkan)
    // 3 = Watching (Menonton)
    // 4 = Custom (Kustom)
    // 5 = Competing (Bertanding)
    activities: [
      {
        name: "Custom Status", // wajib ada di Discord API, tidak tampil di klien
        state: "stalking",     // ini yang benar-benar dilihat orang lain
        type: 4,               // Kustom
      },
    ],
  },

  // =========================
  // PERILAKU COMMAND
  // =========================
  commands: {
    // ID pengguna pemilik bot (dipisahkan koma di env var OWNER_IDS).
    // Pemilik dapat mengakses command bot tingkat owner/admin.
    owners: process.env.OWNER_IDS?.split(",").map((id) => id.trim()).filter(Boolean) || [],

    // Waktu tunggu bawaan antar penggunaan command (dalam detik).
    defaultCooldown: 3,

    // Jika true, command lama dihapus sebelum didaftarkan ulang.
    deleteCommands: false,

    // ID server opsional untuk kompatibilitas tutorial; tidak dipakai untuk registrasi command.
    testGuildId: process.env.TEST_GUILD_ID,

    // Saat true (atau MAINTENANCE_MODE=true), hanya pemilik bot yang bisa menjalankan command.
    maintenanceMode: process.env.MAINTENANCE_MODE === "true",

    // Prefix command untuk command berbasis teks (misalnya "!" untuk "!ping").
    // Mendukung slash command maupun prefix command.
    prefix: process.env.PREFIX || "!",
  },

  // =========================
  // SISTEM PENDAFTARAN / APLIKASI
  // =========================
  applications: {
    // Pertanyaan bawaan yang muncul saat seseorang mengisi formulir pendaftaran.
    defaultQuestions: [
      { question: "Siapa nama kamu?", required: true },
      { question: "Berapa umur kamu?", required: true },
      { question: "Kenapa kamu ingin bergabung?", required: true },
    ],

    // Warna embed berdasarkan status pendaftaran.
    statusColors: {
      pending: "#FFA500",
      approved: "#00FF00",
      denied: "#FF0000",
    },

    // Durasi tunggu sebelum pengguna bisa mengirim pendaftaran lagi (dalam jam).
    applicationCooldown: 24,

    // Hapus otomatis pendaftaran yang ditolak setelah sekian hari.
    deleteDeniedAfter: 7,

    // Hapus otomatis pendaftaran yang disetujui setelah sekian hari.
    deleteApprovedAfter: 30,

    // Daftar ID role yang diizinkan mengelola pendaftaran.
    managerRoles: [], // Akan diisi dari environment atau database
  },

  // =========================
  // WARNA EMBED & BRANDING
  // =========================
  // PENTING: Ini adalah SATU-SATUNYA SUMBER UTAMA untuk semua warna bot
  embeds: {
    colors: {
      // Warna utama brand.
      primary: "#336699",
      secondary: "#2F3136",

      // Warna status standar untuk pesan sukses/error/peringatan/info.
      success: "#57F287",
      error: "#ED4245",
      warning: "#FEE75C",
      info: "#3498DB",

      // Warna utilitas netral.
      light: "#FFFFFF",
      dark: "#202225",
      gray: "#99AAB5",

      // Pintasan palet ala Discord.
      blurple: "#5865F2",
      green: "#57F287",
      yellow: "#FEE75C",
      fuchsia: "#EB459E",
      red: "#ED4245",
      black: "#000000",

      // Warna khusus per fitur.
      giveaway: {
        active: "#57F287",
        ended: "#ED4245",
      },
      ticket: {
        open: "#57F287",
        claimed: "#FAA61A",
        closed: "#ED4245",
        pending: "#99AAB5",
      },
      economy: "#F1C40F",
      birthday: "#E91E63",
      moderation: "#9B59B6",

      // Pemetaan warna prioritas tiket.
      priority: {
        none: "#95A5A6",
        low: "#3498db",
        medium: "#2ecc71",
        high: "#f1c40f",
        urgent: "#e74c3c",
      },
    },
    footer: {
      // Teks footer bawaan yang dipakai di embed bot.
      text: "Titan Bot",
      // URL ikon footer (null = tanpa ikon).
      icon: null,
    },
    // URL thumbnail bawaan untuk embed (null = tanpa thumbnail).
    thumbnail: null,
    author: {
      // Blok author embed opsional bawaan.
      name: null,
      icon: null,
      url: null,
    },
  },

  // =========================
  // PENGATURAN EKONOMI
  // =========================
  economy: {
    currency: {
      // Nama tampilan mata uang.
      name: "koin",
      // Nama tampilan bentuk jamak.
      namePlural: "koin",
      // Simbol mata uang yang ditampilkan pada saldo.
      symbol: "$",
    },

    // Saldo awal untuk pengguna baru.
    startingBalance: 0,

    // Kapasitas maksimal bank sebelum di-upgrade (jika fitur upgrade dipakai).
    baseBankCapacity: 100000,

    // Jumlah hadiah harian.
    dailyAmount: 100,

    // Rentang bayaran acak command work.
    workMin: 10,
    workMax: 100,

    // Rentang bayaran acak command beg.
    begMin: 5,
    begMax: 50,

    // Cooldown command (dalam milidetik).
    cooldowns: {
      daily: 24 * 60 * 60 * 1000,
      work: 60 * 60 * 1000,
      crime: 2 * 60 * 60 * 1000,
      rob: 4 * 60 * 60 * 1000,
    },

    // Peluang berhasil saat merampok/rob (0.4 = 40%).
    robSuccessRate: 0.4,

    // Waktu penjara setelah gagal rob (dalam milidetik).
    // 3600000 = 1 jam.
    robFailJailTime: 3600000,
  },

  // =========================
  // PENGATURAN TOKO (SHOP)
  // =========================
  // Tambahkan pengaturan bawaan toko di sini jika diperlukan.
  shop: {

  },

  // =========================
  // SISTEM TIKET
  // =========================
  tickets: {
    // ID kategori tempat tiket baru dibuat (null = tanpa kategori paksaan).
    defaultCategory: null,

    // Daftar ID role yang diizinkan mengelola/menangani tiket.
    supportRoles: [],

    // Opsi prioritas yang bisa ditetapkan pengguna/staf.
    priorities: {
      none: {
        emoji: "⚪",
        color: "#95A5A6",
        label: "Tidak Ada",
      },
      low: {
        emoji: "🟢",
        color: "#2ECC71",
        label: "Rendah",
      },
      medium: {
        emoji: "🟡",
        color: "#F1C40F",
        label: "Sedang",
      },
      high: {
        emoji: "🔴",
        color: "#E74C3C",
        label: "Tinggi",
      },
      urgent: {
        emoji: "🚨",
        color: "#E91E63",
        label: "Mendesak",
      },
    },

    // Prioritas bawaan untuk tiket baru.
    defaultPriority: "none",

    // ID kategori tempat tiket yang ditutup diarsipkan.
    archiveCategory: null,

    // ID channel tempat log tiket dikirim.
    logChannel: null,
  },

  // =========================
  // PENGATURAN GIVEAWAY
  // =========================
  giveaways: {
    // Durasi bawaan giveaway dalam milidetik.
    // 86400000 = 24 jam.
    defaultDuration: 86400000,

    // Rentang jumlah pemenang yang diperbolehkan.
    minimumWinners: 1,
    maximumWinners: 10,

    // Rentang durasi giveaway yang diperbolehkan dalam milidetik.
    // 300000 = 5 menit.
    minimumDuration: 300000,
    // 2592000000 = 30 hari.
    maximumDuration: 2592000000,

    // Daftar ID role yang diizinkan membuat giveaway.
    allowedRoles: [],

    // Daftar ID role yang melewati pembatasan giveaway.
    bypassRoles: [],
  },

  // =========================
  // PENGATURAN ULANG TAHUN
  // =========================
  birthday: {
    // ID role yang diberikan ke pengguna saat ulang tahun.
    defaultRole: null,

    // ID channel tempat pengumuman ulang tahun dikirim.
    announcementChannel: null,

    // Zona waktu yang dipakai untuk menghitung tanggal ulang tahun.
    timezone: "UTC",
  },

  // =========================
  // PENGATURAN VERIFIKASI
  // =========================
  verification: {
    // Pesan yang ditampilkan saat mengirim panel verifikasi.
    defaultMessage: "Klik tombol di bawah ini untuk memverifikasi dirimu dan mendapatkan akses ke server!",

    // Teks pada tombol verifikasi.
    defaultButtonText: "Verifikasi",

    // Perilaku verifikasi otomatis.
    autoVerify: {
      // Cara verifikasi otomatis menentukan siapa yang langsung disetujui:
      // - "none"        = semua orang langsung terverifikasi otomatis
      // - "account_age" = umur akun harus lebih lama dari jumlah hari yang diatur
      // - "server_size" = verifikasi otomatis semua orang hanya di server yang lebih kecil
      defaultCriteria: "none",

      // Jumlah hari yang dipakai saat `defaultCriteria` bernilai `account_age`.
      defaultAccountAgeDays: 7,

      // Batas jumlah member yang dipakai saat `defaultCriteria` bernilai `server_size`.
      // Contoh: 1000 berarti verifikasi otomatis jika server memiliki kurang dari 1000 member.
      serverSizeThreshold: 1000,

      // Batas aman yang diperbolehkan untuk syarat umur akun.
      // 1 = minimal hari, 365 = maksimal hari.
      minAccountAge: 1,
      maxAccountAge: 365,

      // Jika true, pengguna menerima DM setelah verifikasi.
      sendDMNotification: true,

      // Deskripsi yang mudah dibaca untuk tiap mode kriteria.
      criteria: {
        account_age: "Akun harus lebih lama dari jumlah hari yang ditentukan",
        server_size: "Semua pengguna jika server memiliki kurang dari 1000 member",
        none: "Semua pengguna langsung"
      }
    },

    // Jeda minimum antar percobaan verifikasi (dalam milidetik).
    // 5000 = 5 detik.
    verificationCooldown: 5000,

    // Maksimal percobaan gagal yang diperbolehkan dalam rentang waktu di bawah.
    maxVerificationAttempts: 3,

    // Rentang waktu untuk menghitung percobaan (dalam milidetik).
    // 60000 = 1 menit.
    attemptWindow: 60000,

    // Batas keamanan di memori (membantu mencegah pembengkakan memori tak terbatas).
    maxCooldownEntries: 10000,
    maxAttemptEntries: 10000,
    // Frekuensi pembersihan map cooldown/percobaan (dalam milidetik).
    // 300000 = 5 menit.
    cooldownCleanupInterval: 300000,
    // Ukuran maksimal payload metadata untuk entri audit (dalam byte).
    maxAuditMetadataBytes: 4096,
    // Jumlah maksimal entri audit yang disimpan di memori.
    maxInMemoryAuditEntries: 1000,
    // Jika true, catat setiap aksi verifikasi.
    logAllVerifications: true,
    // Jika true, pertahankan riwayat audit verifikasi.
    keepAuditTrail: true,
  },

  // =========================
  // PESAN SELAMAT DATANG / PERPISAHAN
  // =========================
  welcome: {
    // Template pesan selamat datang yang dikirim saat pengguna bergabung.
    // Placeholder: {user}, {server}, {memberCount}
    defaultWelcomeMessage:
      "Selamat datang {user} di {server}! Sekarang kita memiliki {memberCount} anggota!",
    // Template pesan perpisahan yang dikirim saat pengguna keluar.
    // Placeholder: {user}, {memberCount}
    defaultGoodbyeMessage:
      "{user} telah meninggalkan server. Sekarang kita memiliki {memberCount} anggota.",
    // ID channel untuk pesan selamat datang.
    defaultWelcomeChannel: null,
    // ID channel untuk pesan perpisahan.
    defaultGoodbyeChannel: null,
  },

  // =========================
  // CHANNEL COUNTER
  // =========================
  counters: {
    defaults: {
      // Template nama/deskripsi bawaan untuk entri counter.
      name: "Counter {name}",
      description: "Counter {name} server",
      // Tipe channel yang dipakai untuk counter (umumnya "voice").
      type: "voice",
      // Format nama channel. `{count}` diganti secara otomatis.
      channelName: "{name}-{count}",
    },
    permissions: {
      // Izin yang ditolak secara bawaan untuk channel counter.
      deny: ["VIEW_CHANNEL"],
      // Izin yang diizinkan secara bawaan untuk channel counter.
      allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK"],
    },
    messages: {
      // Pesan balasan bawaan untuk aksi counter.
      created: "✅ Counter **{name}** berhasil dibuat",
      deleted: "🗑️ Counter **{name}** berhasil dihapus",
      updated: "🔄 Counter **{name}** berhasil diperbarui",
    },
    types: {
      // Tipe counter bawaan dan cara menghitung jumlahnya.
      members: {
        name: "👥 Anggota",
        description: "Total anggota di server",
        getCount: (guild) => guild.memberCount.toString(),
      },
      bots: {
        name: "🤖 Bot",
        description: "Total akun bot di server",
        getCount: (guild) =>
          guild.members.cache.filter((m) => m.user.bot).size.toString(),
      },
      members_only: {
        name: "👤 Manusia",
        description: "Total anggota manusia (bukan bot)",
        getCount: (guild) =>
          guild.members.cache.filter((m) => !m.user.bot).size.toString(),
      },
    },
  },

  // =========================
  // PESAN UMUM BOT
  // =========================
  messages: {
    noPermission: "Kamu tidak memiliki izin untuk menggunakan command ini.",
    cooldownActive: "Harap tunggu {time} sebelum menggunakan command ini lagi.",
    errorOccurred: "Terjadi kesalahan saat menjalankan command ini.",
    missingPermissions:
      "Saya kekurangan izin yang diperlukan untuk melakukan tindakan ini.",
    commandDisabled: "Command ini telah dinonaktifkan.",
    maintenanceMode: "Bot sedang dalam mode perawatan (maintenance).",
  },

  // =========================
  // SAKELAR FITUR
  // =========================
  // Ubah fitur mana pun menjadi `false` untuk menonaktifkannya secara global.
  features: {
    // Sistem inti.
    economy: true,
    leveling: true,
    moderation: true,
    logging: true,
    welcome: true,

    // Sistem keterlibatan komunitas.
    tickets: true,
    giveaways: true,
    birthday: true,
    counter: true,

    // Sistem keamanan dan layanan mandiri.
    verification: true,
    reactionRoles: true,
    joinToCreate: true,

    // Modul utilitas / kenyamanan.
    voice: true,
    search: true,
    tools: true,
    utility: true,
    community: true,
    fun: true,
    music: true,
  },
};

export function validateConfig(config) {
  const errors = [];

  if (process.env.NODE_ENV !== 'production') {
    logger.debug('Pemeriksaan environment variables:');
    logger.debug('DISCORD_TOKEN ada:', !!process.env.DISCORD_TOKEN);
    logger.debug('TOKEN ada:', !!process.env.TOKEN);
    logger.debug('CLIENT_ID ada:', !!process.env.CLIENT_ID);
    logger.debug('GUILD_ID ada:', !!process.env.GUILD_ID);
    logger.debug('POSTGRES_HOST ada:', !!process.env.POSTGRES_HOST);
    logger.debug('NODE_ENV:', process.env.NODE_ENV);
  }

  if (!process.env.DISCORD_TOKEN && !process.env.TOKEN) {
    errors.push("Token bot wajib diisi (environment variable DISCORD_TOKEN atau TOKEN)");
  }

  if (!process.env.CLIENT_ID) {
    errors.push("Client ID wajib diisi (environment variable CLIENT_ID)");
  }

  if (process.env.NODE_ENV === 'production') {
    // URL koneksi penuh (DATABASE_URL / POSTGRES_URL) sudah memenuhi seluruh kebutuhan Postgres,
    // sesuai cara src/config/database/postgres.js menyusun konfigurasi pool.
    const hasConnectionUrl = Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL);

    if (!hasConnectionUrl) {
      if (!process.env.POSTGRES_HOST) {
        errors.push("Koneksi PostgreSQL wajib ada di production (atur DATABASE_URL/POSTGRES_URL, atau POSTGRES_HOST)");
      }
      if (!process.env.POSTGRES_USER) {
        errors.push("User PostgreSQL wajib ada di production (atur DATABASE_URL/POSTGRES_URL, atau POSTGRES_USER)");
      }
      if (!process.env.POSTGRES_PASSWORD) {
        errors.push("Password PostgreSQL wajib ada di production (atur DATABASE_URL/POSTGRES_URL, atau POSTGRES_PASSWORD)");
      }
    }
  }

  return errors;
}

const configErrors = validateConfig(botConfig);
if (configErrors.length > 0) {
  logger.error("Error konfigurasi bot:", configErrors.join("\n"));
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
}

export const BotConfig = botConfig;

const COMMAND_CATEGORY_FEATURE_MAP = {
  birthday: "birthday",
  community: "community",
  economy: "economy",
  fun: "fun",
  giveaway: "giveaways",
  jointocreate: "joinToCreate",
  leveling: "leveling",
  logging: "logging",
  moderation: "moderation",
  music: "music",
  reaction_roles: "reactionRoles",
  search: "search",
  serverstats: "counter",
  ticket: "tickets",
  tools: "tools",
  utility: "utility",
  verification: "verification",
  welcome: "welcome",
};

function normalizeCategoryKey(category) {
  return String(category || "").trim().toLowerCase().replace(/\s+/g, "_");
}

export function getCommandPrefix() {
  return botConfig.commands?.prefix ?? "!";
}

export function getBotOwners() {
  return (botConfig.commands?.owners ?? [])
    .map((id) => String(id).trim())
    .filter(Boolean);
}

export function isBotOwner(userId) {
  if (!userId) {
    return false;
  }

  return getBotOwners().includes(String(userId));
}

export function isMaintenanceMode() {
  return botConfig.commands?.maintenanceMode === true;
}

export function getBotMessage(key, replacements = {}) {
  let message = botConfig.messages?.[key] || key;

  for (const [placeholder, value] of Object.entries(replacements)) {
    message = message.replace(new RegExp(`\\{${placeholder}\\}`, "g"), String(value));
  }

  return message;
}

export function isFeatureEnabled(featureKey) {
  if (!featureKey) {
    return true;
  }

  return botConfig.features?.[featureKey] !== false;
}

export function isCommandCategoryEnabled(category) {
  const normalized = normalizeCategoryKey(category);

  if (!normalized || normalized === "core") {
    return true;
  }

  const featureKey = COMMAND_CATEGORY_FEATURE_MAP[normalized];
  if (!featureKey) {
    return true;
  }

  return isFeatureEnabled(featureKey);
}

export function getApplicationStatusColor(status) {
  const colors = botConfig.applications?.statusColors || {};
  const hex = colors[status];
  return hex ? getColor(hex) : getColor(status === "approved" ? "success" : status === "denied" ? "error" : "warning");
}

export function getDefaultApplicationQuestions() {
  return (botConfig.applications?.defaultQuestions || []).map((entry) =>
    typeof entry === "string" ? entry : entry.question,
  ).filter(Boolean);
}

export function getColor(path, fallback = "#99AAB5") {
  
  if (typeof path === "number") return path;
  if (typeof path === "string" && path.startsWith("#")) {
    
    return parseInt(path.replace("#", ""), 16);
  }
  const result = path
    .split(".")
    .reduce(
      (obj, key) => (obj && obj[key] !== undefined ? obj[key] : fallback),
      botConfig.embeds.colors,
    );
  
  if (typeof result === "string" && result.startsWith("#")) {
    return parseInt(result.replace("#", ""), 16);
  }
  return result;
}

export function getRandomColor() {
  const colors = Object.values(botConfig.embeds.colors).flatMap((color) =>
    typeof color === "string" ? color : Object.values(color),
  );
  return colors[Math.floor(Math.random() * colors.length)];
}

export default botConfig;
