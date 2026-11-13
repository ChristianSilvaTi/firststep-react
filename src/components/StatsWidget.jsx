export function StatsWidget({ livros = [] }) {
  const guardadosNoCoracao = livros.filter((livro) => livro.lido).length;
  const queroLer = livros.filter((livro) => livro.queroLer).length;
  const naoGostou = livros.filter((livro) => livro.naoGostou).length;

  return (
    <aside className="stats-widget" aria-label="Resumo da estante">
      <span className="stats-eyebrow">A ESTANTE EM NÚMEROS</span>
      <ul className="stats-list">
        <li>
          <span>livros que a gente guarda no coração:</span>
          <strong>{guardadosNoCoracao}</strong>
        </li>
        <li>
          <span>livros que você quer ler:</span>
          <strong>{queroLer}</strong>
        </li>
        <li>
          <span>livros que você não gostou:</span>
          <strong>{naoGostou}</strong>
        </li>
      </ul>
    </aside>
  );
}