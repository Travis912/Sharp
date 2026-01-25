import React, { useState, useRef, useEffect } from 'react'
import './Endorsements.css'

export default function Endorsements() {
  const autoEndorsements = [
    { key: 'e-third-party', title: 'Third Party Liability (2,000,000)', desc: 'Covers you when you are legally liable for bodily injury or property damage to a Third Party. Covers you, NI, anyone listed as a driver, anyone with consent to drive.' },
    { key: 'e-dcpd', title: 'DCPD Direct Compensation of Property Damage', desc: 'This coverage will cover repairs to your vehicle when you are not at fault for a collision. Your vehicle is repaired by your own insurance company. Loss of use is included as well as any contents that were damaged. A deductible may apply if the insured has opted for one.' },
    { key: 'e-collision', title: 'Collision', desc: 'This will cover you for losses caused by collision or upset (rollover) of the automobile whether you are at fault or not. Minimum deductibles apply.' },
    { key: 'e-comprehensive', title: 'Comprehensive', desc: 'This will cover you for any peril other than collision with another object or by upset such as fire, theft, hail and vandalism. This does not cover theft from a household member or resident employee.' },
    { key: 'e-sef13d', title: 'SEF #13D - Comprehensive Limited Glass', desc: 'This endorsement will limit glass coverage for rock chips, cracks, and vandalism to the front window (the sides and backs have coverage). See SEF 13 job aid for more detail regarding coverage.' },
    { key: 'e-sef16', title: 'SEF #16 - Suspension of Coverages Endorsements', desc: 'This endorsement suspends coverage under certain sections (for example if the vehicle is parked more than 45 days). Check carrier rules for exact conditions.' },
    { key: 'e-sef18', title: 'SEF #18 - Replacement Cost Endorsement', desc: 'If your vehicle is brand new and in the event of a total loss your insurance company will replace or give replacement cost for your vehicle (often available for the first 60 months or 5 years).' },
    { key: 'e-sef20', title: 'SEF #20 - Loss of Use', desc: 'In the event of a claim where the vehicle is inoperable your insurance company will provide a rental vehicle up to your specified limit (often $1500). Consider recommending clients increase this amount if needed.' },
    { key: 'e-sef27', title: 'SEF #27 - Legal Liability for Damage to Non-Owned Automobile', desc: 'This endorsement will provide coverage for non-owned automobiles including rental vehicles up to a specified limit, often up to $50,000.' },
    { key: 'e-sef35', title: 'SEF #35 - Emergency Service Expense', desc: 'In the event of an insurable claim if your vehicle is inoperable the insurance will cover the cost of the towing and any emergency service expenses.' },
    { key: 'e-sef39', title: 'SEF #39 - Accident Rating Waiver', desc: 'This endorsement will allow you to maintain your driving record after your first at-fault accident. Available on eligible driver classes.' },
    { key: 'e-sef43', title: 'SEF #43 / 43R - Limited Waiver of Depreciation', desc: 'Limits the depreciation on a new or leased vehicle so that in the event of a total loss you may receive the full value rather than the depreciated value. Rules vary by carrier.' },
    { key: 'e-sef44', title: 'SEF#44 Family Protection (Mandatory)', desc: 'Provides extra protection in case of injury or death by another motorist who either does not have insurance (hit and run), or does not have enough insurance to cover the injury/death claims.' },
  ]

  const propertyEndorsements = [
    { key: 'e-deductible-waiver', title: 'Deductible waiver', desc: 'If claim is more than $X amount, the deductible for making the claim may be waived' },
    { key: 'p-grc', title: 'Guaranteed Replacement Cost', desc: "This endorsement will provide you with GRC regardless of your policy limit." },
    { key: 'p-overland', title: 'Overland Water Coverage', desc: 'Provides coverage for actual loss or damage caused by overland water including sudden and accidental backing up or escape of water or sewage from a sewer, sump pump or septic system resulting from overland water.' },
    { key: 'p-sewer-backup', title: 'Sewer Backup', desc: 'Provides coverage for any single occurrence caused by sudden and accidental backing up or escape of dirty water, wastewater or sewage within your dwelling/unit or detached private structure through a septic system, sump pump located within your dwelling and sewer inside your premises.' },
    { key: 'p-ground-water', title: 'Ground Water Coverage', desc: 'Provides coverage in the event of sudden and accidental entrance of ground water into your dwelling or additional buildings through basement walls, foundations or floors or rising of the water table.' },
    { key: 'p-water-sewer-line', title: 'Water and Sewer Line/Service Line Coverage', desc: 'Coverage for the cost associated with repairs to underground pipes and wiring from the street to the dwelling when damage occurs.' },
    { key: 'p-bylaw', title: 'By-Law Endorsement', desc: 'Provides coverage for the costs associated with repairing or rebuilding to meet current building codes or bylaws of the property directly damaged by an insured loss. Standard limit is 30,000.' },
    { key: 'p-identity', title: 'My Identity Coverage / Identity Theft', desc: 'Provides coverage for the Named Insured, Spouse, Relatives of either and any person under the age of 21 in their care. Also extends to students temporarily living away from home. Covers cyber protection, legal information services, identity theft and consumer disputes.' },
    { key: 'p-claims-free-protector', title: 'Claims Free protector', desc: 'Protects your rate after your first loss.' },
    { key: 'p-claims-advantage', title: 'Claims advantage', desc: 'This endorsement protects the claims free discount after the first loss. It also waives up to $1,000 of the deductible on the first qualifying property loss. Clients can earn back claims free forgiveness after being claims free for a 3-year period.' },
    { key: 'p-lifestyle-advantage', title: 'Lifestyle advantage', desc: 'Protects the claims free discount after the first loss. It waives up to $1,000 of the deductible in the first qualifying property loss. If a total loss, insured can choose a cash settlement calculated on replacement cost basis.' },
    { key: 'p-differing-deductibles', title: 'Differing Deductibles', desc: 'Separate deductibles apply to the perils of wind, hail and water escape. These deductibles may differ from the policy deductible but cannot be less than the policy deductible.' },
    { key: 'p-my-extras', title: "My Extra's (Intact)", desc: 'Increases special limits under the policy to higher amounts; insureds will not have to provide appraisals.' },
    { key: 'p-limited-roof', title: 'Limited Roof Surface Coverage (Wawanesa)', desc: 'The settlement price of the roof will be settled on an individual basis, considering roof covering material, age and condition of the roof prior to the loss.' },
    { key: 'p-roof-limitation', title: 'Roof Limitation Endorsement (Intact)', desc: 'Mandatory endorsement in Alberta. Damage to the roof caused by windstorm, hail, ice, rain or snow will be settled on an age adjusted replacement cost basis. Loss mitigation coverage is included; additional amounts may be payable for certain expenses.' },
  ]

  const [mode, setMode] = useState('auto') // 'auto' or 'property'
  const [hover, setHover] = useState(null)
  const [lockedKey, setLockedKey] = useState(null)
  const rootRef = useRef(null)

  // click outside to clear lock
  useEffect(() => {
    const onDocClick = (ev) => {
      if (!rootRef.current) return
      if (rootRef.current.contains(ev.target)) return
      if (lockedKey) setLockedKey(null)
    }
    const onKey = (ev) => {
      if (ev.key === 'Escape' && lockedKey) setLockedKey(null)
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [lockedKey])

  // choose which list to render
  const endorsements = mode === 'auto' ? autoEndorsements : propertyEndorsements
  const visibleKey = lockedKey ?? hover
  const visible = Boolean(visibleKey)
  const visibleEndorsement = visible ? endorsements.find((x) => x.key === visibleKey) : null

  return (
    <div className="endorsements-root">
      <div className="endorsements-header">
        <h1>Endorsements -</h1>
        <div className="endorsements-modes" role="tablist" aria-label="Endorsement modes">
          <button
            className={`mode-btn ${mode === 'auto' ? 'active' : ''}`}
            onClick={() => setMode('auto')}
            aria-pressed={mode === 'auto'}
          >Auto</button>
          <button
            className={`mode-btn ${mode === 'property' ? 'active' : ''}`}
            onClick={() => setMode('property')}
            aria-pressed={mode === 'property'}
          >Property</button>
        </div>
      </div>

      <div className="endorsements-main">
        <div className="endorsements-left" aria-hidden="false">
        {endorsements.map((e) => (
          <div
            key={e.key}
            className={`endorsement-item ${((lockedKey || hover) === e.key) ? 'active' : ''}`}
            onMouseEnter={() => setHover(e.key)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(e.key)}
            onBlur={() => setHover(null)}
            onClick={() => setLockedKey((k) => (k === e.key ? null : e.key))}
            tabIndex={0}
            role="button"
            aria-pressed={lockedKey === e.key}
          >
            <strong>{e.title}</strong>
          </div>
        ))}
        </div>

        <div className="endorsements-right" ref={rootRef}>
          <div className={`endorsement-desc-card ${visible ? 'visible' : ''}`} aria-hidden={!visible}>
            {visibleEndorsement ? (
              <div className="endorsement-desc-inner">
                <h3>{visibleEndorsement.title}</h3>
                <p>{visibleEndorsement.desc}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
