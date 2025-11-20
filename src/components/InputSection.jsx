import React from 'react';
import grundpreisData from '../data/grundpreis.json';
import zuschlaege from '../data/zuschlaege.json';
import wohnlagenData from '../data/wohnlagen.json';
import Tooltip from './Tooltip';
import './InputSection.css';

const InputSection = ({ inputData, onInputChange, onFeatureChange }) => {
  const handleCheckboxChange = (category, item, checked) => {
    const currentArray = inputData.features[category] || [];
    const newArray = checked
      ? [...currentArray, item]
      : currentArray.filter((i) => i !== item);
    onFeatureChange(category, newArray);
  };

  return (
    <div className="input-section">
      <h2>Wohnungsdaten eingeben</h2>

      {/* Grundangaben */}
      <section className="input-group">
        <h3>Grundangaben</h3>

        <div className="input-field">
          <label htmlFor="wohnflaeche">
            Wohnfläche (m²) *
            <Tooltip text="Geben Sie die Wohnfläche Ihrer Wohnung in Quadratmetern ein (20-160 m²)" />
          </label>
          <span className="reference-hint">→ Mietspiegel 2025: Tabelle 1, Spalte "Wohnfläche"</span>
          <input
            type="number"
            id="wohnflaeche"
            min="20"
            max="160"
            value={inputData.wohnflaeche}
            onChange={(e) => onInputChange('wohnflaeche', e.target.value)}
            placeholder="z.B. 75"
            required
          />
        </div>

        <div className="input-field">
          <label htmlFor="baujahr">
            Baujahr *
            <Tooltip text="Wählen Sie den Zeitraum, in dem Ihr Gebäude errichtet wurde" />
          </label>
          <span className="reference-hint">→ Mietspiegel 2025: Tabelle 1, Zeile "Baujahr"</span>
          <select
            id="baujahr"
            value={inputData.baujahr}
            onChange={(e) => onInputChange('baujahr', e.target.value)}
            required
          >
            <option value="">Bitte wählen</option>
            {grundpreisData.baujahr_kategorien.map((kat) => (
              <option key={kat.key} value={kat.key}>
                {kat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="input-field">
          <label htmlFor="wohnlage">
            Wohnlage *
            <Tooltip text="Wählen Sie die Wohnlagenkategorie gemäß Münchner Wohnlagenkarte" />
          </label>
          <span className="reference-hint">
            → Mietspiegel 2025: Tabelle 1, Spalte "Wohnlage" |
            <a
              href="https://geoportal-karten-2025.muenchen.de/mietspiegel_wohnlage/?query="
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              📍 Zur Wohnlagenkarte
            </a>
          </span>
          <select
            id="wohnlage"
            value={inputData.wohnlage}
            onChange={(e) => onInputChange('wohnlage', e.target.value)}
            required
          >
            <option value="">Bitte wählen</option>
            {wohnlagenData.kategorien.map((kat) => (
              <option key={kat.id} value={kat.id}>
                {kat.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Gebäude und Haustyp */}
      <section className="input-group">
        <h3>Gebäude und Haustyp</h3>

        <div className="input-field">
          <label>
            Gebäudetyp
            <Tooltip text="Wählen Sie, falls zutreffend, den speziellen Gebäudetyp" />
          </label>
          <span className="reference-hint">→ Mietspiegel 2025: Tabelle 2, Zeile "Gebäudetyp"</span>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gebaeude"
                value=""
                checked={!inputData.features.gebaeude}
                onChange={() => onFeatureChange('gebaeude', null)}
              />
              Kein spezieller Typ
            </label>
            {Object.entries(zuschlaege.gebaeude).map(([key, data]) => (
              <label key={key}>
                <input
                  type="radio"
                  name="gebaeude"
                  value={key}
                  checked={inputData.features.gebaeude === key}
                  onChange={() => onFeatureChange('gebaeude', key)}
                />
                {data.label} ({data.wert > 0 ? '+' : ''}
                {data.wert.toFixed(2)} €/m²)
              </label>
            ))}
          </div>
        </div>

        <div className="input-field">
          <label>
            Haustyp
            <Tooltip text="Wählen Sie die Kategorie, die Ihr Gebäude am besten beschreibt" />
          </label>
          <span className="reference-hint">→ Mietspiegel 2025: Tabelle 2, Zeile "Haustyp"</span>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="haustyp"
                value=""
                checked={!inputData.features.haustyp}
                onChange={() => onFeatureChange('haustyp', null)}
              />
              Anderer Haustyp (neutral)
            </label>
            {Object.entries(zuschlaege.haustyp)
              .filter(([key]) => key !== 'andere')
              .map(([key, data]) => (
                <label key={key}>
                  <input
                    type="radio"
                    name="haustyp"
                    value={key}
                    checked={inputData.features.haustyp === key}
                    onChange={() => onFeatureChange('haustyp', key)}
                  />
                  {data.label} ({data.wert > 0 ? '+' : ''}
                  {data.wert.toFixed(2)} €/m²)
                </label>
              ))}
          </div>
        </div>
      </section>

      {/* Heizung */}
      <section className="input-group">
        <h3>Heizung</h3>
        <span className="reference-hint">→ Mietspiegel 2025: Tabelle 3, "Heizungsart"</span>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="heizung"
              value=""
              checked={!inputData.features.heizung}
              onChange={() => onFeatureChange('heizung', null)}
            />
            Standard-Heizung
          </label>
          {Object.entries(zuschlaege.heizung).map(([key, data]) => (
            <label key={key}>
              <input
                type="radio"
                name="heizung"
                value={key}
                checked={inputData.features.heizung === key}
                onChange={() => onFeatureChange('heizung', key)}
              />
              {data.label} ({data.wert > 0 ? '+' : ''}
              {data.wert.toFixed(2)} €/m²)
            </label>
          ))}
        </div>
      </section>

      {/* Sanitärbereich */}
      <section className="input-group">
        <h3>Sanitärbereich</h3>
        <span className="reference-hint">→ Mietspiegel 2025: Tabelle 3, "Sanitärausstattung"</span>
        <p className="help-text">Mehrfachauswahl möglich</p>
        <div className="checkbox-group">
          {Object.entries(zuschlaege.sanitaer).map(([key, data]) => (
            <label key={key}>
              <input
                type="checkbox"
                checked={(inputData.features.sanitaer || []).includes(key)}
                onChange={(e) => handleCheckboxChange('sanitaer', key, e.target.checked)}
              />
              {data.label} (+{data.wert.toFixed(2)} €/m²)
            </label>
          ))}
        </div>
      </section>

      {/* Küche */}
      <section className="input-group">
        <h3>Küche</h3>
        <span className="reference-hint">→ Mietspiegel 2025: Tabelle 3, "Küchenausstattung"</span>
        <p className="help-text">Mehrfachauswahl möglich</p>
        <div className="checkbox-group">
          {Object.entries(zuschlaege.kueche).map(([key, data]) => (
            <label key={key}>
              <input
                type="checkbox"
                checked={(inputData.features.kueche || []).includes(key)}
                onChange={(e) => handleCheckboxChange('kueche', key, e.target.checked)}
              />
              {data.label} (+{data.wert.toFixed(2)} €/m²)
            </label>
          ))}
        </div>
      </section>

      {/* Fußboden */}
      <section className="input-group">
        <h3>Fußboden</h3>
        <span className="reference-hint">→ Mietspiegel 2025: Tabelle 3, "Fußbodenbelag"</span>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="fussboden"
              value=""
              checked={!inputData.features.fussboden}
              onChange={() => onFeatureChange('fussboden', null)}
            />
            Standard-Boden
          </label>
          {Object.entries(zuschlaege.fussboden).map(([key, data]) => (
            <label key={key}>
              <input
                type="radio"
                name="fussboden"
                value={key}
                checked={inputData.features.fussboden === key}
                onChange={() => onFeatureChange('fussboden', key)}
              />
              {data.label} ({data.wert > 0 ? '+' : ''}
              {data.wert.toFixed(2)} €/m²)
            </label>
          ))}
        </div>
      </section>

      {/* Terrasse/Balkon */}
      <section className="input-group">
        <h3>Außenbereich</h3>
        <span className="reference-hint">→ Mietspiegel 2025: Tabelle 3, "Außenbereich"</span>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={inputData.features.terrasse_balkon}
              onChange={(e) => onFeatureChange('terrasse_balkon', e.target.checked)}
            />
            {zuschlaege.terrasse_balkon.label} (+
            {zuschlaege.terrasse_balkon.wert.toFixed(2)} €/m²)
          </label>
        </div>
      </section>

      {/* Weitere Merkmale */}
      <section className="input-group">
        <h3>Weitere Merkmale</h3>
        <span className="reference-hint">→ Mietspiegel 2025: Tabelle 3, "Zusätzliche Ausstattung"</span>
        <p className="help-text">Mehrfachauswahl möglich</p>
        <div className="checkbox-group">
          {Object.entries(zuschlaege.weitere).map(([key, data]) => (
            <label key={key}>
              <input
                type="checkbox"
                checked={(inputData.features.weitere || []).includes(key)}
                onChange={(e) => handleCheckboxChange('weitere', key, e.target.checked)}
              />
              {data.label} (+{data.wert.toFixed(2)} €/m²)
            </label>
          ))}
        </div>
      </section>
    </div>
  );
};

export default InputSection;
