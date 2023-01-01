export function useArticle(parameters: { slug: string }) {
  const { slug } = parameters;
  const articleService = inject<ArticleServiceInterface>('articleservice');
  const [article, setArticle] = useState<SingleArticle | undefined>(undefined);

  const getArticle = useCallback(
    async (slug: string) => {
      const article = await articleService.findOne(slug);
      setArticle(article);
    },
    [articleService],
  );

  useEffect(() => {
    void getArticle(slug);
  }, [slug, getArticle]);

  return { article };
}
