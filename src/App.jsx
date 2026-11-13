import { useState } from 'react';
import { livros as livrosIniciais } from './data/books';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CollectionHeader } from './components/CollectionHeader';
import { EmptyState } from './components/EmptyState';
import { BookCard } from './components/BookCard';
import { BookFormPage } from './components/BookFormPage';
import { StatsWidget } from './components/StatsWidget';
import { Footer } from './components/Footer';
import './App.css';

export function App() {
  const [livros, setLivros] = useState(livrosIniciais);
  const [paginaAtual, setPaginaAtual] = useState('estante');
  const [livroEmEdicao, setLivroEmEdicao] = useState(null);

  function handleAbrirAdicionar() {
    setLivroEmEdicao(null);
    setPaginaAtual('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleAbrirEditar(livro) {
    setLivroEmEdicao(livro);
    setPaginaAtual('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleVoltarEstante() {
    setLivroEmEdicao(null);
    setPaginaAtual('estante');
  }

  function handleSalvarLivro(livroSalvo) {
    setLivros((prev) => {
      const existe = prev.some((item) => item.id === livroSalvo.id);
      if (existe) {
        return prev.map((item) => (item.id === livroSalvo.id ? livroSalvo : item));
      }
      return [livroSalvo, ...prev];
    });
    setLivroEmEdicao(null);
    setPaginaAtual('estante');
  }

  function handleApagarLivro(id) {
    setLivros((prev) => prev.filter((item) => item.id !== id));
    if (livroEmEdicao?.id === id) {
      setLivroEmEdicao(null);
      setPaginaAtual('estante');
    }
  }

  function handleToggleLido(id) {
    setLivros((prev) =>
      prev.map((livro) => {
        if (livro.id !== id) return livro;
        const proximoLido = !livro.lido;
        return {
          ...livro,
          lido: proximoLido,
          queroLer: !proximoLido,
          naoGostou: false,
        };
      })
    );
  }

  function handleQueroLer(id) {
    setLivros((prev) =>
      prev.map((livro) =>
        livro.id === id
          ? {
              ...livro,
              queroLer: true,
              lido: false,
              naoGostou: false,
            }
          : livro
      )
    );
  }

  function handleNaoGostei(id) {
    setLivros((prev) =>
      prev.map((livro) =>
        livro.id === id
          ? {
              ...livro,
              naoGostou: true,
              lido: false,
              queroLer: false,
            }
          : livro
      )
    );
  }

  return (
    <>
      <Header />

      <main className="container">
        {paginaAtual === 'form' ? (
          <BookFormPage
            livroParaEditar={livroEmEdicao}
            onSalvarLivro={handleSalvarLivro}
            onApagarLivro={handleApagarLivro}
            onVoltar={handleVoltarEstante}
          />
        ) : (
          <>
            <Hero onAdicionarLivro={handleAbrirAdicionar} />

            <section className="collection-section">
              <CollectionHeader onNovoLivro={handleAbrirAdicionar} />

              {livros.length === 0 ? (
                <EmptyState onAdicionarPrimeiro={handleAbrirAdicionar} />
              ) : (
                <div className="books-grid">
                  {livros.map((livro) => (
                    <BookCard
                      key={livro.id}
                      livro={livro}
                      onToggleLido={handleToggleLido}
                      onQueroLer={handleQueroLer}
                      onNaoGostei={handleNaoGostei}
                      onEditar={handleAbrirEditar}
                      onApagar={handleApagarLivro}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <StatsWidget livros={livros} />
      <Footer />
    </>
  );
}

export default App;