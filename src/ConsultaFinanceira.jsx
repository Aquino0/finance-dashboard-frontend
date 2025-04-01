import React, { useState } from 'react';

export default function ConsultaFinanceira() {
  const [tipo, setTipo] = useState('acao');
  const [codigo, setCodigo] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState(null);


  const consultar = async () => {
    setErro(null);
    try {
      const res = await fetch(`http://localhost:8000/consulta?tipo=${tipo}&codigo=${codigo}`);
      const data = await res.json();
      if (res.ok) {
        setResultado(data);
      } else {
        setErro(data.detail || 'Erro na consulta');
      }
    } catch (err) {
      setErro('Erro de rede ou servidor indisponível');
    }
  };

  return (
    <div className="form-container">
      <h1>Consulta Financeira</h1>
      <div className="form-group">
        <label>Tipo:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="acao">Ação</option>
          <option value="moeda">Moeda</option>
        </select>
      </div>

      <div className="form-group">
        <label>Código:</label>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Ex: PETR4 ou USD-BRL"
        />
      </div>

      <button onClick={consultar}>Consultar</button>

      {erro && <p className="error">{erro}</p>}

      {resultado && (
        <div className="resultado">
          <pre>{JSON.stringify(resultado, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
