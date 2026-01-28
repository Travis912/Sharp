import React, { useEffect, useRef, useState } from 'react'

export default function CustomSelect({ options = [], value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const listRef = useRef(null)
  const wrapRef = useRef(null)
  const buttonRef = useRef(null)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  // Ensure the dropdown button matches nearby input width on first render
  useEffect(() => {
    const applyInitialWidth = () => {
      try {
        const root = ref.current
        const card = root?.closest?.('.note-card') || root
        let input = card?.querySelector?.('.form-input')
        // fallback to button itself
        const btn = buttonRef.current || root?.querySelector?.('.custom-select-button')
        if (!input && btn) {
          // if there's no form-input, use computed style of the button's parent
          const parent = btn.parentElement
          input = parent?.querySelector?.('.form-input')
        }
        const inputW = input ? Math.ceil(input.getBoundingClientRect().width) : 0
        // compute available width inside the card (prefer .card-body if present)
        const cardBody = card?.querySelector?.('.card-body') || card
        const cardRect = cardBody ? cardBody.getBoundingClientRect() : null
        const availableW = cardRect ? Math.max(40, Math.floor(cardRect.width - 24)) : 0
        const finalBtnW = inputW && availableW ? Math.min(inputW, availableW) : (inputW || availableW || 0)
        if (btn && finalBtnW) {
          btn.style.width = `${finalBtnW}px`
          btn.style.minWidth = `${finalBtnW}px`
          btn.style.boxSizing = 'border-box'
        }
      } catch (err) {
        // ignore
      }
    }

    applyInitialWidth()
    window.addEventListener('resize', applyInitialWidth)
    const ro = new ResizeObserver(applyInitialWidth)
    const root = ref.current
    const card = root?.closest?.('.note-card') || root
    const observedEl = card?.querySelector?.('.form-input') || root?.querySelector?.('.custom-select-button')
    const cardBody = card?.querySelector?.('.card-body') || card
    if (observedEl) ro.observe(observedEl)
    if (cardBody) ro.observe(cardBody)

    return () => {
      window.removeEventListener('resize', applyInitialWidth)
      ro.disconnect()
    }
  }, [])

  const selectedIndex = options.findIndex((o) => o.key === value)
  const selected = options[selectedIndex] || options[0]

  useEffect(() => {
    if (open) {
      // set focused index to selected when opening
      setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0)
      // focus first item via timeout to ensure rendering
      setTimeout(() => {
        const el = listRef.current?.querySelector('[data-index="0"]')
        el?.focus()
      }, 0)
      // Measure matching form input width and apply to dropdown wrap
      const applyWidth = () => {
        try {
          const root = ref.current
          const card = root?.closest?.('.note-card') || root
          let input = card?.querySelector?.('.form-input')
          // fallback to button width if no form-input found
          if (!input) input = root?.querySelector?.('.custom-select-button')
          const inputW = input ? Math.ceil(input.getBoundingClientRect().width) : 0
          // compute available width inside the card (prefer .card-body if present)
          const cardBody = card?.querySelector?.('.card-body') || card
          const cardRect = cardBody ? cardBody.getBoundingClientRect() : null
          const availableW = cardRect ? Math.max(40, Math.floor(cardRect.width - 24)) : 0

          // measure the widest option if the list exists
          let maxOptW = 0
          const items = listRef.current?.querySelectorAll?.('.custom-select-item') || []
          items.forEach((it) => {
            const r = it.getBoundingClientRect()
            if (r.width > maxOptW) maxOptW = Math.ceil(r.width)
          })

          let finalW = Math.max(inputW, maxOptW) || inputW || maxOptW || 0
          // cap to available card width to avoid horizontal overflow / scrollbar
          if (availableW) finalW = Math.min(finalW, availableW)
          if (wrapRef.current && finalW) {
            // set width/minWidth and also maxWidth to avoid overflow
            wrapRef.current.style.width = `${finalW}px`
            wrapRef.current.style.minWidth = `${finalW}px`
            wrapRef.current.style.maxWidth = `${availableW || finalW}px`
          }
          // also set the button width so it matches the dropdown and input (but cap to availableW)
          const btn = buttonRef.current || root?.querySelector?.('.custom-select-button')
          const btnW = availableW ? Math.min(finalW, availableW) : finalW
          if (btn && btnW) {
            btn.style.width = `${btnW}px`
            btn.style.minWidth = `${btnW}px`
            btn.style.boxSizing = 'border-box'
          }
        } catch (err) {
          // ignore measurement errors
        }
      }

      applyWidth()
      const ro = new ResizeObserver(applyWidth)
      // observe the input/button, the card body and the list for content or size changes
      const root = ref.current
      const card = root?.closest?.('.note-card') || root
      const observedEl = card?.querySelector?.('.form-input') || root?.querySelector?.('.custom-select-button')
      const cardBody = card?.querySelector?.('.card-body') || card
      if (observedEl) ro.observe(observedEl)
      if (cardBody) ro.observe(cardBody)
      if (listRef.current) ro.observe(listRef.current)
      window.addEventListener('resize', applyWidth)
      const cleanup = () => {
        ro.disconnect()
        window.removeEventListener('resize', applyWidth)
      }
      // store cleanup to run when effect re-runs or closes
      ;(listRef.current || {}).__cleanup = cleanup
    }
    // when closing, run stored cleanup if any
    return () => {
      const stored = (listRef.current || {}).__cleanup
      if (stored) stored()
    }
  }, [open])

  const moveFocus = (dir) => {
    setFocusedIndex((prev) => {
      const next = Math.max(0, Math.min(options.length - 1, (prev === -1 ? 0 : prev) + dir))
      const item = listRef.current?.querySelector(`[data-index=\"${next}\"]`)
      item?.focus()
      item?.scrollIntoView({ block: 'nearest' })
      return next
    })
  }

  const onKeyDown = (e) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        setOpen(true)
        return
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      moveFocus(1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      moveFocus(-1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const opt = options[focusedIndex]
      if (opt) {
        onChange(opt.key)
        setOpen(false)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    }
  }

  return (
    <div className="custom-select" ref={ref} onKeyDown={onKeyDown}>
      <button
        type="button"
        ref={buttonRef}
        className={`custom-select-button ${open ? 'open' : ''}`}
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="custom-select-label">{selected?.label}</span>
        <svg className="custom-select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="#9aa4b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {open && (
        <div className="custom-select-list-wrap" ref={wrapRef}>
          <ul className="custom-select-list" role="listbox" ref={listRef} tabIndex={-1}>
            {options.map((opt, idx) => (
              <li key={opt.key}>
                <button
                  id={`cs-opt-${opt.key}`}
                  data-index={idx}
                  type="button"
                  role="option"
                  aria-selected={opt.key === value}
                  tabIndex={-1}
                  className={`custom-select-item ${opt.key === value ? 'active' : ''}`}
                  onClick={() => {
                    onChange(opt.key)
                    setOpen(false)
                  }}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
