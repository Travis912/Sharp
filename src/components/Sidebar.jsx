import React, { useEffect, useState, useRef } from 'react'
import './sidebar.css'

const navItems = [
  { id: 'activity-notes', label: 'Activity Notes' },
  { id: 'quotes', label: 'Quotes' },
  { id: 'docs', label: 'Docs' },
]

const docsOptions = [
  { key: 'endorsements', label: 'Endorsements' },
  { key: 'IPFS', label: 'IPFS' },
  { key: 'GRID', label: 'GRID' },
  { key: 'examples', label: 'Examples' },
  { key: 'faq', label: 'FAQ' },
]

export default function Sidebar({ onDocsChange = () => {} }) {
  const [active, setActive] = useState('activity-notes')
  const [docsOpen, setDocsOpen] = useState(false)
  const [activeDoc, setActiveDoc] = useState(docsOptions[0].key)
  const sidebarRef = useRef(null)

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.45 }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id)
      })
    }, observerOptions)

    navItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleClick = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
    // close the docs dropdown if another nav item is selected
    setDocsOpen(false)
  }

  const toggleDocs = (e) => {
    e.preventDefault()
    const el = document.getElementById('docs')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setDocsOpen((s) => !s)
    setActive('docs')
  }

  const handleDocsOption = (key) => (e) => {
    e.preventDefault()
    setActiveDoc(key)
    onDocsChange(key)
    // make sure the docs nav is active, then scroll to the docs section
    setActive('docs')
    const el = document.getElementById('docs')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // close the docs dropdown after selecting an option
    setDocsOpen(false)
  }

  // close docs dropdown when clicking outside the sidebar
  useEffect(() => {
    function onDocPointer(e) {
      if (!sidebarRef.current) return
      if (!sidebarRef.current.contains(e.target)) {
        setDocsOpen(false)
      }
    }

    document.addEventListener('pointerdown', onDocPointer)
    return () => document.removeEventListener('pointerdown', onDocPointer)
  }, [])

  return (
    <nav className="sidebar" aria-label="Primary" ref={sidebarRef}>
      <ul>
        {navItems.map((item) => (
          <li
            key={item.id}
            onMouseEnter={item.id === 'docs' ? () => setDocsOpen(true) : undefined}
            onMouseLeave={item.id === 'docs' ? () => setDocsOpen(false) : undefined}
          >
            {item.id === 'docs' ? (
              <>
                {/* open/close on hover: pointer enter/leave on the list item */}
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.getElementById(item.id)
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    setActive(item.id)
                  }}
                  onFocus={() => setDocsOpen(true)}
                  onBlur={() => setDocsOpen(false)}
                  aria-haspopup="true"
                  aria-expanded={docsOpen}
                  className={active === item.id ? 'active' : ''}
                >
                  {item.label}
                </a>
                {/* always render dropdown but toggle its visible/open class so we can animate */}
                <ul className={"dropdown" + (docsOpen ? ' open' : '')}>
                  {docsOptions.map((opt) => (
                    <li key={opt.key}>
                      <a
                        href={`#docs-${opt.key}`}
                        onClick={handleDocsOption(opt.key)}
                        className={activeDoc === opt.key ? 'active' : ''}
                      >
                        {opt.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <a
                href={`#${item.id}`}
                onClick={handleClick(item.id)}
                className={active === item.id ? 'active' : ''}
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
