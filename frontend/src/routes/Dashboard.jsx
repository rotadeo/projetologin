import React from 'react'
import produtos from '../../../backend/data/produtos.json' // ajuste o caminho se estiver em outra pasta

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-300 p-8">
      <h1 className="mt-8 text-3xl font-bold text-center text-gray-800 mb-8">
        Seja Bem-Vindo ao Dashboard
      </h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {produto.nome}
            </h2>
            <p className="text-gray-600">ID: {produto.id}</p>
            <p className="text-blue-600 font-bold mt-2">
              R$ {produto.valor.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
