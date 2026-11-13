export function BookCard({
  livro,
  onToggleLido,
  onQueroLer,
  onNaoGostei,
  onEditar,
  onApagar,
}) {
  function obterTextoStatus() {
    if (livro.naoGostou) return 'Não gostei';
    if (livro.lido) return 'Lido';
    if (livro.queroLer) return 'Quero ler';
    return 'Quero ler';
  }

  return (
    <article className="book-card">
      <div className="book-cover-wrapper">
        <img
          src={livro.capa}
          alt={livro.titulo}
          className="book-cover"
        />
      </div>

      <div className="book-body">
        <div className="book-top-row">
          <span className="book-status">{obterTextoStatus()}</span>
          <div className="book-manage-actions">
            <button
              type="button"
              className="btn-text"
              onClick={() => onEditar?.(livro)}
            >
              Editar
            </button>
            <button
              type="button"
              className="btn-text btn-text-danger"
              onClick={() => onApagar?.(livro.id)}
            >
              Apagar
            </button>
          </div>
        </div>

        <h4 className="book-title">{livro.titulo}</h4>
        <p className="book-author">{livro.autor}</p>
        <p className="book-description">{livro.descricao}</p>

        <div className="book-actions">
          {onToggleLido && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onToggleLido(livro.id)}
            >
              {livro.lido ? 'Marcar como não lido' : 'Marcar como lido'}
            </button>
          )}

          <button
            type="button"
            className={`btn btn-outline ${livro.queroLer ? 'btn-active' : ''}`}
            onClick={() => onQueroLer?.(livro.id)}
          >
            quero ler
          </button>

          <button
            type="button"
            className={`btn btn-danger ${livro.naoGostou ? 'btn-danger-active' : ''}`}
            onClick={() => onNaoGostei?.(livro.id)}
          >
            não gostei
          </button>
        </div>
      </div>
    </article>
  );
}