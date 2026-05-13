// ============================================
// ERP API Client — Official Website → ERP Communication
// ============================================
// Server-side: uses ERP_API_URL (internal, not exposed to browser)
// Client-side: uses NEXT_PUBLIC_ERP_API_URL (exposed to browser)

const getBaseUrl = () => {
  if (typeof window === 'undefined') {
    // Server-side
    return process.env.ERP_API_URL || 'http://localhost:3000';
  }
  // Client-side
  return process.env.NEXT_PUBLIC_ERP_API_URL || 'http://localhost:3000';
};

// ─── Types ───────────────────────────────────
export interface ERPPackage {
  id: string;
  name: string;
  type: string;
  description: string | null;
  priceQuad: number;
  priceTriple: number;
  priceDouble: number;
  priceSingle: number;
  currency: string;
  durationDays: number;
  durationNights: number;
  includes: string | null;
  excludes: string | null;
  hotelMakkah: string | null;
  hotelMadinah: string | null;
  airline: string | null;
  coverImage: string | null;
}

export interface RegistrationResult {
  success: boolean;
  customerId?: string;
  customerName?: string;
  booking?: {
    id: string;
    bookingCode: string;
    priceTotal: number;
    remainingAmount: number;
  } | null;
  error?: string;
}

export interface BookingLookupResult {
  success: boolean;
  booking?: {
    id: string;
    bookingCode: string;
    status: string;
    roomType: string | null;
    priceTotal: number;
    paidAmount: number;
    remainingAmount: number;
    currency: string;
    createdAt: string;
    customer: {
      id: string;
      fullName: string;
      phone: string | null;
      whatsapp: string | null;
      email: string | null;
    };
    package: {
      id: string;
      name: string;
      type: string;
      durationDays: number;
      durationNights: number;
    } | null;
    payments: {
      id: string;
      amount: number;
      method: string | null;
      bankName: string | null;
      referenceNumber: string | null;
      status: string;
      paidAt: string | null;
      notes: string | null;
      createdAt: string;
    }[];
  };
  error?: string;
}

// ─── API Functions ───────────────────────────

/**
 * Fetch all active packages from the ERP system.
 * Uses ISR (revalidate every 5 minutes) on the server side.
 */
export async function fetchActivePackages(): Promise<ERPPackage[]> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/public/packages`, {
      next: { revalidate: 300 }, // ISR: refresh every 5 minutes
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.success) return data.packages;
    throw new Error(data.error || 'Unknown error');
  } catch (error) {
    console.error('[ERP API] fetchActivePackages failed:', error);
    return [];
  }
}

/**
 * Submit jamaah registration form to the ERP system.
 * Creates a Customer record (and optionally a Booking) in the ERP database.
 */
export async function submitRegistration(formData: FormData): Promise<RegistrationResult> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/public/register`, {
      method: 'POST',
      body: formData,
    });
    return await res.json();
  } catch (error) {
    console.error('[ERP API] submitRegistration failed:', error);
    return { success: false, error: 'Gagal terhubung ke server. Silakan coba lagi.' };
  }
}

/**
 * Look up a booking by code + phone number for verification.
 */
export async function lookupBooking(bookingCode: string, phone: string): Promise<BookingLookupResult> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/public/booking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingCode, phone }),
    });
    return await res.json();
  } catch (error) {
    console.error('[ERP API] lookupBooking failed:', error);
    return { success: false, error: 'Gagal terhubung ke server. Silakan coba lagi.' };
  }
}

/**
 * Submit payment proof for an existing booking.
 */
export async function submitPayment(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/public/payment`, {
      method: 'POST',
      body: formData,
    });
    return await res.json();
  } catch (error) {
    console.error('[ERP API] submitPayment failed:', error);
    return { success: false, error: 'Gagal terhubung ke server. Silakan coba lagi.' };
  }
}

/**
 * Format currency in IDR.
 */
export function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}
