import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ads, articles, banners, categories, comments, journalists } from '../data/mockData';

const STORAGE_KEY = 'nusanews-content';
const defaultImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80';

const initialContent = {
  articles,
  categories,
  comments,
  journalists,
  banners,
  ads,
  activities: [],
};

const ContentContext = createContext(null);

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function loadContent() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...initialContent, ...JSON.parse(saved) } : initialContent;
  } catch {
    return initialContent;
  }
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(loadContent);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const setCollection = (key, updater) => {
    setContent((current) => ({
      ...current,
      [key]: typeof updater === 'function' ? updater(current[key]) : updater,
    }));
  };

  const recordActivity = (message, type = 'info') => {
    setCollection('activities', (current = []) => [{
      id: Date.now(),
      message,
      type,
      time: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
    }, ...current].slice(0, 12));
  };

  const createArticle = (payload) => {
    const title = payload.title || 'Judul Baru';
    const article = {
      id: Date.now(),
      title,
      slug: payload.slug || slugify(title),
      category: payload.category || 'Nasional',
      author: payload.author || 'Raka Pradana',
      date: payload.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      excerpt: payload.excerpt || 'Ringkasan berita belum diisi.',
      content: payload.content || payload.excerpt || 'Konten berita belum diisi.',
      views: Number(payload.views) || 0,
      likes: Number(payload.likes) || 0,
      comments: Number(payload.comments) || 0,
      trending: Boolean(payload.trending),
      popular: Boolean(payload.popular),
      image: payload.image || defaultImage,
    };
    setContent((current) => ({
      ...current,
      articles: [article, ...current.articles],
      activities: [{
        id: Date.now() + 1,
        message: `Berita baru diterbitkan: ${article.title}`,
        type: 'article',
        time: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      }, ...(current.activities || [])].slice(0, 12),
    }));
    return article;
  };

  const updateArticle = (articleId, payload) => {
    setContent((current) => {
      const target = current.articles.find((article) => article.id === articleId);
      return {
        ...current,
        articles: current.articles.map((article) => (
          article.id === articleId
            ? { ...article, ...payload, slug: payload.title ? slugify(payload.title) : article.slug }
            : article
        )),
        activities: target ? [{
          id: Date.now(),
          message: `Berita diperbarui: ${payload.title || target.title}`,
          type: 'article',
          time: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
        }, ...(current.activities || [])].slice(0, 12) : current.activities,
      };
    });
  };

  const deleteArticle = (articleId) => {
    setContent((current) => {
      const target = current.articles.find((article) => article.id === articleId);
      return {
        ...current,
        articles: current.articles.filter((article) => article.id !== articleId),
        activities: target ? [{
          id: Date.now(),
          message: `Berita dihapus: ${target.title}`,
          type: 'danger',
          time: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
        }, ...(current.activities || [])].slice(0, 12) : current.activities,
      };
    });
  };

  const updateArticleCounters = (articleId, counters) => {
    setContent((current) => ({
      ...current,
      articles: current.articles.map((article) => (
        article.id === articleId
          ? {
              ...article,
              likes: Math.max(0, Number(article.likes || 0) + Number(counters.likes || 0)),
              comments: Math.max(0, Number(article.comments || 0) + Number(counters.comments || 0)),
              popular: counters.likes > 0 ? true : article.popular,
            }
          : article
      )),
    }));
  };

  const value = useMemo(() => ({
    ...content,
    setCollection,
    createArticle,
    updateArticle,
    deleteArticle,
    updateArticleCounters,
    recordActivity,
    resetContent: () => setContent(initialContent),
  }), [content]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}
