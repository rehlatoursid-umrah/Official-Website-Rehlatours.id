'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Phone, FileText, Heart, Star, CheckCircle2, ChevronRight, ChevronLeft, Check, Loader2, Calendar, Building2, Shield, Info, Image as ImageIcon, ArrowLeft } from 'lucide-react'

const ERP = process.env.NEXT_PUBLIC_ERP_API_URL || 'http://localhost:3000'

type Pkg = {
  id: string; name: string; type: string; description: string | null;
  priceQuad: number; priceTriple: number; priceDouble: number; priceSingle: number;
  currency: string; durationDays: number; durationNights: number;
  hotelMakkah: string | null; hotelMadinah: string | null;
  coverImage: string | null;
}

const STEPS = [
  { id: 'Data Diri', icon: User, desc: 'Identitas Pribadi' },
  { id: 'Kontak', icon: Phone, desc: 'Informasi Komunikasi' },
  { id: 'Dokumen', icon: FileText, desc: 'KTP & Paspor' },
  { id: 'Kesehatan', icon: Heart, desc: 'Kondisi Fisik' },
  { id: 'Paket', icon: Star, desc: 'Layanan Umrah' },
  { id: 'Review', icon: CheckCircle2, desc: 'Konfirmasi Data' },
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
    fullName: '', nickname: '', gender: '', birthDate: '', birthPlace: '',
    nik: '', phoneCode: '+62', phone: '', whatsappCode: '+62', whatsapp: '', email: '', address: '', city: '', province: '',
    passportNumber: '', passportExpiry: '', passportIssued: '',
    bloodType: '', healthNotes: '', vaccineMeningitis: false, vaccineDate: '',
    emergencyName: '', emergencyPhone: '', emergencyPhoneCode: '+62', emergencyRelation: '',
    notes: '', packageId: '', roomType: 'QUAD', bookingNotes: '',
  })

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
      if (ktpFile) fd.append('ktpFile', ktpFile)
      if (passportFile) fd.append('passportFile', passportFile)
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
              <Inp label="Nama Lengkap *" value={form.fullName} onChange={v => set('fullName', v)} placeholder="Sesuai paspor/KTP" />
              {errors.fullName && <p className="text-xs text-red-500 -mt-3">{errors.fullName}</p>}
              <Inp label="Nama Panggilan" value={form.nickname} onChange={v => set('nickname', v)} />
              <div className="grid grid-cols-2 gap-5">
                <div><Sel label="Jenis Kelamin *" value={form.gender} onChange={v => set('gender', v)} opts={[['','Pilih...'],['MALE','Laki-laki'],['FEMALE','Perempuan']]} />{errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}</div>
                <Inp label="Tempat Lahir" value={form.birthPlace} onChange={v => set('birthPlace', v)} />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div><Inp label="Tanggal Lahir *" type="date" value={form.birthDate} onChange={v => set('birthDate', v)} />{errors.birthDate && <p className="text-xs text-red-500 mt-1">{errors.birthDate}</p>}</div>
                <div><Inp label="NIK KTP" value={form.nik} onChange={v => set('nik', v.replace(/\D/g,'').slice(0,16))} placeholder="16 digit" />{errors.nik && <p className="text-xs text-red-500 mt-1">{errors.nik}</p>}</div>
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">No. Handphone *</label>
                  <div className="flex gap-2">
                    <select value={form.phoneCode} onChange={e => set('phoneCode', e.target.value)} className="w-24 rounded-xl border-0 py-3 px-2 text-sm font-medium ring-1 ring-gray-200 focus:ring-2 focus:ring-[#3a0519] bg-gray-50/50">{COUNTRY_CODES.map(c => <option key={c} value={c}>{c}</option>)}</select>
                    <input value={form.phone} onChange={e => set('phone', e.target.value.replace(/\D/g,''))} placeholder="81234567890" className="flex-1 rounded-xl border-0 py-3 px-4 text-sm font-medium ring-1 ring-gray-200 focus:ring-2 focus:ring-[#3a0519] bg-gray-50/50" />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">WhatsApp</label>
                  <div className="flex gap-2">
                    <select value={form.whatsappCode} onChange={e => set('whatsappCode', e.target.value)} className="w-24 rounded-xl border-0 py-3 px-2 text-sm font-medium ring-1 ring-gray-200 focus:ring-2 focus:ring-[#3a0519] bg-gray-50/50">{COUNTRY_CODES.map(c => <option key={c} value={c}>{c}</option>)}</select>
                    <input value={form.whatsapp} onChange={e => set('whatsapp', e.target.value.replace(/\D/g,''))} placeholder="81234567890" className="flex-1 rounded-xl border-0 py-3 px-4 text-sm font-medium ring-1 ring-gray-200 focus:ring-2 focus:ring-[#3a0519] bg-gray-50/50" />
                  </div>
                </div>
              </div>
              <Inp label="Email" type="email" value={form.email} onChange={v => set('email', v)} placeholder="email@domain.com" />
              {errors.email && <p className="text-xs text-red-500 -mt-3">{errors.email}</p>}
              <Inp label="Alamat" value={form.address} onChange={v => set('address', v)} area placeholder="Alamat lengkap..." />
              <div className="grid grid-cols-2 gap-5">
                <Inp label="Kota" value={form.city} onChange={v => set('city', v)} />
                <Inp label="Provinsi" value={form.province} onChange={v => set('province', v)} />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Foto KTP Asli *</p>
                <label className={`block w-full p-6 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors ${ktpFile ? 'border-[#3a0519] bg-[#3a0519]/5' : 'border-gray-300 hover:border-[#3a0519]/40'}`}>
                  <input type="file" accept="image/*" className="hidden" onChange={e => setKtpFile(e.target.files?.[0] || null)} />
                  <ImageIcon size={28} className={`mx-auto mb-2 ${ktpFile ? 'text-[#3a0519]' : 'text-gray-400'}`} />
                  <p className="text-sm font-semibold">{ktpFile ? ktpFile.name : 'Klik untuk upload KTP'}</p>
                </label>
              </div>
              <hr />
              <Inp label="Nomor Paspor (opsional)" value={form.passportNumber} onChange={v => set('passportNumber', v)} />
              <div className="grid grid-cols-2 gap-5">
                <Inp label="Tanggal Terbit" type="date" value={form.passportIssued} onChange={v => set('passportIssued', v)} />
                <Inp label="Berlaku Sampai" type="date" value={form.passportExpiry} onChange={v => set('passportExpiry', v)} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Foto Paspor (opsional)</p>
                <label className={`block w-full p-4 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors ${passportFile ? 'border-[#3a0519] bg-[#3a0519]/5' : 'border-gray-300 hover:border-[#3a0519]/40'}`}>
                  <input type="file" accept="image/*" className="hidden" onChange={e => setPassportFile(e.target.files?.[0] || null)} />
                  <p className="text-sm font-semibold">{passportFile ? passportFile.name : 'Klik untuk upload paspor'}</p>
                </label>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <Sel label="Golongan Darah" value={form.bloodType} onChange={v => set('bloodType', v)} opts={[['','Pilih...'],['A','A'],['B','B'],['AB','AB'],['O','O']]} />
                <Inp label="Tanggal Vaksin Meningitis" type="date" value={form.vaccineDate} onChange={v => set('vaccineDate', v)} />
              </div>
              <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer hover:border-[#3a0519]/30 transition-all">
                <div className={`w-5 h-5 rounded flex items-center justify-center ${form.vaccineMeningitis ? 'bg-[#3a0519]' : 'bg-gray-200'}`}>
                  {form.vaccineMeningitis && <Check size={12} className="text-white" />}
                </div>
                <input type="checkbox" checked={form.vaccineMeningitis} onChange={e => set('vaccineMeningitis', e.target.checked)} className="hidden" />
                <span className="text-sm font-semibold">Sudah divaksin Meningitis</span>
              </label>
              <Inp label="Catatan Medis" value={form.healthNotes} onChange={v => set('healthNotes', v)} area placeholder="Alergi, riwayat penyakit, dll." />
              <hr />
              <p className="text-sm font-bold text-[#3a0519]">Kontak Darurat</p>
              <div className="grid grid-cols-3 gap-4">
                <Inp label="Nama" value={form.emergencyName} onChange={v => set('emergencyName', v)} />
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 tracking-wide">No. HP</label>
                  <div className="flex gap-1">
                    <select value={form.emergencyPhoneCode} onChange={e => set('emergencyPhoneCode', e.target.value)} className="w-20 rounded-xl border-0 py-3 px-1 text-xs font-medium ring-1 ring-gray-200 focus:ring-2 focus:ring-[#3a0519] bg-gray-50/50">{COUNTRY_CODES.map(c => <option key={c} value={c}>{c}</option>)}</select>
                    <input value={form.emergencyPhone} onChange={e => set('emergencyPhone', e.target.value.replace(/\D/g,''))} className="flex-1 rounded-xl border-0 py-3 px-3 text-sm font-medium ring-1 ring-gray-200 focus:ring-2 focus:ring-[#3a0519] bg-gray-50/50" />
                  </div>
                </div>
                <Inp label="Hubungan" value={form.emergencyRelation} onChange={v => set('emergencyRelation', v)} />
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
              <Rev title="Data Diri" rows={[['Nama', form.fullName],['NIK', form.nik || '-'],['Gender', form.gender === 'MALE' ? 'Laki-laki' : form.gender === 'FEMALE' ? 'Perempuan' : '-']]} />
              <Rev title="Kontak" rows={[['HP', `${form.phoneCode}${form.phone}`],['WA', form.whatsapp ? `${form.whatsappCode}${form.whatsapp}` : '-'],['Email', form.email || '-'],['Alamat', `${form.address || '-'}, ${form.city || '-'}`]]} />
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
