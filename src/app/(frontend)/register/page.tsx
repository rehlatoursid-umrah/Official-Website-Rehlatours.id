'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Phone, FileText, Heart, Star, CheckCircle2, ChevronRight, ChevronLeft, Check, Loader2, Calendar, Building2, Shield, Info, Image as ImageIcon, ArrowLeft, MapPin } from 'lucide-react'

const ERP = process.env.NEXT_PUBLIC_ERP_API_URL || 'http://localhost:3000'

type Pkg = {
  id: string; name: string; type: string; description: string | null;
  priceQuad: number; priceTriple: number; priceDouble: number; priceSingle: number;
  currency: string; durationDays: number; durationNights: number;
  hotelMakkah: string | null; hotelMadinah: string | null;
  coverImage: string | null;
}

const STEPS = [
  { id: 'Data Diri', icon: User, desc: 'Informasi Pribadi' },
  { id: 'Kontak', icon: Phone, desc: 'Informasi Kontak' },
  { id: 'Dokumen', icon: FileText, desc: 'KTP & Paspor' },
  { id: 'Kesehatan', icon: Heart, desc: 'Kesehatan & Ibadah' },
  { id: 'Paket', icon: Star, desc: 'Layanan Umrah' },
  { id: 'Review', icon: CheckCircle2, desc: 'Syarat & Ketentuan' },
]

export default function RegisterPage() {
  const [step, setStep] = useState(0)
  const [packages, setPackages] = useState<Pkg[]>([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [ktpFile, setKtpFile] = useState<File | null>(null)
  const [passportFile, setPassportFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [form, setForm] = useState({
    fullName: '', nik: '', birthPlace: '', birthDate: '', gender: '',
    fatherName: '', motherName: '', maritalStatus: '', occupation: '',
    phoneCode: '+62', phone: '', whatsappCode: '+62', whatsapp: '', email: '',
    address: '', city: '', province: '', postalCode: '',
    emergencyName: '', emergencyRelation: '', emergencyPhone: '', emergencyPhoneCode: '+62',
    passportNumber: '', passportIssued: '', passportExpiry: '', passportPlace: '',
    hasDiseases: false as boolean, diseaseNotes: '', specialNeeds: false as boolean, wheelchair: false as boolean,
    previousUmrah: false as boolean, previousHajj: false as boolean,
    packageId: '', roomType: 'QUAD', bookingNotes: '',
  })
  const [ktpUploadedUrl, setKtpUploadedUrl] = useState<string | null>(null)
  const [passportUploadedUrl, setPassportUploadedUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const COUNTRY_CODES = ['+62', '+60', '+65', '+66', '+1', '+44', '+81', '+82', '+86', '+91', '+966', '+971', '+20']

  useEffect(() => {
    fetch(`${ERP}/api/public/packages`).then(r => r.json()).then(d => {
      if (d.success && d.packages) setPackages(d.packages)
    }).catch(err => console.error('Failed to load packages:', err))
  }, [])

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))
  const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`
  const getPrice = () => {
    const p = packages.find(x => x.id === form.packageId)
    if (!p) return 0
    const m: Record<string, number> = { QUAD: p.priceQuad, TRIPLE: p.priceTriple, DOUBLE: p.priceDouble, SINGLE: p.priceSingle }
    return m[form.roomType] || p.priceQuad
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (step === 0) {
      if (!form.fullName.trim()) e.fullName = 'Nama lengkap wajib diisi'
      if (!form.gender) e.gender = 'Jenis kelamin wajib dipilih'
      if (!form.birthDate) e.birthDate = 'Tanggal lahir wajib diisi'
      if (form.nik && form.nik.length !== 16) e.nik = 'NIK harus 16 digit'
    }
    if (step === 1) {
      if (!form.phone.trim()) e.phone = 'Nomor HP wajib diisi'
      if (form.phone && !/^\d{8,15}$/.test(form.phone)) e.phone = 'Format nomor HP tidak valid'
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Format email tidak valid'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!agreedTerms) { setShowTerms(true); return }
    setLoading(true)
    try {
      const fd = new FormData()
      const submitData = { ...form, phone: `${form.phoneCode}${form.phone}`, whatsapp: form.whatsapp ? `${form.whatsappCode}${form.whatsapp}` : '', emergencyPhone: form.emergencyPhone ? `${form.emergencyPhoneCode}${form.emergencyPhone}` : '' }
      Object.entries(submitData).forEach(([k, v]) => { if (v !== '' && v !== null && v !== undefined && !k.endsWith('Code')) fd.append(k, String(v)) })
      if (ktpUploadedUrl) fd.append('ktpUrl', ktpUploadedUrl)
      if (passportUploadedUrl) fd.append('passportUrl', passportUploadedUrl)
      if (ktpFile && !ktpUploadedUrl) fd.append('ktpFile', ktpFile)
      if (passportFile && !passportUploadedUrl) fd.append('passportFile', passportFile)
      const res = await fetch(`${ERP}/api/public/register`, { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) { setResult(data); setSubmitted(true) }
      else setErrors({ submit: data.error || 'Gagal mendaftar' })
    } catch { setErrors({ submit: 'Terjadi kesalahan jaringan. Silakan coba lagi.' }) }
    finally { setLoading(false) }
  }

  if (submitted && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf8f9] to-white flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-2xl border border-[#3a0519]/10 max-w-lg w-full p-10 text-center">
          <div className="w-20 h-20 bg-[#3a0519]/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-[#3a0519]" />
          </div>
          <h2 className="text-3xl font-bold text-[#3a0519] mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-gray-500 mb-8 text-lg">Terima kasih, <strong className="text-[#3a0519]">{result.customerName}</strong></p>
          {result.booking && (
            <div className="bg-[#faf8f9] border border-[#3a0519]/10 rounded-xl p-6 mb-6 text-left space-y-3">
              <div className="flex justify-between"><span className="text-gray-500 text-sm">Kode Booking</span><span className="font-bold font-mono text-[#3a0519]">{result.booking.bookingCode}</span></div>
              <div className="flex justify-between"><span className="text-gray-500 text-sm">Total</span><span className="font-bold text-[#3a0519]">{fmt(result.booking.priceTotal)}</span></div>
            </div>
          )}
          <div className="flex gap-3">
            <Link href="/" className="flex-1 py-3 border-2 border-[#3a0519] text-[#3a0519] rounded-xl font-bold text-center hover:bg-[#3a0519]/5 transition-all">Kembali ke Beranda</Link>
            <Link href="/booking-status" className="flex-1 py-3 bg-[#3a0519] text-white rounded-xl font-bold text-center hover:bg-[#5a0826] transition-all">Cek Booking</Link>
          </div>
        </motion.div>
      </div>
    )
  }

  const Icon = STEPS[step].icon
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f9] to-white">
      {/* Header */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft size={18} className="text-[#3a0519] group-hover:-translate-x-1 transition-transform" />
            <img src="/rehlasticky.png" alt="Rehla" className="w-8 h-8 object-contain" onError={e => (e.currentTarget.style.display = 'none')} />
            <div>
              <h1 className="text-sm font-bold text-[#3a0519]">REHLATOURS.ID</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Portal Pendaftaran Umrah</p>
            </div>
          </Link>
          <div className="text-sm text-gray-500">Langkah {step + 1} / {STEPS.length}</div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="flex gap-1.5 h-1.5 mb-8">
          {STEPS.map((_, i) => (
            <div key={i} className={`flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-[#3a0519]' : 'bg-gray-200'}`} />
          ))}
        </div>

        {/* Step Header */}
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="mb-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#3a0519] rounded-2xl flex items-center justify-center"><Icon size={22} className="text-white" /></div>
          <div>
            <h2 className="text-2xl font-bold text-[#3a0519]">{STEPS[step].id}</h2>
            <p className="text-sm text-gray-500">{STEPS[step].desc}</p>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div key={`form-${step}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6">
          {step === 0 && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div><Inp label="Nama Lengkap *" value={form.fullName} onChange={v => set('fullName', v)} placeholder="Contoh: Ahmad Sulaiman" />{errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}</div>
                <div><Inp label="NIK (Nomor Induk Kependudukan) *" value={form.nik} onChange={v => set('nik', v.replace(/\D/g,'').slice(0,16))} placeholder="16 digit NIK" />{errors.nik && <p className="text-xs text-red-500 mt-1">{errors.nik}</p>}</div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Inp label="Tempat Lahir *" value={form.birthPlace} onChange={v => set('birthPlace', v)} placeholder="Contoh: Jakarta" />
                <div><Inp label="Tanggal Lahir *" type="date" value={form.birthDate} onChange={v => set('birthDate', v)} />{errors.birthDate && <p className="text-xs text-red-500 mt-1">{errors.birthDate}</p>}</div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Inp label="Nama Ayah *" value={form.fatherName} onChange={v => set('fatherName', v)} placeholder="Masukkan nama ayah" />
                <Inp label="Nama Ibu *" value={form.motherName} onChange={v => set('motherName', v)} placeholder="Masukkan nama ibu" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div><Sel label="Jenis Kelamin *" value={form.gender} onChange={v => set('gender', v)} opts={[['','Pilih jenis kelamin'],['MALE','Laki-laki'],['FEMALE','Perempuan']]} />{errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}</div>
                <Sel label="Status Pernikahan *" value={form.maritalStatus} onChange={v => set('maritalStatus', v)} opts={[['','Pilih status'],['SINGLE','Belum Menikah'],['MARRIED','Menikah'],['DIVORCED','Cerai'],['WIDOWED','Janda/Duda']]} />
              </div>
              <Inp label="Pekerjaan *" value={form.occupation} onChange={v => set('occupation', v)} placeholder="Contoh: Pegawai Swasta" />
            </div>
          )}
          {step === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">Nomor Telepon *</label>
                  <div className="flex gap-2">
                    <select value={form.phoneCode} onChange={e => set('phoneCode', e.target.value)} className="w-24 rounded-xl border-0 py-3 px-2 text-sm font-medium ring-1 ring-gray-200 focus:ring-2 focus:ring-[#3a0519] bg-gray-50/50">{COUNTRY_CODES.map(c => <option key={c} value={c}>{c}</option>)}</select>
                    <input value={form.phone} onChange={e => set('phone', e.target.value.replace(/\D/g,''))} placeholder="81234567890" className="flex-1 rounded-xl border-0 py-3 px-4 text-sm font-medium ring-1 ring-gray-200 focus:ring-2 focus:ring-[#3a0519] bg-gray-50/50" />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                <div><Inp label="Email *" type="email" value={form.email} onChange={v => set('email', v)} placeholder="contoh@email.com" />{errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}</div>
              </div>
              <Inp label="Alamat Lengkap *" value={form.address} onChange={v => set('address', v)} area placeholder="Alamat lengkap dengan RT/RW, Kelurahan, Kecamatan" />
              <div className="grid grid-cols-2 gap-5">
                <Inp label="Kota *" value={form.city} onChange={v => set('city', v)} placeholder="Masukkan kota" />
                <Inp label="Provinsi *" value={form.province} onChange={v => set('province', v)} placeholder="Masukkan provinsi" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Inp label="Kode Pos *" value={form.postalCode} onChange={v => set('postalCode', v)} placeholder="Masukkan kode pos" />
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">Nomor WhatsApp *</label>
                  <div className="flex gap-2">
                    <select value={form.whatsappCode} onChange={e => set('whatsappCode', e.target.value)} className="w-24 rounded-xl border-0 py-3 px-2 text-sm font-medium ring-1 ring-gray-200 focus:ring-2 focus:ring-[#3a0519] bg-gray-50/50">{COUNTRY_CODES.map(c => <option key={c} value={c}>{c}</option>)}</select>
                    <input value={form.whatsapp} onChange={e => set('whatsapp', e.target.value.replace(/\D/g,''))} placeholder="81234567890" className="flex-1 rounded-xl border-0 py-3 px-4 text-sm font-medium ring-1 ring-gray-200 focus:ring-2 focus:ring-[#3a0519] bg-gray-50/50" />
                  </div>
                </div>
              </div>
              <hr />
              <p className="text-sm font-bold text-[#3a0519]">Kontak Darurat</p>
              <div className="grid grid-cols-2 gap-5">
                <Inp label="Nama Kontak Darurat *" value={form.emergencyName} onChange={v => set('emergencyName', v)} placeholder="Nama kontak darurat" />
                <Sel label="Hubungan *" value={form.emergencyRelation} onChange={v => set('emergencyRelation', v)} opts={[['','Pilih hubungan'],['SPOUSE','Suami/Istri'],['PARENT','Orang Tua'],['CHILD','Anak'],['SIBLING','Saudara'],['OTHER','Lainnya']]} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">No. HP Kontak Darurat *</label>
                <div className="flex gap-2">
                  <select value={form.emergencyPhoneCode} onChange={e => set('emergencyPhoneCode', e.target.value)} className="w-24 rounded-xl border-0 py-3 px-2 text-sm font-medium ring-1 ring-gray-200 focus:ring-2 focus:ring-[#3a0519] bg-gray-50/50">{COUNTRY_CODES.map(c => <option key={c} value={c}>{c}</option>)}</select>
                  <input value={form.emergencyPhone} onChange={e => set('emergencyPhone', e.target.value.replace(/\D/g,''))} className="flex-1 rounded-xl border-0 py-3 px-3 text-sm font-medium ring-1 ring-gray-200 focus:ring-2 focus:ring-[#3a0519] bg-gray-50/50" />
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Foto KTP Asli *</p>
                <label className={`block w-full p-6 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors ${ktpFile || ktpUploadedUrl ? 'border-[#3a0519] bg-[#3a0519]/5' : 'border-gray-300 hover:border-[#3a0519]/40'}`}>
                  <input type="file" accept="image/*" className="hidden" onChange={async e => {
                    const file = e.target.files?.[0]; if (!file) return; setKtpFile(file); setUploading(true);
                    try { const fd = new FormData(); fd.append('file', file); fd.append('folder', 'documents'); fd.append('category', 'KTP'); const res = await fetch(`${ERP}/api/public/upload`, { method: 'POST', body: fd }); const data = await res.json(); if (data.url) setKtpUploadedUrl(data.url); } catch {} finally { setUploading(false); }
                  }} />
                  {ktpUploadedUrl ? (<><img src={ktpUploadedUrl} alt="KTP" className="w-full max-w-xs mx-auto rounded-lg mb-2 border" /><p className="text-sm font-semibold text-[#3a0519]">✓ KTP berhasil diunggah</p></>) : (<><ImageIcon size={28} className={`mx-auto mb-2 ${ktpFile ? 'text-[#3a0519]' : 'text-gray-400'}`} /><p className="text-sm font-semibold">{uploading ? 'Mengunggah...' : ktpFile ? ktpFile.name : 'Klik untuk upload KTP'}</p></>)}
                </label>
              </div>
              <hr />
              <p className="text-sm font-bold text-[#3a0519]">Informasi Paspor</p>
              <div className="grid grid-cols-2 gap-5">
                <Inp label="Nomor Paspor *" value={form.passportNumber} onChange={v => set('passportNumber', v)} placeholder="Contoh: A1234567" />
                <Inp label="Tanggal Penerbitan *" type="date" value={form.passportIssued} onChange={v => set('passportIssued', v)} />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Inp label="Tanggal Kadaluarsa *" type="date" value={form.passportExpiry} onChange={v => set('passportExpiry', v)} />
                <Inp label="Tempat Penerbitan *" value={form.passportPlace} onChange={v => set('passportPlace', v)} placeholder="Contoh: Jakarta" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Foto Halaman Paspor</p>
                <label className={`block w-full p-4 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors ${passportFile || passportUploadedUrl ? 'border-[#3a0519] bg-[#3a0519]/5' : 'border-gray-300 hover:border-[#3a0519]/40'}`}>
                  <input type="file" accept="image/*" className="hidden" onChange={async e => {
                    const file = e.target.files?.[0]; if (!file) return; setPassportFile(file); setUploading(true);
                    try { const fd = new FormData(); fd.append('file', file); fd.append('folder', 'documents'); fd.append('category', 'PASSPORT'); const res = await fetch(`${ERP}/api/public/upload`, { method: 'POST', body: fd }); const data = await res.json(); if (data.url) setPassportUploadedUrl(data.url); } catch {} finally { setUploading(false); }
                  }} />
                  {passportUploadedUrl ? (<><img src={passportUploadedUrl} alt="Paspor" className="w-full max-w-xs mx-auto rounded-lg border" /><p className="text-sm font-semibold text-[#3a0519]">✓ Paspor berhasil diunggah</p></>) : (<><p className="text-sm font-semibold">{uploading ? 'Mengunggah...' : passportFile ? passportFile.name : 'Klik untuk upload paspor'}</p></>)}
                </label>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-5">
              <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer hover:border-[#3a0519]/30 transition-all">
                <div className={`w-5 h-5 rounded flex items-center justify-center ${form.hasDiseases ? 'bg-[#3a0519]' : 'bg-gray-200'}`}>
                  {form.hasDiseases && <Check size={12} className="text-white" />}
                </div>
                <input type="checkbox" checked={form.hasDiseases} onChange={e => set('hasDiseases', e.target.checked)} className="hidden" />
                <span className="text-sm font-semibold">Apakah Anda memiliki penyakit tertentu?</span>
              </label>
              {form.hasDiseases && <Inp label="Jenis Penyakit *" value={form.diseaseNotes} onChange={v => set('diseaseNotes', v)} area placeholder="Sebutkan jenis penyakit yang Anda miliki" />}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer hover:border-[#3a0519]/30 transition-all">
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${form.specialNeeds ? 'bg-[#3a0519]' : 'bg-gray-200'}`}>{form.specialNeeds && <Check size={12} className="text-white" />}</div>
                  <input type="checkbox" checked={form.specialNeeds} onChange={e => set('specialNeeds', e.target.checked)} className="hidden" />
                  <span className="text-sm font-semibold">Kebutuhan Khusus</span>
                </label>
                <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer hover:border-[#3a0519]/30 transition-all">
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${form.wheelchair ? 'bg-[#3a0519]' : 'bg-gray-200'}`}>{form.wheelchair && <Check size={12} className="text-white" />}</div>
                  <input type="checkbox" checked={form.wheelchair} onChange={e => set('wheelchair', e.target.checked)} className="hidden" />
                  <span className="text-sm font-semibold">Kursi Roda</span>
                </label>
              </div>
              <hr />
              <p className="text-sm font-bold text-[#3a0519] flex items-center gap-2"><MapPin size={16} /> Pengalaman Ibadah</p>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer hover:border-[#3a0519]/30 transition-all">
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${form.previousUmrah ? 'bg-[#3a0519]' : 'bg-gray-200'}`}>{form.previousUmrah && <Check size={12} className="text-white" />}</div>
                  <input type="checkbox" checked={form.previousUmrah} onChange={e => set('previousUmrah', e.target.checked)} className="hidden" />
                  <span className="text-sm font-semibold">Pernah Umrah sebelumnya</span>
                </label>
                <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer hover:border-[#3a0519]/30 transition-all">
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${form.previousHajj ? 'bg-[#3a0519]' : 'bg-gray-200'}`}>{form.previousHajj && <Check size={12} className="text-white" />}</div>
                  <input type="checkbox" checked={form.previousHajj} onChange={e => set('previousHajj', e.target.checked)} className="hidden" />
                  <span className="text-sm font-semibold">Pernah melaksanakan Haji</span>
                </label>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-2 text-sm text-blue-900">
                <Info size={16} className="flex-shrink-0 mt-0.5" /> Pilih paket atau kosongkan untuk daftar data diri saja.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div onClick={() => set('packageId', '')} className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${!form.packageId ? 'border-[#3a0519] bg-[#faf8f9]' : 'border-gray-100 hover:border-gray-200'}`}>
                  <p className="font-bold text-sm">Daftar Data Diri Saja</p>
                  <p className="text-xs text-gray-500 mt-1">Waiting list</p>
                </div>
                {packages.map(p => (
                  <div key={p.id} onClick={() => set('packageId', p.id)} className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${form.packageId === p.id ? 'border-[#3a0519] bg-[#faf8f9] shadow-md' : 'border-gray-100 hover:border-gray-200'}`}>
                    <span className="text-[9px] font-bold text-gray-500 uppercase bg-gray-200 px-2 py-0.5 rounded">{p.type}</span>
                    <h4 className="font-bold mt-1">{p.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{p.durationDays} Hari / {p.durationDays - 2} Malam</p>
                    <p className="font-bold text-[#3a0519] mt-2">{fmt(p.priceQuad)}</p>
                  </div>
                ))}
              </div>
              {form.packageId && (
                <div className="bg-[#faf8f9] border border-[#3a0519]/10 rounded-xl p-5">
                  <p className="text-sm font-bold text-[#3a0519] mb-3">Tipe Kamar</p>
                  <div className="grid grid-cols-4 gap-2">
                    {['QUAD','TRIPLE','DOUBLE','SINGLE'].map(r => (
                      <button key={r} onClick={() => set('roomType', r)} className={`py-2 rounded-lg text-sm font-bold transition-all ${form.roomType === r ? 'bg-[#3a0519] text-white' : 'bg-white border border-gray-200'}`}>{r}</button>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between items-end pt-3 border-t border-[#3a0519]/10">
                    <span className="text-xs text-gray-500 font-bold uppercase">Estimasi</span>
                    <span className="text-xl font-bold text-[#3a0519]">{fmt(getPrice())}</span>
                  </div>
                </div>
              )}
            </div>
          )}
          {step === 5 && (
            <div className="space-y-4">
              <div className="bg-[#faf8f9] rounded-xl p-4 text-center border border-[#3a0519]/10">
                <h3 className="text-lg font-bold text-[#3a0519]">Review Data Pendaftaran</h3>
                <p className="text-sm text-gray-500">Pastikan data benar sebelum mengirim</p>
              </div>
              <Rev title="Data Diri" rows={[['Nama Lengkap', form.fullName],['NIK', form.nik || '-'],['TTL', `${form.birthPlace||'-'}, ${form.birthDate||'-'}`],['Nama Ayah', form.fatherName||'-'],['Nama Ibu', form.motherName||'-'],['Jenis Kelamin', form.gender === 'MALE' ? 'Laki-laki' : form.gender === 'FEMALE' ? 'Perempuan' : '-'],['Status', form.maritalStatus||'-'],['Pekerjaan', form.occupation||'-']]} />
              <Rev title="Kontak" rows={[['Telepon', `${form.phoneCode}${form.phone}`],['WA', form.whatsapp ? `${form.whatsappCode}${form.whatsapp}` : '-'],['Email', form.email || '-'],['Alamat', `${form.address || '-'}, ${form.city || '-'}, ${form.province||'-'} ${form.postalCode||''}`],['Kontak Darurat', `${form.emergencyName||'-'} (${form.emergencyRelation||'-'}) - ${form.emergencyPhoneCode}${form.emergencyPhone||'-'}`]]} />
              {form.passportNumber && <Rev title="Paspor" rows={[['No. Paspor', form.passportNumber],['Terbit', form.passportIssued||'-'],['Kadaluarsa', form.passportExpiry||'-'],['Tempat', form.passportPlace||'-']]} />}
              <Rev title="Kesehatan & Ibadah" rows={[['Penyakit', form.hasDiseases ? (form.diseaseNotes||'Ya') : 'Tidak'],['Kebutuhan Khusus', form.specialNeeds ? 'Ya' : 'Tidak'],['Kursi Roda', form.wheelchair ? 'Ya' : 'Tidak'],['Umrah', form.previousUmrah ? 'Pernah' : 'Belum'],['Haji', form.previousHajj ? 'Pernah' : 'Belum']]} />
              {form.packageId && (() => { const p = packages.find(x => x.id === form.packageId); return p ? (
                <div className="border-2 border-[#3a0519] rounded-xl overflow-hidden">
                  <div className="bg-[#3a0519] px-4 py-3"><span className="text-xs text-white font-bold uppercase tracking-widest">Paket Terpilih</span></div>
                  <div className="p-4 bg-white">
                    <p className="font-bold text-lg text-[#3a0519]">{p.name}</p>
                    <p className="text-sm text-gray-500">Kamar {form.roomType}</p>
                    <p className="text-xl font-bold text-[#3a0519] mt-2">{fmt(getPrice())}</p>
                  </div>
                </div>
              ) : null })()}
              <div className="bg-[#fdf2f4] border border-[#3a0519]/10 rounded-xl p-4">
                <p className="text-sm font-bold text-[#3a0519] mb-3">Persyaratan Umum</p>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  <li>• Paspor masih berlaku minimal 6 bulan</li>
                  <li>• Sertifikat vaksin meningitis</li>
                  <li>• Sertifikat vaksin polio (bila diperlukan)</li>
                  <li>• Membayar biaya pendaftaran</li>
                  <li>• Mengikuti briefing sebelum keberangkatan</li>
                </ul>
              </div>
            </div>
          )}
        </motion.div>

        {/* Error Banner */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-sm text-red-700 font-medium">{errors.submit}</div>
        )}

        {/* Terms checkbox on final step */}
        {step === STEPS.length - 1 && (
          <label className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl mb-4 cursor-pointer hover:border-[#3a0519]/30 transition-all">
            <div className={`w-5 h-5 mt-0.5 rounded flex-shrink-0 flex items-center justify-center ${agreedTerms ? 'bg-[#3a0519]' : 'bg-gray-200'}`}>
              {agreedTerms && <Check size={12} className="text-white" />}
            </div>
            <input type="checkbox" checked={agreedTerms} onChange={e => setAgreedTerms(e.target.checked)} className="hidden" />
            <span className="text-sm text-gray-700">Saya menyetujui <button type="button" onClick={e => { e.preventDefault(); setShowTerms(true) }} className="text-[#3a0519] font-bold underline">Syarat & Ketentuan</button> pendaftaran umrah Rehlatours.id</span>
          </label>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          {step > 0 ? (
            <button onClick={() => { setStep(s => s - 1); setErrors({}) }} className="px-5 py-3 text-sm font-bold text-gray-500 hover:text-[#3a0519] rounded-xl flex items-center gap-2">
              <ChevronLeft size={16} /> Kembali
            </button>
          ) : <div />}
          {step < STEPS.length - 1 ? (
            <button onClick={() => { if (validate()) { setStep(s => s + 1); setErrors({}); window.scrollTo({ top: 0, behavior: 'smooth' }) }}} className="flex items-center gap-2 bg-[#3a0519] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#5a0826] transition-all shadow-lg">
              Lanjutkan <ChevronRight size={18} />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={loading || !agreedTerms} className="flex items-center gap-2 bg-[#3a0519] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#5a0826] transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
              {loading ? 'Memproses...' : 'Konfirmasi & Kirim'}
            </button>
          )}
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="bg-[#3a0519] p-5 flex justify-between items-center">
              <h3 className="text-white font-bold text-lg">Syarat & Ketentuan</h3>
              <button onClick={() => setShowTerms(false)} className="text-white/60 hover:text-white text-xl">✕</button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[55vh] text-sm text-gray-700 space-y-4">
              <h4 className="font-bold text-[#3a0519]">1. Pendaftaran</h4>
              <p>Calon jamaah wajib mengisi formulir pendaftaran dengan data yang benar dan lengkap sesuai identitas resmi (KTP/Paspor). Kesalahan data menjadi tanggung jawab pendaftar.</p>
              <h4 className="font-bold text-[#3a0519]">2. Pembayaran</h4>
              <p>DP (Down Payment) minimal harus dibayarkan sesuai ketentuan paket yang dipilih. Pelunasan wajib dilakukan sebelum tanggal yang ditentukan oleh pihak Rehlatours Indonesia.</p>
              <h4 className="font-bold text-[#3a0519]">3. Pembatalan</h4>
              <p>Pembatalan oleh jamaah setelah DP akan dikenakan biaya administrasi. Refund mengikuti kebijakan yang berlaku di Rehlatours Indonesia.</p>
              <h4 className="font-bold text-[#3a0519]">4. Dokumen Perjalanan</h4>
              <p>Jamaah wajib memiliki paspor yang masih berlaku minimal 7 bulan dari tanggal keberangkatan. Visa, vaksin meningitis, dan dokumen lainnya akan dibantu oleh Rehlatours.</p>
              <h4 className="font-bold text-[#3a0519]">5. Kesehatan</h4>
              <p>Jamaah wajib dalam kondisi sehat jasmani dan rohani. Jamaah dengan kondisi medis khusus wajib menginformasikan sebelum keberangkatan.</p>
              <h4 className="font-bold text-[#3a0519]">6. Tanggung Jawab</h4>
              <p>Rehlatours Indonesia tidak bertanggung jawab atas kerugian yang disebabkan oleh force majeure, perubahan kebijakan pemerintah, atau hal-hal di luar kendali perusahaan.</p>
            </div>
            <div className="p-5 border-t bg-gray-50 flex gap-3 justify-end">
              <button onClick={() => setShowTerms(false)} className="px-5 py-2.5 text-sm font-bold text-gray-500 border border-gray-300 rounded-xl hover:bg-gray-100">Tutup</button>
              <button onClick={() => { setAgreedTerms(true); setShowTerms(false) }} className="px-5 py-2.5 text-sm font-bold text-white bg-[#3a0519] rounded-xl hover:bg-[#5a0826]">Saya Setuju</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Inp({ label, value, onChange, type = 'text', placeholder, area }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; area?: boolean }) {
  const cls = "w-full rounded-xl border-0 py-3 px-4 text-gray-900 ring-1 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-[#3a0519] focus:outline-none text-sm font-medium bg-gray-50/50"
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">{label}</label>
      {area ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} className={cls} /> : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />}
    </div>
  )
}

function Sel({ label, value, onChange, opts }: { label: string; value: string; onChange: (v: string) => void; opts: string[][] }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} className="w-full rounded-xl border-0 py-3 px-4 text-gray-900 ring-1 ring-gray-200 focus:ring-2 focus:ring-[#3a0519] focus:outline-none text-sm font-medium bg-gray-50/50">
        {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  )
}

function Rev({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <div className="bg-[#faf8f9] px-4 py-2 border-b border-gray-100"><span className="text-xs font-bold text-[#3a0519] uppercase tracking-widest">{title}</span></div>
      <div className="p-4 grid grid-cols-2 gap-3">
        {rows.map(([k, v], i) => <div key={i}><p className="text-[10px] font-bold text-gray-400 uppercase">{k}</p><p className="text-sm font-semibold text-gray-800">{v}</p></div>)}
      </div>
    </div>
  )
}
