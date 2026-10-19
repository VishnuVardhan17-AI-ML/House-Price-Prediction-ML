import { useState } from "react";
import {
  Home,
  IndianRupee,
  Ruler,
  BedDouble,
  Bath,
  Calendar,
  MapPin,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    area: "1400",
    bedrooms: "3",
    bathrooms: "2",
    age: "5",
    location: "8",
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const updateField = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const predictPrice = (event) => {
    event.preventDefault();
    setError("");
    setPrediction(null);

    const area = Number(form.area);
    const bedrooms = Number(form.bedrooms);
    const bathrooms = Number(form.bathrooms);
    const age = Number(form.age);
    const location = Number(form.location);

    if (
      !Number.isFinite(area) ||
      !Number.isFinite(bedrooms) ||
      !Number.isFinite(bathrooms) ||
      !Number.isFinite(age) ||
      !Number.isFinite(location) ||
      area <= 0 ||
      bedrooms < 1 ||
      bathrooms < 1 ||
      age < 0 ||
      location < 1 ||
      location > 10
    ) {
      setError(
        "Please enter valid values. Location score must be between 1 and 10."
      );
      return;
    }

    // Temporary demo estimate. This is not the trained ML model.
    const estimatedPrice =
      1500000 +
      area * 3200 +
      bedrooms * 250000 +
      bathrooms * 180000 -
      age * 35000 +
      location * 125000;

    setPrediction(Math.max(estimatedPrice, 0));
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <Home size={23} />
          </div>
          <div>
            <h2>EstateIQ</h2>
            <span>PROPERTY ANALYTICS</span>
          </div>
        </div>

        <div className="nav-label">WORKSPACE</div>
        <div className="nav-item active">
          <Home size={19} />
          <span>Price Prediction</span>
        </div>
        <div className="nav-item">
          <TrendingUp size={19} />
          <span>Market Insights</span>
        </div>

        <div className="sidebar-bottom">
          <div className="status-dot" />
          <div>
            <strong>ML Engine</strong>
            <p>Demo mode active</p>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">PROPERTY INTELLIGENCE PLATFORM</p>
            <h1>House Price Prediction</h1>
          </div>
          <div className="profile">
            <div className="profile-avatar">E</div>
            <div>
              <strong>EstateIQ</strong>
              <span>AI Workspace</span>
            </div>
          </div>
        </header>

        <section className="welcome-banner">
          <div className="banner-copy">
            <span className="banner-tag">
              <Sparkles size={14} /> AI-POWERED ESTIMATION
            </span>
            <h2>Find the value behind every property.</h2>
            <p>
              Enter property details to explore an estimated house price.
              Your next property decision starts here.
            </p>
          </div>
          <div className="banner-art">
            <div className="art-circle">
              <Home size={58} strokeWidth={1.2} />
              <span className="art-spark">✦</span>
            </div>
          </div>
        </section>

        <div className="section-heading">
          <div>
            <h2>Property Details</h2>
            <p>Fill in the information below to get an estimate.</p>
          </div>
          <span className="required-note">* Required fields</span>
        </div>

        <div className="dashboard-grid">
          <section className="form-card">
            <div className="card-title">
              <div className="title-icon">
                <Home size={20} />
              </div>
              <div>
                <h3>Property Information</h3>
                <p>Tell us about the property</p>
              </div>
            </div>

            <form onSubmit={predictPrice}>
              <div className="field-group">
                <label htmlFor="area">
                  <Ruler size={16} /> Area (square feet) *
                </label>
                <input
                  id="area"
                  name="area"
                  type="number"
                  min="1"
                  required
                  value={form.area}
                  onChange={updateField}
                  placeholder="e.g. 1400"
                />
              </div>

              <div className="field-row">
                <div className="field-group">
                  <label htmlFor="bedrooms">
                    <BedDouble size={16} /> Bedrooms *
                  </label>
                  <input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    min="1"
                    required
                    value={form.bedrooms}
                    onChange={updateField}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="bathrooms">
                    <Bath size={16} /> Bathrooms *
                  </label>
                  <input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    min="1"
                    required
                    value={form.bathrooms}
                    onChange={updateField}
                  />
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="age">
                  <Calendar size={16} /> Property Age (years) *
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="0"
                  required
                  value={form.age}
                  onChange={updateField}
                />
              </div>

              <div className="field-group">
                <div className="range-label">
                  <label htmlFor="location">
                    <MapPin size={16} /> Location Score *
                  </label>
                  <strong>{form.location}/10</strong>
                </div>
                <input
                  className="range-input"
                  id="location"
                  name="location"
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={form.location}
                  onChange={updateField}
                />
                <div className="range-scale">
                  <span>Developing</span>
                  <span>Premium</span>
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button className="predict-button" type="submit">
                <Sparkles size={18} />
                Predict House Price
              </button>

              <p className="form-footnote">
                <span>ⓘ</span> This version uses a temporary demo estimate.
              </p>
            </form>
          </section>

          <section className="result-card">
            <div className="result-top">
              <div className="result-icon">
                <IndianRupee size={23} />
              </div>
              <span className="result-label">ESTIMATED PROPERTY VALUE</span>
            </div>

            {prediction !== null ? (
              <>
                <h2 className="price-value">{formatPrice(prediction)}</h2>
                <p className="result-description">
                  Your estimated price is based on the details entered.
                </p>
              </>
            ) : (
              <>
                <h2 className="empty-price">Your estimate awaits</h2>
                <p className="result-description">
                  Enter your property details and select Predict House Price
                  to see an estimate here.
                </p>
              </>
            )}

            <div className="result-divider" />

            <h3>Property Summary</h3>
            <div className="summary-item">
              <span><Ruler size={16} /> Area</span>
              <strong>{Number(form.area || 0).toLocaleString("en-IN")} sq ft</strong>
            </div>
            <div className="summary-item">
              <span><BedDouble size={16} /> Bedrooms</span>
              <strong>{form.bedrooms}</strong>
            </div>
            <div className="summary-item">
              <span><Bath size={16} /> Bathrooms</span>
              <strong>{form.bathrooms}</strong>
            </div>
            <div className="summary-item">
              <span><Calendar size={16} /> Property Age</span>
              <strong>{form.age} years</strong>
            </div>
            <div className="summary-item">
              <span><MapPin size={16} /> Location Score</span>
              <strong>{form.location}/10</strong>
            </div>

            <div className="insight-box">
              <Sparkles size={18} />
              <div>
                <strong>AI Insight</strong>
                <p>
                  Area, location score, and property age are among the
                  factors used by this project's prediction model.
                </p>
              </div>
            </div>
          </section>
        </div>

        <footer className="page-footer">
          <span>EstateIQ · House Price Prediction Project</span>
          <span>Built with React · ML integration pending</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
