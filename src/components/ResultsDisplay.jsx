import React from 'react';
import { generatePDF } from '../utils/pdfGenerator';
import './ResultsDisplay.css';

const ResultsDisplay = ({ result, inputData }) => {
  if (!result) {
    return (
      <div className="results-display empty">
        <h2>Ergebnis</h2>
        <p className="placeholder">
          Bitte füllen Sie mindestens Wohnfläche, Baujahr und Wohnlage aus, um die
          Berechnung zu starten.
        </p>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="results-display error">
        <h2>Ergebnis</h2>
        <p className="error-message">{result.error}</p>
      </div>
    );
  }

  const wohnflaeche = parseFloat(inputData.wohnflaeche) || 0;

  const handleDownloadPDF = () => {
    generatePDF(result, inputData);
  };

  return (
    <div className="results-display">
      <div className="results-header">
        <h2>Berechnungsergebnis</h2>
        <button className="download-button" onClick={handleDownloadPDF} title="Als PDF herunterladen">
          📥 PDF herunterladen
        </button>
      </div>

      {/* Main Result */}
      <div className="result-main">
        <h3>Ortsübliche Vergleichsmiete</h3>
        <div className="rent-range">
          <div className="rent-value">
            <span className="label">Von</span>
            <span className="value">
              {(parseFloat(result.miete_unten) * wohnflaeche).toFixed(2)} €
            </span>
            <span className="unit">pro Monat</span>
            <span className="per-sqm">({result.miete_unten} €/m²)</span>
          </div>
          <div className="rent-separator">bis</div>
          <div className="rent-value">
            <span className="label">Bis</span>
            <span className="value">
              {(parseFloat(result.miete_oben) * wohnflaeche).toFixed(2)} €
            </span>
            <span className="unit">pro Monat</span>
            <span className="per-sqm">({result.miete_oben} €/m²)</span>
          </div>
        </div>
        <p className="help-text">
          Nettokaltmiete ohne Betriebskosten für {wohnflaeche} m²
        </p>
      </div>

      {/* Calculation Details */}
      <div className="result-details">
        <h3>Berechnungsdetails</h3>

        <div className="detail-item">
          <span className="detail-label">Grundpreis</span>
          <span className="detail-value">{result.grundpreis} €/m²</span>
        </div>

        {result.zuschlaege_details && result.zuschlaege_details.length > 0 && (
          <div className="detail-section">
            <h4>Zu- und Abschläge</h4>
            {result.zuschlaege_details.map((item, index) => (
              <div key={index} className="detail-item sub">
                <span className="detail-label">
                  {item.kategorie}: {item.label}
                </span>
                <span className={`detail-value ${item.wert < 0 ? 'negative' : 'positive'}`}>
                  {item.wert > 0 ? '+' : ''}
                  {item.wert.toFixed(2)} €/m²
                </span>
              </div>
            ))}
            <div className="detail-item total">
              <span className="detail-label">Summe Zu- und Abschläge</span>
              <span className="detail-value">
                {parseFloat(result.zuschlaege_summe) > 0 ? '+' : ''}
                {result.zuschlaege_summe} €/m²
              </span>
            </div>
          </div>
        )}

        <div className="detail-item highlight">
          <span className="detail-label">Nettomiete (Durchschnitt)</span>
          <span className="detail-value">{result.nettomiete} €/m²</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Schwankungsbreite unten</span>
          <span className="detail-value negative">
            {result.schwankung.unten.toFixed(2)} €/m²
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Schwankungsbreite oben</span>
          <span className="detail-value positive">
            +{result.schwankung.oben.toFixed(2)} €/m²
          </span>
        </div>
      </div>

      {/* Additional Info */}
      <div className="result-info">
        <h4>Zusätzliche Informationen</h4>
        <div className="info-item">
          <span className="info-label">Durchschnittliche Betriebskosten:</span>
          <span className="info-value">
            {result.betriebskosten.toFixed(2)} €/m² (
            {(result.betriebskosten * wohnflaeche).toFixed(2)} € gesamt)
          </span>
        </div>
        <div className="info-item">
          <span className="info-label">
            Warmmiete (inkl. Betriebskosten) ca.:
          </span>
          <span className="info-value">
            {(
              (parseFloat(result.miete_unten) + result.betriebskosten) *
              wohnflaeche
            ).toFixed(2)}{' '}
            € bis{' '}
            {(
              (parseFloat(result.miete_oben) + result.betriebskosten) *
              wohnflaeche
            ).toFixed(2)}{' '}
            € pro Monat
          </span>
        </div>
      </div>

      <div className="result-disclaimer">
        <p>
          <strong>Hinweis:</strong> Diese Berechnung basiert auf dem Münchner
          Mietspiegel 2025 und dient nur als Orientierung. Für rechtsverbindliche
          Auskünfte konsultieren Sie bitte einen Fachanwalt oder Mieterverein.
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
