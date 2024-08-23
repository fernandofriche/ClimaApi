import React, { useEffect, useState } from "react";
import styles from './BuscarCidade.module.css'; 

function BuscarCidade() {
    const [clima, setClima] = useState(null); 
    const [cidade, setCidade] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const pesquisarCidade = async () => {
            if (!cidade.trim()) return; // Verifica se a cidade não é uma string vazia

            try {
                const resposta = await fetch("./clima.json");
                if (!resposta.ok) {
                    throw new Error("Erro ao acessar os dados climáticos!");
                }

                const data = await resposta.json();

                if (data.cidades && data.cidades[cidade]) {  
                    setClima(data.cidades[cidade]);    /* O código verifica se o objeto data contém a propriedade cidades e se essa propriedade inclui a cidade específica (cidade) que está sendo pesquisada. */
                    setError("");                     /* Se a cidade for encontrada, a função setClima é chamada para atualizar o estado com as informações climáticas da cidade. */
                } else {
                    setClima(null);
                    setError("Cidade não encontrada!");
                }
            } catch (error) {
                setClima(null);
                setError("Erro ao buscar os dados climáticos!");
            }
        };
        pesquisarCidade();
    }, [cidade]);

    return (
        <div className={styles.busca}>
            <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                placeholder="Digite o nome da cidade que deseja ver o clima."
                className={styles.input_busca}
            />

            {clima && (
                <div className={styles.status}>
                    <h3>Previsão do tempo</h3>
                    <p>Temperatura: {clima.temperature}</p>
                    <p>Condição: {clima.conditions}</p>
                    <p>Ícone: <img src={clima.icon} alt="Ícone climático" /></p> {/* Corrigido para exibir o ícone */}
                </div>
            )}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}

export default BuscarCidade;
