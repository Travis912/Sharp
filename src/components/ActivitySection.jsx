import React, { useState, useEffect } from 'react'
import ActivityForm from './ActivityForm'

export default function ActivitySection() {
  const activityOptionLabels = [
    'A - Add Vehicle',
    'A - Add Driver',
    'A - SOV',
    'A - Delete Driver',
    'A - Delete Vehicle',
    'A - Delete Lienholder',
    'A - Cancellation',
    'A - Retention Checklist',
    'A - Change Coverage',
    'A - Change Coverage (Parking)',
    'A - Change Lienholder',
    'A - Change address',
    'A&P - Change Address',
    'P - Change Address',
    'P - Add Insured',
    'P - Add Location',
    'P - Delete Insured',
    'P - Delete Location',
    'P - Change Coverage',
    'P - Change Mortgagee',
    'P - Updates',
    'P - Cancellation',
    'P - Retention Checklist',
    'Change Bank Account',
    'Change Payment Plan',
    'Change Payment Date',
    'Change Name',
    'Payment over phone',
    'Payment made at reception',
    'SNB - New Business Auto',
    'SNB - New Business Property',
    'TL - Grid Rated NB',
    'TL - Commercial Referral',
    'TL - Phone Call Review',
    'TL - Remarket Request',
  ]

  const slugify = (s) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  // Optional: hard-code custom notes and summaries per option key.
  // Use the generated keys (`c1-${slug}` for card1, `c3-${slug}` for card3).
  // Notes may be either:
  //  - legacy: an array of strings: ['note1', 'note2']
  //  - sections: an array of objects: [{ title: 'Docs', items: ['a', 'b'] }, { title: 'Other', items: [...] }]
  // Example legacy: { 'c1-a-add-vehicle': ['Doc A', 'Doc B'] }
  // Example sections: { 'c1-a-add-vehicle': [{ title: 'Required', items: ['Doc A', 'Doc B'] }] }
  const card1CustomNotes = {
    'c1-a-add-vehicle': ['BOS', 'Signed TPL form if TPL only','VIR if 12+ years old', '#VIR', 'Update Wawanesa & SGIs portals when received', 'Set an abeyance to follow up on VIR / BOS if needed', 'Tell client if they want full coverage to ask for it when they send in the VIR', '#If financed need address','#Issue a 30 day pink slip', 'Binder = Pol #', 'Enter vehicle info', 'Enter insurance company in capitals', 'Only list Auto named insureds'],
    'c1-a-add-driver': ['DASH', 'Request MVR via portal', '#Questions', 'Who & why are we adding?', 'Do they have own insurance policy?', 'Traffic tickets in last 3 years?', 'Accidents in past 6 years?', 'License suspenions in past 3 years?'],
    'c1-a-sov': ['BOS', 'Signed TPL form if TPL only','VIR if 12+ years old','#VIR','Update Wawanesa & SGIs portals when received', 'Set an abeyance to follow up on VIR / BOS if needed', 'Tell client if they want full coverage to ask for it when they send in the VIR', '#Go into vehicle and edit VIN, cheaper then deleting and adding a vehicle', '#If financed need address','#Issue a 30 day pink slip', 'Binder = Pol #', 'Enter vehicle info', 'Enter insurance company in capitals', 'Only list Auto named insureds'],
    'c1-a-delete-driver': ['', '#Can do over email'],
    'c1-a-delete-vehicle': ['#Can do over email', '#Make sure all drivers assigned to vehicle', '#Can only backdate if', 'Total loss ( effective 1 day after total loss, or 1 day after rental was returned)' , 'Sold', 'Got insurance elsewhere (needs proof with pol # & effective date)'],
    'c1-a-delete-lienholder': ['', '#Can do over email'],
    'c1-a-cancellation': ['Signed Cancellation Form ( eSharp.Docs, and email to all named insureds )', 'Make any policy changes before cancelling', '#Advise', 'Advise client accordingly to avoid gaps in insurance coverage', 'Do not cancel insurance on seasonally rated vehicles during off-season',  '#Intact', 'If cancelling upon renewal, email to do it'],
    'c1-a-retention-checklist': ['Verification steps completed', 'Follow-up actions required'],
    'c1-a-change-coverage': ['VIR for Section C (Coll/Comp) if 12+ yrs old', '#Parking', 'Must be on private property (No street parking)', 'Must be for 45+ days', 'If Wawa, you manually delete the coverages', 'do not park seasonally rated vehicles'],
    'c1-a-change-coverage-parking':  ['#Ask', 'Why parking', 'How long', 'Advise they must call to unpark', '#Parking musts', 'Must be on private property (No street parking)', 'Must be for 45+ days', 'Must have comp, if 12+ years old needs VIR to add comp','Do not park seasonally rated vehicles', '#Wawanesa', 'Maually delete all coverages & note what you deleted', 'No minimum days for wawa','#Intact', 'Need signed SEF16', 'Add SEF 16 to park & do not delete it when removing parking', 'Add SEF 17 to unpark', 'if < 45 days & unparking, SEF 17 effective date should be same as when SEF 16 was added, will have to call UW', '#Economical','Check or uncheck suspension of coverage box'],
    'c1-a-change-lienholder': ['#Create COI', 'GRC = INCLUDED', 'Policy date = today', 'Expirey date = date policy expires', 'Update Loss Payee', 'Insert coverage amounts', 'Put your name on form', '#Can do over email'],
    'c1-a-change-address': ['#Update', 'Update mailing address?', ],
    'c1-a-p-change-address': ['#Update', 'Update mailing address?', ],
    'c1-p-change-address': ['#Update', 'Update mailing address?', ],
    'c1-p-add-insured': ['#Questions', 'Who & Why are we adding?'],
    'c1-p-add-location': [''],
    'c1-p-delete-insured': [''],
    'c1-p-delete-location': [''],
    'c1-p-change-coverage': ['Location', 'Coverages changed', 'Payment adjustments'],
    'c1-p-change-mortgagee': ['#Create COI', 'GRC = INCLUDED', 'Policy date = eff date', 'Update Loss Payee', 'Insert coverage amounts', 'Put your name on form', '#Can do over email'],
    'c1-p-updates': [''],
    'c1-p-cancellation': ['Signed Cancellation Form ( eSharp.Docs, and email to all named insureds )', '#Advise', 'Advise client accordingly to avoid gaps in insurance coverage', '#Intact', 'If cancelling upon renewal, email to do it'],
    'c1-p-retention-checklist': [''],
    'c1-snb-new-business-auto': ['DASH', 'Request MVR via portal', 'Signed App', 'Signed TPL form if TPL only', 'Signed client consent', 'Signed MAC if monthly payments', 'VOID cheque', 'Any signed forms for declinded coverages if needed', 'VIR if > 12yrs old for coll / comp', '#Set abeyance to SNB - 3 Support', '#If IPFS collect downpayment & update payment sheet', '#Get credit consent over phone before letting client go', '#On pink slip use quote # as binder #', '#Only Wawanesa if property is with them', '#SGI TPL only requires TL approval'],
    'c1-snb-new-business-property': ['Signed App', 'Signed client consent', 'Any signed forms for declinded coverages if needed', 'Signed MAC if monthly payments',  'VOID cheque', 'iClarify', '#Set abeyance to SNB - 3 Support', '#Get credit consent over phone before letting client go'],
    'c1-change-bank-account': ['#No Abeyance needed', '#Travelers', 'Email void cheque to change payment info', '#Intact', 'Call to change bank info',],
    'c1-change-payment-plan': ['#Monthly payment plan', 'Need signed MAC form','need a VOID cheque', '#One-pay payment plan','Slighlty cheaper due to no payment plan fee'],
    'c1-change-payment-date': [''],
    'c1-change-name': ['Government ID with new name', '#If Auto Policy: Issue a 30 day pink slip', 'Binder = Pol #', 'Enter vehicle info', 'Enter insurance company in capitals', 'Only list Auto named insureds', '#Update', 'TBW', 'All portal policies', 'If Wawa, amend & bind each policy to update them', 'Do not change TBW client code'],
    'c1-payment-over-phone': ['#Sharp', 'Service fee on cc payments to sharp', 'Can us mobile banking app: Search for Sharp as payee (Not Ontario), Use account #', 'Get client to send proof of payment', 'Use customer care dropdown, then make a payment','#Economical', 'Go to eco make a payment','No Visa Debit, must be CC','Need account # & policy #', '#Intact', 'For EFT transfer search for Intact Insurance as a payee & use policy # + that final 4 digits',],
    'c1-payment-made-at-reception': [''],
    'c1-tl-grid-rated-nb': ['#Needs TL approval to do'],
    'c1-tl-commercial-referral': ['#Needs TL approval to do'],
    'c1-tl-phone-call-review': ['#Needs TL approval to do'],
    'c1-tl-remarket-request': ['#Needs TL approval to do'],
  }

  const card3CustomSummaries = {
    'c3-a-add-vehicle': ['BOS', 'Signed TPL form if TPL only','VIR if 12+ years old', '#VIR', 'Update Wawanesa & SGIs portals when received', 'Set an abeyance to follow up on VIR / BOS if needed', 'Tell client if they want full coverage to ask for it when they send in the VIR', '#If financed need address','#Issue a 30 day pink slip', 'Binder = Pol #', 'Enter vehicle info', 'Enter insurance company in capitals', 'Only list Auto named insureds'],
    'c3-a-add-driver': ['DASH', 'Request MVR via portal', '#Questions', 'Who & why are we adding?', 'Do they have own insurance policy?', 'Traffic tickets in last 3 years?', 'Accidents in past 6 years?', 'License suspenions in past 3 years?'],
    'c3-a-sov':  ['BOS', 'Signed TPL form if TPL only','VIR if 12+ years old','#VIR', 'Update Wawanesa & SGIs portals when received', 'Set an abeyance to follow up on VIR / BOS if needed', 'Tell client if they want full coverage to ask for it when they send in the VIR', '#Go into vehicle and edit VIN, cheaper then deleting and adding a vehicle', '#If financed need address','#Issue a 30 day pink slip', 'Binder = Pol #', 'Enter vehicle info', 'Enter insurance company in capitals', 'Only list Auto named insureds'],
    'c3-a-delete-driver': ['', '#Can do over email'],
    'c3-a-delete-vehicle': ['#Can do over email', '#Make sure all drivers assigned to vehicle', '#Can only backdate if', 'Total loss ( effective 1 day after total loss, or 1 day after rental was returned)' , 'Sold', 'Got insurance elsewhere (needs proof with pol # & effective date)'],
    'c3-a-delete-lienholder': ['', '#Can do over email'],
    'c3-a-cancellation': ['Signed Cancellation Form ( eSharp.Docs, and email to all named insureds )', 'Make any policy changes before cancelling', '#Advise', 'Advise client accordingly to avoid gaps in insurance coverage', 'Do not cancel insurance on seasonally rated vehicles during off-season',  '#Intact', 'If cancelling upon renewal, email to do it'],
    'c3-a-retention-checklist': ['Verification steps completed', 'Follow-up actions required'],
    'c3-a-change-coverage': ['VIR for Section C (Coll/Comp) if 12+ yrs old', '#Parking', 'Must be on private property (No street parking)', 'Must be for 45+ days', 'If Wawa, you manually delete the coverages', 'do not park seasonally rated vehicles'],
    'c3-a-change-lienholder': ['#Create COI', 'GRC = INCLUDED', 'Policy date = today', 'Expirey date = date policy expires', 'Update Loss Payee', 'Insert coverage amounts', 'Put your name on form', '#Can do over email'],
    'c3-a-change-address': ['#Update', 'Update mailing address?', ],
    'c3-a-p-change-address': ['#Update', 'Update mailing address?', ],
    'c3-p-change-address': ['#Update', 'Update mailing address?', ],
    'c3-p-add-insured': ['#Questions', 'Who & Why are we adding?'],
    'c3-p-add-location': [''],
    'c3-p-delete-insured': [''],
    'c3-p-delete-location': [''],
    'c3-p-change-coverage': ['Location', 'Coverages changed', 'Payment adjustments'],
    'c3-a-change-coverage-parking': ['#Ask', 'Why parking', 'How long', 'Advise they must call to unpark', '#Parking musts', 'Must be on private property (No street parking)', 'Must be for 45+ days', 'Must have comp, if 12+ years old needs VIR to add comp','Do not park seasonally rated vehicles', '#Wawanesa', 'Maually delete all coverages & note what you deleted', 'No minimum days for wawa','#Intact', 'Need signed SEF16', 'Add SEF 16 to park & do not delete it when removing parking', 'Add SEF 17 to unpark', 'if < 45 days & unparking, SEF 17 effective date should be same as when SEF 16 was added, will have to call UW', '#Economical','Check or uncheck suspension of coverage box'],
    'c3-p-change-mortgagee': ['#Create COI', 'GRC = INCLUDED', 'Policy date = eff date', 'Update Loss Payee', 'Insert coverage amounts', 'Put your name on form', '#Can do over email'],
    'c3-p-updates': [''],
    'c3-p-cancellation': ['Signed Cancellation Form ( eSharp.Docs, and email to all named insureds )', '#Advise', 'Advise client accordingly to avoid gaps in insurance coverage',  '#Intact', 'If cancelling upon renewal, email to do it'],
    'c3-p-retention-checklist': [''],
    'c3-snb-new-business-auto': ['DASH', 'Request MVR via portal', 'Signed App', 'Signed TPL form if TPL only', 'Signed client consent', 'Signed MAC if monthly payments', 'VOID cheque', 'Any signed forms for declinded coverages if needed', 'VIR if > 12yrs old for coll / comp', '#Set abeyance to SNB - 3 Support', '#If IPFS collect downpayment & update payment sheet', '#Get credit consent over phone before letting client go', '#On pink slip use quote # as binder #', '#Only Wawanesa if property is with them', '#SGI TPL only requires TL approval'],
    'c3-snb-new-business-property': ['Signed App', 'Signed client consent', 'Any signed forms for declinded coverages if needed', 'Signed MAC if monthly payments',  'VOID cheque', 'iClarify', '#Set abeyance to SNB - 3 Support', '#Get credit consent over phone before letting client go'],
    'c3-change-bank-account': ['#No Abeyance needed', '#Travelers', 'Email void cheque to change payment info', '#Intact', 'Call to change banking info',],
    'c3-change-payment-plan': ['#Monthly payment plan', 'Need signed MAC form','need a VOID cheque', '#One-pay payment plan','Slighlty cheaper due to no payment plan fee'],
    'c3-change-payment-date': [''],
    'c3-change-name': ['Government ID with new name', '#If Auto Policy: Issue a 30 day pink slip', 'Binder = Pol #', 'Enter vehicle info', 'Enter insurance company in capitals', 'Only list Auto named insureds', '#Update', 'TBW', 'All portal policies', 'If Wawa, amend & bind each policy to update them', 'Do not change TBW client code'],
    'c3-payment-over-phone': ['#Sharp', 'Service fee on cc payments to sharp', 'Can us mobile banking app: Search for Sharp as payee (Not Ontario), Use account #', 'Get client to send proof of payment', 'Use customer care dropdown, then make a payment','#Economical', 'Go to eco make a payment','No Visa Debit, must be CC','Need account # & policy #', '#Intact', 'For EFT transfer search for Intact Insurance as a payee & use policy # + that final 4 digits',],
    'c3-payment-made-at-reception': [''],
    'c3-tl-grid-rated-nb': ['#Needs TL approval to do'],
    'c3-tl-commercial-referral': ['#Needs TL approval to do'],
    'c3-tl-phone-call-review': ['#Needs TL approval to do'],
    'c3-tl-remarket-request': ['#Needs TL approval to do'],
  }

  // Helper: normalize notes into sections.
  // Supported input formats:
  //  - sections (array of objects): [{ title: 'Docs needed:', items: ['a','b'] }, ...]
  //  - legacy array of strings: ['item1', '## Heading', 'item2']
  //    If a string starts with '#' (one or more), it's treated as a section heading.
  //  - single string: becomes one section with that line as an item.
  const normalizeNotes = (notes) => {
    if (!notes) return []
    if (Array.isArray(notes)) {
      // Already sections?
      if (notes.length > 0 && typeof notes[0] === 'object') {
        return notes.map((s) => ({ title: s.title ?? 'Docs needed:', items: Array.isArray(s.items) ? s.items : [] }))
      }

      const sections = []
      let current = null
      for (const entry of notes) {
        if (entry && typeof entry === 'string') {
          const m = entry.match(/^\s*#+\s*(.+)$/)
          if (m) {
            // start new section with heading text
            current = { title: m[1].trim().endsWith(':') ? m[1].trim() : m[1].trim() + ':' , items: [] }
            sections.push(current)
            continue
          }

          if (!current) {
            current = { title: 'Docs needed:', items: [] }
            sections.push(current)
          }
          current.items.push(entry)
        } else if (entry && typeof entry === 'object') {
          // object in array -> treat as section-like
          const sec = { title: entry.title ?? 'Docs needed:', items: Array.isArray(entry.items) ? entry.items : [] }
          sections.push(sec)
          current = sec
        }
      }
      return sections
    }

    if (typeof notes === 'string') {
      const lines = notes.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
      return [{ title: 'Docs needed:', items: lines }]
    }

    return []
  }

  const getFormSchema = (label) => {
    if (!label) return undefined
    const lower = label.toLowerCase()
    const slug = slugify(label)

    
    if (lower.includes('change bank account')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'New Bank', label: 'New Bank', type: 'text', placeholder: 'Bank name' },
        { name: 'Next payment', label: 'Next payment', type: 'text' , placeholder: 'Dec 30 $250' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('change payment plan')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'Old plan', label: 'Old Plan', type: 'select', options: ['Full Pay', '3 Pay', 'Monthly'] },
        { name: 'New plan', label: 'New Plan', type: 'select', options: ['Full Pay', '3 Pay', 'Monthly'] },
        { name: 'Next payment', label: 'Next payment', type: 'text' , placeholder: 'Dec 30 $250' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

  if (lower.includes('change payment date')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'new date', label: 'New Date', type: 'text', placeholder: '30th' },
        { name: 'Next payment', label: 'Next payment', type: 'text' , placeholder: 'Dec 30 $250' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('change name')) {
      return [
        { name: 'old name', label: 'Old Name', type: 'text', placeholder: 'Clients previous name' },
        { name: 'current name', label: 'Current Name', type: 'text', placeholder: 'Clients full name' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'policy #', label: 'Policy #s', type: 'text' , placeholder: 'Policy numbers' },
        { name: 'gov id acquired', label: 'Gov ID acquired', type: 'select' , options: ['Yes', 'No'] },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('sov')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'oldVehicle', label: 'Old Vehicle', type: 'text', placeholder: '2014 Acura ILX' },
        { name: 'newVehicle', label: 'New Vehicle', type: 'text', placeholder: '2025 Hyundai Elentra' },
        { name: 'lease', label: 'Lease', type: 'select', options: ['Yes', 'No'] },
        { name: 'coverages', label: 'Coverages', type: 'text', placeholder: 'Added Coverages' },
        { name: 'declinedCoverages', label: 'D/c Coverages', type: 'text', placeholder: 'Coll / Comp' },
        { name: 'commute', label: 'Commute', type: 'text', placeholder: '20,000km / 7km' },
        { name: 'VIR', label: 'VIR', type: 'select', options: ['Not Required', 'Required'] },
        { name: 'newDrivers', label: 'New Drivers', type: 'text', placeholder: 'No / Yes and details' },
        { name: 'monthlyPayments', label: 'Payments', type: 'text', placeholder: 'Dec 7 - $250' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('add vehicle')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'vehicle', label: 'Vehicle', type: 'text', placeholder: '2014 Acura ILX' },
        { name: 'lease', label: 'Lease', type: 'select', options: ['Yes', 'No'] },
        { name: 'coverages', label: 'Coverages', type: 'text', placeholder: 'Added Coverages' },
        { name: 'declinedCoverages', label: 'D/c Coverages', type: 'text', placeholder: 'Coll / Comp' },
        { name: 'commute', label: 'Commute', type: 'text', placeholder: '20,000km / 7km' },
        { name: 'newDrivers', label: 'New Drivers', type: 'text', placeholder: 'No / Yes and details' },
        { name: 'VIR', label: 'VIR', type: 'select', options: ['Not Required', 'Required'] },
        { name: 'monthlyPayments', label: 'Payments', type: 'text', placeholder: 'Dec 7 - $250' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('add driver')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'driverName', label: 'Driver Name', type: 'text', placeholder: 'Driver name' },
        { name: 'drivers dob', label: 'Driver DOB', type: 'text', placeholder: 'Drivers date of birth' },
        { name: 'license', label: 'License #', type: 'text', placeholder: 'License number' },
        { name: 'date licensed', label: 'Date Licensed', type: 'text', placeholder: 'Date licensed as a Class 5' },
        { name: 'drivers training', label: 'Drivers Training', type: 'select', options: ['No', 'Yes'] },
        { name: 'V assigned', label: 'V assigned', type: 'text', placeholder: 'Vehicle the driver is assigned to' },
        { name: 'coverages', label: 'Coverages', type: 'text', placeholder: 'Coverages' },
        { name: 'commute', label: 'Commute', type: 'text', placeholder: '1 way Commute distance' },
        { name: 'monthlyPayments', label: 'Payments', type: 'text', placeholder: 'Dec 7 - $250' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('a - cancellation')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'reason', label: 'Reason', type: 'select' , options: ['Sold Vehicle', 'Lost to competitor', 'Vehicle Sold', 'Left Market Area', 'Vehicle total Loss', 'Remarket / Rewritten', 'Deceased'] },
        { name: 'retention', label: 'Retention', type: 'select' , options: ['Remarket: declined', 'Remarket: Cant beat competitor', 'Sold & Not Replaced', 'Left Market Area', 'Vehicle total Loss', 'No available Market'] },
        { name: 'Xln Fees', label: 'Advised Xln Fees', type: 'select' , options: ['Yes', 'No'] },
        { name: 'Another payment', label: 'Another payment', type: 'text' , placeholder: 'If yes, details' },
        { name: 'notes', label: 'Notes', type: 'textarea', placeholder: 'None' },
      ]
    }

    if (lower.includes('a - retention checklist')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'date received', label: 'Date Received', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'Xray', label: 'Xray', type: 'text', placeholder: '-12%' },
        { name: 'location confirmed', label: 'Location Confirmed', type: 'select' , options: ['Yes', 'No'] },
        { name: 'Vehicles confirmed', label: 'Vehicles Confirmed', type: 'select' , options: ['Yes', 'No'] },
        { name: 'Years at address', label: 'Years at Address', type: 'text', placeholder: '3' },
        { name: 'Occupation', label: 'Occupation', type: 'text', placeholder: 'Occupation' },
        { name: 'Smart Breaking', label: 'Smart Breaking', type: 'select' , options: ['No', 'Yes'] },
        { name: 'Coverages Confirmed', label: 'Coverages Confirmed', type: 'select' , options: ['Yes', 'No'] },
        { name: 'Marital Status', label: 'Marital Status', type: 'select' , options: ['Single', 'Married'] },
        { name: 'Discounts Confirmed', label: 'Discounts Confirmed', type: 'select' , options: ['Yes', 'No'] },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    // Specific: parking variant identified by slug `a-change-coverage-parking`
    if (slug === 'a-change-coverage-parking') {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'Coverage Changing', label: 'Coverage Changing', type: 'text', placeholder: 'Added SEF 16'},
        { name: 'Why', label: 'Why', type: 'text', placeholder: 'Reason for change' },
        { name: 'Usage Change', label: 'Usage Change', type: 'text', placeholder: 'Any changes in usage' },
        { name: 'Payment', label: 'Payment', type: 'text', placeholder: 'Jan 30 $255' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('a - change coverage')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'Coverage Changing', label: 'Coverage Changing', type: 'text', placeholder: 'Added Comp' },
        { name: 'Why', label: 'Why', type: 'text', placeholder: 'Reason for change' },
        { name: 'Usage Change', label: 'Usage Change', type: 'text', placeholder: 'Any changes in usage' },
        { name: 'Payment', label: 'Payment', type: 'text', placeholder: 'Jan 30 $255' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('change lienholder') || lower.includes('remove')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'Old Company', label: 'Old Company', type: 'text', placeholder: 'old company' },
        { name: 'New Company', label: 'New Company', type: 'text', placeholder: 'new company' },
        { name: 'vehicle', label: 'Vehicle', type: 'text', placeholder: '2014 Acura ILX' },
        { name: 'premium', label: 'Premium', type: 'text', placeholder: 'No Change' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('a - change address') || lower.includes('remove')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'Old Address', label: 'Old Address', type: 'text', placeholder: 'old address' },
        { name: 'New Address', label: 'New Address', type: 'text', placeholder: 'new address' },
        { name: 'vehicle', label: 'Vehicle', type: 'text', placeholder: '2014 Acura ILX' },
        { name: 'Commute Change', label: 'Commute Change', type: 'text', placeholder: 'Yes 20,000 / 7km' },
        { name: 'Coverage Change', label: 'Coverage Change', type: 'text', placeholder: 'No Change' },
        { name: 'New Drivers', label: 'New Drivers', type: 'text', placeholder: 'No' },
        { name: 'premium', label: 'Premium', type: 'text', placeholder: 'Jan 30 $174' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('delete driver') || lower.includes('remove')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'driverName', label: 'Driver Name', type: 'text', placeholder: 'Driver name' },
        { name: 'stillInHH', label: 'Still in HH?', type: 'select', options: ['Yes', 'No'] },
        { name: 'commute', label: 'Commute', type: 'text', placeholder: 'Commute distance' },
        { name: 'monthlyPayments', label: 'Payments', type: 'text', placeholder: 'Dec 7 - $250' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

     if (lower.includes('delete vehicle') || lower.includes('remove')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'vehicle', label: 'Vehicle', type: 'text', placeholder: '2014 Acura ILX' },
        { name: 'commute', label: 'Commute', type: 'text', placeholder: 'Commute distance' },
        { name: 'monthlyPayments', label: 'Payments', type: 'text', placeholder: 'Dec 7 - $250' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('delete lienholder') || lower.includes('remove')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'lienholder', label: 'Lienholder', type: 'text', placeholder: 'Lienholder company' },
        { name: 'vehicle', label: 'Vehicle', type: 'text', placeholder: '2014 Acura ILX' },
        { name: 'premium', label: 'Premium', type: 'text', placeholder: 'No Change' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('a&p - change address') || lower.includes('remove')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'Old Address', label: 'Old Address', type: 'text', placeholder: 'old address' },
        { name: 'New Address', label: 'New Address', type: 'text', placeholder: 'new address' },
        { name: 'vehicles', label: 'Vehicle(s)', type: 'text', placeholder: '2014 Acura ILX' },
        { name: 'Commute Change', label: 'Commute Change', type: 'text', placeholder: 'Yes 20,000 / 7km' },
        { name: 'Coverage Change', label: 'Coverage Change', type: 'text', placeholder: 'No Change' },
        { name: 'New Drivers', label: 'New Drivers', type: 'text', placeholder: 'No' },
        { name: 'Mortgagee', label: 'Mortgagee', type: 'text', placeholder: 'Mortgagee Name' },
        { name: 'premium', label: 'Premium', type: 'text', placeholder: 'Jan 30 $174' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('p - change address') || lower.includes('remove')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'Old Address', label: 'Old Address', type: 'text', placeholder: 'old address' },
        { name: 'New Address', label: 'New Address', type: 'text', placeholder: 'new address' },
        { name: 'Coverage Change', label: 'Coverage Change', type: 'text', placeholder: 'No Change' },
        { name: 'Mortgagee', label: 'Mortgagee', type: 'text', placeholder: 'Mortgagee Name' },
        { name: 'premium', label: 'Premium', type: 'text', placeholder: 'Jan 30 $174' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('p - add insured') || lower.includes('remove')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'Full Name', label: 'Full Name', type: 'text', placeholder: 'Travis Mounsteven' },
        { name: 'Who / Relation', label: 'Who / Relation', type: 'text', placeholder: 'Daughter' },
        { name: 'Same Address', label: 'Same Address', type: 'select', options: ['Yes', 'No'] },
        { name: 'Signed Consent', label: 'Signed Consent', type: 'select', options: ['Yes', 'No'] },
        { name: 'premium', label: 'Premium', type: 'text', placeholder: 'No Change' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('p - add location') || lower.includes('remove')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'New Location', label: 'New Location', type: 'text', placeholder: 'New location address' },
        { name: 'Coverages', label: 'Coverages', type: 'text', placeholder: 'Coverage details' },
        { name: 'D/c Coverages', label: 'D/c Coverages', type: 'text', placeholder: 'Declined Coverages' },
        { name: 'Mortgagee', label: 'Mortgagee', type: 'text', placeholder: 'Mortgagee Name' },
        { name: 'premium', label: 'Premium', type: 'text', placeholder: 'Dec 1 $200' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('p - delete insured') || lower.includes('remove')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'Full Name', label: 'Full Name', type: 'text', placeholder: 'Travis Mounsteven' },
        { name: 'Release of Interest', label: 'Release of Interest', type: 'select', options: ['Yes', 'No'] },
        { name: 'premium', label: 'Premium', type: 'text', placeholder: 'No Change' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

     if (lower.includes('p - delete location') || lower.includes('remove')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'Deleted Location', label: 'Deleted Location', type: 'text', placeholder: 'Deleted location address' },
        { name: 'Mortgagee', label: 'Mortgagee', type: 'text', placeholder: 'Mortgagee Name' },
        { name: 'premium', label: 'Premium', type: 'text', placeholder: 'Dec 1 $253' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('p - change coverage')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'location', label: 'Location', type: 'text', placeholder: 'Location address' },
        { name: 'Coverage Changing', label: 'Coverage Changing', type: 'text', placeholder: 'Added Comp' },
        { name: 'Why', label: 'Why', type: 'text', placeholder: 'Reason for change' },
        { name: 'Payment', label: 'Payment', type: 'text', placeholder: 'Feb 30 $255' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('p - change mortgagee')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'location', label: 'Location', type: 'text', placeholder: 'Location address' },
        { name: 'New Mortgagee', label: 'New Mortgagee', type: 'text', placeholder: 'New mortgagee name' },
        { name: 'Payment', label: 'Payment', type: 'text', placeholder: 'Feb 30 $255' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('p - updates')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'location', label: 'Location', type: 'text', placeholder: 'Location address' },
        { name: 'Update', label: 'Update', type: 'text', placeholder: 'Update details' },
        { name: 'Full or Partial', label: 'Full or Partial', type: 'select', options: ['Full', 'Partial'] },
        { name: 'Payment', label: 'Payment', type: 'text', placeholder: 'Feb 30 $255' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('p - cancellation')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'locations', label: 'Locations', type: 'text', placeholder: 'Location address' },
        { name: 'reason', label: 'Reason', type: 'select' , options: ['Sold Location', 'Lost to competitor', 'Left Market Area', 'Reg Letter', 'Remarket / Rewritten', 'Deceased'] },
        { name: 'retention', label: 'Retention', type: 'select' , options: ['Remarket: declined', 'Remarket: Cant beat competitor', 'Sold & Not Replaced', 'Left Market Area', 'No available Market'] },
        { name: 'Xln Fees', label: 'Advised Xln Fees', type: 'select' , options: ['Yes', 'No'] },
        { name: 'Another payment', label: 'Another payment', type: 'text' , placeholder: 'If yes, details' },
        { name: 'notes', label: 'Notes', type: 'textarea', placeholder: 'None' },
      ]
    }

    if (lower.includes('p - retention checklist')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'date received', label: 'Date Received', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'Xray', label: 'Xray', type: 'text', placeholder: '-12%' },
        { name: 'location confirmed', label: 'Location Confirmed', type: 'select' , options: ['Yes', 'No'] },
        { name: 'Years at address', label: 'Years at Address', type: 'text', placeholder: '3' },
        { name: 'Occupation', label: 'Occupation', type: 'text', placeholder: 'Occupation' },
        { name: 'RCT Done', label: 'RCT Done', type: 'select' , options: ['Yes', 'No'] },
        { name: 'Roof Update', label: 'Roof Update', type: 'text', placeholder: 'Year of roof update' },
        { name: 'Heating Update', label: 'Heating Update', type: 'text', placeholder: 'Year of heating update' },
        { name: 'Electrical Update', label: 'Electrical Update', type: 'text', placeholder: 'Year of electrical update' },
        { name: 'Plumbing Update', label: 'Plumbing Update', type: 'text', placeholder: 'Year of plumbing update' },
        { name: 'Alarm System', label: 'Alarm System', type: 'select', options: ['No', 'Yes'] },
        { name: 'Discounts Confirmed', label: 'Discounts Confirmed', type: 'select' , options: ['Yes', 'No'] },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }


    if (lower.includes('payment over phone')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'date', label: 'Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'payment type', label: 'Payment Type', type: 'select', options: ['Credit Card', 'Visa Debit'] },
        { name: 'next payment', label: 'Next payment', type: 'text' , placeholder: 'Dec 30 $250' },
        { name: 'reason', label: 'Reason', type: 'text' , placeholder: 'Reason for payment' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('payment made at reception')) {
      return [
        { name: 'caller', label: 'Caller', type: 'text', placeholder: 'Caller name' },
        { name: 'policy', label: 'Policy #', type: 'text', placeholder: 'Policy number' },
        { name: 'date', label: 'Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'reason', label: 'Reason', type: 'text' , placeholder: 'Reason for payment' },
        { name: 'confirmed by', label: 'Confirmed By', type: 'text' , placeholder: 'Name of confirmer' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('tl - grid rated nb')) {
      return [
        { name: 'client name', label: 'Client Name', type: 'text', placeholder: 'Client name' },
        { name: 'account', label: 'Account #', type: 'text', placeholder: 'Account number' },
        { name: 'insurance company', label: 'Insurance Company', type: 'select', options: ['Intact', 'Wawanesa', 'SGI', 'Economical', 'MAX', 'Forward', 'Hagerty', 'Sandbox'] },
        { name: 'type of risk', label: 'Type of Risk', type: 'text', placeholder: 'Type of risk' },
        { name: '# of claims', label: '# of Claims', type: 'text', placeholder: 'Number of claims' },
        { name: '# of convictions', label: '# of Convictions', type: 'text', placeholder: 'Number of convictions' },
        { name: '# of drivers', label: '# of Drivers', type: 'text', placeholder: 'Number of drivers' },
        { name: 'driving record', label: 'Driving Record', type: 'text', placeholder: 'Driving record details' },
        { name: 'reason', label: 'Reason', type: 'text' , placeholder: 'Reason for payment' },
        { name: 'premium', label: 'Premium', type: 'text' , placeholder: 'Premium amount' },
        { name: 'why grid', label: 'Why Grid', type: 'text' , placeholder: 'Reason for grid rating' },
        { name: 'other business w us', label: 'Other Business w us', type: 'text' , placeholder: 'Other business details' },
        { name: 'coverage requested', label: 'Coverage Requested', type: 'text' , placeholder: 'Coverage requested' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('commercial referral')) {
      return [
        { name: 'client name', label: 'Client Name', type: 'text', placeholder: 'Client full name' },
        { name: 'desired eff date', label: 'Desired Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'tbw code', label: 'TBW Code', type: 'text', placeholder: 'TBW code if we have it' },
        { name: 'business name', label: 'Business Name', type: 'text' , placeholder: 'Clients Business name' },
        { name: 'type of business', label: 'Type of Business', type: 'text' , placeholder: 'Type of business or operation' },
        { name: 'phone number', label: 'Phone Number', type: 'text' , placeholder: '### ### ####' },
        { name: 'email', label: 'Email', type: 'text' , placeholder: 'email@example.com' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('phone call review')) {
      return [
        { name: 'client name', label: 'Client Name', type: 'text', placeholder: 'Client full name' },
        { name: 'tbw code', label: 'TBW Code', type: 'text', placeholder: 'TBW code' },
        { name: 'date', label: 'Date of call', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'reason', label: 'Reason', type: 'text' , placeholder: 'Reason for review' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('remarket request')) {
      return [
        { name: 'client name', label: 'Client Name', type: 'text', placeholder: 'Client full name' },
        { name: 'tbw code', label: 'TBW Code', type: 'text', placeholder: 'TBW code' },
        { name: 'phone #', label: 'Phone #', type: 'text' , placeholder: '### ### #### & best time to call' },
        { name: 'type of business', label: 'Type of Business', type: 'text' , placeholder: 'Type of business' },
        { name: 'reason for review', label: 'Reason for Review', type: 'text' , placeholder: 'Reason for review' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('new business property')) {
      return [
        { name: 'quote', label: 'Quote #', type: 'text', placeholder: 'Quote / Submission number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'Company', label: 'Company', type: 'select', options: ['Intact Insurance', 'Economical Insurance', 'Wawanesa Insurance', 'MAX Insurance', 'Sandbox', 'Dominion'] },
        { name: 'Married', label: 'Married', type: 'select', options: ['Single', 'Married'] },
        { name: 'address', label: 'Address', type: 'text', placeholder: 'Property address' },
        { name: 'declinedCoverages', label: 'D/c Coverages', type: 'text', placeholder: 'Coll / Comp' },
        { name: 'paymentMethod', label: 'Payment Method', type: 'select', options: ['Monthly', 'Three Pay', 'One Pay', 'IPFS'] },
        { name: 'withdrawalDate', label: 'Withdrawal Date', type: 'text', placeholder: '1' },
        { name: 'Downpayment', label: 'Down Payment', type: 'select', options: ['NA', 'Made'] },
        { name: 'broker', label: 'Broker', type: 'text', placeholder: 'Travis Mounsteven' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    if (lower.includes('new business auto')) {
      return [
        { name: 'quote', label: 'Quote #', type: 'text', placeholder: 'Quote / Submission number' },
        { name: 'effectiveDate', label: 'Eff Date', type: 'date', placeholder: 'MM-DD-YYYY' },
        { name: 'Company', label: 'Company', type: 'select', options: ['Intact Insurance', 'Economical Insurance', 'SGI Insurance', 'Wawanesa Insurance', 'Hagerty'] },
        { name: 'Married', label: 'Married', type: 'select', options: ['Single', 'Married'] },
        { name: 'declinedCoverages', label: 'D/c Coverages', type: 'text', placeholder: 'Coll / Comp' },
        { name: 'paymentMethod', label: 'Payment Method', type: 'select', options: ['Monthly', 'Three Pay', 'One Pay', 'IPFS'] },
        { name: 'withdrawalDate', label: 'Withdrawal Date', type: 'text', placeholder: '1' },
        { name: 'monthlyPayments', label: 'Payments', type: 'text', placeholder: 'Dec 7 - $250' },
        { name: 'broker', label: 'Broker', type: 'text', placeholder: 'Travis Mounsteven' },
        { name: 'notes', label: 'Notes', type: 'text', placeholder: 'None' },
      ]
    }

    
  }

  const card1Options = activityOptionLabels.map((label) => ({
    key: `c1-${slugify(label)}`,
    label,
    content: `${label} — content for Card 1. Replace with your real content.`,
    notes: card1CustomNotes[`c1-${slugify(label)}`] ?? [`Notes for ${label}: add any observations or details here.`],
    formSchema: (getFormSchema(label) ?? []).map((f) => (f && f.name === 'notes' ? { ...f, type: 'textarea' } : f)),
  }))

  const card3Options = activityOptionLabels.map((label) => ({
    key: `c3-${slugify(label)}`,
    label,
    content: `${label} — content for Card 3. Replace with your real content.`,
    summary: card3CustomSummaries[`c3-${slugify(label)}`] ?? `Summary for ${label}: brief summary or action items go here.`,
    formSchema: (getFormSchema(label) ?? []).map((f) => (f && f.name === 'notes' ? { ...f, type: 'textarea' } : f)),
  }))

  const [card1View, setCard1View] = useState(card1Options[0].key)
  const [card3View, setCard3View] = useState(card3Options[0].key)

  const activeCard1 = card1Options.find((o) => o.key === card1View)
  const activeCard3 = card3Options.find((o) => o.key === card3View)

  // Toggle visibility for Card 3 (form) and Card 4 (summary)
  // Default to hidden per user request
  const [showCard34, setShowCard34] = useState(false)

  const today = (() => {
    const d = new Date()
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  })()
  const defaultForm = { caller: '', lease: 'Yes', stillInHH: 'No', ifYes: '', effDate: today, effectiveDate: today, date: today, policy: '', notes: '' }
  const [card1Forms, setCard1Forms] = useState(() => ({ [card1Options[0].key]: { ...defaultForm } }))
  const [card3Forms, setCard3Forms] = useState(() => ({ [card3Options[0].key]: { ...defaultForm } }))

  const ensureCard1Entry = (key) => {
    setCard1Forms((prev) => (prev[key] ? prev : { ...prev, [key]: { ...defaultForm } }))
  }

  const ensureCard3Entry = (key) => {
    setCard3Forms((prev) => (prev[key] ? prev : { ...prev, [key]: { ...defaultForm } }))
  }

  const handleCard1ViewChange = (key) => {
    ensureCard1Entry(key)
    setCard1View(key)
  }

  const handleCard3ViewChange = (key) => {
    ensureCard3Entry(key)
    setCard3View(key)
  }

  const updateCard1FormField = (field, value) => {
    setCard1Forms((prev) => ({ ...prev, [card1View]: { ...(prev[card1View] || {}), [field]: value } }))
  }

  const updateCard3FormField = (field, value) => {
    setCard3Forms((prev) => ({ ...prev, [card3View]: { ...(prev[card3View] || {}), [field]: value } }))
  }

  const [card1Animating, setCard1Animating] = useState(false)
  const [card3Animating, setCard3Animating] = useState(false)
  const [card1Copied, setCard1Copied] = useState(false)
  const [card3Copied, setCard3Copied] = useState(false)

  useEffect(() => {
    let t
    setCard1Animating(true)
    t = setTimeout(() => setCard1Animating(false), 360)
    return () => clearTimeout(t)
  }, [card1View])

  useEffect(() => {
    let t
    setCard3Animating(true)
    t = setTimeout(() => setCard3Animating(false), 360)
    return () => clearTimeout(t)
  }, [card3View])

  const copyFormToClipboard = async (which) => {
    try {
      const isCard1 = which === 1
      const viewKey = isCard1 ? card1View : card3View
      const options = isCard1 ? card1Options : card3Options
      const forms = isCard1 ? card1Forms : card3Forms
      const entry = forms[viewKey] || {}
      const schema = options.find((o) => o.key === viewKey)?.formSchema || []

      let lines = []
      const rawLabel = options.find((o) => o.key === viewKey)?.label || viewKey
      const cleanedLabel = (rawLabel || '').replace(/^[A-Z&]{1,4}\s*-\s*/i, '')
      const effRaw = (entry && (entry.effectiveDate || entry.effDate)) || defaultForm.effectiveDate || ''
      let eff = ''
      if (effRaw) {
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        const m = String(effRaw).match(/^(\d{4})-(\d{2})-(\d{2})$/)
        if (m) {
          const monIdx = Math.max(0, Math.min(11, Number(m[2]) - 1))
          const mon = months[monIdx] || String(Number(m[2])).padStart(2, '0')
          eff = `${mon} ${m[3]}`
        } else {
          try {
            const d = new Date(effRaw)
            if (!Number.isNaN(d.getTime())) {
              const mon = months[d.getMonth()] || String(d.getMonth() + 1).padStart(2, '0')
              const dd = String(d.getDate()).padStart(2, '0')
              eff = `${mon} ${dd}`
            }
          } catch (e) {}
        }
      }
      // Special-case SNB / SNP prefixed options: format like [ effectiveDate / NB / Company ]
      const prefixMatch = String(rawLabel).match(/^\s*([A-Za-z0-9&.]{1,6})\s*-\s*/)
      const prefix = prefixMatch ? String(prefixMatch[1]).toUpperCase() : ''
      let titleLine
      if (prefix === 'SNB' || prefix === 'SNP') {
        // Prefer the value from a schema field labelled 'Company', falling back to common keys.
        let company = ''
        const companyField = schema.find((f) => /company/i.test(String(f.label || f.name)))
        if (companyField) {
          let rawVal = entry[companyField.name] ?? defaultForm[companyField.name] ?? ''
          // If there's no value, but the schema provides options, use the first option as a sensible default label
          if ((!rawVal || rawVal === '') && Array.isArray(companyField.options) && companyField.options.length) {
            const first = companyField.options[0]
            rawVal = (typeof first === 'string') ? first : (first.label ?? first.value ?? first.key ?? '')
          }
          if (rawVal && Array.isArray(companyField.options)) {
            const found = companyField.options.find((o) => {
              if (typeof o === 'string') return o === rawVal || String(o) === String(rawVal)
              const key = o.key ?? o.value ?? o.label
              const label = o.label ?? o.value ?? o.key
              return String(key) === String(rawVal) || String(label) === String(rawVal)
            })
            company = found ? (typeof found === 'string' ? found : (found.label ?? found.value ?? found.key)) : String(rawVal)
          } else {
            company = rawVal ?? ''
          }
        }
        if (!company) {
          company = entry['Company'] ?? entry['company'] ?? entry['companyName'] ?? ''
        }
        // If still missing, try to read the select/displayed label from the rendered form DOM
        if (!company) {
          try {
            const formEl = document.getElementById(`activity-form-${viewKey}`)
            if (formEl) {
              const nameCandidates = [companyField?.name, 'Company', 'company', 'companyName']
              for (const n of nameCandidates) {
                if (!n) continue
                const sel = formEl.querySelector(`[name="${n}"]`)
                if (sel) {
                  if (sel.tagName && sel.tagName.toLowerCase() === 'select') {
                    const opt = sel.selectedOptions && sel.selectedOptions[0]
                    if (opt && opt.textContent && opt.textContent.trim()) { company = opt.textContent.trim(); break }
                  } else if (sel.value) {
                    company = String(sel.value)
                    break
                  }
                }
              }
            }
          } catch (e) {}
        }
        titleLine = `${eff || ''} / NB / ${company}`
      } else {
        titleLine = eff ? `${cleanedLabel} - eff ${eff}` : cleanedLabel
      }
      // Append quote number (if available) to the subject. Look in schema state, common keys, or the DOM.
      try {
        let quoteVal = ''
        const quoteField = schema.find((f) => /quote/i.test(String(f.name || f.label)))
        if (quoteField) {
          let rawQ = entry[quoteField.name] ?? defaultForm[quoteField.name] ?? ''
          if ((!rawQ || rawQ === '') && Array.isArray(quoteField.options) && quoteField.options.length) {
            const first = quoteField.options[0]
            rawQ = (typeof first === 'string') ? first : (first.label ?? first.value ?? first.key ?? '')
          }
          if (rawQ && Array.isArray(quoteField.options)) {
            const found = quoteField.options.find((o) => {
              if (typeof o === 'string') return o === rawQ || String(o) === String(rawQ)
              const key = o.key ?? o.value ?? o.label
              const label = o.label ?? o.value ?? o.key
              return String(key) === String(rawQ) || String(label) === String(rawQ)
            })
            quoteVal = found ? (typeof found === 'string' ? found : (found.label ?? found.value ?? found.key)) : String(rawQ)
          } else {
            quoteVal = rawQ ?? ''
          }
        }

        if (!quoteVal) {
          quoteVal = entry['quote'] ?? entry['Quote'] ?? entry['quoteNumber'] ?? entry['quote #'] ?? ''
        }

        if (!quoteVal) {
          const formEl = document.getElementById(`activity-form-${viewKey}`)
          if (formEl) {
            const nameCandidates = [quoteField?.name, 'quote', 'Quote', 'quoteNumber', 'quote #']
            for (const n of nameCandidates) {
              if (!n) continue
              const el = formEl.querySelector(`[name="${n}"]`)
              if (!el) continue
              if (el.tagName && el.tagName.toLowerCase() === 'select') {
                const opt = el.selectedOptions && el.selectedOptions[0]
                if (opt && opt.textContent && opt.textContent.trim()) { quoteVal = opt.textContent.trim(); break }
              } else if (el.value) {
                quoteVal = String(el.value)
                break
              }
            }
          }
        }

        if (quoteVal) titleLine = `${titleLine} / ${quoteVal}`
      } catch (e) {}

      lines.push(titleLine)
      lines.push('')
      if (schema && schema.length) {
        schema.forEach((f) => {
          const label = f.label || f.name
          let raw = (entry[f.name] !== undefined && entry[f.name] !== null && entry[f.name] !== '')
            ? entry[f.name]
            : (defaultForm[f.name] ?? (f.default ?? (f.placeholder ?? '')))

          if ((f.type || '').toLowerCase() === 'select' && Array.isArray(f.options)) {
            const opts = f.options.map((o) => (typeof o === 'string' ? { key: o, label: o } : { key: o.key ?? o.value ?? o.label, label: o.label ?? o.value ?? String(o) }))
            if (!raw) {
              raw = opts[0] && opts[0].label ? opts[0].label : ''
            }
            const found = opts.find((o) => o.key === raw || o.label === raw)
            if (found) raw = found.label
          }

          if (!raw) {
            try {
              const formEl = document.getElementById(`activity-form-${viewKey}`)
              if (formEl) {
                let el = formEl.querySelector(`[name="${f.name}"]`) || formEl.querySelector(`[data-field="${f.name}"]`)
                if (el) {
                  const inner = (el.tagName && el.tagName.toLowerCase() !== 'input' && el.tagName.toLowerCase() !== 'textarea') ? (el.querySelector('input, textarea, button') || el) : el
                  const placeholder = inner && (inner.getAttribute('placeholder') || inner.placeholder || inner.getAttribute('aria-label') || '')
                  if (placeholder) raw = placeholder
                }
              }
            } catch (err) {}
          }

          // If this is an effective-date field (common names + possible misspelling), format it as "Mon D, YYYY"
          if (raw && (/^(effectiveDate|effDate|effevticeDate)$/i.test(f.name) || (/^date$/i.test(String(f.name)) && /date of call/i.test(String(f.label || ''))))) {
            try {
              const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
              const s = String(raw)
              const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/)
              if (m) {
                const monIdx = Math.max(0, Math.min(11, Number(m[2]) - 1))
                const mon = months[monIdx] || String(Number(m[2])).padStart(2, '0')
                const day = String(Number(m[3]))
                const year = m[1]
                raw = `${mon} ${day}, ${year}`
              } else {
                const d = new Date(s)
                if (!Number.isNaN(d.getTime())) {
                  const mon = months[d.getMonth()] || String(d.getMonth() + 1).padStart(2, '0')
                  const dd = d.getDate()
                  const yyyy = d.getFullYear()
                  raw = `${mon} ${dd}, ${yyyy}`
                }
              }
            } catch (e) {}
          }

          lines.push(`${label}: ${raw}`)
        })
      } else {
        const keys = new Set([...Object.keys(defaultForm), ...Object.keys(entry || {})])
        Array.from(keys).forEach((k) => lines.push(`${k}: ${entry[k] ?? defaultForm[k] ?? ''}`))
      }

      const text = lines.join('\n')
      await navigator.clipboard.writeText(text)

      if (isCard1) {
        setCard1Copied(true)
        setTimeout(() => setCard1Copied(false), 1800)
      } else {
        setCard3Copied(true)
        setTimeout(() => setCard3Copied(false), 1800)
      }
    } catch (err) {
      console.error('copy failed', err)
    }
  }

  return (
    <section id="activity-notes" className="activity-section">
      <div className="activity-inner">
        <div className="activity-controls">
          <button
            type="button"
            className={`card-toggle-btn ${showCard34 ? 'open' : ''}`}
            aria-pressed={showCard34}
            onClick={() => setShowCard34((s) => !s)}
          >
            {showCard34 ? (
              <>
                <svg className="card-toggle-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                </svg>
                <span>Remove Second Note</span>
              </>
            ) : (
              <>
                <svg className="card-toggle-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                <span>Add Second Note</span>
              </>
            )}
          </button>
        </div>
        <div className={`activity-cards ${!showCard34 ? 'only-two' : ''}`}>
          <div className="note-card">
            <div className="card-header">
              <button
                type="button"
                title="Copy form"
                className={"card-copy-btn" + (card1Copied ? ' copied' : '')}
                onClick={() => copyFormToClipboard(1)}
              >
                {card1Copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className={`card-body ${card1Animating ? 'animate' : ''}`}>
              <ActivityForm
                prefix={card1View}
                form={card1Forms[card1View]}
                onChangeForm={updateCard1FormField}
                schema={card1Options.find((o) => o.key === card1View)?.formSchema}
                optionSelect={{ options: card1Options.map((o) => ({ key: o.key, label: o.label })), value: card1View, onChange: handleCard1ViewChange }}
              />
            </div>
          </div>

          <div className="note-card">
            <div className="card-header">Notes</div>
              <div className="card-body">
                {(() => {
                  const sections = normalizeNotes(activeCard1?.notes)
                  if (!sections || sections.length === 0) return <div>No notes</div>
                  return sections.map((section, si) => {
                    const title = section.title || ''
                    const displayTitle = (title.endsWith(':') && (!section.items || section.items.length === 0)) ? title.replace(/:\s*$/, '') : title
                    return (
                      <div className="notes-section" key={si}>
                        {displayTitle ? <div className="notes-section-title">{displayTitle}</div> : null}
                        <ul className="custom-notes">
                          {(section.items || []).map((item, ii) => <li key={ii}>{item}</li>)}
                        </ul>
                      </div>
                    )
                  })
                })()}
              </div>
          </div>

          {showCard34 && (
            <>
              <div className="note-card">
                <div className="card-header">
                  <button
                    type="button"
                    title="Copy form"
                    className={"card-copy-btn" + (card3Copied ? ' copied' : '')}
                    onClick={() => copyFormToClipboard(3)}
                  >
                    {card3Copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className={`card-body ${card3Animating ? 'animate' : ''}`}>
                  <ActivityForm
                    prefix={card3View}
                    form={card3Forms[card3View]}
                    onChangeForm={updateCard3FormField}
                    schema={card3Options.find((o) => o.key === card3View)?.formSchema}
                    optionSelect={{ options: card3Options.map((o) => ({ key: o.key, label: o.label })), value: card3View, onChange: handleCard3ViewChange }}
                  />
                </div>
              </div>

              <div className="note-card">
                <div className="card-header">Summary</div>
                <div className="card-body">
                  {(() => {
                    const sections = normalizeNotes(activeCard3?.summary)
                    if (!sections || sections.length === 0) return <div>No summary</div>
                    return sections.map((section, si) => {
                      const title = section.title || ''
                      const displayTitle = (title.endsWith(':') && (!section.items || section.items.length === 0)) ? title.replace(/:\s*$/, '') : title
                      return (
                        <div className="summary-section" key={si}>
                          {displayTitle ? <div className="summary-section-title">{displayTitle}</div> : null}
                          <ul className="custom-notes">
                            {(section.items || []).map((item, ii) => <li key={ii}>{item}</li>)}
                          </ul>
                        </div>
                      )
                    })
                  })()}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
