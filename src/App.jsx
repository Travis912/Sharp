import { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import ActivitySection from './components/ActivitySection'
import Endorsements from './components/Endorsements'

function App() {
  const [docsView, setDocsView] = useState('endorsements')
  const [quotesMode, setQuotesMode] = useState('auto')

  // Activity notes moved into `ActivitySection` component

  return (
    <div className="app-layout">
      <Sidebar onDocsChange={setDocsView} />
      <main className="content">
        <ActivitySection />

        <section id="quotes" className="quotes-section">
          <div className="quotes-inner">
            <div className="endorsements-header">
              <h1>Quotes</h1>
              <div className="endorsements-modes" role="tablist" aria-label="Quotes modes">
                <button
                  className={`mode-btn ${quotesMode === 'auto' ? 'active' : ''}`}
                  onClick={() => setQuotesMode('auto')}
                  aria-pressed={quotesMode === 'auto'}
                >Auto</button>
                <button
                  className={`mode-btn ${quotesMode === 'property' ? 'active' : ''}`}
                  onClick={() => setQuotesMode('property')}
                  aria-pressed={quotesMode === 'property'}
                >Property</button>
              </div>
            </div>

            {quotesMode === 'auto' ? (
              <div className="quotes-content">
                <div className="quote-cards">
                  <div className="quote-card">
                    <h3>Documents needed:</h3>
                    <ul className="docs-list">
                      <li>DASH Report</li>
                      <li>MVR</li>
                      <li>PLPD form if TPL only</li>
                      <li>BOS</li>
                      <li>VOID</li>
                      <li>Signed MAC if monthly payments</li>
                      <li>Signed Credit Consent Form</li>
                      <li>Signed Auto App</li>
                    </ul>
                  </div>
                  <div className="quote-card">
                    <h3>Company Specifics</h3>
                    <h4>SGI:</h4>
                    <p>If minor UW issues do not request SGI to fix, processing will request UW to fix them</p>
                    <h4>Wawanesa:</h4>
                    <p>Can only place Auto if they already have property with Wawa</p>
                  </div>
                  <div className="quote-card">
                    <h3>Underwriting Notes</h3>
                    <p>Primary contact: verify phone and email.</p>
                    <p>Priority: check prior claims within 5 years.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="quotes-content">
                <div className="quote-cards">
                  <div className="quote-card">
                    <h3>Property Summary</h3>
                    <p>Address: 123 Main St</p>
                    <p>Type: Condo</p>
                    <p>Built: 2005</p>
                  </div>
                  <div className="quote-card">
                    <h3>Documents Needed</h3>
                    <p>Dwelling: $350,000</p>
                    <p>Liability: $500,000</p>
                    <p>Deductible: $1,000</p>
                  </div>
                  <div className="quote-card">
                    <h3>Replacement Cost</h3>
                    <p>Estimate: $280,000</p>
                    <p>Replacement Option: Actual cash value</p>
                    <p>Notes: Verify recent renovations</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="docs" className="docs-section">
          <div className="docs-inner">
            {docsView === 'endorsements' ? (
              <Endorsements />
            ) : (null
            )}
            {docsView === 'IPFS' && (
            <div className="docs-detail ipfs">
              <h1>IPFS</h1>
              <p>If premium changes, for ex add a vehicle... update IPFS and collect money first?</p>
              <p>NSF's: The client tells us when IPFS can take the payment.</p>
              <p>Renewals: Still do a $50 sharp fee</p>
              <p>IPFS payment schedule chart is numbered 1-11, the down payment is not numbered and will come out on the same day as the first payment. First payment is a double payment</p>
              <p>Can add endorsements to policy to see how much the premium would be, if you don't click submit it doesn't apply</p>
              <p>IPFS phone number: 866 815-9454, the client can call</p>
              <p>CC has a 2.25% fee for payment method</p>
              <p>Use 20% down payment & 9 payments for payment plan</p>
              <p>Quotes: Quick quotes don't save, use New Quote to save it</p>
              <p>IPFS notice of rescission means IPFS stops funding account & requests cancellation </p>
            </div>
            )}
            {docsView === 'GRID' && (
              <div className="docs-detail grid">
                <h2>GRID</h2>
                <p>Need date first licensed (Class 5 GDL / G2 for Ontario)</p>
                <p>-15 is best</p>
                <p>-1 for each clean year</p>
                <p>+5 for each at-fault accident</p>
                <p>Start at -2 if drivers training certificate received</p>
                <p>License suspension is not a clean year, ignore that year</p>
              </div>
            )}
            {docsView === 'Alphabet' && (
              <div>
                <h1>Phonetic Alphabet</h1>
                {(() => {
                  const alphabet = [
                    'A - Alpha','B - Bravo','C - Charlie','D - Delta','E - Echo','F - Foxtrot','G - Golf','H - Hotel','I - India','J - Juliett','K - Kilo','L - Lima','M - Mike','N - November','O - Oscar','P - Papa','Q - Quebec','R - Romeo','S - Sarah','T - Tango','U - Uniform','V - Victor','W - Whiskey','X - X-ray','Y - Yankee','Z - Zulu'
                  ]
                  const mid = Math.ceil(alphabet.length / 2)
                  const left = alphabet.slice(0, mid)
                  const right = alphabet.slice(mid)
                  return (
                    <div className="alphabet-columns">
                      <ul className="alphabet-column">
                        {left.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                      <ul className="alphabet-column">
                        {right.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  )
                })()}
              </div>
            )}
            {docsView === 'faq' && (
              <div>
                <h2>FAQ</h2>
                <p>Frequently asked questions and troubleshooting tips.</p>
              </div>
            )}
          </div>
        </section>

        {/* Pricing and Contact sections removed per request */}
      </main>
    </div>
  )
}

export default App
