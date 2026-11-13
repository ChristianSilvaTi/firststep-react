export function EmptyState({ onAdicionarPrimeiro }) {
  return (
    <div className="empty-state">
      <span className="empty-star" aria-hidden="true">
        ✦
      </span>
      <h4 className="empty-title">Esta estante ainda espera sua primeira história.</h4>
      <p className="empty-description">
        Adicione o primeiro livro para começar a contar o que você gosta de ler.
      </p>
      <button className="btn btn-primary" onClick={onAdicionarPrimeiro}>
        + Adicionar o primeiro livro
      </button>
    </div>
  );
}