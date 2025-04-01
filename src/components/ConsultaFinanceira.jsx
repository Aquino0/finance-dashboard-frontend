import React, { useState } from "react";

function ConsultaFinanceira() {
  const [tipo, setTipo] = useState("acao");
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState(null);
  const [historico, setHistorico] = useState([]);

  const consultar = async () => {
    if (!codigo) return;
    try {
      const res = await fetch(
        `http://localhost:8000/consulta?tipo=${tipo}&codigo=${codigo}`
      );
      const data = await res.json();
      setResultado(data);
      if (!data.erro) {
        setHistorico((prev) => [
          { tipo, codigo, ...data, timestamp: new Date().toLocaleString() },
          ...prev,
        ]);
      }
    } catch (err) {
      setResultado({ erro: "Erro na requisição" });
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Consulta Financeira</h2>
      <div>
        <label>
          Tipo:{" "}
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="acao">Ação</option>
            <option value="moeda">Moeda</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Código:
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
        </label>
      </div>
      <button onClick={consultar}>Consultar</button>

      {resultado && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Resultado</h3>
          <pre>{JSON.stringify(resultado, null, 2)}</pre>
        </div>
      )}

      {historico.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Histórico de Consultas</h3>
          <ul>
            {historico.map((item, index) => (
              <li key={index}>
                [{item.timestamp}] {item.tipo.toUpperCase()} {item.codigo} →{" "}
                {item.nome} | Preço: {item.preco} | Variação: {item.variacao}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ConsultaFinanceira;