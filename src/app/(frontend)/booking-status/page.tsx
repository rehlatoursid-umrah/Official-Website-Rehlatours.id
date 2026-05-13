'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, ArrowLeft, Package, CreditCard, Clock, CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react'

const ERP = process.env.NEXT_PUBLIC_ERP_API_URL || 'http://localhost:3000'
const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`

const statusMap: Record<string, { color: string; icon: any; label: string }> = {
  PENDING: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Menunggu' },
  CONFIRMED: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle2, label: 'Dikonfirmasi' },
  DP_PAID: { color: 'bg-indigo-100 text-indigo-800', icon: CreditCard, label: 'DP Dibayar' },
  FULLY_PAID: { color: 'bg-green-100 text-green-800', icon: CheckCircle2, label: 'Lunas' },
  CANCELLED: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Dibatalkan' },
  REFUNDED: { color: 'bg-gray-100 text-gray-800', icon: AlertCircle, label: 'Refund' },
}

export default function BookingStatusPage() {
  const [code, setCode] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [booking, setBooking] = useState<any>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim() || !phone.trim()) { setError('Kode booking dan nomor HP wajib diisi'); return }
    setLoading(true); setError(''); setBooking(null)
    try {
      const res = await fetch(`${ERP}/api/public/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingCode: code.trim(), phone: phone.trim() }),
      })
      const data = await res.json()
      if (data.success) setBooking(data.booking)
      else setError(data.error || 'Booking tidak ditemukan')
    } catch { setError('Gagal terhubung ke server') }
    finally { setLoading(false) }
  }

  const status = booking ? (statusMap[booking.status] || statusMap.PENDING) : null
  const StatusIcon = status?.icon || Clock
  const paidPercent = booking ? Math.round((booking.paidAmount / booking.priceTotal) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f9] to-white">
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft size={18} className="text-[#3a0519] group-hover:-translate-x-1 transition-transform" />
            <img src="/rehlasticky.png" alt="Rehla" className="w-8 h-8 object-contain" onError={e => (e.currentTarget.style.display = 'none')} />
            <div>
              <h1 className="text-sm font-bold text-[#3a0519]">REHLATOURS.ID</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Cek Status Booking</p>
            </div>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Search Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#3a0519]/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search size={28} className="text-[#3a0519]" />
            </div>
            <h2 className="text-2xl font-bold text-[#3a0519]">Cek Status Booking</h2>
            <p className="text-sm text-gray-500 mt-1">Masukkan kode booking dan nomor HP untuk melihat status</p>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Kode Booking</label>
              <input value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="BK-2026-0001" className="w-full rounded-xl border-0 py-3 px-4 text-gray-900 ring-1 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-[#3a0519] focus:outline-none text-sm font-mono font-bold tracking-wider bg-gray-50/50" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Nomor HP</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="081234567890" className="w-full rounded-xl border-0 py-3 px-4 text-gray-900 ring-1 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-[#3a0519] focus:outline-none text-sm font-medium bg-gray-50/50" />
            </div>
            {error && <p className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-[#3a0519] text-white py-3 rounded-xl font-bold hover:bg-[#5a0826] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
              {loading ? 'Mencari...' : 'Cari Booking'}
            </button>
          </form>
        </motion.div>

        {/* Results */}
        {booking && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Status Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Kode Booking</p>
                  <p className="text-2xl font-bold font-mono text-[#3a0519]">{booking.bookingCode}</p>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${status?.color}`}>
                  <StatusIcon size={16} />
                  {status?.label}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Terbayar</span>
                  <span>{paidPercent}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#3a0519] to-[#6b1035] rounded-full transition-all duration-1000" style={{ width: `${paidPercent}%` }} />
                </div>
              </div>

              {/* Financial */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#faf8f9] rounded-xl p-4 text-center">
                  <p className="text-[10px] font-bold text-gray-500 uppercase">Total</p>
                  <p className="text-lg font-bold text-[#3a0519]">{fmt(booking.priceTotal)}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-bold text-green-600 uppercase">Terbayar</p>
                  <p className="text-lg font-bold text-green-700">{fmt(booking.paidAmount)}</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-bold text-orange-600 uppercase">Sisa</p>
                  <p className="text-lg font-bold text-orange-700">{fmt(booking.remainingAmount)}</p>
                </div>
              </div>
            </div>

            {/* Package Info */}
            {booking.package && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Package size={18} className="text-[#3a0519]" />
                  <span className="text-xs font-bold text-[#3a0519] uppercase tracking-widest">Detail Paket</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{booking.package.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{booking.package.durationDays} Hari / {booking.package.durationNights} Malam • Kamar {booking.roomType}</p>
              </div>
            )}

            {/* Payment History */}
            {booking.payments?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard size={18} className="text-[#3a0519]" />
                  <span className="text-xs font-bold text-[#3a0519] uppercase tracking-widest">Riwayat Pembayaran</span>
                </div>
                <div className="space-y-3">
                  {booking.payments.map((p: any) => (
                    <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-sm">{fmt(p.amount)}</p>
                        <p className="text-xs text-gray-500">{p.method || '-'} • {new Date(p.createdAt).toLocaleDateString('id-ID')}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${p.status === 'VERIFIED' ? 'bg-green-100 text-green-700' : p.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact CTA */}
            <div className="bg-[#3a0519] rounded-2xl p-6 text-center">
              <p className="text-white font-semibold mb-3">Butuh bantuan? Hubungi kami via WhatsApp</p>
              <a href="https://wa.me/+6283197321658" target="_blank" className="inline-block bg-[#f7c566] text-[#3a0519] px-6 py-3 rounded-xl font-bold hover:bg-[#f7c566]/90 transition-all">
                Chat WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
