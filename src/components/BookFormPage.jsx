import { useEffect, useState } from 'react';

export function BookFormPage({
  livroParaEditar,
  onSalvarLivro,
  onApagarLivro,
  onVoltar,
}) {
  const estaEditando = Boolean(livroParaEditar);

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [capa, setCapa] = useState('/images/livro1.jpg');
  const [statusInicial, setStatusInicial] = useState('queroLer');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (livroParaEditar) {
      setTitulo(livroParaEditar.titulo || '');
      setAutor(livroParaEditar.autor || '');
      setDescricao(livroParaEditar.descricao || '');
      setCapa(livroParaEditar.capa || '/images/livro1.jpg');

      if (livroParaEditar.naoGostou) {
        setStatusInicial('naoGostou');
      } else if (livroParaEditar.lido) {
        setStatusInicial('lido');
      } else {
        setStatusInicial('queroLer');
      }
    } else {
      setTitulo('');
      setAutor('');
      setDescricao('');
      setCapa('/images/livro1.jpg');
      setStatusInicial('queroLer');
    }
    setErro('');
  }, [livroParaEditar]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!titulo.trim() || !autor.trim()) {
      setErro('Preencha pelo menos o título e o autor do livro.');
      return;
    }

    const dadosLivro = {
      id: estaEditando ? livroParaEditar.id : Date.now(),
      titulo: titulo.trim(),
      autor: autor.trim(),
      descricao:
        descricao.trim() ||
        'Uma história guardada na estante para lembrar e compartilhar.',
      capa: capa.trim() || '/images/livro1.jpg',
      lido: statusInicial === 'lido',
      queroLer: statusInicial === 'queroLer',
      naoGostou: statusInicial === 'naoGostou',
    };

    onSalvarLivro(dadosLivro);
  }

  return (
    <section className="add-book-page">
      <div className="add-book-header">
        <div>
          <span className="eyebrow">
            {estaEditando ? 'EDITAR HISTÓRIA' : 'NOVA HISTÓRIA'}
          </span>
          <h2 className="section-title">
            {estaEditando ? 'Editar livro da estante' : 'Adicionar um livro à estante'}
          </h2>
        </div>

        <button
          type="button"
          className="btn btn-outline"
          onClick={onVoltar}
        >
          ← Voltar para a estante
        </button>
      </div>

      <form className="add-book-card" onSubmit={handleSubmit}>
        {erro && <p className="form-error">{erro}</p>}

        <div className="form-group">
          <label className="form-label" htmlFor="titulo">
            Título do livro *
          </label>
          <input
            id="titulo"
            type="text"
            className="form-input"
            placeholder="Ex.: Dom Casmurro"
            value={titulo}
            onChange={(e) => {
              setTitulo(e.target.value);
              if (erro) setErro('');
            }}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="autor">
            Autor(a) *
          </label>
          <input
            id="autor"
            type="text"
            className="form-input"
            placeholder="Ex.: Machado de Assis"
            value={autor}
            onChange={(e) => {
              setAutor(e.target.value);
              if (erro) setErro('');
            }}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="capa">
              Caminho da capa
            </label>
            <input
              id="capa"
              type="text"
              className="form-input"
              placeholder="/images/livro1.jpg"
              value={capa}
              onChange={(e) => setCapa(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="status">
              Status na estante
            </label>
            <select
              id="status"
              className="form-select"
              value={statusInicial}
              onChange={(e) => setStatusInicial(e.target.value)}
            >
              <option value="queroLer">Quero ler</option>
              <option value="lido">Lido (guardar no coração)</option>
              <option value="naoGostou">Não gostei</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="descricao">
            Impressões ou sinopse
          </label>
          <textarea
            id="descricao"
            rows="4"
            className="form-textarea"
            placeholder="Escreva por que esse livro ficou perto do coração..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className="form-actions form-actions-between">
          {estaEditando ? (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onApagarLivro?.(livroParaEditar.id)}
            >
              Apagar livro
            </button>
          ) : (
            <span />
          )}

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onVoltar}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {estaEditando ? 'Salvar alterações' : '+ Salvar na estante'}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}