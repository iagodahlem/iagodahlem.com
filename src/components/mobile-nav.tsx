'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { NAV_LINKS } from './site-header'

/**
 * Mobile-only nav (<sm): a "Menu" button that reveals the same links the
 * desktop nav shows inline, in a lightweight dropdown — no backdrop, no
 * scroll lock, matching the live site's collapsed-menu behavior at small
 * viewports. Hidden entirely at sm and up, where SiteHeader's inline nav
 * takes over.
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative sm:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        className="font-heading text-[21px] font-bold leading-[normal] link-fade"
      >
        Menu
      </button>

      <nav
        id="mobile-nav-menu"
        inert={!isOpen}
        className={`absolute top-full right-0 mt-6 flex flex-col items-end gap-4 font-heading text-[21px] font-bold leading-[normal] transition-all duration-200 ease-out ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="link-fade"
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
