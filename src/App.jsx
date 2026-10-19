
import { useState } from "react";
import { Home, IndianRupee, Ruler, BedDouble, Bath, Calendar, MapPin, Sparkles, TrendingUp } from "lucide-react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    area_sqft: 1400,
    bedrooms: 3,
    bathrooms: 2,
    age_years: 5,
    location_score: 8,
  });

  const [predictedPrice, setPredictedPrice] = useState(null);

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: Number(event.target.value) });
    setPredictedPrice(null);
  };

  const handlePredict = (event) => {
    event.preventDefault();
    // Temporary demo estimate. FastAPI integration will replace this.
    const price =
      1800000 +
      form.area_sqft * 3200 +
      form.bedrooms * 250000 +
      form.bathrooms * 180000 -
      form.age_years * 45000 +
      form.location_score * 120000;

    setPredictedPrice(Math.max(0, price));
  };

  const money = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><Home size={23} /></div>
          <div>
            <h2>EstateIQ</h2>
            <span>AI PROPERTY INSIGHTS</span>
          </div>
        </div>

        <div className="nav-label">WORKSPACE</div>
        <div className="nav-item active"><TrendingUp size={19} /> Price Prediction</div>
        <div className="nav-item"><Home size={19} /> Property Analysis</div>

        <div className="sidebar-bottom">
          <div className="avatar">VV</div>
          <div>
            <strong>Vishnu Vardhan</strong>
            <span>ML Project</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="eyebrow">MACHINE LEARNING / REGRESSION</span>
            <h1>House Price Prediction</h1>
            <p>Explore property details and estimate a house price.</p>
          </div>
          <div className="status-pill"><span /> Demo interface</div>
        </header>

        <section className="welcome-banner">
          <div>
            <span className="banner-label"><Sparkles size={15} /> AI-POWERED PROPERTY ESTIMATION</span>
            <h2>Find your property's estimated value.</h2>
            <p>Enter the property details below to see a sample estimate.</p>
          </div>
          <div className="banner-house"><Home size={72} strokeWidth={1.1} /></div>
        </section>

        <div className="content-grid">
          <section className="panel form-panel">
            <div className="panel-heading">
              <div className="heading-icon"><Home size={20} /></div>
              <div>
                <h3>Property details</h3>
                <p>Adjust the details for your property</p>
              </div>
            </div>

            <form onSubmit={handlePredict}>
              <label className="field-label"><Ruler size={16} /> Built-up area (sq. ft.)</label>
              <input name="area_sqft" type="number" min="1" value={form.area_sqft} onChange={updateField} required />

              <div className="two-fields">
                <div>
                  <label className="field-label"><BedDouble size={16} /> Bedrooms</label>
                  <input name="bedrooms" type="number" min="1" max="20" value={form.bedrooms} onChange={updateField} required />
                </div>
                <div>
                  <label className="field-label"><Bath size={16} /> Bathrooms</label>
                  <input name="bathrooms" type="number" min="1" max="20" value={form.bathrooms} onChange={updateField} required />
                </div>
              </div>

              <label className="field-label"><Calendar size={16} /> Property age (years)</label>
              <input name="age_years" type="number" min="0" value={form.age_years} onChange={updateField} required />

              <label className="field-label"><MapPin size={16} /> Location score (1–10)</label>
              <input name="location_score" type="number" min="1" max="10" value={form.location_score} onChange={updateField} required />

              <button className="predict-button" type="submit">
                <Sparkles size={18} /> Estimate price
              </button>
            </form>
            <p className="demo-note">Demo estimate only — backend integration is next.</p>
          </section>

          <section className="right-column">
            <div className="panel result-panel">
              <span className="result-label"><IndianRupee size={16} /> ESTIMATED PROPERTY VALUE</span>
              <h2>{predictedPrice === null ? "—" : money(predictedPrice)}</h2>
              <p>{predictedPrice === null ? "Submit property details to view a demo estimate." : "Demo calculation · Not a real ML prediction yet"}</p>
              <div className="result-divider" />
              <div className="result-foot"><span className="result-dot" /> {predictedPrice === null ? "Waiting for input" : "Estimate generated"}</div>
            </div>

            <div className="panel summary-panel">
              <h3>Property summary</h3>
              <p className="summary-subtitle">Your current input values</p>
              <div className="summary-row"><span>Built-up area</span><strong>{form.area_sqft.toLocaleString("en-IN")} sq. ft.</strong></div>
              <div className="summary-row"><span>Bedrooms</span><strong>{form.bedrooms}</strong></div>
              <div className="summary-row"><span>Bathrooms</span><strong>{form.bathrooms}</strong></div>
              <div className="summary-row"><span>Property age</span><strong>{form.age_years} years</strong></div>
              <div className="summary-row"><span>Location score</span><strong>{form.location_score}/10</strong></div>
            </div>

            <div className="info-note">
              <Sparkles size={18} />
              <div><strong>Machine learning project</strong><p>The next step connects this React interface to your trained Scikit-learn model through FastAPI.</p></div>
            </div>
          </section>
        </div>

        <footer>EstateIQ · Educational project by G. Vishnu Vardhan</footer>
      </main>
    </div>
  );
}

export default App;
