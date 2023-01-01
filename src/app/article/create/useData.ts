function useData() {
  const navigate = useNavigate();
  const setIsLoading = useSetRecoilState(isLoading);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<ArticleCreateInput & { tagList: any }>({
    resolver: classValidatorResolver(ArticleCreateInput),
    reValidateMode: 'onBlur',
    criteriaMode: 'all',
  });
  const [serverError, setServerError] = useState('');

  const onSubmit = handleSubmit(async data => {
    const articleService = inject<ArticleServiceInterface>(
      Tokens.ArticleService,
    );
    setIsLoading(true);
    const result = await articleService.create(data);
    setIsLoading(false);
    if (result.isErr()) {
      setServerError(result.unwrapErr().message);
      return;
    }
    const article = result.unwrap();
    navigate(`/article/${article.slug}`);
  });

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    isSubmitted,
    serverError,
    setServerError,
    setIsLoading,
    onSubmit,
  };
}
