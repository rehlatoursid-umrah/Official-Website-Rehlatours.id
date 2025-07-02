import { usePathname } from 'next/navigation'

/**
 * Mengembalikan true jika path saat ini adalah /packages/[id] (bukan /packages atau sub-path lain)
 */
export function useIsPackagesDetailPage(): boolean {
  const pathname = usePathname()
  // .test() mengembalikan boolean
  return /^\/packages\/[^\/]+$/.test(pathname)
}
