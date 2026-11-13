function Colecao() {
  return (
    <section className="collection-section">
      <div className="collection-header">
        <div>
          <span className="eyebrow">A COLEÇÃO</span>
          <h3 className="section-title">
            Entre páginas e memórias
          </h3>
        </div>

        <div className="collection-actions">
          <button className="btn btn-outline">
            <span aria-hidden="true">🔗</span>
            Copiar link para compartilhar
          </button>

          <button className="btn btn-primary">
            + Novo livro
          </button>
        </div>
      </div>
    </section>
  );
}