// App.jsx atualizado
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./App.css";

function App() {
  const [tipo, setTipo] = useState("acao");
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");
  const [historico, setHistorico] = useState([]);
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const consultar = async () => {
    setErro("");
    setResultado(null);
    setCarregando(true);
    const codigoFormatado = codigo.toUpperCase();

    try {
      const response = await fetch(
        `http://localhost:8000/consulta?tipo=${tipo}&codigo=${codigoFormatado}`
      );
      const data = await response.json();

      if (data.erro) {
        setErro(data.erro);
      } else {
        setResultado(data);
        fetchHistorico();
        fetchGrafico();
      }
    } catch {
      setErro("Erro de conexão com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  const fetchHistorico = async () => {
    try {
      const res = await fetch("http://localhost:8000/historico");
      const data = await res.json();
      console.log("Histórico recebido:", data);
      setHistorico(data);
    } catch {
      setHistorico([]);
    }
  };

  const fetchGrafico = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/grafico?tipo=${tipo}&codigo=${codigo.toUpperCase()}`
      );
      const data = await response.json();
      setDadosGrafico(data);
    } catch (err) {
      console.error("Erro ao buscar gráfico:", err);
    }
  };

  useEffect(() => {
    fetchHistorico();
  }, []);

  const formatarPreco = (preco) => {
    return preco !== "N/A" ? `R$ ${preco}` : preco;
  };

  const corVariação = (variacao) => {
    if (variacao === "N/A") return "black";
    return parseFloat(variacao.replace(",", ".")) >= 0 ? "green" : "red";
  };

  const emojiVariação = (variacao) => {
    if (variacao === "N/A") return "";
    return parseFloat(variacao.replace(",", ".")) >= 0 ? "⬆️" : "⬇️";
  };

  return (
    <div className="app">
      <h1>Consulta Financeira</h1>

      <div className="form-container">
        <label>Tipo:&nbsp;</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="acao">Ação</option>
          <option value="moeda">Moeda</option>
        </select>

        <label>Código:&nbsp;</label>
        <input
          placeholder={tipo === "acao" ? "Ex: AAPL ou BBDC3" : "Ex: USDBRL"}
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") consultar();
          }}
        />

        <button onClick={consultar} disabled={carregando}>
          {carregando ? "Consultando..." : "Consultar"}
        </button>
      </div>

      {carregando ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados...</p>
        </div>
      ) : (
        <>
          {erro && <div className="erro">Erro: {erro}</div>}
          {resultado && (
            <div className="resultado">
              <h3>Resultado</h3>
              <p><strong>Nome:</strong> {resultado.nome}</p>
              <p>
                <strong>Preço:</strong>{" "}
                <span style={{ color: corVariação(resultado.variacao) }}>
                  {formatarPreco(resultado.preco)} {emojiVariação(resultado.variacao)}
                </span>
              </p>
            </div>
          )}
          {dadosGrafico && dadosGrafico.length > 0 && (
            <div className="grafico">
              <h2>Gráfico (90 dias)</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dadosGrafico}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="data" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="preco" stroke="#007bff" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          {historico.length > 0 && (
            <div className="historico">
              <h2>Histórico de Consultas</h2>
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Tipo</th>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Variação</th>
                  </tr>
                </thead>
                <tbody>
                 {historico.map((item) => (
                    <tr key={item.id}>
                      <td>{item.data_consulta}</td>
                      <td>{item.tipo}</td>
                      <td>{item.codigo}</td>
                      <td>{item.nome}</td>
                      <td>{formatarPreco(item.preco)}</td>
                      <td style={{ color: corVariação(item.variacao) }}>
                        {item.variacao} {emojiVariação(item.variacao)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;










