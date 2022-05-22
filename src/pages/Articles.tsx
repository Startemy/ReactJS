import React, { FC, useEffect, useState } from 'react';

import { api } from 'src/constants';

export const Articles: FC = () => {
  type Quotes = {
    quote_id: number;
    author: string;
    quote: string;
  };

  const [articles, setArticles] = useState<Quotes[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getFetchArticles = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error('not ok');
      }
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFetchArticles();
  }, []);

  return (
    <>
      <h2>Articles</h2>
      {loading && <p>Loading...</p>}
      {!loading && (
        <ul>
          {articles.map((article) => (
            <li key={article.quote_id}>
              {article.quote_id}
              <h3>Автор:{article.author}</h3>
              <h4>Цитата: {article.quote}</h4>
            </li>
          ))}
        </ul>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={() => getFetchArticles()}>reload</button>
    </>
  );
};
