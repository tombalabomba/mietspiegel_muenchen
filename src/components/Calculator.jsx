import React, { useState, useEffect } from 'react';
import { calculateRent } from '../utils/calculator';
import InputSection from './InputSection';
import ResultsDisplay from './ResultsDisplay';
import './Calculator.css';

const Calculator = () => {
  const [inputData, setInputData] = useState({
    wohnflaeche: '',
    baujahr: '',
    wohnlage: '',
    features: {
      gebaeude: null,
      haustyp: null,
      heizung: null,
      sanitaer: [],
      kueche: [],
      fussboden: null,
      terrasse_balkon: false,
      weitere: [],
    },
    abweichungen: {},
  });

  const [result, setResult] = useState(null);

  // Real-time calculation whenever input changes
  useEffect(() => {
    const calculatedResult = calculateRent(inputData);
    setResult(calculatedResult);
  }, [inputData]);

  const handleInputChange = (field, value) => {
    setInputData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFeatureChange = (category, value) => {
    setInputData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [category]: value,
      },
    }));
  };

  return (
    <div className="calculator-container">
      <header className="calculator-header">
        <h1>Münchner Mietspiegelrechner 2025</h1>
        <p>Berechnen Sie die ortsübliche Vergleichsmiete für Ihre Wohnung in München</p>
      </header>

      <div className="calculator-content">
        <InputSection
          inputData={inputData}
          onInputChange={handleInputChange}
          onFeatureChange={handleFeatureChange}
        />
        <ResultsDisplay result={result} inputData={inputData} />
      </div>

      <footer className="calculator-footer">
        <p>
          Grundlage: <a href="https://2025.mietspiegel-muenchen.de/broschueren/Mietspiegel_2025_Broschuere.pdf" target="_blank" rel="noopener noreferrer">Münchner Mietspiegel 2025</a> der Landeshauptstadt München
        </p>
        <p className="disclaimer">
          Alle Angaben ohne Gewähr | Dieser Rechner dient zur ersten Orientierung
        </p>
      </footer>
    </div>
  );
};

export default Calculator;
