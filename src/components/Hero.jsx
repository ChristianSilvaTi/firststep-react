export function Hero({ onAdicionarLivro }) {
  return (
    <section className="hero">
      <span className="eyebrow">MINHA ESTANTE AFETIVA</span>
      <h2 className="hero-title">
        Histórias para guardar,
        <br />
        lembrar e compartilhar.
      </h2>
      <p className="hero-description">
        Um cantinho para reunir leituras, desejos e impressões — porque alguns livros
        permanecem conosco muito depois da última página.
      </p>
      <button className="btn btn-primary" onClick={onAdicionarLivro}>
        + Adicionar um livro
      </button>
    </section>
  );
}